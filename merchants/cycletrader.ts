import { ElementHandle, Page } from 'puppeteer'
import type { ProfileAgent } from './interface'
import logger from '../utils/log'
import type { GhostCursor } from 'ghost-cursor'
import { randomMoveAndClick, randomMoveAndInput } from '../utils/interact'
import type { SearchQuery } from '../utils/interests'
import { currentProfile } from '../utils/profile'

/*
 *
 * https://www.cycletrader.com
 * This website sometimes has the tendency of blocking bot activity
 * I'm not really sure how they're detecting my puppeteer instance. They might be using some metric unknown to me 
 * 
 * I thought I was handling most things but they definitely have something
*/


async function login(page: Page, cursor: GhostCursor | null) {

	const loginButtonSelector = '#headerHeart'
	const login = await page.waitForSelector(loginButtonSelector)

	if(!login) {
		logger.trace("Couldn't find login button on screen. Aborting...")
		return
	}

	await randomMoveAndClick(cursor,login)

	const usernameFieldSelector = '#__nuxt > div > div:nth-child(2) > div > div > div > div.tide-display-flex.tide-flex-column > form > div > div > label > div > div > input'
	const usernameField = await page.waitForSelector(usernameFieldSelector)
	await randomMoveAndInput(page,cursor,usernameField,currentProfile.email)

	const continueButtonSelector = '#__nuxt > div > div:nth-child(2) > div > div > div > div.tide-display-flex.tide-flex-column > form > div > button'
	const continueButton = await page.waitForSelector(continueButtonSelector)

	await randomMoveAndClick(cursor,continueButton)

	const loginWithPasswordSelector = '#__nuxt > div > div:nth-child(2) > div > div > div > div.tide-display-flex.tide-flex-column.tide-gap-1 > div.tide-text-center > button'
	const loginWithPassword = await page.waitForSelector(loginWithPasswordSelector)

	await randomMoveAndClick(cursor,loginWithPassword)

	const passwordFieldSelector = '#__nuxt > div > div:nth-child(2) > div > div > div > div.tide-display-flex.tide-flex-column.tide-gap-1 > form > div.tide-display-flex.tide-flex-column.tide-gap-1.sm-tide-flex-row.sm-tide-gap-1 > div > div.tide-input-text.tide-display-flex.tide-flex-column.tide-gap-1\/4 > label > div > div > input'
	const passwordField = await page.waitForSelector(passwordFieldSelector)
	await randomMoveAndInput(page,cursor,passwordField,currentProfile.password)

	const submitButtonSelector = '#login-submit-button'
	const submitButton = await page.waitForSelector(submitButtonSelector)

	await randomMoveAndClick(cursor,submitButton)

}

async function navigateToSite(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to site",{site : "https://www.cycletrader.com"});
	await page.goto('https://www.cycletrader.com', { waitUntil : 'networkidle2'})
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

const CycleTrader: ProfileAgent = {
	login : login,
	navigateToSite: navigateToSite,
	addItemToCart: addItemToCart,
	goToSearchbox: goToSearchbox,
	searchForItem: searchForItem,
	clickOnItem: clickOnItem
};

export default CycleTrader
