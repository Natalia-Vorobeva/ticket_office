function ListFilms({ handleClickFilms, ticket, films, setListActiveHalls, openFilmInfo, openSelectFilm, selectedFilm }) {
  return (
    <div className="flex-1 w-full max-w-full">
      <div className="h-full">
        <div className="bg-[#1a1a2e]/50 backdrop-blur-sm rounded-xl border border-[#2d2d4d] shadow shadow-black/10 h-full">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-6 rounded-full bg-gradient-to-b from-[#6d28d9] to-[#8b5cf6]"></div>
            <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Выберите фильм
            </h2>
          </div>

          <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
            {films.films?.map((item, index) => {
              const isSelected = item === selectedFilm;
              return (
                <div
                  key={`${index}-film`}
                  className={`group p-2 md:p-3 rounded border transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#6d28d9]/20 border-[#8b5cf6]'
                      : 'border-transparent hover:border-[#6d28d9]/30 hover:bg-gradient-to-r hover:from-[#1a1a2e] hover:to-[#2d2d4d]/50'
                  }`}
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className={`w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded transition-all duration-200 flex-shrink-0 ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6] text-white'
                        : 'bg-[#2d2d4d] group-hover:bg-gradient-to-br group-hover:from-[#6d28d9] group-hover:to-[#8b5cf6] text-gray-400 group-hover:text-white'
                    }`}>
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs md:text-sm font-medium break-words leading-relaxed transition-colors duration-200 ${
                        isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {item}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleClickFilms({ film: item })}
                        className="px-2 py-1 bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] text-white rounded text-xs font-medium hover:from-[#7c3aed] hover:to-[#a78bfa] transition-all duration-200 shadow shadow-[#6d28d9]/20 text-[10px]"
                      >
                        Выбрать
                      </button>
                      <button
                        onClick={() => openFilmInfo({ film: item })}
                        className="px-2 py-1 bg-transparent border border-gray-600 text-gray-300 rounded text-[10px] font-medium hover:bg-gray-800/50 hover:text-white hover:border-gray-500 transition-all duration-200"
                      >
                        Подробнее
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-[#2d2d4d]">
            <button
              onClick={openSelectFilm}
              className="group w-full p-3 rounded-lg bg-gradient-to-r from-[#1a1a2e] to-[#2d2d4d] border border-[#3d3d5d] hover:border-[#6d28d9] hover:from-[#6d28d9]/10 hover:to-[#8b5cf6]/10 transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="text-base font-bold bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] bg-clip-text text-transparent">
                    {ticket ? "ВАШ БИЛЕТ" : "Больше вариантов..."}
                  </span>
                  <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                    {ticket ? "Посмотреть ваш билет" : "Выбрать фильм по залу"}
                  </p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-500 group-hover:text-[#8b5cf6] transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListFilms;