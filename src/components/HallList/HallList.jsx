function HallList({
	visibleHall,
	reservation
}) {

	return (
			<h4 className=' text-[1rem] italic'> Выбрать зал:
				<p onClick={() => visibleHall(1)} className={` ${reservation.hall == 1 ? 'underline' : 'cursor-pointer'}`}>Зал 1</p>
				<p onClick={() => visibleHall(2)} className={` ${reservation.hall == 2 ? 'underline' : 'cursor-pointer'}`}>Зал 2</p>
			</h4>
	)
}

export default HallList