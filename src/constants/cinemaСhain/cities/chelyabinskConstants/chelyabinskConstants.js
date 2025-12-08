

import { AVRORA_FILMS_SESSIONS, AVRORA_FILMS_1, AVRORA_FILMS_2 } from './sessions/avrora_sessions.js'
import { ALMAZ_FILMS_1, ALMAZ_FILMS_2, ALMAZ_FILMS_SESSIONS,  } from './sessions/almaz_sessions.js'
import { ZNAMYA_FILMS_1, ZNAMYA_FILMS_2, ZNAMYA_FILMS_3, ZNAMYA_FILMS_SESSIONS,  } from './sessions/znamya_sessions.js'

import { AVRORA_CHELYABINSK_MOVIE_HALLS } from './halls/avrora_hall.js'
import { ALMAZ_CHELYABINSK_MOVIE_HALLS } from './halls/almaz_hall.js'
import { ZNAMYA_CHELYABINSK_MOVIE_HALLS } from './halls/znamya_hall.js'

export const CITY_CHELYABINSK = 'Челябинск'
export const CHELYABINSK_CINEMA = ['Аврора', 'Алмаз', 'Знамя']
export const CHELYABINSK_MOVIE_THEATERS = [
	{
		name: 'Аврора',
		halls: AVRORA_CHELYABINSK_MOVIE_HALLS,
		films: ["Каменская", "Мирный воин", "Остров ненужных людей", "1 + 1"],
		halls_films: [AVRORA_FILMS_1, AVRORA_FILMS_2],
		film_data: AVRORA_FILMS_SESSIONS
	},
	{
		name: 'Алмаз',
		halls: ALMAZ_CHELYABINSK_MOVIE_HALLS,
		films: ["Каменская", "Мирный воин", "Остров ненужных людей", "Такси", "Десять негритят", "Побег", "Доживем до понедельника", "Апостол", "Бойцовский клуб", "1 + 1"],
		halls_films: [ALMAZ_FILMS_1,ALMAZ_FILMS_2],
		film_data: ALMAZ_FILMS_SESSIONS
	},
	{
		name: 'Знамя',
		halls: ZNAMYA_CHELYABINSK_MOVIE_HALLS,
		films: ["Апостол", "Бойцовский клуб", "1 + 1"],
		halls_films: [ZNAMYA_FILMS_1, ZNAMYA_FILMS_2, ZNAMYA_FILMS_3],
		film_data: ZNAMYA_FILMS_SESSIONS
	}
]



