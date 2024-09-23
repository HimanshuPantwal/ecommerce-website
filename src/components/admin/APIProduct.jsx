import { Timestamp } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/myContext';

function APIProduct() {
  const { product, setProduct,loading,setLoading } = useContext(myContext);
  
  return (
    <div>APIProduct
      <div></div>
    </div>
  )
}

export default APIProduct