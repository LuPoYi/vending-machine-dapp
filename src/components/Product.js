const Product = ({ id, name, count, imageUrl, handlePurchaseOnClick }) => {
  return (
    <div style={{ width: '100px', textAlign: 'center' }}>
      <img style={{ width: '80px' }} src={imageUrl} alt="" />
      <button>buy</button>
    </div>
  )
}

export default Product
