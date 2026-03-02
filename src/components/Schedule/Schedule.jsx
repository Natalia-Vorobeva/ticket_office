import { useState, useEffect } from "react";
import { ACTIVE_CLASS, PAST_CLASS, FUTURE_CLASS } from "../../constants/constants";

function Schedule({
  dataBase,
  indexActive,
  selectedDateIndex,
  sessionList,
  reservation,
  handleClickDate,
  handleClickSession
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [forceCenter, setForceCenter] = useState(0); 
	
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = document.querySelector('.date-scrollbar');
    const activeElement = container?.querySelector(`[data-index="${selectedDateIndex}"]`);
    if (container && activeElement) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = activeElement.getBoundingClientRect();
      const scrollLeft = activeElement.offsetLeft - (containerRect.width / 2) + (elementRect.width / 2);
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [selectedDateIndex, forceCenter]);

  const now = currentTime;
  const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const isSessionAvailable = (sessionHour, index) => {
    const isPast = indexActive > index;
    if (isPast) return false;
    const isToday = indexActive === index;
    if (isToday) {
      const sessionTime = new Date(todayDate);
      sessionTime.setHours(sessionHour, 0, 0, 0);
      return sessionTime > now;
    }
    return true;
  };

  const onDateClick = (item, index) => {
    handleClickDate(item, index);
    setForceCenter(prev => prev + 1); 
  };

  return (
    <div className='w-full min-w-0'>
      <div className="text-center">
        <div className="flex gap-1 justify-center mb-2 overflow-x-auto pb-1">
          {dataBase.map((item, index) => {
            const isActive = selectedDateIndex === index;
            const isToday = indexActive === index;
            const monthShort = item.month.slice(0, 3);
            return (
              <button
                key={`mini-${index}`}
                onClick={() => onDateClick(item, index)}
                className={`
                  flex-shrink-0 w-10 h-10 rounded-md flex flex-col items-center justify-center
                  text-xs font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6] text-white scale-110 shadow-lg'
                    : isToday
                      ? 'border-2 border-[#6d28d9] text-[#8b5cf6] hover:bg-[#2d2d4d]'
                      : 'bg-[#1a1a2e] border border-[#3d3d5d] text-gray-400 hover:bg-[#2d2d4d] hover:text-white'
                  }
                `}
              >
                <span className="text-[9px] uppercase">{monthShort}</span>
                <span className="text-sm font-bold leading-tight">{item.day}</span>
              </button>
            );
          })}
        </div>
        <div className="flex gap-3 overflow-x-auto pb-3 date-scrollbar max-w-full w-full pt-3">
          {dataBase.map((item, index) => {
            const isActive = selectedDateIndex === index;
            const isPast = indexActive > index;
            const isTodayDate = indexActive === index;
            const i = index;
            return (
              <div
                key={`${item.day} ${item.month} ${item.year}/dataitem`}
                data-index={index}
                onClick={() => onDateClick(item, index)}
                className={`
                  flex-shrink-0 min-w-[70px] md:min-w-[80px] flex flex-col items-center justify-center 
                  rounded-xl py-3 transition-all duration-200 cursor-pointer relative
                  ${isActive ? ACTIVE_CLASS : isPast ? PAST_CLASS : FUTURE_CLASS}
                  ${!isPast && !isActive ? 'hover:scale-[1.02] hover:border-[#6d28d9]/50 hover:shadow hover:shadow-[#6d28d9]/10' : ''}
                `}
              >
                {isTodayDate && (
                  <>
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#8b5cf6] animate-pulse"></div>
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-xs font-medium text-[#8b5cf6] bg-[#1a1a2e] px-1 rounded whitespace-nowrap">
                      <span className="text-[8px]">Время: </span>
                      {now.getHours().toString().padStart(2, '0')}:{now.getMinutes().toString().padStart(2, '0')}
                    </div>
                  </>
                )}
                {item.weekday && (
                  <span className="text-xs text-gray-400 mb-1">{item.weekday}</span>
                )}
                <span className="text-lg md:text-xl font-bold">{item.day}</span>
                <span className="text-xs md:text-sm mt-1">{item.month}</span>
                {item.year && (
                  <span className="text-xs text-gray-400 mt-1">{item.year}</span>
                )}
                <div className={`mt-3 ${sessionList?.length === 0 ? 'h-0' : ''}`}>
                  {sessionList.map((el, idx) => {
                    const available = isSessionAvailable(el, index);
                    return (
                      <button
                        key={`${idx}${index}/sessions`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (available) {
                            handleClickSession(item, el, i);
                          }
                        }}
                        disabled={!available}
                        className={`
                          px-2 py-1 my-1 rounded text-xs font-medium
                          bg-gradient-to-r from-[#1a1a2e] to-[#2d2d4d] 
                          border border-[#3d3d5d] 
                          text-gray-300 
                          hover:from-[#6d28d9]/20 hover:to-[#8b5cf6]/20 
                          hover:border-[#6d28d9]/50 hover:text-white 
                          transition-all duration-200 cursor-pointer
                          ${reservation.film === '' ? 'hidden' : ''}
                          ${!available ? 'opacity-50 cursor-not-allowed hover:from-[#1a1a2e] hover:to-[#2d2d4d] hover:border-[#3d3d5d] hover:text-gray-300' : ''}
                        `}
                      >
                        {el}:00
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {sessionList?.length === 0 && reservation.film && (
          <div className="mt-4 bg-[#1a1a2e]/50 rounded-lg border border-[#2d2d4d] p-4">
            <div className="flex flex-col items-center justify-center py-2">
              <svg className="w-8 h-8 text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-400 text-center text-sm">
                Чтобы увидеть доступные сеансы, выберите дату
              </p>
            </div>
          </div>
        )}

        {!reservation.film && (
          <div className="mt-4 bg-[#1a1a2e]/50 rounded-lg border border-[#2d2d4d] p-4">
            <div className="flex flex-col items-center justify-center py-2">
              <svg className="w-8 h-8 text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-300 text-center text-sm mb-1">Сначала выберите фильм</p>
              <p className="text-gray-400 text-center text-xs">
                Чтобы увидеть доступные сеансы, выберите фильм из списка
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Schedule;