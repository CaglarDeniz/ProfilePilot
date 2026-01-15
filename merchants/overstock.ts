import { ElementHandle, Page } from 'puppeteer'
import type { ProfileAgent } from './interface'
import logger from '../utils/log'
import type { GhostCursor } from 'ghost-cursor'
import { randomMoveAndClick, randomMoveAndInput, randomWait } from '../utils/interact'
import type { SearchQuery } from '../utils/interests'
import { currentProfile } from '../utils/profile'

/*
 * https://www.overstock.com
 * This website has an interesting approach to anti-bot defenses
 *
 * I believe they randomize the CSS class names that they assign to important elements
 *
 * This results in hardcoded/saved CSS selectors to fail when trying to use for 
 * certain workflows.
 *
 * I have currently overcome this issue using nth-child based selectors since they're not dependent on the class selector (.)
 *
 * I assume they have deliberately employed a ton of class names for each element to 
 * entice CSS selector creation algorithms to use the class selector as a shortcut way
 * to get the minimal selector referring to the element
	*/

async function login(page : Page, cursor : GhostCursor | null) {

	const accountButtonSelector = '#container > div:nth-child(6)> a > svg'
	const accountButton = await page.waitForSelector(accountButtonSelector)

	await randomMoveAndClick(cursor,accountButton)

	const emailBoxSelector = '#login-email'
	const emailBox = await page.waitForSelector(emailBoxSelector)

	await randomMoveAndInput(page,cursor,emailBox,currentProfile.email)

	const passwordBoxSelector = '#login-password'
	const passwordBox = await page.waitForSelector(passwordBoxSelector)

	await randomMoveAndInput(page,cursor,passwordBox,currentProfile.password)

	const signInButtonSelector = '#container > div > div:nth-child(3) > form > button'
	const signInButton = await page.waitForSelector(signInButtonSelector)

	await randomMoveAndClick(cursor,signInButton)
}

async function navigateToSite(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to site",{site : "https://www.overstock.com"});
	await page.goto('https://www.overstock.com', { waitUntil : 'networkidle2'})

	// Dismiss the sign up offer
	const signupBoxSelector = '#cl-dialog-close-mcp'
	let signupBox :ElementHandle | null = null
	try {
		signupBox = await page.waitForSelector(signupBoxSelector)
		await randomMoveAndClick(cursor,signupBox)
	} catch {
		logger.trace('No signup box found. Continuing...')
	}
}

async function addItemToCart(page: Page, cursor: GhostCursor | null) {
	logger.trace("Adding item to cart")

}
async function goToSearchbox(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to searchbox")
}

export async function clickOnItem(page: Page, cursor: GhostCursor | null, itemIndex: number) {

	// Dismiss the sign up offer that sometimes shows up
	const signupBoxSelector = '#cl-dialog-close-mcp'
	let signupBox :ElementHandle | null = null
	try {
		signupBox = await page.waitForSelector(signupBoxSelector)
		await randomMoveAndClick(cursor,signupBox)
	} catch {
		logger.trace('No signup box found. Continuing...')
	}

	const itemSelector = `#container > div > div.atj.awh.adj.awi.adl.awj.adn.awk.bl > nav > a:nth-child(${itemIndex + 1})`

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

	const searchBoxSelector = '#main-search-bar'
	const searchBox = await page.waitForSelector(searchBoxSelector);

	await randomMoveAndInput(page,cursor,searchBox,query);

	const searchButtonSelector = '#search-input-cancel'
	const searchButton = await page.waitForSelector(searchButtonSelector);

	await randomMoveAndClick(cursor,searchButton);
}

const OverStock: ProfileAgent = {
	login : login,
	navigateToSite: navigateToSite,
	addItemToCart: addItemToCart,
	goToSearchbox: goToSearchbox,
	searchForItem: searchForItem,
	clickOnItem: clickOnItem
};

export default OverStock
