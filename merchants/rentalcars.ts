import { ElementHandle, Page } from 'puppeteer'
import type { ProfileAgent } from './interface'
import logger from '../utils/log'
import type { GhostCursor } from 'ghost-cursor'
import { randomMoveAndClick, randomMoveAndInput, randomWait } from '../utils/interact'
import type { SearchQuery } from '../utils/interests'

async function login(page : Page, cursor : GhostCursor | null){

	// This website does not have the concept of an account
	// They only allow bookings to be managed with an email 
	// address and a reservation code
	//
	// Therefore it doesn't make any sense to create an account for this one

}

async function navigateToSite(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to site",{site : "https://www.rentalcars.com"});
	await page.goto('https://www.rentalcars.com', { waitUntil : 'networkidle2'})
}

async function addItemToCart(page: Page, cursor: GhostCursor | null) {
	logger.trace("Adding item to cart")

}
async function goToSearchbox(page: Page, cursor: GhostCursor | null) {
	logger.trace("Navigating to searchbox")
}

export async function clickOnItem(page: Page, cursor: GhostCursor | null, itemIndex: number) {

	const itemSelector = `#main > div > div > div:nth-child(2) > div > div.SM_9a40e6ff.SM_79f47323.SM_b985452f > div > div:nth-child(3) > div > a:nth-child(${itemIndex + 1})`

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

	// First click on the search box
	const openSearchSelector = '#main > div.webshell.lpc-hero-container.lp-u-mb-largest > div > div > div.bgui-u-pt-large\@l > div > div > form > div > div.LPM_b848800a.LPM_f3e8ea89.LPM_1a82f098.LPM_8321412c.LPM_6e9e6a44.SearchBoxFramePrivate_root > div.LPM_b848800a.LPM_f3e8ea89.LPM_1a82f098.LPM_9399acc6.LPM_36e66d49.SearchBoxFramePrivate_fields > div.SearchBoxFrameItem_root > div > div > label > div > div > span > input'
	const openSearch = await page.waitForSelector(openSearchSelector);

	await randomMoveAndClick(cursor,openSearch);

	// Now the search field will cover the whole page. We now type in our query
	const searchBoxSelector = '#\:r7\:'
	const searchBox = await page.waitForSelector(searchBoxSelector)

	await randomMoveAndInput(page,cursor,searchBox,query)

	// And we choose the first option that comes up
	const firstResultSelector = 'body > div.LPM_7985cbc5.LPM_d7dc54d5 > div > div > div > div > div.LPM_ec570eeb > div > div.SearchBoxFieldAutocomplete_sections-mobile > div > button:nth-child(1)'
	const firstResult = await page.waitForSelector(firstResultSelector)

	await randomMoveAndClick(cursor,firstResult)

	const searchButtonSelector = '#main > div.webshell.lpc-hero-container.lp-u-mb-largest > div > div > div.bgui-u-pt-large\@l > div > div > form > div > div.LPM_b848800a.LPM_f3e8ea89.LPM_1a82f098.LPM_8321412c.LPM_6e9e6a44.SearchBoxFramePrivate_root > div.SearchBoxFramePrivate_submit > button'
	const searchButton = await page.waitForSelector(searchButtonSelector);

	await randomMoveAndClick(cursor,searchButton);
}

const RentalCars: ProfileAgent = {
	login : login,
	navigateToSite: navigateToSite,
	addItemToCart: addItemToCart,
	goToSearchbox: goToSearchbox,
	searchForItem: searchForItem,
	clickOnItem: clickOnItem
};

export default RentalCars
