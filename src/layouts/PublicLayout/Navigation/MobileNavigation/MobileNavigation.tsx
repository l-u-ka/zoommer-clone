import { useLocation, useNavigate } from "react-router-dom"

export default function MobileNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("Location", location.pathname)

  return (
    <div className="grid grid-cols-3 lg:hidden w-full bg-white dark:bg-[rgba(20,20,20)] fixed left-0 bottom-0 z-10 py-4 border-t border-solid border-b-0 border-x-0 border-white-600">
      <div className="flex justify-center col-span-1 " onClick={() => navigate('/')}>
        <div className="inline-flex justify-center items-center flex-col cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 18v-3M10.07 2.82 3.14 8.37c-.78.62-1.28 1.93-1.11 2.91l1.33 7.96c.24 1.42 1.6 2.57 3.04 2.57h11.2c1.43 0 2.8-1.16 3.04-2.57l1.33-7.96c.16-.98-.34-2.29-1.11-2.91l-6.93-5.54c-1.07-.86-2.8-.86-3.86-.01Z" stroke={`${location.pathname === '/' ? '#ec5e2a' : '#7F8184'}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          <p className={`${location.pathname === '/' ? 'firago-bold text-orange-primary' : 'firago-medium text-gray-main'} text-xs leading-[14px] mt-1`}>Home</p>
        </div>
      </div>
      <div className="flex justify-center col-span-1" onClick={() => navigate('/profile')}>
        <div className="inline-flex justify-center items-center flex-col cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.6" stroke={`${location.pathname === '/profile' ? '#ec5e2a' : '#7F8184'}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.12 12.78a.963.963 0 0 0-.24 0 3.269 3.269 0 0 1-3.16-3.27c0-1.81 1.46-3.28 3.28-3.28a3.276 3.276 0 0 1 .12 6.55ZM18.74 19.38A9.934 9.934 0 0 1 12 22c-2.6 0-4.96-.99-6.74-2.62.1-.94.7-1.86 1.77-2.58 2.74-1.82 7.22-1.82 9.94 0 1.07.72 1.67 1.64 1.77 2.58Z"></path><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"></path></g></svg>
          <p className={`${location.pathname === '/profile' ? 'firago-bold text-orange-primary' : 'firago-medium text-gray-main'} text-xs leading-[14px] mt-1`}>Home</p>
        </div>
      </div>
      <div className="flex justify-center col-span-1" onClick={() => navigate('/cart')}>
        <div className="inline-flex justify-center items-center flex-col cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.6" stroke={`${location.pathname === '/cart' ? '#ec5e2a' : '#7F8184'}`} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"><path d="M2 2h1.74c1.08 0 1.93.93 1.84 2l-.83 9.96a2.796 2.796 0 0 0 2.79 3.03h10.65c1.44 0 2.7-1.18 2.81-2.61l.54-7.5c.12-1.66-1.14-3.01-2.81-3.01H5.82M16.25 22a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM8.25 22a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM9 8h12"></path></g></svg>
          <p className={`${location.pathname === '/cart' ? 'firago-bold text-orange-primary' : 'firago-medium text-gray-main'} text-xs leading-[14px] mt-1`}>Home</p>
        </div>
      </div>
    </div>
  )
}
