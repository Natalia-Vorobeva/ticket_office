// CinemaHall.jsx (без слова ЭКРАН)
function CinemaHall({
	modalState,
	ticket,
	id,
	reservation,
	currentDbPlaces,
	units,
	serialNumber,
	activeDate,
	overlay,
	hallInfo,
	activeHall,
	openModalPlaces,
	currentArrPlaces,
	setCurrentArrPlaces,
	hideHeader = false
}) {
	const place = (e, data) => {
		const unit = e.target
		const state = currentArrPlaces.includes(data)
		if (state) {
			unit.classList.remove('bg-gradient-to-br', 'from-[#6d28d9]', 'to-[#8b5cf6]', 'border', 'border-[#8b5cf6]')
			unit.classList.add('bg-gradient-to-br', 'from-blue-500', 'to-blue-700', 'border', 'border-blue-400')
			setCurrentArrPlaces(prev => prev.filter(el => el !== data))
		} else {
			unit.classList.remove('bg-gradient-to-br', 'from-blue-500', 'to-blue-700', 'border', 'border-blue-400')
			unit.classList.add('bg-gradient-to-br', 'from-[#6d28d9]', 'to-[#8b5cf6]', 'border', 'border-[#8b5cf6]')
			setCurrentArrPlaces(prev => [...prev, data])
		}
	}

	return (
		<section
			id={id}
			className={`relative bg-gradient-to-b from-[#0f0f1f] to-[#1a1a2e] rounded-xl border border-[#2d2d4d] p-3 mb-4 shadow-md shadow-black/20 ${activeHall == id ? '' : 'hidden'}`}
		>
			{(hallInfo || ticket) && (
				<div className="absolute z-10 inset-0 bg-black opacity-50 rounded-xl"></div>
			)}
			{overlay && (
				<div
					onClick={() => reservation.film !== "" && reservation.day !== null && openModalPlaces(units, serialNumber)}
					className="absolute z-[5] inset-0 cursor-pointer"
				></div>
			)}

			{/* Экран (без текста) */}
			<div className="relative mb-4">
				<div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent"></div>
				<div className="bg-gradient-to-r from-[#00d4ff]/10 to-[#0891b2]/10 border border-[#00d4ff]/30 rounded-t-lg py-2 px-4 backdrop-blur-sm">
					<div className="flex items-center justify-center gap-1">
						{[...Array(15)].map((_, i) => (
							<div
								key={i}
								className="w-0.5 h-2 bg-gradient-to-b from-[#00d4ff] to-[#0891b2] animate-pulse"
								style={{ animationDelay: `${i * 0.05}s` }}
							></div>
						))}
					</div>
				</div>
			</div>

			{/* Легенда (с текстом) */}
			<div className="flex flex-wrap justify-center gap-2 mb-4 p-2 bg-[#1a1a2e]/50 rounded border border-[#2d2d4d] text-xs text-gray-300">
				<div className="flex items-center gap-1">
					<div className="w-3 h-3 md:w-4 md:h-4 rounded bg-gradient-to-br from-blue-500 to-blue-700 border border-blue-400"></div>
					<span>Свободно</span>
				</div>
				<div className="flex items-center gap-1">
					<div className="w-3 h-3 md:w-4 md:h-4 rounded bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6] border border-[#8b5cf6]"></div>
					<span>Выбрано</span>
				</div>
				<div className="flex items-center gap-1">
					<div className="w-3 h-3 md:w-4 md:h-4 rounded bg-gradient-to-br from-gray-600 to-gray-800 border border-gray-500"></div>
					<span>Занято</span>
				</div>
				<div className="flex items-center gap-1">
					<div className="w-3 h-3 md:w-4 md:h-4 rounded bg-gradient-to-br from-amber-500 to-amber-700 border border-amber-400"></div>
					<span>VIP</span>
				</div>
			</div>

			{/* Сетка мест */}
			<div className="grid grid-cols-10 gap-1 border-t-2 border-t-blue pt-2">
				{units &&
					Array.from({ length: units }).map((_, index) => {
						let seatClass = "w-6 h-6 md:w-7 md:h-7 rounded flex items-center justify-center transition-all duration-200 cursor-pointer text-white text-xs font-medium ";
						let isBooked = false;
						let isSelected = currentArrPlaces.includes(index + 1);
						let isVip = index < 30;

						currentDbPlaces?.forEach(function (elem) {
							if (elem == index + 1) {
								isBooked = true;
							}
						});

						if (isBooked) {
							seatClass += "bg-gradient-to-br from-gray-600 to-gray-800 border border-gray-500 cursor-not-allowed pointer-events-none ";
						} else if (isSelected) {
							seatClass += "bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6] border border-[#8b5cf6] ";
						} else if (isVip) {
							seatClass += "bg-gradient-to-br from-amber-500 to-amber-700 border border-amber-400 hover:scale-105 ";
						} else {
							seatClass += "bg-gradient-to-br from-blue-500 to-blue-700 border border-blue-400 hover:scale-105 ";
						}

						return (
							<button
								key={`${index}/cinemahallitem/${serialNumber}`}
								id={`${index + 1}/cinemahallitem/${serialNumber}`}
								onClick={(e) => place(e, index + 1)}
								className={seatClass}
								disabled={isBooked || ticket || hallInfo}
							>
								{index + 1}
							</button>
						)
					})
				}
			</div>

			<div className="flex justify-center mt-3 mb-1">
				<div className="w-2/3 h-0.5 bg-gradient-to-r from-transparent via-[#3d3d5d] to-transparent"></div>
			</div>

			{!ticket && !hallInfo && !modalState && (
				<div className="mt-3 text-center">
					<button
						onClick={() => openModalPlaces(units, serialNumber)}
						disabled={!reservation.film || !reservation.day || !reservation.hour || !activeDate}
						className={`
							relative px-5 py-2 rounded-lg font-medium text-sm
							transition-all duration-300 transform hover:scale-[1.02]
							shadow shadow-[#6d28d9]/30 hover:shadow-[#6d28d9]/40
							disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
							disabled:hover:shadow-[#6d28d9]/30
							group overflow-hidden
							${!reservation.film || !reservation.day || !activeDate
								? 'bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 border border-gray-500'
								: 'bg-gradient-to-r from-[#6d28d9] via-[#8b5cf6] to-[#a78bfa] text-white border border-[#8b5cf6]/50'
							}
						`}
					>
						<div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#a78bfa] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						<div className="relative z-[10] flex items-center justify-center gap-2">
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
							</svg>
							<span className="font-medium">
								Выбрать места
								{currentArrPlaces.length > 0 && (
									<span className="ml-1 bg-white/20 px-2 py-0.5 rounded-full text-xs">
										{currentArrPlaces.length} выбрано
									</span>
								)}
							</span>
							<svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
							</svg>
						</div>
					</button>

					{(!reservation.film || !reservation.day) && (
						<div className="mt-2 flex items-center justify-center gap-1 text-xs text-amber-400/80">
							<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<span>Сначала выберите фильм и время сеанса</span>
						</div>
					)}
				</div>
			)}
		</section>
	)
}

export default CinemaHall;