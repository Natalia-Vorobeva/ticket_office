import { useState } from "react";
import { CITY_LIST } from "../../constants/cinemaСhain/cities/citiesConstants";
import Dropdown from "../Dropdown/Dropdown";

function Header({ handleClickCity, handleClickCinema, currentCinema, currentCity, cinemaList, ticket }) {

	const [isOpenCities, setIsOpenCities] = useState(false);
	const [isOpenCinema, setIsOpenCinema] = useState(false);

	const onClickCity = (city) => {
		setIsOpenCities(false);
		handleClickCity(city);
	};

	const toggleDropdownCity = () => {
		setIsOpenCities(!isOpenCities);
		setIsOpenCinema(false);
	};

	const onClickCinema = (city) => {
		setIsOpenCinema(false)
		handleClickCinema(city)
	}

	const toggleDropdownCinema = () => {
		setIsOpenCinema(!isOpenCinema)
		setIsOpenCities(false)
	}

	if (ticket) {
		return (
			<div className={`w-full ${ticket && "pointer-events-none"}`}>
				<div className="flex flex-wrap items-center gap-3 md:gap-4 pb-3 border-b border-[#2d2d4d]">
					<div className="relative group">
						<div className="mt-1">
							<Dropdown
								isOpen={isOpenCities}
								data={CITY_LIST}
								currentChoice={currentCity}
								handleClick={onClickCity}
								toggleDropdown={toggleDropdownCity}
								className="min-w-[180px]"
								buttonClass="bg-[#1a1a2e] border border-[#3d3d5d] hover:border-[#6d28d9] text-gray-200 px-3 py-2 rounded-lg flex justify-between items-center w-full transition-all duration-200 text-sm"
								dropdownClass="absolute top-full mt-1 bg-[#1a1a2e] border border-[#3d3d5d] rounded-lg shadow-lg shadow-black/20 z-50 w-full overflow-hidden"
								itemClass="px-3 py-2 hover:bg-[#2d2d4d] text-gray-300 hover:text-white transition-colors duration-150 border-b border-[#2d2d4d] last:border-0 text-sm"
								activeItemClass="bg-gradient-to-r from-[#6d28d9]/20 to-[#8b5cf6]/20 text-white border-l-4 border-[#6d28d9]"
							/>
						</div>
						<div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] transition-all duration-300"></div>
					</div>

					<div className="hidden md:block w-px h-4 bg-gradient-to-b from-transparent via-[#4c4c6d] to-transparent"></div>

					<div className="relative group">
						<div className="mt-1">
							<Dropdown
								isOpen={isOpenCinema}
								data={cinemaList}
								currentChoice={currentCinema}
								handleClick={onClickCinema}
								toggleDropdown={toggleDropdownCinema}
								className="min-w-[180px]"
								buttonClass="bg-[#1a1a2e] border border-[#3d3d5d] hover:border-[#6d28d9] text-gray-200 px-3 py-2 rounded-lg flex justify-between items-center w-full transition-all duration-200 text-sm"
								dropdownClass="absolute top-full mt-1 bg-[#1a1a2e] border border-[#3d3d5d] rounded-lg shadow-lg shadow-black/20 z-50 w-full overflow-hidden"
								itemClass="px-3 py-2 hover:bg-[#2d2d4d] text-gray-300 hover:text-white transition-colors duration-150 border-b border-[#2d2d4d] last:border-0 text-sm"
								activeItemClass="bg-gradient-to-r from-[#6d28d9]/20 to-[#8b5cf6]/20 text-white border-l-4 border-[#6d28d9]"
							/>
						</div>
						<div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] transition-all duration-300"></div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 pb-4 border-b border-[#2d2d4d]">
				{/* Левая часть: Заголовок и подзаголовок */}
				<div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
					<h1 className='text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 leading-tight'>
						Билетная касса
					</h1>
					<span className='text-[0.9rem] md:text-[1rem] lg:text-[1.1rem] text-[#38bdf8] font-medium tracking-wide drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]'>
						онлайн-бронирование
					</span>
				</div>

				{/* Правая часть: Меню выбора */}
				<div className="flex flex-wrap items-center gap-3 md:gap-4">
					<div className="relative group">
						<div className="mt-1">
							<Dropdown
								isOpen={isOpenCities}
								data={CITY_LIST}
								currentChoice={currentCity}
								handleClick={onClickCity}
								toggleDropdown={toggleDropdownCity}
								className="min-w-[180px]"
								buttonClass="bg-[#1a1a2e] border border-[#3d3d5d] hover:border-[#6d28d9] text-gray-200 px-3 py-2 rounded-lg flex justify-between items-center w-full transition-all duration-200 text-sm"
								dropdownClass="absolute top-full mt-1 bg-[#1a1a2e] border border-[#3d3d5d] rounded-lg shadow-lg shadow-black/20 z-50 w-full overflow-hidden"
								itemClass="px-3 py-2 hover:bg-[#2d2d4d] text-gray-300 hover:text-white transition-colors duration-150 border-b border-[#2d2d4d] last:border-0 text-sm"
								activeItemClass="bg-gradient-to-r from-[#6d28d9]/20 to-[#8b5cf6]/20 text-white border-l-4 border-[#6d28d9]"
							/>
						</div>
						<div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] transition-all duration-300"></div>
					</div>

					<div className="hidden md:block w-px h-4 bg-gradient-to-b from-transparent via-[#4c4c6d] to-transparent"></div>

					<div className="relative group">
						<div className="mt-1">
							<Dropdown
								isOpen={isOpenCinema}
								data={cinemaList}
								currentChoice={currentCinema}
								handleClick={onClickCinema}
								toggleDropdown={toggleDropdownCinema}
								className="min-w-[180px]"
								buttonClass="bg-[#1a1a2e] border border-[#3d3d5d] hover:border-[#6d28d9] text-gray-200 px-3 py-2 rounded-lg flex justify-between items-center w-full transition-all duration-200 text-sm"
								dropdownClass="absolute top-full mt-1 bg-[#1a1a2e] border border-[#3d3d5d] rounded-lg shadow-lg shadow-black/20 z-50 w-full overflow-hidden"
								itemClass="px-3 py-2 hover:bg-[#2d2d4d] text-gray-300 hover:text-white transition-colors duration-150 border-b border-[#2d2d4d] last:border-0 text-sm"
								activeItemClass="bg-gradient-to-r from-[#6d28d9]/20 to-[#8b5cf6]/20 text-white border-l-4 border-[#6d28d9]"
							/>
						</div>
						<div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] transition-all duration-300"></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;