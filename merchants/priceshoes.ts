import { ElementHandle, Page } from 'puppeteer'
import type { ProfileAgent } from './interface'
import logger from '../utils/log'
import type { GhostCursor } from 'ghost-cursor'
import { randomMoveAndClick, randomMoveAndInput, randomWait } from '../utils/interact'
import type { SearchQuery } from '../utils/interests'
import { gaussianRandom } from '../utils/misc'
import { TYPE_DELAY_MEAN, TYPE_DELAY_STDDEV } from '../utils/constants'

async function login(page : Page, cursor : GhostCursor | null){

	// This website requires a paid membership, and therefore it's probably
	// not worth making a login flow for. It's won't work without getting the
	// membership

}

async function navigateToSite(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to site", { site: "https://www.priceshoes.com" });
	await page.goto('https://www.priceshoes.com', { waitUntil: 'networkidle2' })
}

async function addItemToCart(page: Page, cursor: GhostCursor | null) {
	logger.trace("Adding item to cart")

}
async function goToSearchbox(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to searchbox")
}

export async function clickOnItem(page: Page, cursor: GhostCursor | null, itemIndex: number) {

	// Dismiss offers that might show up
	const offerSelector = '#base-layout > div > div > div.header-modal > h1 > button'
	let offerBox: ElementHandle | null = null

	try {
		offerBox = await page.waitForSelector(offerSelector, { timeout: 2000 })
		await randomMoveAndClick(cursor, offerBox)
	} catch {
		logger.trace('No modal offer found. Continuing...')
	}

	const itemSelector = `#layout > div > div > div.col-span-12.lg\:col-span-9 > div > div > div.mb-10.lg\:mt-3 > div:nth-child(2) > ul > li:nth-child(${itemIndex+1}) img`

	let item: ElementHandle | null = null

	try {
		item = await page.waitForSelector(itemSelector);
	} catch {
		logger.trace(`Search for item with index ${itemIndex} timed out. Returning...`)
		return;
	}

	await randomMoveAndClick(cursor, item);
	await randomWait(cursor)
	await page.goBack()
}

async function searchForItem(page: Page, cursor: GhostCursor | null, query: SearchQuery | null) {

	if (!query) {
		logger.trace('searchForItem called with empty query. Skipping search...')
		return;
	}

	logger.trace('Searching for an item')

	const searchBoxSelector = '#m-search-bar'
	const searchBox = await page.waitForSelector(searchBoxSelector);

	await randomMoveAndInput(page, cursor, searchBox, query);

	// The easiest way to search with this website is to just
	// press enter
	await page.keyboard.press('Enter', {
		delay: gaussianRandom(TYPE_DELAY_MEAN, TYPE_DELAY_STDDEV)
	})

}

const PriceShoes: ProfileAgent = {
	login : login,
	navigateToSite: navigateToSite,
	addItemToCart: addItemToCart,
	goToSearchbox: goToSearchbox,
	searchForItem: searchForItem,
	clickOnItem: clickOnItem
};

export default PriceShoes

