import React, { ReactNode, useState } from 'react'
import collapseArrow from '@src/assets/icons/arrow-up-black.png'

interface AdditDetailProps {
  paragraph: ReactNode;
  text: string;
}

export default function AdditionalDetail({paragraph, text} : AdditDetailProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  return (
    <div>
      <div className='flex items-center justify-between cursor-pointer' onClick={()=>{setIsCollapsed(prev => !prev)}}>
        <p className='firago-semibold text-base leading-5 dark:text-orange-primary'>{paragraph}</p>
        <img src={collapseArrow} alt='collapse arrow' className={`${!isCollapsed && 'rotate-180'}`}/>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${!isCollapsed ? 'max-h-0' : 'max-h-96'}`}>
        <p className='p-2 firago-normal text-black-06 text-sm dark:text-orange-primary'>{text}</p>
      </div>
    </div>
  )
}
