import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { ToastContainer, toast } from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { injected } from './components/wallet/connectors'
import LaunchForm from './components/LaunchForm'
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
        <div className="items">
          <div className="shelf" id="one">
            <p className="option A1">A1</p>
            <p className="option A2">A2</p>
            <p className="option A3">A3</p>
          </div>
          <div className="shelf" id="two">
            <p className="option B4">B4</p>
            <p className="option B5">B5</p>
            <p className="option B6">B6</p>
          </div>
          <div className="shelf" id="three">
            <p className="option C7">C7</p>
            <p className="option C8">C8</p>
            <p className="option C9">C9</p>
          </div>

          {products.map(({ name, count }, index) => (
            <div className="item" key={index}>
              <img
                className={`image eA${index + 1}`}
                src={`https://fakeimg.pl/200x200/?text=${name}_${count}`}
                alt=""
              />
            </div>
          ))}

          <div className="item">
            <img className="image eB4" src="https://picsum.photos/200" alt="" />
          </div>
          <div className="item">
            <img className="image eB5" src="https://picsum.photos/200" alt="" />
          </div>
          <div className="item">
            <img className="image eB6" src="https://picsum.photos/200" alt="" />
          </div>

          <div className="item">
            <img className="image eC7" src="https://picsum.photos/200" alt="" />
          </div>
          <div className="item">
            <img className="image eC8" src="https://picsum.photos/200" alt="" />
          </div>
          <div className="item">
            <img className="image eC9" src="https://picsum.photos/200" alt="" />
          </div>

          {/* <div className="selector">
            <img
              className="picker pA1"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
              alt=""
            />
            <img
              className="picker pA2"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
              alt=""
            />
            <img
              className="picker pA3"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
              alt=""
            ></img>
            <img
              className="picker pB4"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
              alt=""
            />
            <img
              className="picker pB5"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
              alt=""
            />
            <img
              className="picker pB6"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
              alt=""
            />
            <img
              className="picker pC7"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
              alt=""
            />
            <img
              className="picker pC8"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
              alt=""
            />
            <img
              className="picker pC9"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
              alt=""
            />
          </div> */}
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
