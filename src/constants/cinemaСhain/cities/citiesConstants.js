import { CITY_PETERBURG } from "./peterburgConstants/peterburgConstants"
import { CITY_CHELYABINSK } from "./chelyabinskConstants/chelyabinskConstants"

import { dbChelyabinsk } from "../../../middlewares/dataChelyabinsk"
import { dbPeterburg } from "../../../middlewares/dataPeterburg"

export const CITIES_DB = [
	{
		city: CITY_PETERBURG,
		data_base: dbPeterburg,
		cinema: dbPeterburg.map((obj) => obj.movieTheaters)
	},
	{
		city: CITY_CHELYABINSK,
		data_base: dbChelyabinsk,
		cinema: dbChelyabinsk.map((obj) => obj.movieTheaters)
	}
]

export const CITY_LIST = CITIES_DB.map((obj) => obj.city)