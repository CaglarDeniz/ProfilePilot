import { ElementHandle, Page } from 'puppeteer'
import type { ProfileAgent } from './interface'
import logger from '../utils/log'
import type { GhostCursor } from 'ghost-cursor'
import { randomMoveAndClick, randomMoveAndInput, randomWait } from '../utils/interact'
import type { SearchQuery } from '../utils/interests'

async function navigateToSite(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to site",{site : "https://mobilelegends.com"});
	await page.goto('https://mobilelegends.com', { waitUntil : 'networkidle2'})

	// Check if there is a privacy policy popup, if yes close it
	const privacySelector = '#mt-cb-policy > div > div.mt-cb-policy-close'

	let privacyBox : ElementHandle | null = null

	try {
		privacyBox = await page.waitForSelector(privacySelector)
		await randomMoveAndClick(cursor,privacyBox)
	} catch {
		logger.trace('No privacy box found. Continuing...')
	}

	const cookieBoxSelector = '#mt-cb-p'
	let cookieBox : ElementHandle | null = null

	try { 
		cookieBox = await page.waitForSelector(cookieBoxSelector)
		await randomMoveAndClick(cursor,cookieBox)
	} catch {
		logger.trace('No cookie accept/reject box found. Continuning...')
	}
}

async function addItemToCart(page: Page, cursor: GhostCursor | null) {
	logger.trace("Adding item to cart")

}
async function goToSearchbox(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to searchbox")

	const hamburgerMenuSelector = '#root > div.mt-2669608.mt-uid-99999.mt-full-container > div.mt-2670965.mt-uid-99993.mt-empty > div.mt-2692437.mt-uid-99980.mt-empty > div.mt-2672182.mt-uid-99974.mt-empty'

	const hamburgerMenu = await page.waitForSelector(hamburgerMenuSelector)
	await randomMoveAndClick(cursor,hamburgerMenu)

	// Click on the hamburger menu and go to the news tab
	const newsTabSelector = 'body > div.mt-modal-wrap > div.mt-2673155.mt-uid-99973.mt-modal > div.mt-2674208.mt-uid-95638.mt-tabs.scroll-y > div.mt-2673540.mt-uid-95633.mt-empty.mt-list-item'
	const newsTab = await page.waitForSelector(newsTabSelector)

	await randomMoveAndClick(cursor,newsTab)
}

export async function clickOnItem(page: Page, cursor: GhostCursor | null, itemIndex: number) {

	const itemSelector = `#root > div.mt-2669608.mt-uid-99999.mt-full-container > div.mt-2673591.mt-uid-99971.mt-empty > div > div > div > div.mt-2687623.mt-uid-95309.mt-empty > div > div:nth-child(${itemIndex + 1})`

	let item : ElementHandle | null = null

	try { 
		item = await page.waitForSelector(itemSelector);
	} catch {
		logger.trace(`Search for item with index ${itemIndex} timed out. Returning...`)
		return;
	} 

	await randomMoveAndClick(cursor,item);
	await randomWait(cursor)
	await page.goBack()
}

async function searchForItem(page: Page, cursor: GhostCursor | null, query: SearchQuery | null) {

	await page.waitForNetworkIdle()

	if(!query) {
		logger.trace('searchForItem called with empty query. Skipping search...')
		return;
	}

	logger.trace('Searching for an item')

	const searchBoxSelector = '#root > div.mt-2669608.mt-uid-99999.mt-full-container > div.mt-2673591.mt-uid-99971.mt-empty > div > div > div > div.mt-2687623.mt-uid-95309.mt-empty > div > div.mt-2673999.mt-uid-95307.mt-empty > div.mt-2673882.mt-uid-95306.mt-input > input'
	const searchBox = await page.waitForSelector(searchBoxSelector);

	await randomMoveAndInput(page,cursor,searchBox,query);

	// This website automatically updates the results list when a search query
	// is entered, without any need for submitting the query by pressing a button
	// or hitting the Enter key
}

const MobileLegends: ProfileAgent = {
	navigateToSite: navigateToSite,
	addItemToCart: addItemToCart,
	goToSearchbox: goToSearchbox,
	searchForItem: searchForItem,
	clickOnItem: clickOnItem
};

export default MobileLegends

