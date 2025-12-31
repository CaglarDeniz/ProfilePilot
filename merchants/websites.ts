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
import type { ProfileAgent } from './interface'

export const websiteToAgent: Record<string, ProfileAgent> = {
	"https://poshmark.com": Poshmark,
	"https://www.cycletrader.com": CycleTrader,
	"https://mobilelegends.com": MobileLegends,
	"https://gap.com": Gap,
	"https://oldnavy.gap.com": OldNavyGap,
	"https://overstock.com": OverStock,
	"https://wwww.priceshoes.com": PriceShoes,
	"https://www.rentalcars.com": RentalCars,
	"https://shein.com": Shein,
	"https://shutterstock.com": ShutterStock,
	"https://slickdeals.net": SlickDeals,
	"https://ssactivewear.com": SSActiveWear
}
