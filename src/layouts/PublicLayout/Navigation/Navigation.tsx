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
import cartIcon2 from '@src/assets/icons/cart.svg'
import { BUTTON_TYPE_ENUM } from '@src/@types/types'
import NavSearchMobile from './NavSearch/NavSearchMobile'
import { useAuthProvider } from '@src/providers/AuthProvider/useAuthProvider'
import { Auth_Stage_Enum } from '@src/providers/AuthProvider/AuthContext'

export default function Navigation() {

    const [loginModal, setLoginModal] = useState<boolean>(false);
    const [cartModal, setCartModal] = useState<boolean>(false);
    const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
    const {authStage} = useAuthProvider();

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
            <div className='hidden lg:block'>
                <div className="custom-container py-3 items-center grid grid-flow-col auto-cols-max justify-between">
                    <img src={headerLogo} alt='main logo' className='h-[28px] lg:h-[40px] cursor-pointer' onClick={()=>navigate("/")}/>
                    <div>
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
                                {authStage === Auth_Stage_Enum.UNAUTHORIZED ? <>
                                        <NavButton text={'log.in'} type={BUTTON_TYPE_ENUM.DEFAULT} icon={userIcon} onClick={showLoginModal}/>
                                        <LogInModal modalOpen={loginModal} closeModal={closeLoginModal}/> 
                                    </> : <>
                                        <NavButton text={'profile'} type={BUTTON_TYPE_ENUM.DEFAULT} icon={userIcon} onClick={()=>navigate("/profile")}/>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* search on mobile mode*/}
            <div className='block lg:hidden'>
                <div className='custom-container py-3'>
                    <div className='grid grid-flow-col items-center justify-between'>
                        <img src={headerLogo} alt='main logo' className='h-[28px] lg:h-[40px] cursor-pointer' onClick={()=>navigate("/")}/>
                        <div>
                            <img src={searchIcon2} alt='search icon' className='w-6 cursor-pointer' onClick={()=>{setShowSearchInput(prev => !prev)}}/>
                            <img src={cartIcon2} alt='cart icon' className='ml-5 w-6 cursor-pointer'/>
                        </div>
                    </div>
                    {showSearchInput && <NavSearchMobile/>}
                </div>
            </div>
        </div>
    )
}