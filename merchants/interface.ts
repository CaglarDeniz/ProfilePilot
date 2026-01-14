import type { GhostCursor } from 'ghost-cursor';
import { Page } from 'puppeteer'
import type { SearchQuery } from '../utils/interests';

export interface ProfileAgent {
	login : (page : Page, cursor : GhostCursor | null) => Promise<void>,
	navigateToSite: (page: Page, cursor: GhostCursor | null) => Promise<void>,
	addItemToCart: (page: Page, cursor: GhostCursor | null) => Promise<void>,
	goToSearchbox: (page: Page, cursor: GhostCursor | null) => Promise<void>,
	searchForItem: (page: Page, cursor: GhostCursor | null, query : SearchQuery | null) => Promise<void>,
	clickOnItem : (page : Page, cursor : GhostCursor | null, itemIndex : number) => Promise<void>
}
