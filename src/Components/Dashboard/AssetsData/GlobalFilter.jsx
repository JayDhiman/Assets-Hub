import React from 'react'
import Input from '../../Input'

const GlobalFilter = ({filter,setFilter}) => {
  return (
<>

<Input

  value={filter || ""}
  onChange={(e) => setFilter(e.target.value)}

/>
</>
  )
}

export default GlobalFilter