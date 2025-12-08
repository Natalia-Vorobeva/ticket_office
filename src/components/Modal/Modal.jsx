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
	reservation
}) {

	return (
		<section className="flex justify-center items-center absolute z-12 inset-0 w-[100%] h-[100vh] bg-green-600 ">
			<div className="relative z-3 w-4/5 bg-white opacity-100">
				<p onClick={handleCloseModal} className="text-green-600 border-b-2 border-b-green-600 cursor-pointer text-[1.5rem] p-1">Закрыть</p>
				<p className='text-white text-[.6rem] text-center pt-2' onClick={handleCloseModal}>СОХРАНИТЬ</p>
				<CinemaHall className="w-[80%] mx-auto" hallInfo={hallInfo} overlay={overlay} reservation={reservation}
					units={units} handleCloseModal={handleCloseModal} currentDbPlaces={currentDbPlaces} currentArrPlaces={currentArrPlaces} setCurrentArrPlaces={setCurrentArrPlaces} serialNumber={serialNumber} openModalPlaces={openModalPlaces}
				/>
				<h2 className="text-green-700 text-center pt-3 text-[1.2rem]">Зал {serialNumber}</h2>
				<div
					className="bg-green-white pt-4 flex flex-col  hover:scale-1.2 ">
					<div className='flex gap-1 min-w-[10rem] h-[1rem] justify-center pb-4 h-[4rem]'>
						{
							currentArrPlaces?.map((item, index) => {
								return <p key={`${item}/current-places/${index}`}
									className='text-[2rem] py-4 font-bold text-orange'>{item}</p>
							})
						}
					</div>
					<p className='text-white text-[1.1rem] bg-green-600 text-center py-2 cursor-pointer' onClick={handleCloseModal}>СОХРАНИТЬ</p>
				</div>
			</div>
		</section>
	)
}

export default Modal 