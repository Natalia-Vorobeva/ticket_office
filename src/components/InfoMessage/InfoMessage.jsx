function InfoMessage({
	info, 
	infoPast
}) {

	return (
		<div className={`h-6 text-red-500`}>{infoPast} {info}</div>
	)
}

export default InfoMessage