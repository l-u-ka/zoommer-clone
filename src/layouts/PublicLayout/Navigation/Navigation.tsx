import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@src/layouts/PublicLayout/Navigation/NavButton/NavButton'
import NavSearch from './NavSearch/NavSearch'
import headerLogo from '@src/assets/icons/main-logo.png'
import dotsIcon from '@src/assets/icons/dots.png'
import cartIcon from '@src/assets/icons/header-cart.png'
import userIcon from '@src/assets/icons/user-icon.png'
import LogInModal from '@src/components/LogInModal/LogInModal'
import CartModal from '@src/components/CartModal/CartModal'

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
        <div className="w-[100%] bg-gray-primary sticky">
            <div className="custom-container py-3 items-center grid grid-flow-col justify-between">
                <img src={headerLogo} alt='main logo' className='h-[40px] cursor-pointer' onClick={()=>navigate("/")}/>
                <div className='hidden lg:block'>
                    <div className=' w-[100%] grid grid-flow-col gap-4'>
                        <Button color={'#ec5e2a'} text={'navigation'} textColor={'white'} icon={dotsIcon}/>
                        <NavSearch/>
                        <Button color={'#fff'} text={'cart'} textColor={'black'} icon={cartIcon} onMouseEnter={showCartModal} onMouseLeave={closeCartModal}/>
                        <Button onClick={showLoginModal} color={'#fff'} text={'log.in'} textColor={'black'} icon={userIcon}/>
                    </div>
                </div>
                <>
                    <LogInModal modalOpen={loginModal} closeModal={closeLoginModal}/>
                    {cartModal && <CartModal closeModal={closeCartModal} />}
                </>
            </div>
        </div>
    )
}