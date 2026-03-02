import React from 'react';

const ModalSelectFilm = ({ films, onSelect, onClose }) => {
	if (!films || !films.halls_films) return null;
	return (
		<section onClick={onClose} className="flex justify-center items-center fixed z-[999] inset-0 w-full h-screen bg-black/90 backdrop-blur-sm p-4">
			<div
				onClick={(e) => e.stopPropagation()}
				className="relative w-full max-w-6xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1f] rounded-xl border border-[#2d2d4d] shadow-lg shadow-black/40"
			>
				<div className="sticky bottom-0 bg-[#1a1a2e] border-t border-[#2d2d4d] p-3 z-10">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
								Выберите фильм
							</h2>
							<p className="text-gray-400 mt-1 text-xs md:text-sm">Выберите фильм и зал для просмотра</p>
						</div>
						<button
							onClick={onClose}
							className="p-1.5 rounded-lg hover:bg-[#2d2d4d] transition-colors duration-200"
							aria-label="Закрыть"
						>
							<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>

				<div className="p-3 md:p-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
						{films.halls_films?.map((hallFilms, hallIndex) => {
							const hallNumber = hallIndex + 1;
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
														onClick={() => onSelect({ film, hall: hallNumber })}
														className="px-2 py-1 bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] text-white rounded text-xs font-medium hover:from-[#7c3aed] hover:to-[#a78bfa] transition-all duration-200 shadow shadow-[#6d28d9]/20 whitespace-nowrap self-start sm:self-center mt-1 sm:mt-0"
													>
														Выбрать
													</button>
												</div>
											</div>
										))}
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<div className="sticky bottom-0 bg-[#1a1a2e] border-t border-[#2d2d4d] p-3">
					<div className="flex justify-end">
						<button
							onClick={onClose}
							className="px-3 py-1.5 bg-transparent border border-gray-600 text-gray-300 rounded hover:bg-gray-800/50 hover:text-white transition-all duration-200 text-xs md:text-sm font-medium"
						>
							Закрыть
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ModalSelectFilm;