import { useProductsProvider } from '@src/providers/ProductsProvider/useProductsProvider';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Products() {
  
  const {category} = useParams();
  const {categories, setSelectedCategory} = useProductsProvider();

  useEffect(()=> {
    for (let cat of categories) {
      if(cat.name === category) {
        setSelectedCategory(cat)
      }
    }
  }, [categories])

  return (
    <div>{category}</div>
  )
}
