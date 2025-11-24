import CinemaHall from "../CinemaHall/CinemaHall";

function Modal({ 
	units, 
	serialNumber, 
	currentArrPlaces, 
	handleCloseModal, 
	openModalPlaces, 
	setArrCurrentPlaces, 
	currentDbPlaces }) {

	return (
		<section className="flex justify-center items-center absolute z-12 inset-0 w-full h-full bg-green-600 ">

			<div className="relative z-3 w-3/4 bg-white opacity-100">	
			<p onClick={handleCloseModal} className="text-green-600 border-b-2 border-b-green-600 cursor-pointer">Закрыть</p>	
				<p className='text-white text-[.6rem] text-center pt-2' onClick={handleCloseModal}>СОХРАНИТЬ</p>
				<CinemaHall className="w-[40%] mx-auto"
					units={units} handleCloseModal={handleCloseModal} currentDbPlaces={currentDbPlaces} currentArrPlaces={currentArrPlaces} setArrCurrentPlaces={setArrCurrentPlaces} serialNumber={serialNumber} openModalPlaces={openModalPlaces}
				/>
				<h2 className="text-green-600 text-center text-[1.1rem]">Зал {serialNumber}</h2>					
				<div
					className="bg-green-white pt-4 flex flex-col  hover:scale-1.2 ">
					<div className='flex gap-1 h-[1.3rem]  min-w-[10rem] justify-center pb-4'>
						{
							currentArrPlaces?.map((item, index) => {
								return <p key={`${item}/current-places/${index}`}
									className='text-[.6rem] font-bold text-orange'>{item}</p>
							})
						}
					</div>
					<p className='text-white text-[.6rem] bg-green-600 text-center py-2 cursor-pointer' onClick={handleCloseModal}>СОХРАНИТЬ</p>
				</div>
			</div>
		</section>
	)
}

export default Modal 