import { ConfigProvider, Modal } from "antd";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import FilterProducts from "./FilterProducts";
import { SortEnum } from "@src/@types/types";
import { useThemeProvider } from "@src/providers/ThemeProvider/useThemeProvider";


interface FilterProductsMobileProps {
    isModalOpen: boolean;
    handleCancel: ()=>void;
    setSortOrder: React.Dispatch<React.SetStateAction<SortEnum>>;
}

export default function FilterProductsMobile({isModalOpen, handleCancel, setSortOrder}: FilterProductsMobileProps) {
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const {lightMode} = useThemeProvider();

    const configTheme = {
        "components": {
            "Modal": {
              "contentBg": lightMode ? "#FFFFFF" : "rgb(24, 26, 27)"
            },
          }
    }

    useEffect(()=> {
        if (isDesktop) handleCancel();
    }, [isDesktop])  // if user changes from mobile to desktop, close the modal

    return (
        <ConfigProvider theme={configTheme}>
            <Modal open={isModalOpen} onCancel={handleCancel} maskClosable={true} footer={false} width={'75vw'} closeIcon={false}
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
                    <FilterProducts closeModal={handleCancel} setSortOrder={setSortOrder}/>
                </div>
            </Modal>
        </ConfigProvider>
    )
}
