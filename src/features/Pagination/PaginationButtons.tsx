import { useProductFiltersProvider } from "@src/providers/ProductFiltersProvider/useProductFiltersProvider";
import { useThemeProvider } from "@src/providers/ThemeProvider/useThemeProvider";
import { ConfigProvider, Pagination, PaginationProps, theme } from "antd";

export default function PaginationButtons({totalProducts}: {totalProducts: number}) {

  const {currentPage, setCurrentPage, pageSize} = useProductFiltersProvider()

  const onChange: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setCurrentPage(page)
  };

  const {lightMode} = useThemeProvider();
  const {defaultAlgorithm, darkAlgorithm} = theme;

  const configTheme = {
    algorithm: !lightMode ? darkAlgorithm : defaultAlgorithm,
    "components": {
      "Pagination": {
        "colorPrimary": "rgb(236, 94, 42)",
        "colorPrimaryHover": "rgb(236, 94, 42)"
      }
    }
  }

  return (
    <ConfigProvider theme={configTheme}>
      <Pagination current={currentPage} pageSize={pageSize} total={totalProducts} onChange={onChange}/>
    </ConfigProvider>
  )
}
