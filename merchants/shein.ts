import { ElementHandle, Page } from 'puppeteer'
import type { ProfileAgent } from './interface'
import logger from '../utils/log'
import type { GhostCursor } from 'ghost-cursor'
import { randomMoveAndClick, randomMoveAndInput, randomWait } from '../utils/interact'
import type { SearchQuery } from '../utils/interests'
import { currentProfile } from '../utils/profile'

async function login(page : Page, cursor : GhostCursor | null){

	const accountButtonSelector = 'body > div.c-outermost-ctn.j-outermost-ctn > div.j-ssr-app > div.common-header.c-header.j-c-header1.top-policy > div > div.common-header__content > div:nth-child(2) > div > div.common-header__wrap > div.common-header__wrap-right > div:nth-child(1) > div > a > span > svg'
	const accountButton = await page.waitForSelector(accountButtonSelector)

	await randomMoveAndClick(cursor,accountButton)

	const emailInputSelector = 'body > div.c-outermost-ctn.j-outermost-ctn > div.container-fluid-1200.j-login-container.she-v-cloak-none > div > div > div > div.page__login-top-style > div.page__login-newUI-continue > div.page__login_input-filed.page__login-newUI-input > div > div.input_filed-wrapper > div > div > input'
	const emailInput = await page.waitForSelector(emailInputSelector)

	await randomMoveAndInput(page,cursor,emailInput,currentProfile.email)

	// the rest of account creation requires phone number verification
	// I'll do that tomorrow when JC comes back

}

async function navigateToSite(page: Page, cursor: GhostCursor | null) {
	logger.trace('Navigating to https://www.shein.com')
	await page.goto('https://www.shein.com', { waitUntil: 'networkidle2' })
}

async function addItemToCart(page: Page, cursor: GhostCursor | null) {
	logger.trace("Adding item to cart")

}
async function goToSearchbox(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to searchbox")
}

export async function clickOnItem(page: Page, cursor: GhostCursor | null, itemIndex: number) {

	const itemSelector = `#product-list-v2 > div > div.product-list-v2__main_side.product-list-v2__main_top.product-list-v2__main_view-new.product-list-v2__main > div.product-list-v2__container > div.product-list-v2__section > div.product-list.j-expose__product-list.j-product-list-info.j-da-event-box.product-list-new > div:nth-child(${itemIndex + 1}) > div.product-card__top-wrapper > a`

	const item = await page.waitForSelector(itemSelector)

	// Item clicks on Shein trigger a new tab opening, how can I handle this
	await randomMoveAndClick(cursor,item)

	await randomWait(cursor)
	await page.goBack()
}

async function searchForItem(page: Page, cursor: GhostCursor | null, query: SearchQuery | null) {


	if (!query) {
		logger.trace('searchForItem called with empty query. Skipping search...')
		return;
	}

	const searchBoxSelector = 'body > div.c-outermost-ctn.j-outermost-ctn > div.j-ssr-app > div.common-header.c-header.j-c-header1.top-policy > div > div.common-header__content > div:nth-child(2) > div > div.common-header__wrap > div.common-header__wrap-center > div > form > input'
	const searchBox = await page.waitForSelector(searchBoxSelector)

	await randomMoveAndInput(page,cursor,searchBox,query)

	const searchButtonSelector = 'body > div.c-outermost-ctn.j-outermost-ctn > div.j-ssr-app > div.common-header.c-header.j-c-header1.top-policy > div > div.common-header__content > div:nth-child(2) > div > div.common-header__wrap > div.common-header__wrap-center > div > form > button.search-button'
	const searchButton = await page.waitForSelector(searchButtonSelector)

	await randomMoveAndClick(cursor,searchButton)
}

const Shein: ProfileAgent = {
	login : login,
	navigateToSite: navigateToSite,
	addItemToCart: addItemToCart,
	goToSearchbox: goToSearchbox,
	searchForItem: searchForItem,
	clickOnItem: clickOnItem
};

export default Shein
