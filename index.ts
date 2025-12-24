import puppeteerExtra from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { websiteToAgent } from './merchants/websites'
import options from './utils/cli'

// Set defaults
puppeteerExtra.use(StealthPlugin())


let browser = await puppeteerExtra.launch({
	headless : options?.headless,
	slowMo : options?.slowmo ? 250 : 0
})

for(let loopIndex = 0 ; loopIndex < options.navigationLoops ; loopIndex++){

	// for each website
	for(const websiteURL of options.websites) {

		// Create an instance of the websites interface
		const agent = websiteToAgent[websiteURL]

		if(agent === null || agent === undefined){
			continue
		}

		let page = await browser.newPage({type : 'tab'})

		await agent.navigateToSite(page)

		// Run navigation events
		for(let eventIndex = 0; eventIndex < options.eventCount ; eventIndex++){

			await agent.goToSearchbox(page)
			await agent.searchForItem(page)
			await agent.addItemToCart(page)

		}
	}
}
