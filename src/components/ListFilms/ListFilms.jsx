// import './Contacts.scss';

import { useState } from "react"
import { FILMS } from "../../constants/constants.js"


function ListFilms({ handleClickFilms, ticket }) {

	const [selectFilmModal, setSelectFilmModal] = useState(false)

	const handleChoice = (item) => {
		setSelectFilmModal(false)
		handleClickFilms(item)
	}

	return (
		<div className="flex flex-col py-2 mt-8 w-3/5 text-[1.8rem]">
			{
				selectFilmModal ?
					<section className='absolute z-10 inset-0 mt-2 w-[100%] text-[1rem] min-h-full bg-[#000] flex flex-col text-[.5rem] p-1 rounded-md'>
						<p className='font-medium text-[2rem]'>Выберите фильм</p>
						<p className='text-end  mt-[-2rem]  pb-[1rem] pr-[1rem]' onClick={() => setSelectFilmModal(false)}>Закрыть</p>
						{
							FILMS?.map((item, index) => {
								return <p key={`${index}/films`}
									onClick={() => handleClickFilms(item)}
									className="w-full text-orange cursor-pointer">{item}
									<span onClick={() => handleChoice(item)} className="pl-8 text-white">Выбрать</span></p>
							})
						}
					</section>
					:
					null
			}
			<div className="flex flex-col pb-[1rem]">
				<div className="w-full text-ellipsis line-clamp-6 text-[1.2rem]">
					{
						FILMS?.map((item, index) => {
							return <p key={`${index}/films`}
								onClick={() => handleClickFilms(item)}
								className="w-full cursor-pointer">{item}</p>
						})
					}
				</div>
				<div className="relative z-1">
					<p onClick={() => { setSelectFilmModal(true) }}
						className="relative z-1 text-orange pt-[1rem] cursor-pointer text-[1.5rem] italic">{ticket ? "ВАШ БИЛЕТ:" : "Все фильмы..."}</p>
				</div>
			</div>
		</div>
	)
}

export default ListFilms