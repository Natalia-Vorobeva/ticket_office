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

	useEffect(() => {
		const checkWidth = () => {
			if (window.innerWidth <= 450) {
				setIsCompact(true);
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

	const steps = [
		{ id: 1, title: "Фильм", value: reservation.film || "Не выбран", isCompleted: selectedFilm },
		{ id: 2, title: "Дата", value: reservation.date ? `${reservation.date} ${reservation.time}` : "Не выбрана", isCompleted: selectedDate },
		{ id: 3, title: "Зал", value: reservation.hall ? `Зал ${reservation.hall}` : "Не выбран", isCompleted: selectedHall },
		{ id: 4, title: "Места", value: selectedPlace ? `${currentArrPlaces.length} мест` : "Не выбраны", isCompleted: selectedPlace },
	];

	// SVG-иконки из меню App
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

	const compactItems = [
		{ id: 1, icon: iconMap.film, label: "Фильм", active: selectedFilm },
		{ id: 2, icon: iconMap.date, label: "Дата", active: selectedDate },
		{ id: 3, icon: iconMap.hall, label: "Зал", active: selectedHall },
		{ id: 4, icon: iconMap.time, label: "Время", active: reservation.hour },
		{ id: 5, icon: iconMap.info, label: "Инфо", onClick: () => setShowInfoModal(true) },
		{ id: 6, icon: iconMap.book, label: "Бронь", active: allStepsCompleted, pulse: allStepsCompleted, onClick: allStepsCompleted ? handleBookSeats : () => { } },
	];

	return (
		<>
			{/* Полная панель (развёрнута) */}
			{!isCompact && (
				<div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1a1a2e]/90 backdrop-blur-md border-t border-[#3d3d5d] p-1 shadow-2xl">
					<div className="max-w-7xl mx-auto">
						<div className="flex flex-col md:flex-row items-center">
							<div className="flex-1 flex justify-around w-full md:w-auto">
								{steps.map((step) => (
									<button
										key={step.id}
										onClick={() => onStepClick(step.id)}
										title="Кликните, чтобы перейти к этому шагу"
										className={`flex flex-col items-center rounded-lg transition-colors ${step.isCompleted ? 'text-white font-bold' : 'text-gray-400'} hover:bg-[#2d2d4d] p-1`}
									>
										<span className="text-xs text-gray-400">Шаг {step.id}</span>
										<span className="text-sm font-medium">{step.title}</span>
										<span className="text-xs truncate max-w-[100px]">{step.value}</span>
									</button>
								))}
							</div>
							<div className="flex items-center">
								{allStepsCompleted && (
									<button
										onClick={handleBookSeats}
										disabled={!allStepsCompleted}
										className={`px-6 py-2 rounded-lg font-bold transition-all whitespace-nowrap bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] text-white hover:scale-105 shadow-lg shadow-[#6d28d9]/50`}
									>
										{ticket ? `ПОДТВЕРДИТЕ ЗА ${timeLeft}` : "Начать бронирование"}
									</button>
								)}
								{/* Кнопка свернуть показываем только если ширина > 450px */}
								{window.innerWidth > 450 && (
									<button
										onClick={() => setIsCompact(true)}
										className="rounded-lg bg-[#2d2d4d] text-gray-300 hover:bg-[#3d3d5d] ml-2 p-2"
										title="Свернуть"
									>
										▼
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Компактное меню (свёрнуто) */}
			{isCompact && (
				<div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1a1a2e]/90 backdrop-blur-md border-t border-[#3d3d5d] p-1 shadow-2xl">
					<div className="max-w-7xl mx-auto flex items-center justify-between">
						<div className="flex overflow-x-auto pb-1 gap-2">
							{compactItems.map((item) => (
								<button
									key={item.id}
									onClick={item.onClick || (() => onStepClick(item.id))}
									title={item.label}
									className={`flex flex-col items-center rounded-lg min-w-[40px] transition-colors relative ${item.active ? 'bg-[#2d2d4d] text-white' : 'text-gray-400 hover:bg-[#2d2d4d]/50'
										}`}
								>
									<span className="w-5 h-5">{item.icon}</span>
									<span className="text-xs mt-1">{item.label}</span>
									{item.pulse && (
										<span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
									)}
								</button>
							))}
						</div>
						{window.innerWidth > 450 && (
							<button
								onClick={() => setIsCompact(false)}
								className="rounded-lg bg-[#2d2d4d] text-gray-300 hover:bg-[#3d3d5d] ml-2 p-2"
								title="Развернуть"
							>
								▲
							</button>
						)}
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