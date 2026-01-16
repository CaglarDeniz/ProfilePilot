import { ElementHandle, Page } from 'puppeteer'
import type { ProfileAgent } from './interface'
import logger from '../utils/log'
import type { GhostCursor } from 'ghost-cursor'
import { randomMoveAndClick, randomMoveAndInput, randomWait } from '../utils/interact'
import type { SearchQuery } from '../utils/interests'
import { currentProfile } from '../utils/profile'

async function login(page : Page, cursor : GhostCursor | null) {

	const hamburgerMenuSelector = '#slickdealsHeader__hamburgerToggle'
	const hamburgerMenu = await page.waitForSelector(hamburgerMenuSelector)
	await randomMoveAndClick(cursor,hamburgerMenu)

	const signUpSelector = '#__nuxt > div:nth-child(2) > header > div > div > nav > ul.slickdealsHeader__iconSection > li:nth-child(4) > span > p'
	const signUp = await page.waitForSelector(signUpSelector)
	await randomMoveAndClick(cursor,signUp)

	const loginButtonSelector = '#__nuxt > div:nth-child(2) > dialog.slickdealsModal.slickdealsModal--smallScreenDrawer.slickdealsModal--largeScreenCenter.slickdealsModal--default.slickdealsModal--noScroll > div > section.regLoginModal__mainSection > div > div.regFlowEmailStep > p.regFlowEmailStep__loginCta > a'
	const loginButton = await page.waitForSelector(loginButtonSelector)
	await randomMoveAndClick(cursor,loginButton)

	const emailInputSelector = '#email'
	const emailInput = await page.waitForSelector(emailInputSelector)

	await randomMoveAndInput(page,cursor,emailInput,currentProfile.email)

	const continueButtonSelector = '#continue'
	const continueButton = await page.waitForSelector(continueButtonSelector)
	await randomMoveAndClick(cursor,continueButton)

	const passwordInputSelector = '#passwordInput'
	const passwordInput = await page.waitForSelector(passwordInputSelector)

	await randomMoveAndInput(page,cursor,passwordInput,currentProfile.password)

	const submitButtonSelector = '#passwordLogIn'
	const submitButton = await page.waitForSelector(submitButtonSelector)

	await randomMoveAndClick(cursor,submitButton)
}

async function navigateToSite(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to site",{site : "https://slickdeals.net"});
	await page.goto('https://slickdeals.net', { waitUntil : 'networkidle2'})

	// Wait for an alert modal to pop up and dismiss it
	const closeModalSelector = '#__nuxt > div:nth-child(2) > dialog > button'
	let closeModal : ElementHandle | null = null
	try { 
		closeModal = await page.waitForSelector(closeModalSelector)
		await randomMoveAndClick(cursor,closeModal)
	} catch {
		logger.trace('No modal found to close. Continuing...')
	}
}

async function addItemToCart(page: Page, cursor: GhostCursor | null) {
	logger.trace("Adding item to cart")

}
async function goToSearchbox(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to searchbox")
}

export async function clickOnItem(page: Page, cursor: GhostCursor | null, itemIndex: number) {

	const itemSelector = `#searchPageGrid > li:nth-child(${itemIndex + 1}) a:nth-child(1)`

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

	const searchBoxSelector = '#search'
	const searchBox = await page.waitForSelector(searchBoxSelector);

	await randomMoveAndInput(page,cursor,searchBox,query);

	const searchButtonSelector = '#slickdealsHeaderSearch > button'
	const searchButton = await page.waitForSelector(searchButtonSelector);

	await randomMoveAndClick(cursor,searchButton);
}

const SlickDeals: ProfileAgent = {
	login : login,
	navigateToSite: navigateToSite,
	addItemToCart: addItemToCart,
	goToSearchbox: goToSearchbox,
	searchForItem: searchForItem,
	clickOnItem: clickOnItem
};

export default SlickDeals
