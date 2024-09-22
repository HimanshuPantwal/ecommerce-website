import React, { useEffect } from 'react'
useEffect(()=>{
  fetch("https://fakestoreapi.com/products?limit=100")
  .then((res) => res.json())
  .then((json) => console.log(json));
},[])
function APIProduct() {
  return (
    <div>APIProduct</div>
  )
}

export default APIProduct