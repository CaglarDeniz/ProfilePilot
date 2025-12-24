import { Page } from 'puppeteer'
import type { ProfileAgent } from './interface'
import logger from '../utils/log' 
import { randomMoveAndClick } from '../utils/click'

async function navigateToSite(page: Page) {
	logger.trace("Navigating to https://poshmark.com")
	await page.goto('https://poshmark.com', { waitUntil: 'networkidle2' })
}

async function addItemToCart(page: Page) {
	logger.trace("Adding item to cart")

}
async function goToSearchbox(page: Page) {
	logger.trace("Navigating to searchbox")

}
async function searchForItem(page: Page) {

	logger.trace("Searching for item")

	// Wait for the man button to appear on page and click on it
	const buttonSelector = 'nav.ta--c > ul:nth-child(1) > li:nth-child(2) > a:nth-child(1)'
	const button = await page.waitForSelector(buttonSelector)

	if(!button){
		logger.trace("Couldn't find category button on screen. Aborting...")
		return;
	}

	await randomMoveAndClick(page,button)

	// Wait and click on the brand button
	const brandSelector = 'div.p--t--5:nth-child(1) > div:nth-child(2) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > div:nth-child(1) > a:nth-child(1) > div:nth-child(1) > picture:nth-child(1) > img:nth-child(1)'
	const brand = await page.waitForSelector(brandSelector)

	if(!brand){
		logger.trace("Couldn't find brand button on screen. Aborting...")
		return;
	}

	await randomMoveAndClick(page,brand)
}

const PoshmarkAgent: ProfileAgent = {
	navigateToSite: navigateToSite,
	addItemToCart: addItemToCart,
	goToSearchbox: goToSearchbox,
	searchForItem: searchForItem,
};

export default PoshmarkAgent
