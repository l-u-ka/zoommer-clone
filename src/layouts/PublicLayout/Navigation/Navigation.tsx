import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import NavButton from '@src/layouts/PublicLayout/Navigation/NavButton/NavButton'
import NavSearch from './NavSearch/NavSearch'
import CategoriesTabMobile from '@src/components/CategoriesTab/CategoriesTabMobile'
import headerLogo from '@src/assets/icons/main-logo.png'
import dotsIcon from '@src/assets/icons/dots.png'
import cartIcon from '@src/assets/icons/header-cart.png'
import userIcon from '@src/assets/icons/user-icon.png'
import LogInModal from '@src/components/LogInModal/LogInModal'
import CartModal from '@src/components/CartModal/CartModal'
import searchIcon2 from '@src/assets/icons/search.png'
import cartIcon2 from '@src/assets/icons/cart.svg'
import burgerIcon from '@src/assets/icons/burger-icon.png'
import burgerCloseIcon from '@src/assets/icons/close.png'
import { BUTTON_TYPE_ENUM } from '@src/@types/types'
import { useAuthProvider } from '@src/providers/AuthProvider/useAuthProvider'
import { Auth_Stage_Enum } from '@src/providers/AuthProvider/AuthContext'
import { useGlobalProvider } from '@src/providers/GlobalProvider/useGlobalProvider'
import { useMediaQuery } from 'react-responsive'


export default function Navigation() {

    // const [loginModal, setLoginModal] = useState<boolean>(false);
    const {loginModalOpen, setLoginModalOpen} = useGlobalProvider();
    const [cartModal, setCartModal] = useState<boolean>(false);
    const [categoriesTabModal, setCategoriesTabModal] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<boolean>(false);
    const {authStage} = useAuthProvider();
    const navigate = useNavigate();
    const location = useLocation();
    const {setShowOverlay} = useGlobalProvider();
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    function showLoginModal() {
        setLoginModalOpen(true);
    };
    function closeLoginModal(){
        setLoginModalOpen(false);
    };
    function showCartModal() {
        setCartModal(true);
    }
    function closeCartModal() {
        setCartModal(false);
    }
    
    function showCategoriesTabModal() {
        setShowOverlay(true);
        setCategoriesTabModal(true);
        setSearchInput(false);
    }
    function closeCategoriesTabModal() {
        setShowOverlay(false);
        setCategoriesTabModal(false);
    }
    function showSearchInput() {
        setSearchInput(true);
        setCategoriesTabModal(false);
    }
    function closeSearchInput() {
        setSearchInput(false);
        setShowOverlay(false);
    }

    useEffect(()=> {
        if (categoriesTabModal || searchInput) {
            closeCategoriesTabModal();
            closeSearchInput();
        }
    }, [location.pathname])

    useEffect(()=> {
        if (isDesktop) {
            closeSearchInput();
            closeCategoriesTabModal();
        }
    }, [isDesktop])

    return (
        <div className="w-[100%] bg-white-07 sticky top-0 dark:bg-[rgba(30,30,30)] z-20">
            <div className='hidden lg:block'>
                <div className="custom-container py-3 items-center grid grid-flow-col auto-cols-max justify-between relative">
                    <img src={headerLogo} alt='main logo' className='h-[28px] lg:h-[40px] cursor-pointer' onClick={()=>navigate("/")}/>
                    <div>
                        <div className=' w-[100%] grid grid-flow-col gap-3 items-center'>
                            {/* <Button text={'navigation'} color={'#ec5e2a'} textColor={'white'} icon={dotsIcon}/> */}
                            <NavButton text={'navigation'} type={BUTTON_TYPE_ENUM.PRIMARY} icon={dotsIcon} onClick={()=>navigate("/all-categories")}/>
                            <NavSearch/>
                            {/* <Button text={'cart'} color={'#fff'} textColor={'black'} icon={cartIcon} onMouseEnter={showCartModal} onMouseLeave={closeCartModal}/>
                            <Button text={'log.in'} color={'#fff'} textColor={'black'} icon={userIcon} onClick={showLoginModal}/> */}
                            <div onMouseEnter={showCartModal} /*onMouseLeave={closeCartModal}*/>
                                <NavButton text={'cart'} type={BUTTON_TYPE_ENUM.DEFAULT} icon={cartIcon} /*onMouseEnter={showCartModal} onMouseLeave={closeCartModal}*//>
                                {cartModal && <CartModal closeModal={closeCartModal}/>}
                            </div>
                            <div>
                                {authStage !== Auth_Stage_Enum.AUTHORIZED ? <>
                                        <NavButton text={'log.in'} type={BUTTON_TYPE_ENUM.DEFAULT} icon={userIcon} onClick={showLoginModal}/>
                                        <LogInModal modalOpen={loginModalOpen} closeModal={closeLoginModal}/> 
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
                <div className='custom-container py-3 relative'>
                    <div className='grid grid-flow-col items-center justify-between'>
                        <div className='flex items-center'>
                            <div className='w-6 mr-2'>
                                <img src={ categoriesTabModal ? burgerCloseIcon : burgerIcon} alt='categories burger logo' className='w-auto cursor-pointer block ml-auto' onClick={()=>{!categoriesTabModal ? showCategoriesTabModal() : closeCategoriesTabModal()}}/>
                            </div>
                            <img src={headerLogo} alt='main logo' className='h-[28px] lg:h-[40px] cursor-pointer' onClick={()=>navigate("/")}/>
                        </div>
                        <div>
                            <img src={searchIcon2} alt='search icon' className='w-6 cursor-pointer' onClick={()=>{!searchInput ? showSearchInput() : closeSearchInput()}}/>
                            <img src={cartIcon2} alt='cart icon' className='ml-5 w-6 cursor-pointer'/>
                        </div>
                    </div>
                    {searchInput && <NavSearch/>}
                    {<CategoriesTabMobile isOpen={categoriesTabModal}/>}
                </div>
            </div>
        </div>
    )
}