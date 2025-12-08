import { useState } from "react";
import { ACTIVE_CLASS, PAST_CLASS, FUTURE_CLASS } from "../../constants/constants";

function Schedule({
	dataBase,
	indexActive,
	sessionList,
	reservation,
	handleClickDate,
	handleClickSession
}) {

	return (
		<div className='w-full'>
			<div className="text-center">
				<div className="flex gap-3 overflow-x-auto pb-3 date-scrollbar">
					{
						dataBase.map((item, index) => {
							const isActive = indexActive === index;
							const isPast = indexActive > index;
							const i = index
							return (
								<div
									key={`${item.day} ${item.month} ${item.year}/dataitem`}
									onClick={() => handleClickDate(item, index)}
									className={`
										flex-shrink-0 min-w-[70px] md:min-w-[80px] flex flex-col items-center justify-center 
										rounded-xl py-3 transition-all duration-200 cursor-pointer
										${isActive ? ACTIVE_CLASS : isPast ? PAST_CLASS : FUTURE_CLASS}
										${!isPast && !isActive ? 'hover:scale-[1.02] hover:border-[#6d28d9]/50 hover:shadow hover:shadow-[#6d28d9]/10' : ''}
									`}
								>
									{/* Индикатор активной даты */}
									{isActive && (
										<div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#8b5cf6] animate-pulse"></div>
									)}

									{/* День недели (если есть) */}
									{item.weekday && (
										<span className="text-xs text-gray-400 mb-1">{item.weekday}</span>
									)}

									{/* Число */}
									<span className="text-lg md:text-xl font-bold">{item.day}</span>

									{/* Месяц */}
									<span className="text-xs md:text-sm mt-1">{item.month}</span>

									{/* Год (если отображается) */}
									{item.year && (
										<span className="text-xs text-gray-400 mt-1">{item.year}</span>
									)}

									{/* Список сеансов внутри блока даты */}
									<div className={`mt-3 ${sessionList?.length === 0 ? 'h-0' : ''}`}>
										{
											sessionList.map((el, index) => {
												return (
													<button
														key={`${index}${index}/sessions`}
														onClick={(e) => {
															e.stopPropagation(); // Останавливаем всплытие
															handleClickSession(item, el, i)
														}}
														className={`
															px-2 py-1 my-1 rounded text-xs font-medium
															bg-gradient-to-r from-[#1a1a2e] to-[#2d2d4d] 
															border border-[#3d3d5d] 
															text-gray-300 
															hover:from-[#6d28d9]/20 hover:to-[#8b5cf6]/20 
															hover:border-[#6d28d9]/50 hover:text-white 
															transition-all duration-200 cursor-pointer
															${reservation.film === '' ? 'hidden' : ''}
														`}
													>
														{el}:00
													</button>
												)
											})
										}
									</div>
								</div>
							)
						})
					}
				</div>

				{/* Сообщение, если нет сеансов */}
				{sessionList?.length === 0 && reservation.film && (
					<div className="mt-4 bg-[#1a1a2e]/50 rounded-lg border border-[#2d2d4d] p-4">
						<div className="flex flex-col items-center justify-center py-2">
							<svg className="w-8 h-8 text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<p className="text-gray-400 text-center text-sm">
								На выбранную дату нет доступных сеансов
							</p>
						</div>
					</div>
				)}

				{/* Сообщение, если не выбран фильм */}
				{!reservation.film && (
					<div className="mt-4 bg-[#1a1a2e]/50 rounded-lg border border-[#2d2d4d] p-4">
						<div className="flex flex-col items-center justify-center py-2">
							<svg className="w-8 h-8 text-[#8b5cf6] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
							</svg>
							<p className="text-gray-300 text-center text-sm mb-1">Сначала выберите фильм</p>
							<p className="text-gray-400 text-center text-xs">
								Чтобы увидеть доступные сеансы, выберите фильм из списка
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Schedule