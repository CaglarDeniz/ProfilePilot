import type { ElementHandle, Page, Viewport } from "puppeteer";
import { createCursor, type GhostCursor } from 'ghost-cursor'
import options from './cli'
import logger from "./log";

function getCursor(page: Page): GhostCursor | null {

	const view: Viewport | null = page.viewport()

	return view ?
		createCursor(page, {
			x: Math.floor(Math.random() * view.width / 2),
			y: Math.floor(Math.random() * view.height / 2)
		}, true, {
			randomMove: { // move options
				moveDelay: options.moveDelay,
				randomizeMoveDelay: true,
			},
			click: { // click options
				hesitate: options.hesitate,
				waitForClick: options.waitForClick
			}
		})
		: null
}

export async function randomMoveAndClick(page: Page, el: ElementHandle | null) {

	if(!el) {
		logger.trace("randomMoveAndClick called with null element handle")
		return;
	}

	const cursor = getCursor(page)

	await cursor?.move(el)
	await cursor?.click(el)
}

