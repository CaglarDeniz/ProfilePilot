// Create a map/list of random interests and corresponding search terms
// to create randomized search queries to be used in search boxes on websites

import logger from "./log"
import { type Website } from '../merchants/websites'
import { discreteUniformRandom } from "./misc";

export const interestToWebsite: Record<Interest, Website[]> = {
	"basketball_sneakers": [
		"https://poshmark.com",
		"https://www.priceshoes.com"
	],
	"rock_music": [
		"https://shutterstock.com",
		"https://poshmark.com"
	],
	"living_room_couches": [
		"https://overstock.com",
		"https://shutterstock.com"
	],
	"motorcycle_helmets": [
		"https://www.cycletrader.com",
		"https://poshmark.com"
	],
	"used_motorcycles": [
		"https://www.cycletrader.com",
		"https://overstock.com"
	],
	"gaming_phones": [
		"https://mobilelegends.com",
		"https://slickdeals.net"
	],
	"yoga_pants": [
		"https://ssactivewear.com",
		"https://shein.com"
	],
	"home_office_furniture": [
		"https://overstock.com",
		"https://slickdeals.net"
	],
	"luxury_watches": [
		"https://overstock.com",
		"https://poshmark.com"
	],
	"discount_electronics": [
		"https://slickdeals.net",
		"https://overstock.com"
	],
	"online_courses_for_programming": [
		"https://study.com",
		"https://slickdeals.net"
	],
	"fashion_accessories": [
		"https://poshmark.com",
		"https://shein.com"
	],
	"running_shoes": [
		"https://www.priceshoes.com",
		"https://ssactivewear.com"
	],
	"sports_jerseys": [
		"https://ssactivewear.com",
		"https://poshmark.com"
	],
	"car_rental_deals": [
		"https://www.rentalcars.com",
		"https://slickdeals.net"
	]
};

export type Interest = "basketball_sneakers" |
	"rock_music" |
	"living_room_couches" |
	"motorcycle_helmets" |
	"used_motorcycles" |
	"gaming_phones" |
	"yoga_pants" |
	"home_office_furniture" |
	"luxury_watches" |
	"discount_electronics" |
	"online_courses_for_programming" |
	"fashion_accessories" |
	"running_shoes" |
	"sports_jerseys" |
	"car_rental_deals"

export type SearchQuery = string
export type InterestMap = Record<Interest, SearchQuery[]>

