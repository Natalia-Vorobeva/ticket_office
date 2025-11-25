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
		<div className="py-2 w-2/5 text-[1.8rem]">
			{
				selectFilmModal ?
					<section className='absolute z-10 inset-0 pt-2 w-[100%] text-[1rem] min-h-full bg-[#000] flex flex-col text-[.5rem] p-1 rounded-md'>
						<p className='font-medium pt-4 pb-10 text-[2rem]'>Выберите фильм</p>

						{
							FILMS?.map((item, index) => {
								return <div key={`${index}/films`}
									onClick={() => handleClickFilms(item)}
									className="w-full text-orange flex gap-2 border-b">
									<p>{item}</p>
									<span onClick={() => handleChoice(item)} className="ml-8 pb-2 text-white cursor-pointer">Выбрать</span>
								</div>
							})
						}
						<div className='pt-[2rem] pr-[1rem] flex justify-end'>
							<p className="cursor-pointer inline" onClick={() => setSelectFilmModal(false)}>Закрыть</p>
						</div>

					</section>
					:
					null
			}
			<div className="pb-[1rem]">
				<div className="text-ellipsis line-clamp-6 text-[1.2rem]">
					{
						FILMS?.map((item, index) => {
							return <div key={`${index}/films`}
								className="">
								<p className="inline cursor-pointer hover:text-blue"
									onClick={() => handleClickFilms(item)}>{item}</p>
							</div>
						})
					}
				</div>
				<div className="relative z-1">
					<p onClick={() => setSelectFilmModal(true)}
						className="relative z-1 text-orange pt-[1rem] cursor-pointer text-[1.5rem] italic font-poppins">{ticket ? "ВАШ БИЛЕТ:" : "Все фильмы..."}</p>
				</div>
			</div>
		</div>
	)
}

export default ListFilms