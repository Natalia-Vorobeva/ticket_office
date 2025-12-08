import { HUDOZHESTVENNYY_FILMS_1, HUDOZHESTVENNYY_FILMS_2, HUDOZHESTVENNYY_FILMS_SESSIONS } from "./sessions/hudozhestvennyy_sessions.js"
import { FORMULA_KINO_FILMS_1, FORMULA_KINO_FILMS_2, FORMULA_KINO_FILMS_SESSIONS } from "./sessions/formula_kino_sessions.js"
import { FILMOFOND_FILMS_1, FILMOFOND_FILMS_2, FILMOFOND_FILMS_SESSIONS } from "./sessions/filmofond_sessions.js"

import { HUDOZHESTVENNYY_PETERBURG_MOVIE_HALLS } from "./halls/hudozhestvennyy_hall.js"
import { FILMOFOND_PETERBURG_MOVIE_HALLS } from "./halls/filmofond_hall.js"
import { FORMULA_KINO_PETERBURG_MOVIE_HALLS } from "./halls/formula_kino_hall.js"

export const CITY_PETERBURG = 'Санкт-Петербург'

export const PETERBURG_MOVIE_THEATERS = [
	{
		name: 'Художественный',
		halls: HUDOZHESTVENNYY_PETERBURG_MOVIE_HALLS,
		films: ["Апостол", "Бойцовский клуб", "1 + 1", "Каменская", "Мирный воин", "Остров ненужных людей", "Такси"],
		halls_films: [HUDOZHESTVENNYY_FILMS_1, HUDOZHESTVENNYY_FILMS_2],
		film_data: HUDOZHESTVENNYY_FILMS_SESSIONS,
	},
	{
		name: 'Фильмофонд',
		halls: FILMOFOND_PETERBURG_MOVIE_HALLS,
		films: ["Бойцовский клуб", "1 + 1", "Каменская", "Мирный воин", "Остров ненужных людей", "Такси"],
		halls_films: [FILMOFOND_FILMS_1, FILMOFOND_FILMS_2],
		film_data: FILMOFOND_FILMS_SESSIONS
	},
	{
		name: 'Формула кино',
		halls: FORMULA_KINO_PETERBURG_MOVIE_HALLS,
		films: ["Каменская", "Мирный воин", "Остров ненужных людей", "Такси", "Десять негритят", "Побег", "Доживем до понедельника", "Апостол", "Бойцовский клуб", "1 + 1"],
		halls_films: [FORMULA_KINO_FILMS_1, FORMULA_KINO_FILMS_2],
		film_data: FORMULA_KINO_FILMS_SESSIONS
	}
]