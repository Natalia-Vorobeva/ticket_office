function CinemaHall({ 
	reservation, 
	currentDbPlaces, 
	units, 
	serialNumber, 
	className, 
	overlay, 
	openModalPlaces, 
	currentArrPlaces, 
	setArrCurrentPlaces 
}) {

	let elems = currentArrPlaces
	const place = (e, data) => {
		const unit = e.target
		const state = elems.includes(data)
		if (state) {
			unit.classList.remove('bg-orange')
			elems.filter(el => el !== data)
			setArrCurrentPlaces(prev => prev.filter(el => el !== data))
		} else {
			unit.className += " bg-orange"
			setArrCurrentPlaces(prev => [...prev, data])
		}
	}

	return (
		<section className={`relative ${className}`}>
			{
				 overlay && <div onClick={() => reservation.film !=="" && reservation.date !=="" && openModalPlaces(units, serialNumber)}
					className="absolute z-5 inset-0"></div>
			}
			<div className="grid grid-cols-10 border-t-2 border-t-blue mt-2 shadow-custom-inset">
				{units &&
					Array.from({ length: units }).map((_, index) => {
						let bg = ''
						currentDbPlaces !== undefined &&
						currentDbPlaces.forEach(function (elem) {
							elem == index + 1 ? bg = 'bg-silver-500 pointer-events-none' : ''
						})
						currentArrPlaces.forEach(function (elem) {
							elem == index + 1 ? bg = 'bg-silver-400' : ''
						})
						return <p key={`${index}/cinemahallitem/${serialNumber}`} id={`${index + 1}/cinemahallitem/${serialNumber}`}
							onClick={(e) => place(e, index + 1)}
							className={`cursor-pointer border-b border-r text-[.5rem] text-center ${overlay ? 'text-white' : 'text-black text-center'}  ${overlay ? '' : 'text-black text-center'} ${bg}`}>{index + 1}</p>
					})
				}
			</div>
		</section >
	)
}

export default CinemaHall