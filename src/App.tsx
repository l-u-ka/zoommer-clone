import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PublicLayout } from "@src/layouts/PublicLayout/PublicLayout";
import { PrivateLayout } from "./layouts/PrivateLayout/PrivateLayout";
import { PrivateRoute } from "./features/PrivateRoute/PrivateRoute";

const Home = lazy(() => import("@src/views/Home/Home"));
const Products = lazy(() => import("@src/views/Products/ProductsPage"));
const ProductPage = lazy(()=> import("@src/views/ProductPage/ProductPage"));
const Cart = lazy(()=> import("@src/views/Cart/Cart"));
const ProfilePage = lazy(()=> import("@src/views/ProfilePage/ProfilePage"));
const AllCategories = lazy(()=> import("@src/views/AllCategories/AllCategories"))
const SearchResultsPage = lazy(()=> import("@src/views/SearchResultPage/SearchResultPage"))

function App() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/products/:category/:prodId" element={<ProductPage/>}/>
          <Route path="/products/search/:searchValue" element={<SearchResultsPage/>}/>
          <Route path="/all-categories" element={<AllCategories/>}/>
        </Route>
        <Route element={<PrivateLayout/>}>
          <Route path="/cart" element={<PrivateRoute children={<Cart/>}/>}/>
          <Route path="/profile" element={<PrivateRoute children={<ProfilePage/>}/>}/>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
