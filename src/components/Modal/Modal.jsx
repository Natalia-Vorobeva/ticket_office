// Modal.jsx
import React, { useEffect } from "react";
import CinemaHall from "../CinemaHall/CinemaHall";

function Modal({
  units,
  hallInfo,
  serialNumber,
  currentArrPlaces,
  handleCloseModal,
  openModalPlaces,
  setCurrentArrPlaces,
  overlay,
  currentDbPlaces,
  reservation,
  modalState
}) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleCloseModal]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleCloseModal();
  };

  const noSelectedPlaces = currentArrPlaces?.length === 0;

  return (
    <section
      onClick={handleOverlayClick}
      className="flex justify-center items-center fixed z-50 inset-0 w-full h-screen bg-black/90 backdrop-blur-sm p-2"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-4xl max-h-[calc(100vh-1rem)] min-h-[calc(100vh-1rem)] bg-gray-900/95 rounded-xl shadow-2xl border border-gray-700 flex flex-col overflow-hidden"
      >
        {/* Заголовок компактный */}
        <div className="flex justify-between items-center border-b border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800 p-2">
          <h3 className="text-lg font-bold text-white">Выбор мест</h3>
          <button
            onClick={handleCloseModal}
            className="text-gray-300 hover:text-white text-base font-medium px-2 py-1 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            ✕ Закрыть
          </button>
        </div>

        {/* Контент с прокруткой */}
        <div className="flex-1 overflow-y-auto p-2">
          <CinemaHall
            className="w-full max-w-3xl mx-auto"
            hallInfo={hallInfo}
            overlay={overlay}
            reservation={reservation}
            units={units}
            handleCloseModal={handleCloseModal}
            currentDbPlaces={currentDbPlaces}
            currentArrPlaces={currentArrPlaces}
            setCurrentArrPlaces={setCurrentArrPlaces}
            serialNumber={serialNumber}
            openModalPlaces={openModalPlaces}
            modalState={modalState}
            hideHeader={true}
          />

          {/* Информация о зале и выбранных местах */}
          <div className="mt-2 pt-2 border-t border-gray-700">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <h4 className="text-sm font-semibold text-white">Зал</h4>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-start justify-center overflow-visible">
                  <span className="text-white font-bold text-3xl mb-1 -mr-1">{serialNumber}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">
                  Выбрано: <span className="text-amber-400 font-bold">{currentArrPlaces?.length || 0}</span>
                </span>
                {currentArrPlaces?.length > 0 && (
                  <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                    {currentArrPlaces.join(', ')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Кнопки внизу */}
        <div className="p-2 border-t border-gray-700 flex flex-row gap-2 justify-end">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg border border-gray-600 hover:border-gray-500 text-sm flex-1 sm:flex-none"
          >
            Отмена
          </button>
          <button
            onClick={handleCloseModal}
            disabled={noSelectedPlaces}
            className={`
              px-4 py-2 font-bold rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 text-sm
              relative overflow-hidden bg-[#1a1a2e] text-white border-2 border-transparent
              before:absolute before:inset-0 before:border-2 before:border-[#8b5cf6] before:rounded-xl
              before:animate-border-run before:opacity-70
              hover:bg-[#8b5cf6] hover:text-white transition-colors duration-300
              disabled:opacity-50 disabled:pointer-events-none disabled:before:animate-none disabled:border-gray-500
              flex-1
            `}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              СОХРАНИТЬ
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Modal;