import { useState, useEffect } from "react";
import InfoMessage from "../InfoMessage/InfoMessage";

function Path({
	currentArrPlaces,
	reservation,
	selectedDate,
	ticket,
	expiresAt,
	selectedPlace,
	selectedFilm,
	selectedHall,
	handleBookSeats,
	allStepsCompleted,
	onStepClick
}) {
	const [isCompact, setIsCompact] = useState(false);
	const [timeLeft, setTimeLeft] = useState('');
	const [showInfoModal, setShowInfoModal] = useState(false);
	const time = reservation.date + " , " + reservation.time;

	// Принудительно включаем компактный режим на экранах ≤450px
	useEffect(() => {
		const checkWidth = () => {
			if (window.innerWidth <= 450) {
				setIsCompact(true);
			} else {
				setIsCompact(false);
			}
		};
		checkWidth();
		window.addEventListener('resize', checkWidth);
		return () => window.removeEventListener('resize', checkWidth);
	}, []);

	useEffect(() => {
		if (!ticket || !expiresAt) return;
		const updateTimer = () => {
			const remaining = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
			const mins = Math.floor(remaining / 60);
			const secs = remaining % 60;
			setTimeLeft(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
		};
		updateTimer();
		const interval = setInterval(updateTimer, 1000);
		return () => clearInterval(interval);
	}, [ticket, expiresAt]);

	// Шаги для полного вида (5 шагов)
	const steps = [
		{ id: 1, title: "Фильм", value: reservation.film || "Не выбран", isCompleted: selectedFilm },
		{ id: 2, title: "Дата", value: reservation.date || "Не выбрана", isCompleted: selectedDate },
		{ id: 3, title: "Время", value: reservation.time || "Не выбрано", isCompleted: !!reservation.hour },
		{ id: 4, title: "Зал", value: reservation.hall ? `Зал ${reservation.hall}` : "Не выбран", isCompleted: selectedHall },
		{ id: 5, title: "Места", value: selectedPlace ? `${currentArrPlaces.length} мест` : "Не выбраны", isCompleted: selectedPlace },
	];

	// Все шаги выполнены
	const allStepsDone = selectedFilm && selectedDate && !!reservation.hour && selectedHall && selectedPlace;

	// SVG-иконки
	const iconMap = {
		film: (
			<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
			</svg>
		),
		date: (
			<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
			</svg>
		),
		time: (
			<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		),
		hall: (
			<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
			</svg>
		),
		seat: (
			<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
			</svg>
		),
		info: (
			<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		),
		book: (
			<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m-4 4h8M4 21h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v15a1 1 0 001 1z" />
			</svg>
		),
	};

	// Варианты иконок для Info (5 штук)
	const infoIconOptions = [
		<svg key="1" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>,
		<svg key="2" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>,
		<svg key="3" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<circle cx="12" cy="12" r="10" strokeWidth="2" />
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4M12 8h.01" />
		</svg>,
		<svg key="4" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2-10H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2z" />
		</svg>,
		<svg key="5" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>,
	];

	// Компактное меню (маленькие экраны)
	const compactItems = [
		{ id: 1, icon: iconMap.film, label: "Фильм", active: selectedFilm },
		{ id: 2, icon: iconMap.date, label: "Дата", active: selectedDate },
		{ id: 3, icon: iconMap.hall, label: "Зал", active: selectedHall },
		{ id: 4, icon: iconMap.time, label: "Время", active: !!reservation.hour },
		{ id: 5, icon: iconMap.seat, label: "Места", active: selectedPlace },
		{ id: 6, icon: infoIconOptions[0], label: "Инфо", active: selectedFilm, onClick: () => setShowInfoModal(true) },
		{ id: 7, icon: iconMap.book, label: "Бронь", active: allStepsDone, pulse: allStepsDone, onClick: allStepsDone ? handleBookSeats : () => { } },
	];

	return (
		<>
			{!isCompact && (
				<div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1a1a2e]/90 backdrop-blur-md border-t border-[#3d3d5d] p-1 shadow-2xl">
					<div className="max-w-7xl mx-auto">
						<div className="flex flex-col md:flex-row items-center">
							<div className="flex-1 flex justify-around w-full md:w-auto">
								{steps.map((step) => (
									<button
										key={step.id}
										onClick={() => onStepClick(step.id)}
										className="flex items-center gap-2 p-1 rounded-lg hover:bg-[#2d2d4d]"
									>
										<div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step.isCompleted ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'
											}`}>
											{step.isCompleted ? '✓' : step.id}
										</div>
										<div className="flex flex-col items-start">
											<span className="text-xs text-gray-400">{step.title}</span>
											<span className="text-sm font-medium text-white truncate max-w-[100px]">{step.value}</span>
										</div>
									</button>
								))}
							</div>
							<div className="flex items-center">
								{allStepsDone && (
									<button
										onClick={handleBookSeats}
										disabled={!allStepsDone}
										className={`
											px-6 py-2 rounded-lg font-bold relative overflow-hidden
											bg-[#1a1a2e] text-white border-2 border-transparent
											before:absolute before:inset-0 before:border-2 before:border-[#8b5cf6] before:rounded-lg
											before:animate-border-run before:opacity-70
											hover:bg-[#8b5cf6] hover:text-white transition-colors duration-300
											disabled:opacity-50 disabled:pointer-events-none disabled:before:animate-none disabled:border-gray-500
										`}
									>
										<span className="relative z-10">
											{ticket ? `ПОДТВЕРДИТЕ ЗА ${timeLeft}` : "Начать бронирование"}
										</span>
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Компактное меню (свёрнуто) – без кнопки разворачивания */}
			{isCompact && (
				<div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1a1a2e]/90 backdrop-blur-md border-t border-[#3d3d5d] p-1 shadow-2xl">
					<div className="max-w-7xl mx-auto flex items-center justify-between">
						<div className="flex overflow-x-auto pb-1">
							{compactItems.map((item) => {
								// Определяем стили для кнопки Бронь отдельно
								let buttonClasses = "flex flex-col items-center min-w-[40px] transition-all duration-200 ";
								if (item.id === 7) {
									// Кнопка Бронь
									if (item.active) {
										buttonClasses += "bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] text-white shadow-lg shadow-[#6d28d9]/50 border-2 border-[#8b5cf6]";
									} else {
										buttonClasses += "opacity-20 text-gray-400 cursor-not-allowed";
									}
								} else {
									// Остальные кнопки
									buttonClasses += item.active
										? 'text-white drop-shadow-[0_0_12px_rgba(255,255,255,1)]'
										: 'text-gray-400 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] hover:scale-110';
								}
								return (
									<button
										key={item.id}
										onClick={item.onClick || (() => {
											onStepClick(item.id)}
										)}
										title={item.label}
										className={buttonClasses}
									>
										<span className="w-5 h-5">{item.icon}</span>
										<span className="text-xs mt-1">{item.label}</span>
										{item.pulse && (
											<span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
										)}
									</button>
								);
							})}
						</div>
					</div>
				</div>
			)}

			{/* Модалка для Info */}
			{showInfoModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
					<div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1f] rounded-xl border border-[#2d2d4d] p-6 max-w-md shadow-2xl">
						<h3 className="text-xl font-bold text-white mb-4">Информация о бронировании</h3>
						<div className="space-y-2 text-gray-300 text-sm mb-6">
							<p><span className="text-[#8b5cf6]">Фильм:</span> {reservation.film || 'не выбран'}</p>
							<p><span className="text-[#8b5cf6]">Зал:</span> {reservation.hall || 'не выбран'}</p>
							<p><span className="text-[#8b5cf6]">Дата и время:</span> {reservation.date} {reservation.time || ''}</p>
							<p><span className="text-[#8b5cf6]">Места:</span> {currentArrPlaces?.join(', ') || '—'}</p>
						</div>
						<button
							onClick={() => setShowInfoModal(false)}
							className="w-full px-4 py-2 bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] text-white rounded-lg font-medium hover:from-[#7c3aed] hover:to-[#a78bfa] transition-all"
						>
							Закрыть
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default Path;