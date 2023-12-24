import { useState } from 'react'
import NavButton from './NavButton/NavButton'
import NavSearch from './NavSearch/NavSearch'
import headerLogo from '@src/assets/icons/main-logo.png'
import dotsIcon from '@src/assets/icons/dots.png'
import cartIcon from '@src/assets/icons/header-cart.png'
import userIcon from '@src/assets/icons/user-icon.png'
import LogInModal from '@src/components/LogInModal/LogInModal'

export default function Navigation() {

    const [loginModal, setLoginModal] = useState<boolean>(false);

    function showLoginModal() {
        setLoginModal(true);
    };
    function closeLoginModal(){
        setLoginModal(false);
    };

    return (
        <div className="w-[100%] bg-gray-primary sticky">
            <div className="custom-container py-3 items-center grid grid-flow-col justify-between">
                <img src={headerLogo} alt='main logo' className='h-[40px]'/>
                <div className='hidden lg:block'>
                    <div className=' w-[100%] grid grid-flow-col gap-4'>
                        <NavButton color={'#ec5e2a'} text={'navigation'} textColor={'white'} icon={dotsIcon}/>
                        <NavSearch/>
                        <NavButton color={'#fff'} text={'cart'} textColor={'black'} icon={cartIcon}/>
                        <NavButton onClick={showLoginModal} color={'#fff'} text={'log.in'} textColor={'black'} icon={userIcon}/>
                    </div>
                </div>
                <>
                    <LogInModal modalOpen={loginModal} closeModal={closeLoginModal}/>
                </>
            </div>
        </div>
    )
}