export const interestToQueries: InterestMap = {
	"basketball_sneakers": [
		"best basketball sneakers for men",
		"buy basketball sneakers online",
		"high top basketball sneakers",
		"basketball sneakers sale",
		"most popular basketball shoes",
		"affordable basketball sneakers",
		"Nike basketball shoes",
		"best basketball sneakers for wide feet",
		"custom basketball sneakers"
	],
	"rock_music": [
		"classic rock albums",
		"best rock songs of all time",
		"rock music vinyl records",
		"rock band concert tickets",
		"hard rock music playlist",
		"rock music streaming services",
		"rock music radio stations",
		"best rock bands of the 80s",
		"rock music documentaries",
		"guitar tabs for rock music"
	],
	"living_room_couches": [
		"buy living room couches online",
		"modern living room couches",
		"leather couches for living room",
		"comfortable couches for living room",
		"affordable living room furniture",
		"best couches for small living rooms",
		"sectional couches for living room",
		"cozy living room couches",
		"couches for family room",
		"living room couch sale"
	],
	"motorcycle_helmets": [
		"best motorcycle helmets for safety",
		"buy motorcycle helmets online",
		"full-face motorcycle helmets",
		"affordable motorcycle helmets",
		"motorcycle helmet brands",
		"lightweight motorcycle helmets",
		"DOT certified motorcycle helmets",
		"motorcycle helmet for women",
		"stylish motorcycle helmets",
		"motorcycle helmet size guide"
	],
	"used_motorcycles": [
		"buy used motorcycles online",
		"best used motorcycles for beginners",
		"used motorcycles for sale near me",
		"used Harley Davidson motorcycles",
		"cheap used motorcycles",
		"used sport motorcycles",
		"certified pre-owned motorcycles",
		"used motorcycles with low mileage",
		"used motorcycles in good condition",
		"used motorcycles under 5000"
	],
	"gaming_phones": [
		"best gaming phones 2023",
		"gaming phones with high refresh rate",
		"buy gaming phones online",
		"smartphones for mobile gaming",
		"phones for gaming under 500",
		"best android phones for gaming",
		"gaming phones with long battery life",
		"phones with game mode",
		"affordable gaming phones",
		"gaming phones with 120hz display"
	],
	"yoga_pants": [
		"buy yoga pants online",
		"best yoga pants for women",
		"affordable yoga pants",
		"high-waisted yoga pants",
		"comfortable yoga pants for workout",
		"best yoga pants for plus size",
		"yoga pants with pockets",
		"luxury yoga pants",
		"moisture-wicking yoga pants",
		"stretchy yoga pants for yoga"
	],
	"home_office_furniture": [
		"best home office furniture",
		"buy home office desk online",
		"ergonomic chairs for home office",
		"affordable home office furniture",
		"modern home office setups",
		"compact home office furniture",
		"home office furniture with storage",
		"home office furniture for small spaces",
		"home office furniture deals",
		"decorative home office furniture"
	],
	"luxury_watches": [
		"best luxury watches for men",
		"luxury watches sale",
		"buy luxury watches online",
		"high-end watches brands",
		"luxury watches for women",
		"Swiss made luxury watches",
		"affordable luxury watches",
		"limited edition luxury watches",
		"luxury watches for collectors",
		"best luxury watches under 1000"
	],
	"discount_electronics": [
		"discount electronics deals",
		"buy discounted electronics online",
		"best discount electronics stores",
		"affordable electronics gadgets",
		"electronics clearance sale",
		"discount electronics under 100",
		"refurbished electronics deals",
		"cheap electronics for home",
		"best deals on electronics",
		"discount electronics for gaming"
	],
	"online_courses_for_programming": [
		"best online courses for programming",
		"affordable online programming courses",
		"learn programming online",
		"top programming languages to learn",
		"best websites for coding courses",
		"free online programming courses",
		"online programming bootcamps",
		"interactive programming courses",
		"beginner programming courses",
		"online programming courses for beginners"
	],
	"fashion_accessories": [
		"buy fashion accessories online",
		"affordable fashion accessories",
		"trendy fashion accessories 2023",
		"best jewelry accessories for outfits",
		"fashion accessories for men",
		"fashion accessories for women",
		"luxury fashion accessories",
		"best sunglasses for fashion",
		"designer fashion accessories",
		"fashion accessories sale"
	],
	"running_shoes": [
		"best running shoes for men",
		"buy running shoes online",
		"lightweight running shoes",
		"best running shoes for women",
		"running shoes with arch support",
		"affordable running shoes",
		"cushioned running shoes",
		"running shoes for flat feet",
		"best running shoes for long distances",
		"running shoes with good grip"
	],
	"sports_jerseys": [
		"buy sports jerseys online",
		"authentic sports jerseys",
		"best sports jerseys for football",
		"basketball sports jerseys",
		"hockey sports jerseys sale",
		"custom sports jerseys",
		"vintage sports jerseys",
		"sports jerseys for kids",
		"official sports jerseys",
		"discount sports jerseys"
	],
	"car_rental_deals": [
		"best car rental deals",
		"car rental deals near me",
		"cheap car rental offers",
		"rent a car for vacation",
		"affordable car rental discounts",
		"car rental deals for families",
		"luxury car rental deals",
		"last minute car rental deals",
		"best deals on rental cars",
		"discounts on car rentals for weekend"
	]
};


export function getRandomInterest(): Interest {

	const interestKeys: Interest[] = Object.keys(interestToQueries) as Interest[]
	const interestListLength = interestKeys.length

	const randomInterestIndex = discreteUniformRandom(0,interestListLength-1)

	const randomInterest = interestKeys.at(randomInterestIndex) as Interest

	return randomInterest
}

export function getRandomQueryForInterest(interest: Interest): SearchQuery | null {

	if (!interestToQueries[interest]) {
		logger.trace(`Requested random search query with invalid interest : ${interest}`)
		return null
	}

	const queryListLength: number = interestToQueries[interest].length
	const randomQueryIndex: number = discreteUniformRandom(0,queryListLength-1)

	const query: SearchQuery | undefined = interestToQueries[interest].at(randomQueryIndex)

	return query as SearchQuery
}

export default interestToQueries
