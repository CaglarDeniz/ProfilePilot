import { Page } from 'puppeteer'

export interface ProfileAgent {
	navigateToSite : (page : Page) => Promise<void>,
	addItemToCart : (page : Page) => Promise<void>,
	goToSearchbox : (page : Page) => Promise<void>,
	searchForItem : (page : Page) => Promise<void>,
}
