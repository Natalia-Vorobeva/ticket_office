import { DROPDOWN_STYLES } from "../../constants/stylesConstants";

function Dropdown({ 
  currentChoice, 
  data, 
  isOpen, 
  handleClick, 
  toggleDropdown,
  className = "",
  buttonClass = DROPDOWN_STYLES.buttonClass,
  dropdownClass = DROPDOWN_STYLES.dropdownClass,
  itemClass = DROPDOWN_STYLES.itemClass,
  activeItemClass = DROPDOWN_STYLES.activeItemClass
}) {
// console.log(DROPDOWN_STYLES.itemClass)
  const onClick = (city) => {
    handleClick(city)
  }
  
  return (
    <div className={`relative block text-left ${className}`}>
      <button
        onClick={toggleDropdown}
        className={buttonClass}
      >
        <span className="text-[1.1rem] font-medium">{currentChoice}</span>
        <svg
          className={`ml-2 h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="https://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={dropdownClass}>
          <div className="max-h-[300px] overflow-y-auto" role="menu">
            {data.map((item) => {
              const isActive = item === currentChoice;
              return (
                <div
                  key={`${item}/city`}
                  onClick={() => onClick(item)}
                  className={`${itemClass} ${isActive ? activeItemClass : ''} cursor-pointer flex items-center`}
                  role="menuitem"
                >
                  {item}
                  {isActive && (
                    <svg className="ml-auto w-4 h-4 text-[#8b5cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dropdown