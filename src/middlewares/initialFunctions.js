
import { CITIES_DB } from '../constants/cinemaСhain/cities/citiesConstants.js'

export const DATA = JSON.parse(localStorage.getItem('CITIES_DB')) ?? CITIES_DB

if (!localStorage.getItem('CITIES_DB')) {
	localStorage.setItem("CITIES_DB", JSON.stringify(CITIES_DB))
}

// ДАННЫЕ ПО КИНОТЕАТРАМ ГОРОДА, ОТСЮДА ПОЛУЧАЕМ КИНОТЕАТРЫ
const cityTheaters = (db, data) => db.filter(el => el.city == data)[0]

// ДАННЫЕ ПО ЗАЛАМ КАЖДОГО КИНОТЕАТРА ГОРОДА
const dataFilmsCurrentHall = (db, data) => db.filter(el => el.city == data)[0].data_base

//  ДАННЫЕ ПО КАЖДОМУ ЗАЛУ КОНКРЕТНОГО КИНОТЕАТРА
const dataHallsCurrentTheatre = (data, o) => data.filter((el) => el.movieTheaters == o)[0].halls

const theatreCinema = (data, currentCinema) => data.filter(el => el.movieTheaters == currentCinema)[0]

export const arrayCity = (iCity, iCinema, CITIES_DB) => {
	const c = CITIES_DB[iCity].city
	const theatre = cityTheaters(CITIES_DB, c).cinema
	const currentTheatre = cityTheaters(CITIES_DB, c).cinema[iCinema]
	const theaters = dataFilmsCurrentHall(CITIES_DB, c)
	const h = dataHallsCurrentTheatre(theaters, currentTheatre)
	const f = theatreCinema(theaters, currentTheatre)

	return { c, theatre, currentTheatre, theaters, h, f }
}
const { c, theatre, currentTheatre, h, f } = arrayCity(0, 0, DATA)
export const INITIAL_DATA = {
	city: c,
	dataTheatre: f,
	cinema: currentTheatre,
	cinemaList: theatre,
	halls: h
}

export const counterHalls = (elements, item) => {
	const counter = elements
		.map((el, i) => el.includes(item) ? i + 1 : null)
		.filter(index => index !== null)

	return counter.length === elements.length ? [999] : counter
}