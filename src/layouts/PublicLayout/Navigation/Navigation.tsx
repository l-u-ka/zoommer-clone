import headerLogo from '../../../assets/icons/main-logo.png'
import NavButton from './NavButton/NavButton'
import NavSearch from './NavSearch/NavSearch'
import dotsIcon from '../../../assets/icons/dots.png'
import cartIcon from '../../../assets/icons/header-cart.png'
import userIcon from '../../../assets/icons//user-icon.png'

export default function Navigation() {

    return (
        <div className="w-[100%] bg-gray-primary sticky">
            <div className="custom-container py-3 flex items-center">
                <img src={headerLogo} alt='main logo' className='h-[40px]'/>
                <div className='ml-[100px] w-[100%] flex justify-around'>
                    <NavButton color={'#ec5e2a'} text={'navigation'} textColor={'white'} icon={dotsIcon}/>
                    <NavSearch/>
                    <NavButton color={'#fff'} text={'cart'} textColor={'black'} icon={cartIcon}/>
                    <NavButton color={'#fff'} text={'log.in'} textColor={'black'} icon={userIcon}/>
                </div>
            </div>
        </div>
    )
}