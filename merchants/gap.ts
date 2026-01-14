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

	const loginButtonSelector = '#fds_drawer-_r_1_ > div > div.fds_drawer__header-container.fds_drawer__header-container--header-only > div > div > div > span > a:nth-child(1)'
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
	logger.trace("Navigating to site",{site : "https://www.gap.com"});
	await page.goto('https://www.gap.com', { waitUntil : 'networkidle2'})
}

async function addItemToCart(page: Page, cursor: GhostCursor | null) {
	logger.trace("Adding item to cart")

}
async function goToSearchbox(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to searchbox")
}

export async function clickOnItem(page: Page, cursor: GhostCursor | null, itemIndex: number) {

	const itemSelector = `#search > div.plp_product-list.product-grid > div > div.plp_product-list--grid.plp_product-list__grid--spacing > div:nth-child(${itemIndex + 1}) img`

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

	const openSearchSelector = '#sitewide-app > header > div:nth-child(7) > div > div > div:nth-child(2) > button'
	const openSearch = await page.waitForSelector(openSearchSelector);

	await randomMoveAndClick(cursor,openSearch);

	const searchBoxSelector = 'body > div:nth-child(94) > div > div.sitewide-m2nhxf > form > div > input'
	const searchBox = await page.waitForSelector(searchBoxSelector);

	await randomMoveAndInput(page,cursor,searchBox,query);

	const searchButtonSelector = 'body > div:nth-child(94) > div > div.sitewide-m2nhxf > form > div > button'
	const searchButton = await page.waitForSelector(searchButtonSelector);

	await randomMoveAndClick(cursor,searchButton);
}

const Gap: ProfileAgent = {
	login : login,
	navigateToSite: navigateToSite,
	addItemToCart: addItemToCart,
	goToSearchbox: goToSearchbox,
	searchForItem: searchForItem,
	clickOnItem: clickOnItem
};

export default Gap
