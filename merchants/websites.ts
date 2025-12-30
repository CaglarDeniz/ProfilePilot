import Poshmark from './poshmark'
import type { ProfileAgent } from './interface'

export const websiteToAgent : Record<string,ProfileAgent> = {
	"https://poshmark.com" : Poshmark
}
