'use client'

import React, { useState } from 'react'

const ShopPage = () => {
  const [something, setSomething] = useState('asd')

  setSomething('asfdasfd')

  return <div>{something}</div>
}

export default ShopPage
