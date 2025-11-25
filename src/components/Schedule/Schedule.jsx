import { ACTIVE_CLASS, PAST_CLASS,  FUTURE_CLASS } from "../../constants/constants";

function Schedule({
	dataBase,
	indexActive,
	sessionList,
	reservation,
	handleClickDate,
	handleClickSession
}) {

	return (
		<div className='w-full flex justify-center gap-3 flex-wrap-reverse text-center'>
			{
				dataBase.map((item, index) => {
					const i = index
					const currData = { day: item.day, month: item.month, year: item.year, weekDay: item.day_week }

					return <div key={`${item.day} ${item.month} ${item.year} /dataitem`}>
						<div key={`${item.day}${item.month}${item.year}/dataitem`}
							onClick={() => handleClickDate(item, index)}
							className={`${indexActive === index ? ACTIVE_CLASS : indexActive > index ? PAST_CLASS : FUTURE_CLASS} min-w-[3rem] flex flex-col`}>{item.day}
							<span className='pb-4'>{item.month} </span>
							<div>
								{
									sessionList?.map((item, index) => {
										return <p key={`${index}/sessions`}
											onClick={() => handleClickSession(item, currData, i)}
											className={`${reservation.film === '' && 'opacity-0'} `}>{item.time}:00</p>
									})
								}
							</div>
						</div>
					</div>
				})
			}
		</div>
	);
}

export default Schedule