import { useParams } from "react-router-dom"

export default function ProductPage() {

    const {prodId} = useParams();
    console.log(prodId)
  return (
    <div>ProductPage</div>
  )
}
