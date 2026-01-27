import puppeteerExtra from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import options from './cli'

// Set defaults
puppeteerExtra.use(StealthPlugin())

// Launch a new browser session
let browser = await puppeteerExtra.launch({
	headless: options?.headless,
	userDataDir: options?.profile_dir
})

let openPageCount = 0

// When puppeteer is disconnected from the browser instance,
// meaning all pages are closed and the browser instance itself
// is also closed... ----> Export all cookies


browser.on("targetcreated", async (target) => {

	const page = await target.page()

	if(page){
		// New page has been created, increment page count
		openPageCount += 1
	}

})
browser.on("targetdestroyed", async (target) => {

	const page = await target.page()

	if(page){
		// A page has been destroyed, decrement page count
		openPageCount -= 1;
	}

	if(openPageCount == 0){
		// If there are no more open pages, export all cookies
		const browser = target.browser()
		const cookies = await browser.cookies()

		// Write all cookies to a page inside the local 
		// profile directory
		Bun.write(`${options.profile_dir}/user_cookies.txt`,JSON.stringify(cookies))
	}
})
