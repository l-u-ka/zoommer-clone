import { Modal } from "antd";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import closeIcon from '@src/assets/icons/close.png'
import FilterProducts from "./FilterProducts";


interface FilterProductsMobileProps {
    isModalOpen: boolean;
    handleCancel: ()=>void;
}

export default function FilterProductsMobile({isModalOpen, handleCancel}: FilterProductsMobileProps) {

    const isDesktop = useMediaQuery({ minWidth: 1024 });

    useEffect(()=> {
        if (isDesktop) {
            handleCancel();
        }
    }, [isDesktop])

    return (
        <Modal open={isModalOpen} onCancel={handleCancel} footer={false} width={'75vw'} closeIcon={false}
            style={{
                margin: 0,
                top: 0,
                right: 0,
                position: 'absolute',
            }}
            styles={{
                body: {
                    height: 'calc(100vh - 55px)', // Adjusted for title bar height
                    // overflowY: 'auto', // Enable vertical scrolling if content exceeds height
                }
            }}
            >
            <div className="w-full">
               <FilterProducts closeModal={handleCancel}/>
            </div>
        </Modal>
    )
}
