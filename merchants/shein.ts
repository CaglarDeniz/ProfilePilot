import { ElementHandle, Page } from 'puppeteer'
import type { ProfileAgent } from './interface'
import logger from '../utils/log'
import type { GhostCursor } from 'ghost-cursor'
import { randomMoveAndClick, randomMoveAndInput } from '../utils/interact'
import type { SearchQuery } from '../utils/interests'

async function navigateToSite(page: Page, cursor: GhostCursor | null) {
	logger.trace('Navigating to https://www.temu.com')
	await page.goto('https://www.temu.com', { waitUntil: 'networkidle2' })
}

async function addItemToCart(page: Page, cursor: GhostCursor | null) {
	logger.trace("Adding item to cart")

}
async function goToSearchbox(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to searchbox")
}

export async function clickOnItem(page: Page, cursor: GhostCursor | null, itemIndex: number) {
}

async function searchForItem(page: Page, cursor: GhostCursor | null, query: SearchQuery | null) {


	if (!query) {
		logger.trace('searchForItem called with empty query. Skipping search...')
		return;
	}

	const searchBoxSelector = '#searchInput'
	const searchBox = await page.waitForSelector(searchBoxSelector)

	await randomMoveAndInput(page,cursor,searchBox,query)

	const searchButtonSelector = '#searchBar > div._3c7A9Vnx.Ekwe4GOT'
	const searchButton = await page.waitForSelector(searchButtonSelector)

	await randomMoveAndClick(cursor,searchButton)
}

const Shein: ProfileAgent = {
	navigateToSite: navigateToSite,
	addItemToCart: addItemToCart,
	goToSearchbox: goToSearchbox,
	searchForItem: searchForItem,
	clickOnItem: clickOnItem
};

export default Shein
