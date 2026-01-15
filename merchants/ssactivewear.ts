import { ElementHandle, Page } from 'puppeteer'
import type { ProfileAgent } from './interface'
import logger from '../utils/log'
import type { GhostCursor } from 'ghost-cursor'
import { randomMoveAndClick, randomMoveAndInput, randomWait } from '../utils/interact'
import type { SearchQuery } from '../utils/interests'

async function navigateToSite(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to site",{site : "https://www.ssactivewear.com"});
	await page.goto('https://www.ssactivewear.com', { waitUntil : 'networkidle2'})
}

async function addItemToCart(page: Page, cursor: GhostCursor | null) {
	logger.trace("Adding item to cart")

}
async function goToSearchbox(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to searchbox")
}

export async function clickOnItem(page: Page, cursor: GhostCursor | null, itemIndex: number) {

	const itemSelector = `#listings > div:nth-child(2) > div > div.sui-layout-body > div > div.ti-results-container > div.results.per-row-1 > article:nth-child(${itemIndex + 1}) img`

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

	if(!query) {
		logger.trace('searchForItem called with empty query. Skipping search...')
		return;
	}

	logger.trace('Searching for an item')

	// We need to enter a zipcode before running any searches on cycletrader
	const zipcodeBoxSelector = '#zip_code'
	const zipcodeBox = await page.waitForSelector(zipcodeBoxSelector)

	// Hardcoded a Chicago zipcode for now
	await randomMoveAndInput(page,cursor,zipcodeBox,'60608')

	const searchBoxSelector = '#modelText'
	const searchBox = await page.waitForSelector(searchBoxSelector);

	await randomMoveAndInput(page,cursor,searchBox,query);

	const searchButtonSelector = '#submit_button'
	const searchButton = await page.waitForSelector(searchButtonSelector);

	await randomMoveAndClick(cursor,searchButton);
}

const SSActiveWear: ProfileAgent = {
	navigateToSite: navigateToSite,
	addItemToCart: addItemToCart,
	goToSearchbox: goToSearchbox,
	searchForItem: searchForItem,
	clickOnItem: clickOnItem
};

export default SSActiveWear
