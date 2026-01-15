import { ElementHandle, Page } from 'puppeteer'
import type { ProfileAgent } from './interface'
import logger from '../utils/log'
import type { GhostCursor } from 'ghost-cursor'
import { randomMoveAndClick, randomMoveAndInput, randomWait } from '../utils/interact'
import type { SearchQuery } from '../utils/interests'

async function navigateToSite(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to site",{site : "https://shutterstock.com"});
	await page.goto('https://shutterstock.com', { waitUntil : 'networkidle2'})
}

async function addItemToCart(page: Page, cursor: GhostCursor | null) {
	logger.trace("Adding item to cart")

}
async function goToSearchbox(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to searchbox")
}

export async function clickOnItem(page: Page, cursor: GhostCursor | null, itemIndex: number) {

	const itemSelector = `#main-content > div > div.MuiBox-root.mui-79elbk > div:nth-child(1) > div.mui-1m9wqax-gridContainer-root > div:nth-child(${itemIndex + 1})`

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

	const searchBoxSelector = '#search-bar'
	const searchBox = await page.waitForSelector(searchBoxSelector);

	await randomMoveAndInput(page,cursor,searchBox,query);

	const searchButtonSelector = '#main-content > div > div.mui-l3lcuy-heroContainer > div.MuiContainer-root.MuiContainer-maxWidthLg.mui-e3l7ye-heroContent > div.mui-1l0kje0-searchBar > div > div.MuiGrid-root.MuiGrid-direction-xs-row.mui-jetg6v-searchBarButtons > button'
	const searchButton = await page.waitForSelector(searchButtonSelector);

	await randomMoveAndClick(cursor,searchButton);

	// Once navigation concludes, switch the tab to all results
	await page.waitForNetworkIdle()

	const allResultsSelector = '#main-content > div > div.mui-byk1xj-tabContainer > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.MuiButton-colorPrimary.MuiButton-disableElevation.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.MuiButton-colorPrimary.MuiButton-disableElevation.mui-1ji8th8-tab-tabSelected'

	const allResultsButton = await page.waitForSelector(allResultsSelector)
	await randomMoveAndClick(cursor,allResultsButton)
}

const ShutterStock: ProfileAgent = {
	navigateToSite: navigateToSite,
	addItemToCart: addItemToCart,
	goToSearchbox: goToSearchbox,
	searchForItem: searchForItem,
	clickOnItem: clickOnItem
};

export default ShutterStock
