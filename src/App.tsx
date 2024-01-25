import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PublicLayout } from "@src/layouts/PublicLayout/PublicLayout";
import { PrivateRoute } from "./features/PrivateRoute/PrivateRoute";

const Home = lazy(() => import("@src/views/Home/Home"));
const Products = lazy(() => import("@src/views/Products/Products"));
const Cart = lazy(()=> import("@src/views/Cart/Cart"));
const ProfilePage = lazy(()=> import("@src/views/ProfilePage/ProfilePage"));
const AllCategories = lazy(()=> import("@src/views/AllCategories/AllCategories"))

function App() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/products"/>
          <Route path="/all-categories" element={<AllCategories/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/profile" element={<PrivateRoute children={<ProfilePage/>}/>}/>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
