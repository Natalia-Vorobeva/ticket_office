import { YESTERDAY, TODAY, DAY_MILSEC, DAYS, MONTH, CURRENT_DATE } from '../constants/constants.js'
// const MoscowMovieTheaters = ['Художественный', 'Иллюзион', 'Пионер']

export const stringDate = (data) => data.day + " " + data.month + " " + data.year + " (" + data.day_week + ")"
export const stringTime = (time) => " " + time + ":" + "00"


const pastDates = () => {
	let arr = []

	for (let i = 0; i < 7; i++) {
		let date = new Date(YESTERDAY - DAY_MILSEC * i)
		let obj = {
			state: '',
			day: date.getDate(),
			day_week: DAYS[date.getDay()],
			month: MONTH[date.getMonth()],
			year: date.getFullYear()
		}
		arr.push(obj)
	}
	return arr.reverse()
}

const arrDates = () => {
	let arr = []
	for (let i = 0; i < 8; i++) {
		let date = new Date(TODAY + DAY_MILSEC * i)
		let obj = {
			state: CURRENT_DATE == date.getDate() ? 'current' : '',
			day: date.getDate(),
			day_week: DAYS[date.getDay()],
			month: MONTH[date.getMonth()],
			year: date.getFullYear()
		}
		arr.push(obj)
	}
	return arr
}

export const newDate = (nums, num, id) => {
	let arr = []
	for (let i = 1; i < nums; i++) {
		let date = new Date(TODAY + DAY_MILSEC * (num + i))
		let obj = {
			id: id + i,
			state: '',
			day: date.getDate(),
			day_week: DAYS[date.getDay()],
			month: MONTH[date.getMonth()],
			year: date.getFullYear()
		}
		arr.push(obj)
	}
	return arr
}

export const db = () => {
	const data = pastDates().concat(arrDates())
	data.forEach((item, i) => {
		return item.id = i + 1
	})
	return data
}

export const counter = (arr, object) => arr.filter(element => element.id > object.id).length

export const editObject = (arr, day, hall, currentArrPlaces, film, hour, city, cinema) => {

	let array = JSON.parse(JSON.stringify(arr))

	const activeCity = array.find(el => el.city === city)
	if (activeCity) {
		const theatre = activeCity.data_base.find(item => item.movieTheaters === cinema)
		if (theatre) {
			const activeHall = theatre.halls.find(el => el.hall == hall)
			if (activeHall) {
				let activeFilm = activeHall.films.find(el => el.film == film)
				if (activeFilm) {
					if (Array.isArray(activeFilm.reserved) && activeFilm.reserved.length == 0) {
						activeFilm.reserved.push({
							[day]: hour,
							places: [...new Set(currentArrPlaces)]
						})
					}
					else if (activeFilm.reserved.length > 0) {
						const activeReserved = activeFilm.reserved.find(el => el[day] == hour)
						if (activeReserved) {
							activeReserved.places = [...new Set([...activeReserved.places, ...currentArrPlaces])]
						} else {
							activeFilm.reserved.push({
								[day]: hour,
								places: [...new Set(currentArrPlaces)]
							})
						}
					}
				}
			}
		}
	}
	return array
}

const arrayPlaces = (data, film, hall, day, hour) => {
	let arr = []
	const activeHall = data.find(h => h.hall === hall)
	if (!activeHall) return null

	const activeFilm = activeHall.films.find(f => f.film === film)
	if (!activeFilm) return null
	if (activeFilm.reserved == []) { return arr = [1, 2, 3] }

	const reservation = activeFilm.reserved.find(r => r[day] === hour) || []
	console.log('%cDATA', 'color: red', activeFilm.reserved, activeFilm.reserved, reservation)
	if (activeFilm.reserved) {
		arr = reservation.places
	}
	return arr
}

export const handlePlaces = (observer, data, film, hall, day, hour) => {
	let arr = []
	if (observer >= 3) {
		arr = arrayPlaces(data, film, hall, day, hour)
	} else {
		arr = []
	}
	return arr
}