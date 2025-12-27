import type { ElementHandle, Page, Viewport } from "puppeteer";
import { createCursor, type GhostCursor } from 'ghost-cursor'
import options from './cli'
import logger from "./log";
import { bernoulliTrials, discreteUniformRandom, gaussianRandom, isLowerCase, isUpperCase, wait } from "./misc";
import { keyboardNeighbors, shiftChars, TYPE_DELAY_MEAN, TYPE_DELAY_STDDEV, type KeyboardNeighbors, type ShiftChars } from "./constants";

export function getCursor(page: Page): GhostCursor | null {

	const view: Viewport | null = page.viewport()

	return view ?
		createCursor(page, {
			x: Math.floor(Math.random() * view.width / 2),
			y: Math.floor(Math.random() * view.height / 2)
		}, false, {
			move: { // move options
				moveDelay: options.moveDelay + Math.random() * 10,
				randomizeMoveDelay: true,
				paddingPercentage: 50,
				maxTries : 100,
			},
			click: { // click options
				hesitate: options.hesitate + Math.random() * 10,
				waitForClick: options.waitForClick + Math.random() * 10
			},
			scroll: {
				scrollDelay: 100,
				scrollSpeed: 60
			}
		})
		: null
}

export async function randomMove(cursor: GhostCursor | null, el: ElementHandle | null) {
	if (!el) {
		logger.trace("randomMoveAndClick called with null element handle")
		return;
	}
	if (!cursor) {
		logger.trace("randomMoveAndClick called with null cursor")
		return
	}

	// await cursor.scrollIntoView(el); // Not using GhostCursor.scrollIntoView cause it seems to not do anything for me
	
	el.evaluate((el : Element) => {
		el.scrollIntoView({
			behavior : 'smooth',
			block : 'center'
		})
	})

	logger.trace(`Scrolling element into view : ${el.toString()}`)

	await cursor.move(el)
	logger.trace(`Moving to element : ${el.toString()}`)
}

export async function randomMoveAndClick(cursor: GhostCursor | null, el: ElementHandle | null) {

	if (!cursor || !el) {
		logger.trace(`Invalid input into randomMoveAndClick : ${cursor},${el}`)
		return
	}
	// Move to the element
	await randomMove(cursor, el)

	// Click on element
	await cursor.click(el)
	logger.trace(`Clicking on element : ${el.toString()}`)
}

export async function randomMoveAndInput(page: Page, cursor: GhostCursor | null, el: ElementHandle | null, input_str: string) {

	if (!cursor || !el) {
		logger.trace(`Invalid input into randomMoveAndInput : ${cursor},${el}`)
		return
	}

	// Move to the element
	await randomMove(cursor, el)

	// Type like a human would
	await humanType(page, el, input_str)

	logger.trace(`Typing ${input_str} into element : ${el.toString()}`)
}

export async function humanType(page: Page, el: ElementHandle, input_str: string) {

	enum ShiftState {
		up,
		down
	}
	const shiftState: ShiftState = ShiftState.up

	// Create an Bernouilli random variables the same length
	// as the input string to randomly make "mistakes" with probability 15%
	const mistake: number[] = bernoulliTrials(0.15, input_str.length)

	for (let charIdx = 0; charIdx < input_str.length; charIdx++) {

		const char = input_str[charIdx] as string;
		const charKey = char.toLowerCase() as keyof KeyboardNeighbors

		// If it's time to make a mistake, make a mistake
		const delay = gaussianRandom(TYPE_DELAY_MEAN, TYPE_DELAY_STDDEV)

		if (mistake[charIdx] === 1 && keyboardNeighbors[charKey] !== undefined ) {

			const randomIdx = discreteUniformRandom(0, keyboardNeighbors[charKey].length - 1)
			const randomChar = keyboardNeighbors[charKey][randomIdx] as string

			await el.type(randomChar, { delay: delay })

			// Now wait a bit more than usual, and undo your mistake
			await wait(delay + Math.random() * 100.0)
			await page.keyboard.press('Backspace')

			await el.type(char, { delay: delay + Math.random() * 10.0 })
		}

		else if (shiftState !== ShiftState.down as ShiftState
			&& shiftChars[char as keyof ShiftChars]) {
			// If this is the first time an upper case character is 
			// being typed. Press the shift key after some delay and then type the character

			await wait(delay + Math.random() * 10.0)
			await page.keyboard.down('Shift')

			// We type the key on the keyboard
			// that prints the desired character when shift is held down
			await el.type(shiftChars[char as keyof ShiftChars], { delay: delay })
		}

		else if (shiftState === ShiftState.down as ShiftState
			&& !shiftChars[char as keyof ShiftChars]) {
			// If shift is pressed and this isn't a character that requires a shift press
			// lift your finger off of shift
			await wait(delay + Math.random() * 10.0)
			await page.keyboard.up('Shift')

			await el.type(char, { delay: delay })
		}

		else {
			// If none of the above apply, just send the character over after some delay
			await el.type(char, { delay: delay })
		}
	}
}
