import puppeteerExtra from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { websiteToAgent } from './merchants/websites'
import options from './utils/cli'
import { getCursor } from './utils/interact'
import { installMouseHelper } from 'ghost-cursor'
import { getRandomInterest, getRandomQueryForInterest, interestToWebsite, type Interest } from './utils/interests'
import { withContext } from '@logtape/logtape'
import { currentProfile } from './utils/profile'
import logger from './utils/log'
import PuppeteerHar from 'puppeteer-har'

// Set defaults
puppeteerExtra.use(StealthPlugin())

let browser = await puppeteerExtra.launch({
	headless: options?.headless,
	slowMo: options?.slowmo ? 250 : undefined
})

let interests: Interest[] = []

if (options.randomInterests) {
	interests.push(getRandomInterest())
}

if (options.interests) {
	interests = options.interests
}

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

				const har = new PuppeteerHar(page)

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

				// Start recording network events
				await har.start({
					path: `logs/${new Date(Date.now()).toISOString()}-${websiteURL}.har`
				})

				try {

					await agent.navigateToSite(page, cursor)

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

					// Close the tab when done
					await page.close();
				} catch (err) {
					logger.error(`Encountered error while interacting with website. Moving on...`, { error: err, stack: (err as any)?.stack })
					return
				} finally {
					await har.stop();
				}
			})
		}

	}
}

// Cleanup
await browser.close();
