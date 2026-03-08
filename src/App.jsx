import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
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
import ModalFilmInfo from './components/ModalFilmInfo/ModalFilmInfo.jsx'
import ModalSelectFilm from './components/ModalSelectFilm/ModalSelectFilm.jsx'

function App() {
	const filmsRef = useRef(null);
	const hallsRef = useRef(null);
	const dateRef = useRef(null);
	const pathRef = useRef(null);
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
	const [listActiveHalls, setListActiveHalls] = useState([])
	const [hallInfo, setHallInfo] = useState('')
	const [dataCurrentTheatre, setDataCurrentTheatre] = useState(INITIAL_DATA)
	const [iCity, setICity] = useState(0)
	const [iCinema, setICinema] = useState(0)
	const [filmInfoModal, setFilmInfoModal] = useState({ open: false, film: null });
	const [selectFilmModal, setSelectFilmModal] = useState(false);
	const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
	const indexActive = dataBase.findIndex(function (el) {
		return el.state === 'current'
	})
	const [selectedDateIndex, setSelectedDateIndex] = useState(indexActive);
	const [expiresAt, setExpiresAt] = useState(null);
	const [timerInterval, setTimerInterval] = useState(null);
	const [showConfirmInfo, setShowConfirmInfo] = useState(false);
	const [showInfo, setShowInfo] = useState(false);

	useEffect(() => {
		const storedData = localStorage.getItem("date-tickets")
		if (!storedData) {
			localStorage.setItem("date-tickets", JSON.stringify(dates))
			setDataBase(db)
			return
		}
		// * здесь пересчет дат при первой загрузке страницы	
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

	useEffect(() => {
		if (filmInfoModal.open || selectFilmModal || selectedData.placeModal) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [filmInfoModal.open, selectFilmModal, selectedData.placeModal]);

	useEffect(() => {
		if (indexActive !== -1) {
			setSelectedDateIndex(indexActive);
		}
	}, [indexActive]);

	useEffect(() => {
		if (info || infoPast) {
			setShowInfo(true);
			const timer = setTimeout(() => setShowInfo(false), 4000); // 4 секунды
			return () => clearTimeout(timer);
		}
	}, [info, infoPast]);



	// * ключ для пересчета занятых мест по фильму, сеансу и залу для useMemo
	const [observer, setObserver] = useState(0)

	// * пересчет занятыx мест заразные даты и сеансы
	const visiblePlaces = useMemo(() => handlePlaces(observer, dataCurrentTheatre.halls, reservation.film, reservation.hall, reservation.day, reservation.hour),
		[observer, dataCurrentTheatre.halls, reservation.film, reservation.hall, reservation.day, reservation.hour])

	const allStepsCompleted = selectedData.film && selectedData.date && selectedData.hall && selectedData.place;

	// Определяем, какой компонент показывать внизу
	const showTicket = ticket;
	const showPath = !ticket;

	// Высота нижней панели для отступа
	const bottomPanelHeight = 100;

	const resetBooking = useCallback(() => {
		if (timerInterval) clearInterval(timerInterval);
		setTimerInterval(null);
		setExpiresAt(null);
		setTicket(false);
		setReservation(INITIAL_RESERVATION);
		setSelectedData(INITIAL_SELECTED);
		setCurrentArrPlaces([]);
		setObserver(0);
		setSessionList([]);
		setHallInfo('');
		setActiveHall(null);
	}, [timerInterval]);

	const handleTimeout = useCallback(() => {
		resetBooking();
	}, [resetBooking]);

	const startTimer = useCallback((durationMs = 600000) => {
		const endTime = Date.now() + durationMs;
		setExpiresAt(endTime);
		const interval = setInterval(() => {
			const remaining = endTime - Date.now();
			if (remaining <= 0) {
				clearInterval(interval);
				handleTimeout();
			}
		}, 1000);
		setTimerInterval(interval);
	}, [handleTimeout]);

	useEffect(() => {
		return () => {
			if (timerInterval) clearInterval(timerInterval);
		};
	}, [timerInterval]);

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
		const counter = counterHalls(dataCurrentTheatre.dataTheatre.halls_films, item.film);
		setListActiveHalls(counter);
		setInfo('');
		setHallInfo('');
		setSessionList([]);
		setObserver(prev => prev + 1);
		setCurrentArrPlaces([]);

		let newHall = null;
		if (selectFilmModal) {
			newHall = item.hall;
		} else {
			if (counter.includes(999)) newHall = 1;
			else if (counter.length > 0) newHall = counter[0];
		}

		setSelectedData((prev) => ({ ...prev, film: true, hall: true, place: false, date: false, hour: false }));
		setReservation((prev) => ({
			...prev,
			film: item.film,
			hall: newHall,
			day: null,
			hour: null,
			date: null,
			time: null
		}));
		setSelectedDateIndex(indexActive);
		setActiveDate(true);

		if (newHall) {
			setActiveHall(`${newHall}/cinemaHall`);
		} else {
			setActiveHall(null);
		}
	};

	const handleSelectFilmWithHall = ({ film, hall }) => {
		const counter = counterHalls(dataCurrentTheatre.dataTheatre.halls_films, film);
		setListActiveHalls(counter);
		setReservation((prev) => ({
			...prev,
			film: film,
			hall: hall,
			date: null,
			time: null,
			units: null,
			placeModal: false,
		}));
		setSelectedData((prev) => ({
			...prev,
			film: true,
			hall: true,
			date: false,
			hour: false,
			place: false,
		}));

		setActiveHall(`${hall}/cinemaHall`);
		setSessionList([]);
		setInfo('');
		setHallInfo('');
		setCurrentArrPlaces([]);
		setObserver(prev => prev + 1);
		setSelectFilmModal(false)
	};

	const handleClickDate = (data, index) => {
		setSelectedDateIndex(index);

		if (reservation.film !== '') {
			if (reservation.hall == null) {
				if (listActiveHalls.includes(999)) {
					const hallObj = dataCurrentTheatre.halls.find(h => h.hall === 1);
					if (hallObj) {
						const filter = hallObj.films.find(el => el.film === reservation.film)?.sessions || [];
						setSessionList(filter);
						setReservation(prev => ({ ...prev, hall: 1, day: data.day }));
						setSelectedData(prev => ({ ...prev, hall: true, date: true }));
					}
				} else {
					const targetHall = listActiveHalls[0];
					const hallObj = dataCurrentTheatre.halls.find(h => h.hall === targetHall);
					if (hallObj) {
						const filter = hallObj.films.find(el => el.film === reservation.film)?.sessions || [];
						setSessionList(filter);
						setReservation(prev => ({ ...prev, hall: targetHall, day: data.day }));
						setSelectedData(prev => ({ ...prev, hall: true, date: true }));
						setObserver(prev => prev + 1);
					}
				}
			} else {
				const hallObj = dataCurrentTheatre.halls.find(h => h.hall === reservation.hall);
				if (hallObj) {
					const filter = hallObj.films.find(el => el.film === reservation.film)?.sessions || [];
					setSessionList(filter);
					setReservation(prev => ({ ...prev, day: data.day }));
					setSelectedData(prev => ({ ...prev, hall: true, date: true }));
				} else {
					console.error('Зал не найден', reservation.hall);
				}
			}
		} else {
			setInfo(INFO);
		}

		if (index >= indexActive) {
			setActiveDate(true);
			setInfoPast('');
		} else if (index < indexActive) {
			setInfo('');
			setInfoPast(INFO_PAST);
			setActiveDate(false);
		}
	};

	const handleClickSession = (item, time, ind) => {
		setCurrentArrPlaces([]);
		reservation.hour == null && setObserver(prev => prev + 1);
		if (ind >= indexActive) {
			setActiveDate(true);
			setInfoPast('');
		} else if (ind < indexActive) {
			setInfo('');
			setInfoPast(INFO_PAST);
			setActiveDate(false);
		}

		if (reservation.day === item.day) {
			setReservation(prev => ({
				...prev,
				date: stringDate(item),
				time: stringTime(time),
				hour: time
			}));
			setSelectedData(prev => ({
				...prev,
				date: true,
				hour: true
			}));
		} else {
			setReservation(prev => ({
				...prev,
				day: item.day,
				date: stringDate(item),
				time: stringTime(time),
				hour: time
			}));
			setSelectedData(prev => ({
				...prev,
				date: true,
				hour: true
			}));
		}
	};

	const handleInfoHalls = (num) => {
		const s = listActiveHalls.includes(num);
		if (s) {
			setHallInfo('');
			setInfo('');
		} else {
			setHallInfo(HALL_INFO);
			setInfo(HALL_INFO);
		}
	};

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
		if (!reservation.film || !reservation.day || !reservation.hour) return;
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
			startTimer();
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
			resetBooking();
			setInfo('✓ Бронь сохранена');
		}
	}

	const scrollToSection = (ref) => {
		ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	const handleEditBooking = () => {
		setTicket(false); // просто скрываем Ticket, бронирование остаётся
	};

	return (
		<>
			<div className={`px-4 sm:px-6 md:px-8 relative w-full max-w-full text-[2rem] md:text-[2.5rem] leading-[0.7] grid grid-rows-[auto_1fr_auto] gap-4 md:gap-6 min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#0f172a] to-[#0a0a1a] text-gray-100 overflow-x-hidden pb-[70px] ${selectedData.placeModal || selectFilmModal ? 'overflow-hidden' : ''}`}>

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

				<div className='flex flex-col lg:flex-row gap-4 md:gap-6 isolate'>
					<div className='lg:basis-2/5 min-w-0 overflow-hidden'>
						<div ref={filmsRef} className={`sticky top-4 ${ticket && "pointer-events-none"}`}>
							<ListFilms
								films={dataCurrentTheatre.dataTheatre}
								ticket={ticket}
								handleClickFilms={handleClickFilms}
								setListActiveHalls={setListActiveHalls}
								openFilmInfo={(item) => setFilmInfoModal({ open: true, film: item.film })}
								openSelectFilm={() => setSelectFilmModal(true)}
								selectedFilm={reservation.film}
							/>
						</div>
					</div>
					<div className='hidden lg:block lg:basis-3/5 relative z-[10]'>
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
										modalState={selectedData.placeModal}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
				<div ref={dateRef} className='pt-4 pb-6 w-full min-w-0'>
					<div className="flex gap-3 pb-3 date-scrollbar-wrapper max-w-full">
						<Schedule
							data={dataCurrentTheatre.halls}
							dataBase={dataBase}
							listActiveHalls={listActiveHalls}
							indexActive={indexActive}
							selectedDateIndex={selectedDateIndex}
							sessionList={sessionList}
							reservation={reservation}
							handleClickDate={handleClickDate}
							handleClickSession={handleClickSession}
						/>
					</div>
				</div>
				<div className='block lg:hidden w-full mt-4'>
					<div ref={hallsRef} className='bg-[#1e293b]/80 backdrop-blur-sm rounded-xl border border-[#334155] p-4 shadow-xl shadow-[#1e40af]/10'>
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
									key={`${index + 1}/cinemaHall-mobile`}
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
									modalState={selectedData.placeModal}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
			{showInfo && (info || infoPast) && (
				<div className="fixed bottom-[70px] left-0 right-0 z-50 pointer-events-none">
					<div className="max-w-7xl mx-auto px-4">
						<InfoMessage info={info} infoPast={infoPast} />
					</div>
				</div>
			)}
			{showPath && (
				<Path
					currentArrPlaces={currentArrPlaces}
					reservation={reservation}
					selectedDate={selectedData.date}
					activeDate={activeDate}
					ticket={ticket}
					expiresAt={expiresAt}
					selectedPlace={selectedData.place}
					selectedFilm={selectedData.film}
					selectedHall={selectedData.hall}
					handleBookSeats={handleBookSeats}
					allStepsCompleted={allStepsCompleted}
					onStepClick={(stepId) => {
						if (stepId === 1) scrollToSection(filmsRef);
						else if (stepId === 2) scrollToSection(dateRef);
						else if (stepId === 3) scrollToSection(dateRef);
						else if (stepId === 4) scrollToSection(hallsRef);
						else if (stepId === 5) scrollToSection(hallsRef);
					}}
				/>
			)}
			{showTicket && (
				<Ticket
					currentArrPlaces={currentArrPlaces}
					reservation={reservation}
					handleBookSeats={handleBookSeats}
					onEdit={handleEditBooking}
					onClose={() => { }}
				/>
			)}
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
					modalState={selectedData.placeModal}
				/>
			)}
			{filmInfoModal.open && (
				<ModalFilmInfo
					film={filmInfoModal.film}
					onClose={() => setFilmInfoModal({ open: false, film: null })}
					onSelect={(film) => {
						handleClickFilms({ film });
						setFilmInfoModal({ open: false, film: null });
					}}
				/>
			)}
			{selectFilmModal && (
				<ModalSelectFilm
					films={dataCurrentTheatre.dataTheatre}
					onSelect={handleSelectFilmWithHall}
					onClose={() => setSelectFilmModal(false)}
				/>
			)}
		</>

	)
}

export default App