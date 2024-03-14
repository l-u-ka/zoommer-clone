import errorImg from '@src/assets/images/404.png'
import PrimaryButton from '@src/components/PrimaryButton/PrimaryButton'
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
    const navigate = useNavigate();

    return (
        <div className='custom-container pt-[30px] pb-[60px] min-h-[80vh] flex flex-col items-center'>
            <img src={errorImg} alt='error image' className='w-full md:w-[70%] rounded-xl mb-10'/>
            <PrimaryButton onClick={()=>{navigate('/')}} height={50} width='300px'><p className='firago-normal text-sm leading-[17px]'><FormattedMessage id='go.back.home'/></p></PrimaryButton>
        </div>
  )
}
