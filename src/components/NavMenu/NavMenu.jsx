function NavMenu({
	isCollapsed,
	onToggle,
	onNavigate,
	filmsRef,
	dateRef,
	hallsRef,
	pathRef,
	selectedFilm,
	selectedDate,
	selectedHall,
	selectedPlace,
	allStepsCompleted,
	...props
}) {
	// const MvIcon = (props) => <svg {...props}>...</svg>;
	const steps = [
		{
			id: 'films',
			icon: props.MvIcon, 
			label: 'Фильм', ref: filmsRef, active: selectedFilm
		},
		{
			id: 'date',
			icon: props.CalendarIcon, 
			label: 'Дата', ref: dateRef, active: selectedDate
		},
		{
			id: 'hall',
			icon: props.HallIcon, 
			label: 'Зал', ref: hallsRef, active: selectedHall
		},
		{
			id: 'place',
			icon: props.SeatIcon, 
			label: 'Места', ref: pathRef, active: selectedPlace
		},
		{
			id: 'book',
			icon: props.BookIcon, 
			label: 'Бронь', ref: pathRef, active: allStepsCompleted, pulse: allStepsCompleted
		},
	];

	return (
		<div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isCollapsed ? 'w-12' : 'w-auto'} bg-[#1a1a2e]/80 backdrop-blur-md rounded-lg border border-[#3d3d5d] p-1 shadow-xl`}>
			<button onClick={onToggle} className="w-full flex items-center justify-center p-2 text-gray-400 hover:text-white">
				{isCollapsed ? '←' : '→'}
			</button>
			<div className={`flex flex-col gap-1 ${isCollapsed ? 'items-center' : ''}`}>
				{steps.map((step) => (
					<button
						key={step.id}
						onClick={() => onNavigate(step.ref)}
						className={`p-2 rounded-lg hover:bg-[#2d2d4d] text-white flex items-center gap-2 transition-colors relative ${isCollapsed ? 'justify-center' : 'justify-start'
							} ${step.active ? 'bg-[#2d2d4d]' : ''}`}
						title={step.label}
					>
						<step.icon className={`w-5 h-5 ${step.active ? 'text-[#8b5cf6]' : 'text-gray-400'}`} />
						{!isCollapsed && <span className="text-sm">{step.label}</span>}
						{step.pulse && (
							<span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
						)}
					</button>
				))}
			</div>
		</div>
	);
}

export default NavMenu