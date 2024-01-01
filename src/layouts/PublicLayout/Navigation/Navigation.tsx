import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavButton from '@src/layouts/PublicLayout/Navigation/NavButton/NavButton'
import NavSearch from './NavSearch/NavSearch'
import headerLogo from '@src/assets/icons/main-logo.png'
import dotsIcon from '@src/assets/icons/dots.png'
import cartIcon from '@src/assets/icons/header-cart.png'
import userIcon from '@src/assets/icons/user-icon.png'
import LogInModal from '@src/components/LogInModal/LogInModal'
import CartModal from '@src/components/CartModal/CartModal'
import searchIcon2 from '@src/assets/icons/search.png'
import cartIcon2 from '@src/assets/icons/cart.png'
import { BUTTON_TYPE_ENUM } from '@src/@types/types'

export default function Navigation() {

    const [loginModal, setLoginModal] = useState<boolean>(false);
    const [cartModal, setCartModal] = useState<boolean>(false);

    function showLoginModal() {
        setLoginModal(true);
    };
    function closeLoginModal(){
        setLoginModal(false);
    };

    function showCartModal() {
        setCartModal(true);
    }
    function closeCartModal() {
        setCartModal(false);
    }

    const navigate = useNavigate();

    return (
        <div className="w-[100%] bg-gray-primary sticky dark:bg-[rgb(15,15,15)]">
            <div className="custom-container py-3 items-center grid grid-flow-col justify-between">
                <img src={headerLogo} alt='main logo' className='h-[28px] lg:h-[40px] cursor-pointer' onClick={()=>navigate("/")}/>
                <div className='hidden lg:block'>
                    <div className=' w-[100%] grid grid-flow-col gap-4'>
                        {/* <Button text={'navigation'} color={'#ec5e2a'} textColor={'white'} icon={dotsIcon}/> */}
                        <NavButton text={'navigation'} type={BUTTON_TYPE_ENUM.PRIMARY} icon={dotsIcon}/>
                        <NavSearch/>
                        {/* <Button text={'cart'} color={'#fff'} textColor={'black'} icon={cartIcon} onMouseEnter={showCartModal} onMouseLeave={closeCartModal}/>
                        <Button text={'log.in'} color={'#fff'} textColor={'black'} icon={userIcon} onClick={showLoginModal}/> */}
                        <div onMouseEnter={showCartModal} onMouseLeave={closeCartModal}>
                            <NavButton text={'cart'} type={BUTTON_TYPE_ENUM.DEFAULT} icon={cartIcon} /*onMouseEnter={showCartModal} onMouseLeave={closeCartModal}*//>
                            {cartModal && <CartModal /*closeModal={closeCartModal}*/ />}
                        </div>
                        <div>
                            <NavButton text={'log.in'} type={BUTTON_TYPE_ENUM.DEFAULT} icon={userIcon} onClick={showLoginModal}/>
                            <LogInModal modalOpen={loginModal} closeModal={closeLoginModal}/>
                        </div>
                    </div>
                </div>
                <div className="block lg:hidden">
                        <img src={searchIcon2} alt='search icon' className='w-6'/>
                        <img src={cartIcon2} alt='cart icon' className='ml-5 w-6'/>
                </div>
            </div>
        </div>
    )
}