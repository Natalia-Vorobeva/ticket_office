import { useState, useEffect } from "react";
import Ticket from "../Ticket/Ticket";

function Path({
	selectedFilm,
	selectedHall,
	reservation,
	selectedDate,
	selectedPlace,
	currentArrPlaces,
	handleBookSeats,
	ticket,
	expiresAt,
	showConfirmInfo,
	setShowConfirmInfo
}) {

	const time = reservation.date + " , " + reservation.time;
	const [timeLeft, setTimeLeft] = useState('');

	const steps = [
		{
			id: 1,
			title: "Фильм",
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
				</svg>
			),
			isActive: selectedFilm,
			isCompleted: selectedFilm,
			isAvailable: true,
			value: reservation.film || "Не выбран",
			colorClass: selectedFilm ? "text-white" : "text-gray-400",
			bgClass: selectedFilm ? "bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6]" : "bg-[#1a1a2e]",
			borderClass: selectedFilm ? "border-[#8b5cf6]" : "border-[#2d2d4d]",
			showValue: true
		},
		{
			id: 2,
			title: "Зал",
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
				</svg>
			),
			isActive: selectedHall,
			isCompleted: selectedHall,
			isAvailable: reservation.film !== "" && reservation.date !== "" && reservation.time !== "",
			value: reservation.hall ? `Зал ${reservation.hall}` : "Не выбран",
			colorClass: selectedHall ? "text-white" : (reservation.date && reservation.time ? "text-gray-400" : "text-gray-600"),
			bgClass: selectedHall ? "bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6]" : "bg-[#1a1a2e]",
			borderClass: selectedHall ? "border-[#8b5cf6]" : "border-[#2d2d4d]",
			showValue: true
		},
		{
			id: 3,
			title: "Дата и время",
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
			),
			isActive: selectedDate,
			isCompleted: selectedDate,
			isAvailable: reservation.film !== "",
			value: reservation.date && reservation.time ? time : "Не выбраны",
			colorClass: selectedDate ? "text-white" : (reservation.film ? "text-gray-400" : "text-gray-600"),
			bgClass: selectedDate ? "bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6]" : "bg-[#1a1a2e]",
			borderClass: selectedDate ? "border-[#8b5cf6]" : "border-[#2d2d4d]",
			showValue: true
		},
		{
			id: 4,
			title: "Места",
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
				</svg>
			),
			isActive: selectedPlace,
			isCompleted: selectedPlace,
			isAvailable: reservation.hall !== "",
			value: selectedPlace ? `${currentArrPlaces.length} место(а): ${currentArrPlaces.join(", ")}` : "Не выбраны",
			colorClass: selectedPlace ? "text-white" : (reservation.hall ? "text-gray-400" : "text-gray-600"),
			bgClass: selectedPlace ? "bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6]" : "bg-[#1a1a2e]",
			borderClass: selectedPlace ? "border-[#8b5cf6]" : "border-[#2d2d4d]",
			showValue: true
		}
	];

	const allStepsCompleted = selectedFilm && selectedDate && selectedHall && selectedPlace;
	const completedStepsCount = steps.filter(step => step.isCompleted).length;

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

	const handleConfirmClick = () => {
		setShowConfirmInfo(true);
	};

	return (
		<div className="w-full bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1f] rounded-2xl border border-[#2d2d4d] p-6 shadow-2xl shadow-[#6d28d9]/10 relative">
			<div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
				<div className="flex items-center gap-4">
					<div className="relative">
						<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6] flex items-center justify-center">
							<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
							</svg>
						</div>
						<div className="absolute -top-2 -right-2 bg-[#8b5cf6] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
							{completedStepsCount}/4
						</div>
					</div>
					<div>
						<h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
							Путь бронирования
						</h3>
						<p className="text-gray-400 text-sm">Заполните все шаги для завершения бронирования</p>
					</div>
				</div>
				<div className="md:hidden w-full">
					<div className="flex justify-between text-sm text-gray-400 mb-2">
						<span>Прогресс</span>
						<span>{completedStepsCount} из 4 шагов</span>
					</div>
					<div className="h-2 bg-[#2d2d4d] rounded-full overflow-hidden">
						<div
							className="h-full bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] transition-all duration-500"
							style={{ width: `${(completedStepsCount / 4) * 100}%` }}
						></div>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
				{steps.map((step, index) => (
					<div
						key={step.id}
						className={`relative p-4 rounded-xl border transition-all duration-300 ${step.isCompleted
							? 'border-[#8b5cf6] bg-gradient-to-br from-[#1a1a2e] to-[#2d2d4d] shadow-lg shadow-[#6d28d9]/20'
							: step.isAvailable
								? 'border-[#3d3d5d] bg-[#1a1a2e] hover:border-[#6d28d9]/50 hover:shadow-lg hover:shadow-[#6d28d9]/10'
								: 'border-[#2d2d4d] bg-[#0f0f1f] opacity-70'
							}`}
					>
						{index < steps.length - 1 && (
							<>
								<div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-8 h-px bg-gradient-to-r from-[#3d3d5d] to-transparent"></div>
								<div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#3d3d5d]"></div>
								<div className={`hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${step.isCompleted ? 'bg-[#8b5cf6] animate-pulse' : ''
									}`}></div>
							</>
						)}
						<div className="flex items-center gap-3 mb-3">
							<div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.bgClass} ${step.borderClass} border-2`}>
								<div className={step.colorClass}>
									{step.isCompleted ? (
										<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
										</svg>
									) : (
										step.icon
									)}
								</div>
							</div>
							<div>
								<span className="text-xs text-gray-400">Шаг {step.id}</span>
								<h4 className={`font-bold ${step.isCompleted ? 'text-white' : 'text-gray-300'} md:text-[18px]`}>
									{step.title}
								</h4>
							</div>
						</div>
						<div className="mt-2">
							<div className={`text-sm ${step.isCompleted ? 'text-white' : 'text-gray-400'} truncate`} title={step.value}>
								{step.value}
							</div>
							{step.isCompleted && (
								<div className="flex items-center gap-1 mt-2">
									<div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></div>
									<span className="text-xs text-[#10b981]">Завершено</span>
								</div>
							)}
						</div>
					</div>
				))}
			</div>

			<div className="relative">
				{allStepsCompleted && !ticket && (
					<div className="absolute -inset-4 bg-gradient-to-r from-[#6d28d9]/10 to-[#8b5cf6]/10 rounded-2xl blur-xl"></div>
				)}

				<button
					onClick={ticket ? handleConfirmClick : handleBookSeats}
					disabled={!allStepsCompleted && !ticket}
					className={`
						relative w-full py-4 rounded-xl font-bold text-xl
						transition-all duration-300 transform hover:scale-[1.02] active:scale-95
						shadow-2xl
						${allStepsCompleted || ticket
							? 'bg-gradient-to-r from-[#6d28d9] via-[#8b5cf6] to-[#a78bfa] text-white shadow-[#6d28d9]/40 hover:shadow-[#6d28d9]/60'
							: 'bg-gradient-to-r from-[#1a1a2e] to-[#2d2d4d] text-gray-400 border border-[#2d2d4d] shadow-black/20 cursor-not-allowed'
						}
					`}
				>
					<div className="flex items-center justify-center gap-3">
						{ticket ? (
							<>
								<div className="relative">
									<svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									<div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
								</div>
								<span className="font-bold text-lg">
									ПОДТВЕРДИТЕ ЗА {timeLeft}
								</span>
							</>
						) : (
							<>
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
								</svg>
								<span>{allStepsCompleted ? "Начать бронирование" : "Заполните все шаги для бронирования"}</span>
							</>
						)}
					</div>
					{allStepsCompleted && !ticket && (
						<div className="absolute inset-0 rounded-xl border-2 border-white/20 animate-pulse pointer-events-none"></div>
					)}
					{ticket && (
						<>
							<div className="absolute inset-0 rounded-xl border-2 border-cyan-500/50 pointer-events-none animate-time-border"></div>
							<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 pointer-events-none animate-sweep"></div>
						</>
					)}
				</button>

				<div className="mt-4 text-center">
					{!allStepsCompleted && !ticket && (
						<p className="text-sm text-gray-400">
							Завершите все <span className="text-[#8b5cf6]">4 шага</span> выше для активации бронирования
						</p>
					)}
					{ticket && (
						<div className="mt-4 text-center">
							<p className="text-sm text-gray-300 mt-2">
								⏳ <span className="font-semibold text-cyan-300">Подтвердите бронь в течение 10 минут</span>
							</p>
						</div>
					)}
				</div>
			</div>

			{showConfirmInfo && (
				<Ticket
					handleBookSeats={handleBookSeats}
					reservation={reservation}
					currentArrPlaces={currentArrPlaces}
					setShowConfirmInfo={setShowConfirmInfo}
				/>
			)}
		</div>
	);
}

export default Path;