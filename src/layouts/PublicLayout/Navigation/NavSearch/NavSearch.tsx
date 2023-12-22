import searchIcon from '../../../../assets/icons/main-search.png'
export default function NavSearch() {
  return (
    <div className='flex items-center relative'>
        <img src={searchIcon} alt='search icon' className='absolute left-3 w-[20px]'/>
        <input type="text" placeholder="ძიება" className='py-[12px] pl-[40px] pr-[25px] w-[460px] border-solid border rounded-xl text-sm firago-normal border-orange-primary'/>
    </div>
  )
}
