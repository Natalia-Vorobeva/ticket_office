import { useEffect, useMemo, useState } from 'react'
import { counterHalls, DATA, INITIAL_DATA } from './middlewares/initialFunctions.js'
import { db } from './middlewares/getDates'
import { arrayCity } from './middlewares/initialFunctions.js'
import { CURRENT_DATE, MAX_OBJECT_DATES, INITIAL_SELECTED, INITIAL_RESERVATION, INFO, INFO_PAST, INFO_MODAL, HALL_INFO } from './constants/constants.js'
import { counter, editObject, handlePlaces } from './middlewares/getDates'
import { newDate } from './middlewares/getDates'
import { stringDate, stringTime } from './middlewares/getDates'
import CinemaHall from './components/CinemaHall/CinemaHall.jsx'
import ListFilms from './components/ListFilms/ListFilms.jsx'
import Path from './components/Path/Path.jsx'
import Ticket from './components/Ticket/Ticket.jsx'
import Modal from './components/Modal/Modal.jsx'
import Schedule from './components/Schedule/Schedule.jsx'
import HallList from './components/HallList/HallList.jsx'
import InfoMessage from './components/InfoMessage/InfoMessage.jsx'
import Header from './components/Header/Header.jsx'

function App() {
	const { d, m, y } = CURRENT_DATE
	const [dates, setDates] = useState(db)
	const [dataBase, setDataBase] = useState([])
	const [dataCities, setDataCities] = useState(DATA)
	const [modifiedArray, setModifiedArray] = useState(dataCities)
	// * текущий набор данных
	const [reservation, setReservation] = useState({ ...INITIAL_RESERVATION })
	// * набор текущего состояния элементов
	const [selectedData, setSelectedData] = useState(INITIAL_SELECTED)
	// * но еще не сохраненные
	const [currentArrPlaces, setCurrentArrPlaces] = useState([])

	const [overlay, setOverlay] = useState(true)
	const [sessionList, setSessionList] = useState([])
	const [ticket, setTicket] = useState(false)
	const [info, setInfo] = useState('')
	const [infoPast, setInfoPast] = useState('')
	const [activeDate, setActiveDate] = useState(false)
	const [activeHall, setActiveHall] = useState(null + "/cinemaHall")
	const [selectFilmModal, setSelectFilmModal] = useState(false)
	const [listActiveHalls, setListActiveHalls] = useState([])
	const [hallInfo, setHallInfo] = useState('')
	const [dataCurrentTheatre, setDataCurrentTheatre] = useState(INITIAL_DATA)
	const [iCity, setICity] = useState(0)
	const [iCinema, setICinema] = useState(0)

	// * здесь пересчет дат при первой загрузке страницы
	useEffect(() => {
		const storedData = localStorage.getItem("date-tickets")
		if (!storedData) {
			localStorage.setItem("date-tickets", JSON.stringify(dates))
			setDataBase(db)
			return
		}
		const parsedArray = JSON.parse(storedData)
		let currentObject = null

		const updatedArray = parsedArray.map(el => {
			const isToday = el.day === d && el.month === m && el.year === y
			if (isToday) {
				currentObject = el
			}
			return { ...el, state: isToday ? 'current' : '' }
		})

		const count = counter(updatedArray, currentObject)

		if (count < MAX_OBJECT_DATES) {
			const maxId = Math.max(...updatedArray.map(obj => obj.id))
			const toAddCount = MAX_OBJECT_DATES - count
			const paramNewDate = MAX_OBJECT_DATES - toAddCount;
			const newDates = newDate(toAddCount + 1, paramNewDate, maxId)
			const trimmedArray = updatedArray.slice(toAddCount)

			const finalArray = [...trimmedArray, ...newDates]
			setDataBase(finalArray)
			localStorage.setItem("date-tickets", JSON.stringify(finalArray))

		} else {
			setDataBase(updatedArray)
			localStorage.setItem("date-tickets", JSON.stringify(updatedArray))
		}
	}, [d, m, y, dates])

	const indexActive = dataBase.findIndex(function (el) {
		return el.state === 'current'
	})
	// * ключ для пересчета занятых мест по фильму, сеансу и залу для useMemo
	const [observer, setObserver] = useState(0)

	// * пересчет занятыx мест заразные даты и сеансы
	const visiblePlaces = useMemo(() => handlePlaces(observer, dataCurrentTheatre.halls, reservation.film, reservation.hall, reservation.day, reservation.hour),
		[observer, dataCurrentTheatre.halls, reservation.film, reservation.hall, reservation.day, reservation.hour])

	const handleClickCity = (item) => {
		const i = dataCities.findIndex(el => el.city === item)
		const { c, f, currentTheatre, theatre, h } = arrayCity(i, iCinema, dataCities)
		const obj = {
			city: c,
			dataTheatre: f,
			cinema: currentTheatre,
			cinemaList: theatre,
			halls: h
		}
		setDataCurrentTheatre(obj)
		setICity(i)
		setICinema(0)
		setReservation(INITIAL_RESERVATION)
		setSelectedData(INITIAL_SELECTED)
		setObserver(0)
	}

	const handleClickCinema = (item) => {
		const i = dataCurrentTheatre.cinemaList.findIndex(el => el === item)
		const { c, f, currentTheatre, theatre, h } = arrayCity(iCity, i, dataCities)

		setDataCurrentTheatre({
			city: c,
			dataTheatre: f,
			cinema: currentTheatre,
			cinemaList: theatre,
			halls: h
		})
		setICinema(i)
		setReservation(INITIAL_RESERVATION)
		setSelectedData(INITIAL_SELECTED)
		setObserver(0)
	}

	const handleClickFilms = (item) => {
		const counter = counterHalls(dataCurrentTheatre.dataTheatre.halls_films, item.film)
		setListActiveHalls(counter)
		setInfo('')
		setHallInfo('')
		setSessionList([])
		setObserver(1)
		if (selectFilmModal == true) {
			setSelectedData((prev) => {
				return { ...prev, film: true, place: false, date: false, hour: false, hall: true }
			})
			setReservation(() => {
				return { ...INITIAL_RESERVATION, film: item.film, hall: item.hall }
			})
		} else {
			if (counter.includes(999)) {
				setSelectedData((prev) => {
					return { ...prev, film: true, hall: true, place: false, date: false, hour: false }
				})
				setReservation(() => {
					return { ...INITIAL_RESERVATION, film: item.film, hall: 1 }
				})
			} else if (counter.length > 0) {
				setSelectedData((prev) => {
					return { ...prev, film: true, hall: true, place: false, date: false, hour: false }
				})
				setReservation(() => {
					return { ...INITIAL_RESERVATION, film: item.film, hall: counter[0] }
				})
			}
		}
		setCurrentArrPlaces([])
	}

	const handleClickSession = (item, time, ind) => {

		setCurrentArrPlaces([])
		reservation.hour == null && setObserver(prev => prev + 1)
console.log('%cDATA', 'color: purple', ind < indexActive, ind, indexActive)
		if (ind >= indexActive) {
			setActiveDate(true)
			setInfoPast('')
		} else if (ind < indexActive) {
			setInfo('')
			setInfoPast(INFO_PAST)
			setActiveDate(false)
		}

		if (reservation.day === item.day) {
			setReservation((prev) => {
				return { ...prev, date: stringDate(item), time: stringTime(time), hour: time }
			})
			setSelectedData((prev) => {
				return { ...prev, date: true, hour: true }
			})
		} else {
			setReservation((prev) => {
				return { ...prev, day: item.day, date: stringDate(item), time: stringTime(time), hour: time }
			})
			setSelectedData((prev) => {
				return { ...prev, date: true, hour: true }
			})
		}
	}
	const handleClickDate = (data, index) => {
		if (reservation.film !== '') {
			if (reservation.hall == null) {
				if (listActiveHalls.includes(999)) {
					const filter = dataCurrentTheatre.halls[0].films.filter(el => el.film == reservation.film)[0].sessions
					setSessionList(filter)
					setReservation((prev) => {
						return { ...prev, hall: 1, day: data.day }
					})
					setSelectedData((prev) => {
						return { ...prev, hall: true }
					})
				} else {
					const indexHall = listActiveHalls[0]
					const hallData = dataCurrentTheatre.halls.find(h => h.hall === indexHall)
					if (hallData) {
						const filter = hallData.films.filter(el => el.film === reservation.film)[0]?.sessions || []
						setSessionList(filter)
						setReservation((prev) => {
							return { ...prev, hall: indexHall, day: data.day }
						})
						setSelectedData((prev) => {
							return { ...prev, hall: true }
						})
					}
				}
			} else {
				const h = reservation.hall
				const filter = dataCurrentTheatre.halls[h].films.filter(el => el.film == reservation.film)[0].sessions
				setSessionList(filter)
				setReservation((prev) => {
					return { ...prev, hall: 1, day: data.day }
				})
				setSelectedData((prev) => {
					return { ...prev, hall: true }
				})
			}
		} else {
			setInfo(INFO)
		}
		if (index >= indexActive) {
			setActiveDate(true)
			setInfoPast('')
		} else if (index < indexActive) {
			setInfo('')
			setInfoPast(INFO_PAST)
			setActiveDate(false)
		}
	}
	const handleInfoHalls = (num) => {
		const s = listActiveHalls.includes(num)
		if (s == true) {
			setHallInfo("")
		} else {
			setHallInfo(HALL_INFO)
		}
	}

	const visibleHall = (num) => {
		setCurrentArrPlaces([])
		if (reservation.film == "") {
			setHallInfo('')
		} else if (listActiveHalls.includes(999)) {
			setHallInfo('')
		} else {
			handleInfoHalls(num)
		}
		setActiveHall(num + "/cinemaHall")
		reservation.hall == null && setObserver(prev => prev + 1)
		reservation.film == "" && setObserver(prev => prev)
		setSelectedData((prev) => {
			return { ...prev, hall: true }
		})
		setReservation((prev) => {
			return { ...prev, hall: num }
		})
	}

	const openModalPlaces = (units, serialNumber) => {
		setHallInfo('')
		setOverlay(false)

		if (activeDate == false) {
			setInfoPast(INFO_MODAL)
		} else if (activeDate == true) {
			setObserver(prev => prev + 1)
			setSelectedData((prev) => {
				return { ...prev, hall: true, placeModal: true }
			})
			setReservation((prev) => {
				return { ...prev, hall: serialNumber, units: units, placeModal: true }
			})
		}
	}
	const handleCloseModal = () => {
		setOverlay(true)
		if (currentArrPlaces.length === 0) {
			setSelectedData((prev) => {
				return { ...prev, placeModal: false }
			})
		} else
			if (currentArrPlaces?.length > 0) {
				setSelectedData((prev) => {
					return { ...prev, place: true, placeModal: false }
				})
			}
	}

	const handleBookSeats = () => {
		if (ticket == false) {
			const n = editObject(dataCities, reservation.day, reservation.hall, currentArrPlaces, reservation.film, reservation.hour, dataCurrentTheatre.city, dataCurrentTheatre.cinema)
			setModifiedArray(n)
			setTicket(true)
		} else {
			localStorage.setItem('CITIES_DB', JSON.stringify(modifiedArray))
			setDataCities(modifiedArray)
			setReservation(INITIAL_RESERVATION)
			setSelectedData(INITIAL_SELECTED)
			setCurrentArrPlaces([])
			setObserver(0)
			setSessionList([])
			setTicket(false)
			setHallInfo('')
			const { h } = arrayCity(iCity, iCinema, modifiedArray)
			setDataCurrentTheatre((prev) => { return { ...prev, halls: h } }
			)
		}
	}

	return (
		<div className={`px-4 sm:px-6 md:px-8 relative w-full text-[2rem] md:text-[2.5rem] leading-[0.7] grid grid-rows-[auto_1fr_auto] gap-4 md:gap-6 min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#0f172a] to-[#0a0a1a] text-gray-100 ${selectedData.placeModal || selectFilmModal ? 'overflow-hidden' : ''}`}>
			{ticket && <Ticket />}

			{/* Шапка */}
			<div className="max-w-full pt-3">
				<Header
					ticket={ticket}
					currentCity={dataCurrentTheatre.city}
					handleClickCity={handleClickCity}
					currentCinema={dataCurrentTheatre.cinema}
					handleClickCinema={handleClickCinema}
					cinemaList={dataCurrentTheatre.cinemaList}
				/>
			</div>

			{/* Основной контент */}
			<div className='w-full'>
				{/* Заголовок */}
				<div className='relative overflow-hidden rounded-xl mb-6'>
					<div className='absolute inset-0 bg-gradient-to-r from-[#1e40af] via-[#3b82f6] to-[#60a5fa] opacity-20 blur-lg'></div>
				</div>

				{/* Фильмы и залы */}
				<div className='flex flex-col lg:flex-row w-full gap-4 md:gap-6'>
					{/* Список фильмов - 40% */}
					<div className='lg:basis-2/5'>
						<div className={`sticky top-4 ${ ticket && "pointer-events-none" }`}>
							<ListFilms
								films={dataCurrentTheatre.dataTheatre}
								ticket={ticket}
								handleClickFilms={handleClickFilms}
								selectFilmModal={selectFilmModal}
								setSelectFilmModal={setSelectFilmModal}
								setListActiveHalls={setListActiveHalls}
							/>
						</div>
					</div>

					{/* Залы - 60% */}
					<div className='lg:basis-3/5'>
						<div className='bg-[#1e293b]/80 backdrop-blur-sm rounded-xl border border-[#334155] p-4 shadow-xl shadow-[#1e40af]/10'>
							<HallList
								info={hallInfo}
								halls={dataCurrentTheatre.halls}
								visibleHall={visibleHall}
								reservation={reservation}
								listActiveHalls={listActiveHalls}
							/>

							<div className='mt-4'>
								{dataCurrentTheatre.halls.map((item, index) => (
									<CinemaHall
										key={`${index + 1}/cinemaHall`}
										id={`${index + 1}/cinemaHall`}
										hallInfo={hallInfo}
										reservation={reservation}
										currentDbPlaces={visiblePlaces || undefined}
										currentArrPlaces={currentArrPlaces}
										openModalPlaces={openModalPlaces}
										serialNumber={item.hall}
										units={item.units}
										overlay={overlay}
										ticket={ticket}
										setCurrentArrPlaces={setCurrentArrPlaces}
										activeDate={activeDate}
										activeHall={activeHall}
									/>
								))}
							</div>
						</div>
					</div>
				</div>


				{/* Путь выбора */}
				<div className='mt-6'>
					<Path
						currentArrPlaces={currentArrPlaces}
						reservation={reservation}
						selectedDate={selectedData.date}
						activeDate={activeDate}
						ticket={ticket}
						selectedPlace={selectedData.place}
						selectedFilm={selectedData.film}
						selectedHall={selectedData.hall}
						handleBookSeats={handleBookSeats}
					/>
				</div>

				{/* Информационные сообщения */}
				<div className='mt-4'>
					<InfoMessage info={info} infoPast={infoPast} />
				</div>
			</div>

			{/* Расписание */}
			<div className='pt-4 pb-6 w-full'>
				<div className='flex gap-3 overflow-x-auto pb-3 mb-4 date-scrollbar'>
					<Schedule
						data={dataCurrentTheatre.halls}
						dataBase={dataBase}
						listActiveHalls={listActiveHalls}
						indexActive={indexActive}
						sessionList={sessionList}
						reservation={reservation}
						handleClickDate={handleClickDate}
						handleClickSession={handleClickSession}
					/>
				</div>
			</div>

			{/* Модальное окно выбора мест */}
			{selectedData.placeModal && (
				<Modal
					overlay={overlay}
					hallInfo={hallInfo}
					currentDbPlaces={visiblePlaces || undefined}
					currentArrPlaces={currentArrPlaces}
					setCurrentArrPlaces={setCurrentArrPlaces}
					handleCloseModal={handleCloseModal}
					serialNumber={reservation.hall}
					units={reservation.units}
					className={reservation.placeModal ? 'hidden' : 'block'}
					reservation={reservation}
				/>
			)}
		</div>		
	)
}

export default App
