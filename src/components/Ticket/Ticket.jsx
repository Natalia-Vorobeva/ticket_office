import React from 'react';

function Ticket({ currentArrPlaces, reservation, setShowConfirmInfo, handleBookSeats }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirm = () => {
    setShowConfirmInfo(false);
    handleBookSeats();
    scrollToTop();
  };

  const handleContinue = () => {
    setShowConfirmInfo(false);
    scrollToTop();
  };

  if (!reservation || !reservation.film) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1f] rounded-xl border border-[#2d2d4d] p-6 max-w-md shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Ваш билет</h3>
        <div className="space-y-2 text-gray-300 text-sm mb-6">
          <p><span className="text-[#8b5cf6]">Фильм:</span> {reservation.film}</p>
          <p><span className="text-[#8b5cf6]">Дата и время:</span> {reservation.date} {reservation.time}</p>
          <p><span className="text-[#8b5cf6]">Зал:</span> {reservation.hall}</p>
          <p><span className="text-[#8b5cf6]">Места:</span> {currentArrPlaces?.join(', ') || '—'}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 text-[20px] bg-transparent border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 hover:text-white transition-colors"
          >
            Понятно
          </button>
          <button
            onClick={handleContinue}
            className="flex-1 px-4 py-2 text-[20px] bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] text-white rounded-lg font-medium hover:from-[#7c3aed] hover:to-[#a78bfa] transition-all"
          >
            Продолжить выбор
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ticket;