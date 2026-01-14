
import { ElementHandle, Page } from 'puppeteer'
import type { ProfileAgent } from './interface'
import logger from '../utils/log'
import type { GhostCursor } from 'ghost-cursor'
import { randomMoveAndClick, randomMoveAndInput } from '../utils/interact'
import type { SearchQuery } from '../utils/interests'
import { currentProfile } from '../utils/profile'

async function login(page : Page, cursor : GhostCursor | null){

	const hamburgerMenuSelector = '#hamburgerNavWrapper'
	const hamburgerMenu = await page.waitForSelector(hamburgerMenuSelector)

	await randomMoveAndClick(cursor,hamburgerMenu)

	const loginButtonSelector = '#fds_drawer-_r_0_ > div > div.fds_drawer__header-container.fds_drawer__header-container--header-only > div > div > div > span > a:nth-child(1)'
	const login = await page.waitForSelector(loginButtonSelector)

	if(!login) {
		logger.trace("Couldn't find login button on screen. Aborting...")
		return
	}

	await randomMoveAndClick(cursor,login)

	const usernameFieldSelector = '#verify-email-input'
	const usernameField = await page.waitForSelector(usernameFieldSelector)
	await randomMoveAndInput(page,cursor,usernameField,currentProfile.email)

	const continueButtonSelector = '#main-content > div > div > div > div:nth-child(3) > form > div > div > button'
	const continueButton = await page.waitForSelector(continueButtonSelector)

	await randomMoveAndClick(cursor,continueButton)

	const passwordFieldSelector = '#password-input'
	const passwordField = await page.waitForSelector(passwordFieldSelector)

	await randomMoveAndInput(page,cursor,passwordField,currentProfile.password)

	const submitButtonSelector = '#main-content > div > div > div > div:nth-child(3) > form > div > div.relative > div.relative.mx-auto.w-\[343px\] > button'
	const submitButton = await page.waitForSelector(submitButtonSelector)

	await randomMoveAndClick(cursor,submitButton)

}
async function navigateToSite(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to https://oldnavy.gap.com")
	await page.goto('https://oldnavy.gap.com',{ waitUntil : 'networkidle2'})
}

async function addItemToCart(page: Page, cursor: GhostCursor | null) {
	logger.trace("Adding item to cart")

}
async function goToSearchbox(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to searchbox")
}

export async function clickOnItem(page: Page, cursor: GhostCursor | null, itemIndex: number) {

	const itemSelector = `#search > div.plp_product-list.product-grid > div > div.plp_product-list--grid.plp_product-list__grid--spacing > div:nth-child(${itemIndex + 1}) img`
	
	let item : ElementHandle | null = null;
	try { 
		item = await page.waitForSelector(itemSelector)
	} catch{
		logger.trace("Page timed out waiting for item. Returning...")
		return;
	}

	await randomMoveAndClick(cursor,item);

	// For Old Navy, any click on an item has a redirect, so we wait for network to be idle and then go back one page.
	// This makes sure that the main loop can return to the search results page
	await page.waitForNetworkIdle();
	await page.goBack();
}

async function searchForItem(page: Page, cursor: GhostCursor | null, query: SearchQuery | null) {

	if (!query) {
		logger.trace(`searchForItem called with empty query. Skipping search....`)
		return;
	}

	logger.trace("Searching for an item")

	// Press the search button to expose the search input bar
	const searchButtonSelector = "#sitewide-app > header > div:nth-child(6) > div > div > div:nth-child(2) > button"
	const searchButton = await page.waitForSelector(searchButtonSelector)

	await randomMoveAndClick(cursor, searchButton)

	// Wait for searchbox to appear
	const searchBoxSelector = "body > div:nth-child(81) > div > div.sitewide-m2nhxf > form > div > input"
	const searchBox = await page.waitForSelector(searchBoxSelector)

	await randomMoveAndInput(page, cursor, searchBox, query)

	const confirmButtonSelector = 'body > div:nth-child(81) > div > div.sitewide-m2nhxf > form > div > button'
	const confirmButton = await page.waitForSelector(confirmButtonSelector)

	await randomMoveAndClick(cursor,confirmButton)
}

const OldNavyGap: ProfileAgent = {
	login : login,
	navigateToSite: navigateToSite,
	addItemToCart: addItemToCart,
	goToSearchbox: goToSearchbox,
	searchForItem: searchForItem,
	clickOnItem: clickOnItem
};

export default OldNavyGap
