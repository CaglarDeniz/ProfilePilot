import puppeteerExtra from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { websiteToAgent } from './merchants/websites'
import options from './utils/cli'
import { getCursor } from './utils/interact'
import { installMouseHelper } from 'ghost-cursor'
import { getRandomQueryForInterest, interestToWebsite, type Interest } from './utils/interests'
import { withContext } from '@logtape/logtape'
import { currentProfile } from './utils/profile'
import logger from './utils/log'
import PuppeteerHar from 'puppeteer-har'
import sanitize from 'sanitize-filename'

// Set defaults
puppeteerExtra.use(StealthPlugin())

let browser = await puppeteerExtra.launch({
	headless: options?.headless,
	slowMo: options?.slowmo ? 250 : undefined,
	userDataDir : options?.profile_dir
})

// Set cookies if they exist
if(options.cookies){
	await browser.setCookie(options.cookies)
}

let interests: Interest[]  = options.interests

for (const interest of interests) {

	for (let loopIndex = 0; loopIndex < options.navigationLoops; loopIndex++) {

		// Get a list of websites for the current interest
		const websites = interestToWebsite[interest]

		// for each website
		for (const websiteURL of websites) {

			await withContext({
				interest: interest,
				loopIndex: loopIndex,
				website: websiteURL,
				victimProfile: currentProfile
			}, async () => {

				// Create an instance of the websites interface
				const agent = websiteToAgent[websiteURL]

				if (agent === null || agent === undefined) {
					return
				}

				const page = await browser.newPage({ type: 'tab' })

				// Install mouse helper for debugging
				await installMouseHelper(page);

				// Set the page's viewport so that we know
				// where to place our cursor in the future
				await page.setViewport({
					width: 960,
					height: 1080,
					deviceScaleFactor: 1,
				})

				// Create a cursor to navigate this site
				const cursor = getCursor(page)

				const har = new PuppeteerHar(page)

				try {

					await agent.navigateToSite(page, cursor)

					// Start recording network events
					// We are required to sanitize the filename as 
					// websiteURL may contain characters (like /,\, etc.)
					// that trips up the writeFile logic used by 
					// PuppeteerHar
					await har.start({
						path: 'logs/' + sanitize(`${new Date(Date.now()).toISOString()}-${websiteURL}.har`)
					})

					// await agent.login(page, cursor);

					await agent.goToSearchbox(page, cursor)

					// Get a search query
					const query = getRandomQueryForInterest(interest)
					await agent.searchForItem(page, cursor, query)

					// Run navigation events
					for (let eventIndex = 0; eventIndex < options.eventCount; eventIndex++) {

						await withContext({ query: query, eventIndex: eventIndex, itemIndex: eventIndex }, async () => {

							await agent.clickOnItem(page, cursor, eventIndex)
						})
					}

				} catch (err) {
					logger.error(`Encountered error while interacting with website. Moving on...`, { error: err, stack: (err as any)?.stack })
					return
				} finally {
					// Finish recording
					await har.stop();

					// Close the tab when done
					// It is important to not close the page before the HAR recording is stopped
					// If not, the HAR cleanup will fail due to trying to detach from a CDP session
					// that has already been closed/destroyed when the page was closed
					await page.close();
				}
			})
		}

	}
}

// Cleanup
await browser.close();
