import { useEffect } from 'react';
import { useIntl } from 'react-intl'
import searchIcon from '@src/assets/icons/main-search.png'
import SearchResult from '@src/features/SearchResult/SearchResult';
import { useRef, useState } from 'react';
import { useGlobalProvider } from '@src/providers/GlobalProvider/useGlobalProvider';
import { useDebounce } from "rooks";

export default function NavSearch() {
  const {formatMessage} = useIntl();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const searchElement = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const setValueDebounced = useDebounce(setSearchValue, 300);
  const {setShowOverlay} = useGlobalProvider();

  /* if user clicks outside of search input, the shadow overlay and search result component disappears again */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchElement.current &&
        !searchElement.current.contains(event.target as Node) &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  function showModal() {
    setIsModalOpen(true);
    setShowOverlay(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setShowOverlay(false);
  }

  return (
      <div className='flex items-center relative w-full mt-3 lg:w-[400px] xl:w-[460px] lg:mt-0 transition-all duration-500 ease-in-out'>
          <img src={searchIcon} alt='search icon' className='absolute left-3 w-[20px]'/>
          <div onFocus={showModal} ref={modalRef} className='w-full'>
            <input  onChange={(e) => setValueDebounced(e.target.value)} ref={searchElement} type="text" placeholder={formatMessage({id: 'search'})} className='py-[12px] pl-[40px] pr-5 w-full border-solid border rounded-xl text-sm firago-normal text-black-main dark:text-dark-black-main bg-light-theme-bg border-orange-main dark:bg-dark-theme-bg transition-colors duration-300 ease-in-out'/>
            {isModalOpen && <SearchResult searchInput={searchValue} closeModal={closeModal}/>}
          </div>
      </div>
  )
}
