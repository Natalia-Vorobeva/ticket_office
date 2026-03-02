import React from 'react';

const ModalFilmInfo = ({ film, onClose, onSelect }) => {
  if (!film) return null;
  return (
    <section
      onClick={onClose}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1f] rounded-xl border border-[#2d2d4d] shadow-2xl shadow-black/70"
      >
        <div className="sticky top-0 bg-gradient-to-r from-[#1a1a2e] to-[#2d2d4d] border-b border-[#3d3d5d] p-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Информация о фильме</h2>
                <p className="text-gray-400 text-sm">Подробное описание</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#2d2d4d] transition-colors duration-200">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="flex-shrink-0 w-full lg:w-1/3">
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-[#3d3d5d] shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                    <p className="text-gray-500 text-sm">Постер фильма</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{film.film}</h3>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{film.film}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#6d28d9]/20 text-[#8b5cf6] text-xs font-medium rounded-full border border-[#6d28d9]/30">Фантастика</span>
                  <span className="px-3 py-1 bg-[#0ea5e9]/20 text-[#38bdf8] text-xs font-medium rounded-full border border-[#0ea5e9]/30">Боевик</span>
                  <span className="px-3 py-1 bg-[#10b981]/20 text-[#34d399] text-xs font-medium rounded-full border border-[#10b981]/30">16+</span>
                  <span className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs font-medium rounded-full">2ч 15мин</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#8b5cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Описание
                  </h4>
                  <div className="bg-[#0f0f1f]/50 rounded-lg p-4 border border-[#2d2d4d]">
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base max-h-60 overflow-y-auto pr-2">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis ducimus nulla sint totam asperiores necessitatibus quidem magni impedit assumenda cum vitae itaque modi repellat voluptas exercitationem neque dignissimos, hic sit, ipsam pariatur fugiat ad possimus. Deserunt sunt facere repudiandae rem unde, hic amet rerum eveniet officia a maxime, deleniti incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0f0f1f]/50 rounded-lg p-3 border border-[#2d2d4d]">
                    <p className="text-gray-400 text-xs mb-1">Режиссёр</p>
                    <p className="text-white text-sm font-medium">Кристофер Нолан</p>
                  </div>
                  <div className="bg-[#0f0f1f]/50 rounded-lg p-3 border border-[#2d2d4d]">
                    <p className="text-gray-400 text-xs mb-1">В главных ролях</p>
                    <p className="text-white text-sm font-medium">Леонардо ДиКаприо, Мэтт Деймон</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#1a1a2e] to-[#2d2d4d]/50 rounded-xl p-4 border border-[#2d2d4d] mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">8.7</div>
                  <div className="text-xs text-gray-400">IMDb</div>
                </div>
                <div className="h-10 w-px bg-gray-700"></div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">Зрительский рейтинг</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Премьера</p>
                <p className="text-lg font-bold text-white">12 мая 2024</p>
              </div>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 bg-gradient-to-r from-[#1a1a2e] to-[#2d2d4d] border-t border-[#3d3d5d] p-4 z-10">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-transparent border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800/50 hover:text-white hover:border-gray-500 transition-all duration-200 font-medium flex-1"
            >
              Назад к списку
            </button>
            <button
              onClick={() => onSelect(film)}
              className="px-6 py-3 bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] text-white rounded-xl font-bold hover:from-[#7c3aed] hover:to-[#a78bfa] transition-all duration-200 shadow-lg shadow-[#6d28d9]/30 flex items-center justify-center gap-2 flex-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Выбрать этот фильм
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModalFilmInfo;