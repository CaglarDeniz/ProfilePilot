
import { Command } from 'commander'
import logger from '../utils/log';
import { access,constants } from 'fs/promises'

// Setup the CLI and it's arguments
const cli = new Command();

cli
	.option('-h, --headless', 'set puppeteer to run in headless mode', false)
	.option('--profile_dir <string>', 'set the path to the local directory for the Chrome user profile', undefined)

cli.parse(process.argv)

const options = cli.opts();

try {
	await access(options.profile_dir,constants.F_OK)
} catch {
	logger.trace('User supplied profile directory does not exist')
	process.exit()
}

export default options;
