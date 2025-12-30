import { ElementHandle, Page } from 'puppeteer'
import type { ProfileAgent } from './interface'
import logger from '../utils/log'
import type { GhostCursor } from 'ghost-cursor'
import { randomMoveAndClick, randomMoveAndInput } from '../utils/interact'
import type { SearchQuery } from '../utils/interests'

async function navigateToSite(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to https://poshmark.com")
	await page.goto('https://poshmark.com', { waitUntil: 'networkidle2' })


	logger.trace("Searching for item")

	// Wait for the man button to appear on page and click on it
	const buttonSelector = 'nav.ta--c > ul:nth-child(1) > li:nth-child(2) > a:nth-child(1)'
	const button = await page.waitForSelector(buttonSelector)

	if (!button) {
		logger.trace("Couldn't find category button on screen. Aborting...")
		return;
	}

	await randomMoveAndClick(cursor, button)

	// Wait and click on the brand button
	const brandSelector = 'div.p--t--5:nth-child(1) > div:nth-child(2) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > div:nth-child(1) > a:nth-child(1) > div:nth-child(1) > picture:nth-child(1) > img:nth-child(1)'
	const brand = await page.waitForSelector(brandSelector)

	if (!brand) {
		logger.trace("Couldn't find brand button on screen. Aborting...")
		return;
	}

	await randomMoveAndClick(cursor, brand)

}

async function addItemToCart(page: Page, cursor: GhostCursor | null) {
	logger.trace("Adding item to cart")

}
async function goToSearchbox(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to searchbox")
}

export async function clickOnItem(page: Page, cursor: GhostCursor | null, itemIndex: number) {

	if (!cursor) {
		logger.trace(`clickOnItem called with empty cursor. Returning...`)
		return;
	}

	const itemSelector = `#content > div > div > div > div > div:nth-child(3) > section > div.tiles_container.m--t--1 > div:nth-child(${2 * itemIndex+1}) > div > a`
 
	let item: ElementHandle | null = null

	try {
		item = await page.waitForSelector(itemSelector)
	} catch {
		logger.trace(`Search for item with index ${itemIndex} timed out. Returning...`)
		return;
	}

	await randomMoveAndClick(cursor, item)
}

async function searchForItem(page: Page, cursor: GhostCursor | null, query: SearchQuery | null) {

	if (!query) {
		logger.trace(`searchForItem called with empty query. Skipping search....`)
		return;
	}

	logger.trace("Searching for an item")

	// Wait for searchbox to appear
	const searchBoxSelector = "#searchInput"
	const searchBox = await page.waitForSelector(searchBoxSelector)

	await randomMoveAndInput(page, cursor, searchBox, query)

	const searchButtonSelector = ".search-icon"
	const searchButton = await page.waitForSelector(searchButtonSelector)

	await randomMoveAndClick(cursor, searchButton)
}

const Poshmark: ProfileAgent = {
	navigateToSite: navigateToSite,
	addItemToCart: addItemToCart,
	goToSearchbox: goToSearchbox,
	searchForItem: searchForItem,
	clickOnItem: clickOnItem
};

export default Poshmark
