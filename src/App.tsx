import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PublicLayout } from "@src/layouts/PublicLayout/PublicLayout";
import Cart from "./views/Cart/Cart";

const Home = lazy(() => import("@src/views/Home/Home"));
const Products = lazy(() => import("@src/views/Products/Products"));

function App() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart/>}/>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
