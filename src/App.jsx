import { useEffect, useMemo, useState } from 'react'
import { FILMS, SERIALS, CURRENT_DATE, MAX_OBJECT_DATES, INITIAL_SELECTED, INITIAL_RESERVATION, INFO, INFO_PAST, INFO_MODAL, PAST_CLASS, FUTURE_CLASS, ACTIVE_CLASS } from './constants/constants.js'
import { db, counter, editObject, handlePlaces } from './middlewares/getDates'
import { translit } from './middlewares/translit.js'
import { newDate } from './middlewares/getDates'
import CinemaHall from './components/CinemaHall/CinemaHall.jsx'
import ListFilms from './components/ListFilms/ListFilms.jsx'
import Path from './components/Path/Path.jsx'
import Ticket from './components/Ticket/Ticket.jsx'
import Modal from './components/Modal/Modal.jsx'
import Schedule from './components/Schedule/Schedule.jsx'
import HallList from './components/HallList/HallList.jsx'
import InfoMessage from './components/InfoMessage/InfoMessage.jsx'

function App() {
	const { d, m, y } = CURRENT_DATE
	const [dates, setDates] = useState(db)
	// * db с которым работаю
	const [dataBase, setDataBase] = useState([])

	// * выбранные местав в зале 
	const [currentArrPlaces, setArrCurrentPlaces] = useState([])

	// * текущий набор данных
	const [reservation, setReservation] = useState({ ...INITIAL_RESERVATION, currentPlaces: currentArrPlaces })

	// * набор текущего состояния элементов
	const [selectedData, setSelectedData] = useState(INITIAL_SELECTED)

	// * текущий объект по фильму, дате и времени
	const [currentObject, setCurrentObject] = useState(null)

	// * модифицированный текущий объект (изменение sesstion и places)
	const [modifiedObject, setModifiedObject] = useState(null)

	const reservedData = { session: reservation.hour, places: currentArrPlaces }

	// * переключение залов
	const [visibleHall1, setVisibleHall1] = useState(false)
	const [visibleHall2, setVisibleHall2] = useState(false)
	const [overlay, setOverlay] = useState(true)
	const [sessionList, setSessionList] = useState([])
	const [ticket, setTicket] = useState(false)
	const [info, setInfo] = useState('')
	const [infoPast, setInfoPast] = useState('')
	const indexActive = dataBase.findIndex(function (el) {
		return el.state == 'current'
	})

	const sttDate = (data) => data.day + " " + data.month + " " + data.year
	const sttTime = (time) => " " + time.time + ":" + "00"

	// * ключ для пересчета занятых мест по фильму, сеансу и залу для useMemo
	const [observer, setObserver] = useState(0)

	// * пересчет занятыx мест заразные даты и сеансы
	const visiblePlaces = useMemo(() => handlePlaces(observer, currentObject, reservation.hall, reservation.translate, reservation.hour),
		[observer, currentObject, reservation.hall, reservation.translate, reservation.hour])

	// * здесь пересчет дат при первоз загрузке страницы
	useEffect(() => {
		if (localStorage.getItem('tickets') == null) {
			localStorage.setItem("tickets", JSON.stringify(dates))
			setDataBase(db)
		} else {
			let arr = localStorage.getItem('tickets')
			let newArray = JSON.parse(arr)
			let obj
			newArray.map((el) => {
				if (el.day == d && el.month == m && el.year == y) {
					obj = el
					return el.state = 'current'
				} else {
					return el.state = ''
				}
			})
			const count = counter(newArray, obj)

			if (count < MAX_OBJECT_DATES) {
				const ids = newArray.map(object => object.id)
				const max = Math.max(...ids)
				const how_much_to_add = MAX_OBJECT_DATES - count
				const paramNewDate = MAX_OBJECT_DATES - how_much_to_add
				let arr = newDate(how_much_to_add + 1, paramNewDate, max)
				const newArr2 = newArray.slice(how_much_to_add)

				setDataBase([...newArr2, ...arr])
				localStorage.setItem("tickets", JSON.stringify(newArray))
			} else {
				localStorage.setItem("tickets", JSON.stringify(newArray))
				setDataBase(newArray)
			}
		}
	}, [])

	const [activeDate, setActiveDate] = useState(false)

	const handleClickFilms = (item) => {
		setInfo('')
		setSessionList([])
		setObserver(1)
		const key = translit(item)
		setSelectedData((prev) => {
			return { ...prev, film: true, place: false, date: false, hour: false }
		})
		setReservation(() => {
			return { ...INITIAL_RESERVATION, film: item, translate: key }
		}
		)
		setArrCurrentPlaces([])
	}

	const handleClickSession = (item, date, ind) => {

		reservation.hour == null && setObserver(prev => prev + 1)

		if (ind >= indexActive) {
			setActiveDate(true)
			setInfoPast('')
		} else if (ind < indexActive) {
			setInfo('')
			setInfoPast(INFO_PAST)
			setActiveDate(false)
		}

		if (reservation.date !== date.day) {
			setReservation((prev) => {
				return { ...prev, day: item.day, date: sttDate(date), time: sttTime(item), hour: item.time }
			})
			setSelectedData((prev) => {
				return { ...prev, date: true, hour: true }
			})

		} else {
			setReservation((prev) => {
				return { ...prev, hour: item.time }
			})
			setSelectedData((prev) => {
				return { ...prev, date: true, hour: true }
			})
			setObserver(prev => prev)
		}
	}

	const handleClickDate = (data, index) => {
		setCurrentObject(data)
		setModifiedObject(data)

		if (reservation.film !== '') {
			setSessionList(data.sessions)
		}
		else {
			setInfo(INFO)
		}

		reservation.day == null &&
			setSelectedData((prev) => {
				return { ...prev, day: data.day }
			})

		if (index >= indexActive) {
			setActiveDate(true)
			setInfoPast('')
		} else if (index < indexActive) {
			setInfo('')
			setInfoPast(INFO_PAST)
			setActiveDate(false)
		}
	}

	const visibleHall = (num) => {

		reservation.hall == null && setObserver(prev => prev + 1)
		reservation.film == "" && setObserver(prev => prev)

		if (num === 1) {
			setVisibleHall1(true)
			setVisibleHall2(false)
		} else if (num === 2) {
			setVisibleHall1(false)
			setVisibleHall2(true)
		}
		setSelectedData((prev) => {
			return { ...prev, hall: true }
		})

		setReservation((prev) => {
			return { ...prev, hall: num }
		})
	}

	const openModalPlaces = (units, serialNumber) => {

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
			setOverlay(true)
		}
	}

	const handleCloseModal = () => {

		const object = editObject(modifiedObject, reservation.hall, reservedData, reservation.translate)

		currentArrPlaces.length === 0 &&
			setSelectedData((prev) => {
				return { ...prev, placeModal: false }
			})
		currentArrPlaces?.length > 0 &&
			setSelectedData((prev) => {
				return { ...prev, place: true, placeModal: false }
			}) &&
			setModifiedObject((prev) => {
				return {
					...prev, data: object
				}
			})
	}

	const handleBookSeats = () => {
		if (ticket == false) {
			const newArray = dataBase.map((obj) => {
				return obj.id == modifiedObject.id ? modifiedObject : obj
			})
			localStorage.setItem('tickets', JSON.stringify(newArray))
			setDataBase(newArray)
			setTicket(true)
		} else {
			setReservation(INITIAL_RESERVATION)
			setSelectedData(INITIAL_SELECTED)
			setArrCurrentPlaces([])
			setCurrentObject(null)
			setModifiedObject(null)
			setObserver(0)
			setSessionList([])
			setTicket(false)
		}
	}

	return (
		<div className='relative w-full min-h-[100vh] p-2 '>
			{ 				ticket && <Ticket /> 			}
			<h1 className='text-end py-6 font-montserrat'>Билетная касса</h1>
			<div className='flex gap-2 '>
				<ListFilms ticket={ticket} handleClickFilms={handleClickFilms} />
				<div className='w-full pt-6 '>
					<HallList
						visibleHall={visibleHall}
						reservation={reservation}
					/>
					{visibleHall1 ?
						<CinemaHall
							activeDate={activeDate}
							reservation={reservation}
							currentDbPlaces={visiblePlaces || undefined}
							currentArrPlaces={currentArrPlaces}
							openModalPlaces={openModalPlaces}
							serialNumber={SERIALS[0].hall}
							units={SERIALS[0].units}
							overlay={overlay}
						/>
						:
						visibleHall2 ?
							<CinemaHall
								activeDate={activeDate}
								reservation={reservation}
								currentDbPlaces={visiblePlaces || undefined}
								currentArrPlaces={currentArrPlaces}
								openModalPlaces={openModalPlaces}
								serialNumber={SERIALS[1].hall}
								units={SERIALS[1].units}
								overlay={overlay}
							/>
							: null
					}
				</div>
			</div>

			<Path films={FILMS} currentArrPlaces={currentArrPlaces}
				reservation={reservation} selectedDate={selectedData.date}
				activeDate={activeDate}
				ticket={ticket}
				selectedPlace={selectedData.place}
				selectedFilm={selectedData.film}
				selectedHall={selectedData.hall}
				handleBookSeats={handleBookSeats} />

			<InfoMessage info={info} infoPast={infoPast} />

			<div className='flex pt-2 w-full gap-6'>
				<Schedule
					dataBase={dataBase}
					indexActive={indexActive}
					sessionList={sessionList}
					reservation={reservation}
					handleClickDate={handleClickDate}
					handleClickSession={handleClickSession}
				/>
			</div>
			{
				selectedData.placeModal && <Modal
					currentDbPlaces={visiblePlaces || undefined}
					currentArrPlaces={currentArrPlaces}
					setArrCurrentPlaces={setArrCurrentPlaces}
					handleCloseModal={handleCloseModal}
					serialNumber={reservation.hall}
					units={reservation.units}
					className={reservation.placeModal ? 'display-none' : 'display-block'} reservation={reservation} />
			}
		</div >
	)
}

export default App
