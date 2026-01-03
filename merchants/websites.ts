import type { ProfileAgent } from './interface'

import Poshmark from './poshmark'
import CycleTrader from './cycletrader'
import MobileLegends from './mobilelegends'
import Gap from './gap'
import OldNavyGap from './oldnavygap'
import OverStock from './overstock'
import PriceShoes from './priceshoes'
import RentalCars from './rentalcars'
import Shein from './shein'
import ShutterStock from './shutterstock'
import SlickDeals from './slickdeals'
import SSActiveWear from './ssactivewear'
import Study from './study'

export type Website = "https://poshmark.com" |
	"https://www.cycletrader.com" |
	"https://mobilelegends.com" |
	"https://gap.com" |
	"https://oldnavy.gap.com" |
	"https://overstock.com" |
	"https://www.priceshoes.com" |
	"https://www.rentalcars.com" |
	"https://shein.com" |
	"https://shutterstock.com" |
	"https://slickdeals.net" |
	"https://ssactivewear.com" |
	"https://study.com"

export const websiteToAgent: Record<Website, ProfileAgent> = {
	"https://poshmark.com": Poshmark, // a general department store, focused mostly on clothing and shoes
	"https://www.cycletrader.com": CycleTrader, // a second-hand motorcycle trading platform
	"https://mobilelegends.com": MobileLegends, // a mobile game
	"https://gap.com": Gap, // a clothing store
	"https://oldnavy.gap.com": OldNavyGap, // a clothing store
	"https://overstock.com": OverStock, // bathroom products
	"https://wwww.priceshoes.com": PriceShoes, // shoes
	"https://www.rentalcars.com": RentalCars, // rental cars
	"https://shein.com": Shein, // anything and everything
	"https://shutterstock.com": ShutterStock, // stock photographs,icons and videos
	"https://slickdeals.net": SlickDeals, // anything and everything
	"https://ssactivewear.com": SSActiveWear, // sports wear
	"https://study.com": Study, // an online course retailer
}
