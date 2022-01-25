import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [monitorText, setMonitorText] = useState('')
  const handleNumberOnClick = (number) => () =>
    monitorText.length === 1 && setMonitorText(`${monitorText}${number}`)
  const handleRowOnClick = (row) => () => setMonitorText(row)
  const handleConnectWalletOnClick = () => {
    toast('這邊會去連錢包')
    setMonitorText('')
  }
  const handlePurchaseOnClick = () => {
    toast('購買 - 走錢包付款流程')
  }

  return (
    <div className="App">
      <div class="machine">
        <div class="items">
          <div class="shelf" id="one">
            <p class="option A1">A1</p>
            <p class="option A2">A2</p>
            <p class="option A3">A3</p>
          </div>
          <div class="shelf" id="two">
            <p class="option B4">B4</p>
            <p class="option B5">B5</p>
            <p class="option B6">B6</p>
          </div>
          <div class="shelf" id="three">
            <p class="option C7">C7</p>
            <p class="option C8">C8</p>
            <p class="option C9">C9</p>
          </div>

          <div class="item">
            <img class="image eA1" src="https://picsum.photos/200" alt="" />
          </div>
          <div class="item">
            <img class="image eA2" src="https://picsum.photos/200" alt="" />
          </div>
          <div class="item">
            <img class="image eA3" src="https://picsum.photos/200" alt="" />
          </div>

          <div class="item">
            <img class="image eB4" src="https://picsum.photos/200" alt="" />
          </div>
          <div class="item">
            <img class="image eB5" src="https://picsum.photos/200" alt="" />
          </div>
          <div class="item">
            <img class="image eB6" src="https://picsum.photos/200" alt="" />
          </div>

          <div class="item">
            <img class="image eC7" src="https://picsum.photos/200" alt="" />
          </div>
          <div class="item">
            <img class="image eC8" src="https://picsum.photos/200" alt="" />
          </div>
          <div class="item">
            <img class="image eC9" src="https://picsum.photos/200" alt="" />
          </div>

          <div class="selector">
            <img
              class="picker pA1"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
              alt=""
            />
            <img
              class="picker pA2"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
              alt=""
            />
            <img
              class="picker pA3"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
              alt=""
            ></img>
            <img
              class="picker pB4"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
              alt=""
            />
            <img
              class="picker pB5"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
              alt=""
            />
            <img
              class="picker pB6"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
              alt=""
            />
            <img
              class="picker pC7"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
              alt=""
            />
            <img
              class="picker pC8"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
              alt=""
            />
            <img
              class="picker pC9"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
              alt=""
            />
          </div>
        </div>

        <div class="order">
          <div class="container">
            <input type="text" class="visualize" id="display" readonly value={monitorText} />
            <div class="buttons">
              {['A', 'B', 'C'].map((row) => (
                <button class="btn number" key={row} onClick={handleRowOnClick(row)}>
                  {row}
                </button>
              ))}
              {Array.from(Array(9), (_, i) => i + 1).map((number) => (
                <button class="btn number" key={number} onClick={handleNumberOnClick(number)}>
                  {number}
                </button>
              ))}
            </div>
            <button class="btn number" style={{ width: '100%' }} onClick={handlePurchaseOnClick}>
              購買
            </button>
          </div>
          <div class="coins" onClick={handleConnectWalletOnClick}>
            <div class="money">
              <div class="circle">投幣孔</div>
            </div>
          </div>
        </div>

        <div class="grab">
          <div class="rectangle">商品從這邊出來</div>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}

export default App
