// Create a map/list of random interests and corresponding search terms
// to create randomized search queries to be used in search boxes on websites

import logger from "./log"

export type Interest = "sports" | "rock_music" | "adventure" | "water_bottles" | "marvel_movies"
export type SearchQuery = string
export type InterestMap = Record<Interest, SearchQuery[]>

const interests: InterestMap = {
	"sports": [
		"nike sneakers",
		"track suit",
		"indoor basketball",
		"referee whistle",
		"basketball jersey",
		"basketball headband"
	],
	"rock_music": [
		"electric guitar strings",
		"vinyl records",
		"band t-shirts",
		"marshall amplifier",
		"guitar picks",
		"drum sticks"
	],
	"adventure": [
		"hiking backpack",
		"camping tent",
		"climbing harness",
		"portable power station",
		"trail map",
		"survival kit"
	],
	"water_bottles": [
		"insulated flask",
		"glass water bottle",
		"tumbler with straw",
		"filtered water bottle",
		"collapsible bottle",
		"gallon water jug"
	],
	"marvel_movies": [
		"iron man action figure",
		"avengers poster",
		"spider-man comic books",
		"captain america shield replica",
		"marvel legends series",
		"thor hammer keychain"
	]
}

export function getRandomInterest(): Interest {

	const interestKeys: Interest[] = Object.keys(interests) as Interest[]
	const interestListLength = interestKeys.length

	const randomInterestIndex = Math.min(Math.floor(Math.random() * interestListLength), interestListLength - 1.0)

	const randomInterest = interestKeys.at(randomInterestIndex) as Interest

	return randomInterest
}

export function getRandomQueryForInterest(interest: Interest): SearchQuery | null {

	if (!interests[interest]) {
		logger.trace(`Requested random search query with invalid interest : ${interest}`)
		return null
	}

	const queryListLength: number = interests[interest].length
	const randomQueryIndex: number = Math.min(Math.floor(Math.random() * queryListLength), queryListLength - 1.0)

	const query: SearchQuery | undefined = interests[interest].at(randomQueryIndex)

	return query as SearchQuery
}

export default interests
