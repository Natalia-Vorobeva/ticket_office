import { YESTERDAY, TODAY, DAY_MILSEC, DAYS, MONTH, CURRENT_DATE, FILMS } from '../constants/constants.js'
import { translit } from './translit.js'

const sessions = () => {
	let arr = []
	for (let i = 0; i < 13; i += 2) {
		let s = 10 + i
		let obj = { time: s }
		arr.push(obj)
	}
	return arr
}

const renderFilms = (data) => {
	let arr = []
	data.map((item) => {
		let data = translit(item)
		const obj = {
			film: data,
			1: [],
			2: []
		}
		arr.push(obj)
	})
	return arr
}

const pastDates = () => {
	let arr = []

	for (let i = 0; i < 7; i++) {
		let date = new Date(YESTERDAY - DAY_MILSEC * i)
		let obj = {
			state: '',
			day: date.getDate(),
			day_week: DAYS[date.getDay()],
			month: MONTH[date.getMonth()],
			year: date.getFullYear(),
			sessions: sessions(),
			data: renderFilms(FILMS)
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
			year: date.getFullYear(),
			sessions: sessions(),
			data: renderFilms(FILMS)
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
			state: '',
			day: date.getDate(),
			day_week: DAYS[date.getDay()],
			month: MONTH[date.getMonth()],
			year: date.getFullYear(),
			sessions: sessions(),
			data: renderFilms(FILMS),
			id: id + i
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

export const editObject = (obj, hall, newObj, key) => {
	const { data } = obj
	const x = data.find(el => {
		if (el.film == key) {
			if (el[hall].length === 0) {
				el[hall].push(newObj)
			} else if (el[hall].length > 0) {
				el[hall].map(item => {

					if (item.session == newObj.session) {
						item.places = item.places.concat(newObj.places)
					} else {
						el[hall].push(newObj)
					}
				}
				)
			}
			return el
		}
		return el
	})
	return x
}

const arrayPlaces = (obj, hall, key, hour) => {
	let arr = []
	const { data } = obj
	data.map(el => {
		if (el.film == key) {
			if (Array.isArray(el[hall]) && el[hall].length == 0) {
				return arr = []
			} else if (el[hall].length > 0) {
				let element = el[hall].find(item => item.session == hour)
				return element ? arr = element.places : arr = []
			}
		}
	})
	return arr
}

export const handlePlaces = (observer, obj, hall, key, hour) => {
	let arr = []
	if (observer >= 3) {
		arr = arrayPlaces(obj, hall, key, hour)
	} else {
		arr = []
	}
	return arr
}