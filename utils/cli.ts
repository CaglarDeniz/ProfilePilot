import { Command } from 'commander'

// Setup the CLI and it's arguments
const cli = new Command();

cli
	.option('-s, --slowmo', 'slow down puppeteer operations for debugging', false)
	.option('-h, --headless', 'set puppeteer to run in headless mode', false)
	.option('-w, --websites [websites...]', 'specify websites to build a victim profile around', [])
	.option('-e, --event-count <number>', 'set the number of navigation events beforemoving on to another website', '15')
	.option('-t, --time-delay <number>', 'set the time delay between user actions on a webpage, in seconds', '1.5')
	.option('-n, --navigation-loops <number>', 'set the number of navigation loops to run on each website', '10')
	.option('--hesitate', 'set the number of milliseconds to hesitate before clicking an element',"10")
	.option('--move-delay', 'set the number of milliseconds to delay a mouse movement',"10")
	.option('--wait-for-click', 'set the number of milliseconds to wait between mouse down and mouse up events',"10")

cli.parse(process.argv)

const options = cli.opts();

export default options;
