import InfoMessage from "../InfoMessage/InfoMessage"

function HallList({
	halls,
	visibleHall,
	reservation,
	info,
	listActiveHalls
}) {

	return (
		<div className="mb-4">
			<div className="flex items-center mb-2">
				<h4 className='text-lg md:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
					Выберите зал:
				</h4>
				<div className="flex flex-wrap pl-6  gap-1.5 mb-3">
					{
						halls.length &&
						Array.from({ length: halls.length }).map((_, index) => {
							const hallNumber = index + 1;
							const isActive = reservation.hall == hallNumber;
							const hasSessions = listActiveHalls?.includes(hallNumber);

							return (
								<button
									key={`${index}/hallitem/${hallNumber}`}
									id={`${hallNumber}/hallitem/${hallNumber}`}
									onClick={() => visibleHall(hallNumber)}
									className={`text-sm md:text-base font-medium px-3 py-1.5 rounded transition-all duration-200 cursor-pointer ${reservation.hall == hallNumber
										? 'bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] text-white shadow shadow-[#6d28d9]/30'
										: 'cursor-pointer hover:text-white text-gray-300 hover:bg-[#2d2d4d] bg-[#1a1a2e] border border-[#3d3d5d]'
										}`}
								>
									Зал {hallNumber}
								</button>
							)
						})
					}
				</div>
			</div>

			<InfoMessage info={info} />
		</div>
	)
}

export default HallList