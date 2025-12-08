function ListFilms({ handleClickFilms, ticket, films, selectFilmModal, setSelectFilmModal }) {
	const handleChoiceModal = (item, hall) => {
		setSelectFilmModal(false)
		handleClickFilms(item, hall)
	}

	const handleChoice = (item) => {
		handleClickFilms(item)
	}

	return (
		<div className="flex-1">
			{/* Модальное окно выбора фильма с залом */}
			{selectFilmModal && (
				<div onClick={() => setSelectFilmModal(false)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
					<div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-6xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1f] rounded-xl border border-[#2d2d4d] shadow-lg shadow-black/40">
						{/* Заголовок модалки */}
						<div className="sticky top-0 bg-[#1a1a2e] border-b border-[#2d2d4d] p-4 z-10">
							<div className="flex items-center justify-between">
								<div>
									<h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
										Выберите фильм
									</h2>
									<p className="text-gray-400 mt-1 text-xs md:text-sm">Выберите фильм и зал для просмотра</p>
								</div>
								<button
									onClick={() => setSelectFilmModal(false)}
									className="p-1.5 rounded-lg hover:bg-[#2d2d4d] transition-colors duration-200"
									aria-label="Закрыть"
								>
									<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
						</div>

						{/* Содержимое модалки */}
						<div className="p-3 md:p-4">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
								{films.halls_films?.map((hallFilms, hallIndex) => {
									const hallNumber = hallIndex + 1
									return (
										<div
											key={`hall-${hallNumber}`}
											className="bg-[#0f0f1f]/50 rounded-lg border border-[#2d2d4d] p-3 hover:border-[#6d28d9]/50 transition-all duration-300"
										>
											<div className="flex items-center gap-2 mb-3">
												<div className="w-6 h-6 flex items-center justify-center rounded bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6]">
													<span className="text-xs font-bold">{hallNumber}</span>
												</div>
												<h3 className="text-sm md:text-base font-semibold text-gray-200">Зал {hallNumber}</h3>
											</div>

											<div className="space-y-2">
												{hallFilms?.map((film, filmIndex) => (
													<div
														key={`${filmIndex}-film`}
														className="group p-2 rounded border border-transparent hover:border-[#6d28d9]/30 hover:bg-[#1a1a2e]/50 transition-all duration-200"
													>
														<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
															<div className="flex-1 min-w-0">
																<p
																	className="text-gray-200 text-xs md:text-sm font-medium group-hover:text-white transition-colors duration-200 break-words leading-relaxed"
																>
																	{film}
																</p>
															</div>
															<button
																onClick={() => handleChoiceModal({ film, hall: hallNumber })}
																className="px-2 py-1 bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] text-white rounded text-xs font-medium hover:from-[#7c3aed] hover:to-[#a78bfa] transition-all duration-200 shadow shadow-[#6d28d9]/20 whitespace-nowrap self-start sm:self-center mt-1 sm:mt-0"
															>
																Выбрать
															</button>
														</div>
													</div>
												))}
											</div>
										</div>
									)
								})}
							</div>
						</div>

						{/* Футер модалки */}
						<div className="sticky bottom-0 bg-[#1a1a2e] border-t border-[#2d2d4d] p-3">
							<div className="flex justify-end">
								<button
									onClick={() => setSelectFilmModal(false)}
									className="px-3 py-1.5 bg-transparent border border-gray-600 text-gray-300 rounded hover:bg-gray-800/50 hover:text-white transition-all duration-200 text-xs md:text-sm font-medium"
								>
									Закрыть
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Основной блок списка фильмов */}
			<div className="h-full">
				<div className="bg-[#1a1a2e]/50 backdrop-blur-sm rounded-xl border border-[#2d2d4d] p-4 shadow shadow-black/10 h-full">
					{/* Заголовок */}
					<div className="flex items-center gap-2 mb-4">
						<div className="w-2 h-6 rounded-full bg-gradient-to-b from-[#6d28d9] to-[#8b5cf6]"></div>
						<h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
							Выберите фильм
						</h2>
					</div>

					{/* Список фильмов */}
					<div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
						{films.films?.map((item, index) => (
							<div
								key={`${index}-film`}
								className="group p-2 md:p-3 rounded border border-transparent hover:border-[#6d28d9]/30 hover:bg-gradient-to-r hover:from-[#1a1a2e] hover:to-[#2d2d4d]/50 transition-all duration-200 cursor-pointer"
								onClick={() => handleChoice({ film: item })}
							>
								<div className="flex items-center gap-2 md:gap-3">
									<div className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded bg-[#2d2d4d] group-hover:bg-gradient-to-br group-hover:from-[#6d28d9] group-hover:to-[#8b5cf6] transition-all duration-200 flex-shrink-0">
										<svg className="w-3 h-3 md:w-4 md:h-4 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
										</svg>
									</div>
									<div className="flex-1 min-w-0">
										<p
											className="text-gray-300 group-hover:text-white text-xs md:text-sm font-medium transition-colors duration-200 break-words leading-relaxed line-clamp-2"
										>
											{item}
										</p>
									</div>
									<svg className="w-3 h-3 md:w-4 md:h-4 text-gray-600 group-hover:text-[#8b5cf6] transition-colors duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
									</svg>
								</div>
							</div>
						))}
					</div>

					{/* Кнопка "Больше..." или "ВАШ БИЛЕТ:" */}
					<div className="mt-6 pt-4 border-t border-[#2d2d4d]">
						<button
							onClick={() => setSelectFilmModal(true)}
							className="group w-full p-3 rounded-lg bg-gradient-to-r from-[#1a1a2e] to-[#2d2d4d] border border-[#3d3d5d] hover:border-[#6d28d9] hover:from-[#6d28d9]/10 hover:to-[#8b5cf6]/10 transition-all duration-300 flex items-center justify-between"
						>
							<div className="flex items-center gap-2">
								<div className="w-8 h-8 rounded bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6] flex items-center justify-center">
									<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
									</svg>
								</div>
								<div className="text-left">
									<span className="text-base font-bold bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] bg-clip-text text-transparent">
										{ticket ? "ВАШ БИЛЕТ" : "Больше вариантов..."}
									</span>
									<p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
										{ticket ? "Посмотреть ваш билет" : "Выбрать фильм по залу"}
									</p>
								</div>
							</div>
							<svg className="w-5 h-5 text-gray-500 group-hover:text-[#8b5cf6] transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ListFilms