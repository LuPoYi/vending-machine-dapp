import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { ToastContainer, toast } from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { injected } from './components/wallet/connectors'
import LaunchForm from './components/LaunchForm'
import Product from './components/Product'

import VendingMachineAbi from './abis/VendingMachine.json'

function App() {
  const contractAddress = '0xaf9c08912cc04c0556c643fa7216ade32ea36506'
  const provider = new ethers.getDefaultProvider(4)
  const [monitorText, setMonitorText] = useState('')
  const [signer, setSigner] = useState()
  const [contractWithProvider, setContractWithProvider] = useState()
  const [contractWithSigner, setContractWithSigner] = useState()
  const [products, setProducts] = useState([])
  const { active, account, library, chainId, activate, deactivate } = useWeb3React()

  const fetchProducts = async (provider) => {
    let _products = []
    const tokenID = (await provider.tokenID()).toString()

    for (let i = 1; i <= tokenID; i++) {
      const _product = await provider.stores(i)
      _products.push({ name: _product.name, count: _product.count.toString() })
    }

    setProducts(_products)
  }

  useEffect(() => {
    const fetchContract = async () => {
      const _signer = library.getSigner()
      setSigner(_signer)

      const _contractWithSigner = new ethers.Contract(
        contractAddress,
        VendingMachineAbi.abi,
        _signer
      )
      setContractWithSigner(_contractWithSigner)

      const _contractWithProvider = new ethers.Contract(
        contractAddress,
        VendingMachineAbi.abi,
        provider
      )
      setContractWithProvider(_contractWithProvider)

      // fetch products and build the view
      fetchProducts(_contractWithProvider)
    }

    if (library) fetchContract()
  }, [library, account])

  const handleNumberOnClick = (number) => () =>
    monitorText.length === 1 && setMonitorText(`${monitorText}${number}`)

  const handleRowOnClick = (row) => () => setMonitorText(row)

  const handleConnectWalletOnClick = async () => {
    toast('這邊會去連錢包')
    try {
      await activate(injected)
    } catch (ex) {
      console.log('ex', ex)
    }
    setMonitorText('')
  }

  const handleDisconnectWalletOnClick = async () => {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  const handlePurchaseOnClick = async () => {
    if (!active) return
    toast('購買 - 走錢包付款流程')

    const tx = await contractWithSigner.purchase(monitorText.replace(/[^\d]/g, ''))
    toast(tx)
    await tx.wait()
    toast('confirm!')

    // rebuild view
    fetchProducts(contractWithProvider)
  }

  const handleListItemForSaleOnClick =
    ({ name, count }) =>
    async () => {
      if (!active) return
      toast('上架')

      const tx = await contractWithSigner.listItemForSale(name, count)
      toast(tx)
      await tx.wait()
      toast('confirm!')

      fetchProducts(contractWithProvider)
    }

  return (
    <div className="App">
      <div className="machine">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {products.map(({ name, count }, index) => (
            <Product key={index} imageUrl={`https://fakeimg.pl/200x200/?text=${name}_${count}`} />
          ))}
        </div>

        <div className="order">
          <div className="container">
            <input type="text" className="visualize" id="display" readOnly value={monitorText} />
            <div className="buttons">
              {['A', 'B', 'C'].map((row) => (
                <button className="btn number" key={row} onClick={handleRowOnClick(row)}>
                  {row}
                </button>
              ))}
              {Array.from(Array(9), (_, i) => i + 1).map((number) => (
                <button className="btn number" key={number} onClick={handleNumberOnClick(number)}>
                  {number}
                </button>
              ))}
            </div>
            <button
              className="btn number"
              style={{ width: '100%' }}
              onClick={handlePurchaseOnClick}
            >
              購買
            </button>

            <button
              className="btn number"
              style={{ width: '100%' }}
              onClick={handleListItemForSaleOnClick}
            >
              上架
            </button>
          </div>
          <div className="coins">
            {active ? (
              <div className="money" onClick={handleDisconnectWalletOnClick}>
                <div className="circle">
                  {account} <br />
                  Disconnect
                </div>
              </div>
            ) : (
              <div className="money" onClick={handleConnectWalletOnClick}>
                <div className="circle">投幣孔</div>
              </div>
            )}
          </div>
        </div>

        <div className="grab">
          <div className="rectangle">商品從這邊出來</div>
        </div>
      </div>

      <LaunchForm handleListItemForSaleOnClick={handleListItemForSaleOnClick} />

      <ToastContainer />
    </div>
  )
}

export default App
