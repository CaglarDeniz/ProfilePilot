import { ElementHandle, Page } from 'puppeteer'
import type { ProfileAgent } from './interface'
import logger from '../utils/log'
import type { GhostCursor } from 'ghost-cursor'
import { randomMoveAndClick, randomMoveAndInput } from '../utils/interact'
import type { SearchQuery } from '../utils/interests'

async function navigateToSite(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to site",{site : "https://study.com"});
	await page.goto('https://study.com', { waitUntil : 'networkidle2'})
}

async function addItemToCart(page: Page, cursor: GhostCursor | null) {
	logger.trace("Adding item to cart")

}
async function goToSearchbox(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to searchbox")
}

export async function clickOnItem(page: Page, cursor: GhostCursor | null, itemIndex: number) {

	const itemSelector = `#mainBody > div.result-views > div.result-container.col-md-8.result-container--programmable-search > div:nth-child(${itemIndex+1}) a`

	let item : ElementHandle | null = null

	try { 
		item = await page.waitForSelector(itemSelector);
	} catch {
		logger.trace(`Search for item with index ${itemIndex} timed out. Returning...`)
		return;
	} 

	await randomMoveAndClick(cursor,item);
}

async function searchForItem(page: Page, cursor: GhostCursor | null, query: SearchQuery | null) {

	if(!query) {
		logger.trace('searchForItem called with empty query. Skipping search...')
		return;
	}

	logger.trace('Searching for an item')

	const openSearchSelector = '#topSearchOpen'
	const openSearch = await page.waitForSelector(openSearchSelector)

	await randomMoveAndClick(cursor,openSearch)

	const searchBoxSelector = '#homepage2024Main > nav > div.collapseSearch.collapseSearch__new-top-nav.xs-search.open > div > form > div > input'
	const searchBox = await page.waitForSelector(searchBoxSelector);

	await randomMoveAndInput(page,cursor,searchBox,query);

	const searchButtonSelector = '#topSearchRun'
	const searchButton = await page.waitForSelector(searchButtonSelector);

	await randomMoveAndClick(cursor,searchButton);
}

const Study: ProfileAgent = {
	navigateToSite: navigateToSite,
	addItemToCart: addItemToCart,
	goToSearchbox: goToSearchbox,
	searchForItem: searchForItem,
	clickOnItem: clickOnItem
};

export default Study
