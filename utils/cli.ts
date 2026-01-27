import { Command } from 'commander'
import logger from './log';
import { getRandomInterest } from './interests';
import { access } from 'fs/promises'
import { constants } from 'fs/promises';

// Setup the CLI and it's arguments
const cli = new Command();

cli
	.option('-s, --slowmo', 'slow down puppeteer operations for debugging', false)
	.option('-h, --headless', 'set puppeteer to run in headless mode', false)
	.option('-e, --event-count <number>', 'set the number of navigation events beforemoving on to another website', '15')
	.option('-t, --time-delay <number>', 'set the time delay between user actions on a webpage, in seconds', '10')
	.option('-n, --navigation-loops <number>', 'set the number of navigation loops to run on each website', '10')
	.option('--hesitate', 'set the number of milliseconds to hesitate before clicking an element', "100")
	.option('--move-delay', 'set the number of milliseconds to delay a mouse movement', "100")
	.option('--profile_dir <string>', 'set the path to the local directory for the Chrome user profile', undefined)
	.option('--wait-for-click', 'set the number of milliseconds to wait between mouse down and mouse up events', "100")
	.requiredOption('-i --interests [interests...]', 'set a predetermined list of interests to build a profile around', [])
	.option('--random_interests', 'selects a set of random interest to build a profile around')
	.option('--victim_name <string>', 'sets the name for the current victim profile', 'John Doe')
	.option('--victim_first_name <string>', 'sets the first name for the current victim profile', 'John')
	.option('--victim_last_name <string>', 'sets the last name for the current victim profile', 'Doe')
	.option('--victim_email <string>', 'sets the email for the current victim profile', 'johndoe@gmail.com')
	.option('--victim_username <string>', 'sets the username for the current victim profile', 'johndoe')
	.option('--victim_password <string>', 'sets the password for the current victim profile', 'johndoe1234')
	.option('--victim_country <string>', 'sets the country for the current victim profile', 'United States')

cli.parse(process.argv)

const options = cli.opts();

if (!options.randomInterests && !options.interests) {
	logger.trace("User didn't specify interests and didn't allow random interests. Aborting...")
	process.exit()
}

if (options.randomInterests) {
	options.interests.push(getRandomInterest())
}

try {
	await access(options.profile_dir,constants.F_OK)
} catch {
	logger.trace('User supplied profile directory does not exist')
	process.exit()
}

export default options;
