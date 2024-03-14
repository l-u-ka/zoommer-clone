import { ReactNode, useState } from 'react'
import collapseArrow from '@src/assets/icons/light/arrow-up-black.png'
import collapseArrowDark from '@src/assets/icons/dark/arrow-up-black.png'
import { useThemeProvider } from '@src/providers/ThemeProvider/useThemeProvider';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface AdditDetailProps {
  paragraph: ReactNode;
  text: string;
}

export default function AdditionalDetail({paragraph, text} : AdditDetailProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const {lightMode} = useThemeProvider();
  const [parent] = useAutoAnimate({duration: 200, easing: 'ease-in-out'})

  return (
    <div ref={parent}>
      <div className='flex items-center justify-between cursor-pointer' onClick={()=>{setIsCollapsed(prev => !prev)}}>
        <p className='firago-semibold text-sm leading-4 text-black-08 dark:text-dark-black-8'>{paragraph}</p>
        <img src={lightMode ? collapseArrow : collapseArrowDark} alt='collapse arrow' className={`${!isCollapsed && 'rotate-180'}`}/>
      </div>
      {isCollapsed && <p className='p-2 firago-normal text-black-06 text-sm dark:text-dark-black-06'>{text}</p>}
    </div>
  )
}
