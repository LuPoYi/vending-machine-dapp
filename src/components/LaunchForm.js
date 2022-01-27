import { useState } from 'react'

const LaunchForm = ({ handleListItemForSaleOnClick }) => {
  const [name, setName] = useState('')
  const [count, setCount] = useState('')

  return (
    <div style={{ marginTop: 100 }}>
      <input
        type="text"
        placeholder="商品名稱"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <input
        type="number"
        placeholder="商品數量"
        value={count}
        onChange={(e) => setCount(e.target.value)}
      ></input>
      <button
        className="btn number"
        style={{ width: '100%' }}
        onClick={handleListItemForSaleOnClick({ name, count })}
      >
        上架
      </button>
    </div>
  )
}

export default LaunchForm
