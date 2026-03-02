
export const DAY_MILSEC = 24 * 60 * 60 * 1000
export const DAYS = ["Вск", "Пон", "Вт", "Сред", "Чтв", "Пят", "Суб"]
export const MONTH = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
export const TODAY = new Date().getTime()
export const YESTERDAY = new Date().getTime() - DAY_MILSEC
const curr = new Date(TODAY)
const d = curr.getDate()
const m = MONTH[curr.getMonth()]
const y = curr.getFullYear()
export const CURRENT_DATE = { d, m, y }
export const MAX_OBJECT_DATES = 7
export const CURRENT_OBJECT = 1

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
	hall: null,
	units: null,
	date: '',
	day: null,
	time: '',
	hour: null,
	places: []
}

export const INFO = 'Выберите, пожалуйста, фильм'
export const INFO_PAST = 'За прошедшие даты можно только посмотреть заполненность зала. Выберите фильм, сеанс и зал'
export const INFO_MODAL = 'РЕДАКТИРОВАТЬ ЗАПОЛНЕННОСТЬ ЗАЛА НЕЛЬЗЯ'

export const HALL_INFO = "В этом зале нет сеансов на этот фильм"

export const DATE_ACTIVE_CLASS = 'bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6] text-white shadow-lg shadow-[#6d28d9]/30 border border-[#8b5cf6]'
export const DATE_FUTURE_CLASS = 'bg-gradient-to-br from-[#1a1a2e] to-[#2d2d4d] text-gray-300 hover:text-white border border-[#3d3d5d] hover:border-[#6d28d9]/50 cursor-pointer transition-all duration-200'
export const DATE_PAST_CLASS = 'bg-gradient-to-br from-[#0f0f1f] to-[#1a1a2e] text-gray-500 border border-[#2d2d4d] cursor-not-allowed'

export const SESSION_BUTTON_CLASS = 'px-4 py-2 rounded-lg bg-gradient-to-r from-[#1a1a2e] to-[#2d2d4d] border border-[#3d3d5d] text-gray-300 hover:from-[#6d28d9]/20 hover:to-[#8b5cf6]/20 hover:border-[#6d28d9]/50 hover:text-white transition-all duration-200 cursor-pointer text-sm font-medium'

export const ACTIVE_CLASS = 'bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6] text-white shadow-lg shadow-[#6d28d9]/30 border border-[#8b5cf6]'
export const FUTURE_CLASS = 'bg-gradient-to-br from-[#1a1a2e] to-[#2d2d4d] text-gray-300 border border-[#3d3d5d]'
export const PAST_CLASS = 'bg-gradient-to-br from-[#0f0f1f] to-[#1a1a2e] text-gray-500/70 border border-[#2d2d4d]/50'