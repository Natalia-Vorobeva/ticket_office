import React, { useEffect } from "react";
import CinemaHall from "../CinemaHall/CinemaHall";

function Modal({
	units,
	hallInfo,
	serialNumber,
	currentArrPlaces,
	handleCloseModal,
	openModalPlaces,
	setCurrentArrPlaces,
	overlay,
	currentDbPlaces,
	reservation,
	modalState
}) {
	useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === 'Escape') handleCloseModal();
		};
		window.addEventListener('keydown', handleEsc);
		return () => window.removeEventListener('keydown', handleEsc);
	}, [handleCloseModal]);

	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) handleCloseModal();
	};

	const noSelectedPlaces = currentArrPlaces?.length === 0;

	return (
		<section
			onClick={handleOverlayClick}
			className="flex justify-center items-center fixed z-50 inset-0 w-full h-screen bg-black/90 backdrop-blur-sm"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="relative z-10 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900/95 rounded-xl shadow-2xl border border-gray-700"
			>				
				<div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800 sticky top-0 z-10">
					<h3 className="text-xl font-bold text-white">Выбор мест</h3>
					<button
						onClick={handleCloseModal}
						className="text-gray-300 hover:text-white text-lg font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
					>
						✕ Закрыть
					</button>
				</div>
				<div className="p-4 sm:p-6">
					<CinemaHall
						className="w-full max-w-3xl mx-auto"
						hallInfo={hallInfo}
						overlay={overlay}
						reservation={reservation}
						units={units}
						handleCloseModal={handleCloseModal}
						currentDbPlaces={currentDbPlaces}
						currentArrPlaces={currentArrPlaces}
						setCurrentArrPlaces={setCurrentArrPlaces}
						serialNumber={serialNumber}
						openModalPlaces={openModalPlaces}
						modalState={modalState}
						hideHeader={true} 
					/>
					<div className="mt-6 pt-4 border-t border-gray-700">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
							<div className="flex items-center gap-2">
								<div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
									<span className="text-white font-bold">{serialNumber}</span>
								</div>
								<h4 className="text-base font-semibold text-white">Зал {serialNumber}</h4>
							</div>
							<div className="flex items-center gap-3">
								<span className="text-sm text-gray-300">
									Выбрано: <span className="text-amber-400 font-bold">{currentArrPlaces?.length || 0}</span>
								</span>
								{currentArrPlaces?.length > 0 && (
									<span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
										{currentArrPlaces.join(', ')}
									</span>
								)}
							</div>
						</div>
					</div>
					<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
						<button
							onClick={handleCloseModal}
							className="px-5 py-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg border border-gray-600 hover:border-gray-500 flex-1 sm:flex-none text-sm"
						>
							Отмена
						</button>
						<button
							onClick={handleCloseModal}
							disabled={noSelectedPlaces}
							className={`px-5 py-2 font-bold rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 flex-1 sm:flex-none text-sm ${
								noSelectedPlaces
									? 'bg-gray-600 text-gray-400 cursor-not-allowed'
									: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-green-900/30'
							}`}
						>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
							</svg>
							СОХРАНИТЬ ВЫБОР
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Modal;