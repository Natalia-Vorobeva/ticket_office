
export const FILMS = ["Десять негритят", "Побег", "Доживем до понедельника", "Апостол", "Бойцовский клуб", "1 + 1", "Каменская", "Мирный воин", "Остров ненужных людей", "Такси", "Каменская", "Мирный воин", "Остров ненужных людей", "Такси"]
export const DAY_MILSEC = 24 * 60 * 60 * 1000
export const DAYS = ["Вск", "Пон", "Вт", "Сред", "Чтв", "Пят", "Суб"]
export const MONTH = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
export const TODAY = new Date().getTime()
export const YESTERDAY = new Date().getTime() - DAY_MILSEC
const curr = new Date(TODAY)
const date = new Date(TODAY + DAY_MILSEC)
const d = curr.getDate()
const m = MONTH[date.getMonth()]
const y = date.getFullYear()
export const CURRENT_DATE = { d, m, y }
export const MAX_OBJECT_DATES = 7
export const CURRENT_OBJECT = 1
export const SERIALS = [
	{
		title: "Зал1",
		hall: 1,
		units: 100
	},
	{
		title: "Зал2",
		hall: 2,
		units: 120
	}
]
export const INITIAL_SELECTED = {
	film: false,
	hall: false,
	date: false,
	hour: false,
	place: false,
	placeModal: false
}
export const INITIAL_RESERVATION = {
	film: '',
	translate: '',
	hall: null,
	units: null,
	date: '',
	day: null,
	time: null,
	hour: null,
	places: []
}

