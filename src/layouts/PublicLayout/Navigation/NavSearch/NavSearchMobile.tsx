import { useEffect } from 'react';
import { useIntl } from 'react-intl'
import searchIcon from '@src/assets/icons/main-search.png'
import InputSearch from '@src/features/InputSearch/InputSearch';
import { useRef, useState } from 'react';
export default function NavSearchMobile() {
  const {formatMessage} = useIntl();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const searchElement = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click event is outside the search input and the modal
      if (
        searchElement.current &&
        !searchElement.current.contains(event.target as Node) &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    // Attach the event listener when the modal is open
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Remove the event listener when the component is unmounted or the modal is closed
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  function showModal() {
    setIsModalOpen(true);
  }

  return (
      <div className='flex items-center relative w-full mt-3'>
          <img src={searchIcon} alt='search icon' className='absolute left-3 w-[20px]'/>
          <div onFocus={showModal} ref={modalRef} className='w-full'>
            <input ref={searchElement} type="text" placeholder={formatMessage({id: 'search'})} className='py-[12px] pl-[40px] pr-5 w-full border-solid border rounded-xl text-sm font-firago font-normal border-orange-primary dark:bg-gray-primary'/>
            {isModalOpen && <InputSearch/>}
          </div>
      </div>
  )
}
