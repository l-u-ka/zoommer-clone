import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl';
import lefrArrow from '@src/assets/icons/category-left-arr.png'
import EditProfile from './EditProfile/EditProfile';
import profileIcon from '@src/assets/icons/profile-icon.png'
import { useAuthProvider } from '@src/providers/AuthProvider/useAuthProvider';
import Wishlist from './Wishlist/Wishlist';
import { PROFILE_MENU_ENUM } from './ProfilePage';

// enum MOBILE_MENU_SELECT_ENUM {
//   MENU = "menu",
//   EDIT_PROFILE = "edit_profile",
//   WISHLIST = "wislist"
// }
export default function ProfilePageMobile({selected, setSelected} : {selected: PROFILE_MENU_ENUM, setSelected: React.Dispatch<React.SetStateAction<PROFILE_MENU_ENUM>>}) {

  // const [selected, setSelected] = useState<MOBILE_MENU_SELECT_ENUM>(MOBILE_MENU_SELECT_ENUM.MENU);
  const {userData} = useAuthProvider();
  
  return (
    <div>
      <div>
        {selected === PROFILE_MENU_ENUM.ON_MENU && (
          <div className="flex items-center">
            <img src={profileIcon} alt="profile icon" className="w-6 mr-3"/>
            <h1 className="firago-medium text-base leading-[19px] text-black-main dark:text-white-400"> <FormattedMessage id="hello"/>, {userData?.first_name}</h1>
          </div>
        )}
        {selected === PROFILE_MENU_ENUM.ON_EDITING && (
          <div className='flex items-center cursor-pointer' onClick={() => setSelected(PROFILE_MENU_ENUM.ON_MENU)}>
            <img src={lefrArrow} className='h3 mr-3'/>
            <h1 className="firago-medium text-base leading-[19px] text-black-main dark:text-white-400"> <FormattedMessage id="edit.profile"/></h1>
          </div>
        )}
        {selected === PROFILE_MENU_ENUM.ON_WISHLIST && (
          <div className='flex items-center cursor-pointer' onClick={() => setSelected(PROFILE_MENU_ENUM.ON_MENU)}>
            <img src={lefrArrow} className='h3 mr-3'/>
            <h1 className="firago-medium text-base leading-[19px] text-black-main dark:text-white-400"> <FormattedMessage id="wishlist"/></h1>
          </div>
        )}
      </div>
      <hr className="mt-[20px] mb-[30px] border border-solid border-white-400"/>
      {selected === PROFILE_MENU_ENUM.ON_MENU && (
        <div className='w-full'>
          <div className='flex justify-between' onClick={()=>setSelected(PROFILE_MENU_ENUM.ON_EDITING)}>
            <h3 className='firago-normal text-sm leading-[17px] mb-[30px] cursor-pointer dark:text-white-400'><FormattedMessage id='edit.profile'/></h3>
            <img src={lefrArrow} className='rotate-180 h-3'/>
          </div>
          <div className='flex justify-between' onClick={()=>setSelected(PROFILE_MENU_ENUM.ON_WISHLIST)}>
            <h3 className='firago-normal text-sm leading-[17px] cursor-pointer dark:text-white-400'><FormattedMessage id='wishlist'/></h3>
            <img src={lefrArrow} className='rotate-180 h-3'/>
          </div>
        </div>
      )}
      {selected === PROFILE_MENU_ENUM.ON_EDITING && (
          <EditProfile/>
      )}
      {
        selected === PROFILE_MENU_ENUM.ON_WISHLIST && (
          <Wishlist/>
        )
      }
    </div>
  )
}
