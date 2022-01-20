import logo from "./logo.svg";
import "./App.css";

function App() {
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
            ></img>
            <img
              class="picker pA2"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
            ></img>
            <img
              class="picker pA3"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
            ></img>
            <img
              class="picker pB4"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
            ></img>
            <img
              class="picker pB5"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
            ></img>
            <img
              class="picker pB6"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
            ></img>
            <img
              class="picker pC7"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
            ></img>
            <img
              class="picker pC8"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
            ></img>
            <img
              class="picker pC9"
              src="https://cdn-icons-png.flaticon.com/512/6142/6142218.png"
            ></img>
          </div>
        </div>

        <div class="order">
          <div class="container">
            <input type="text" class="visualize" id="display" readonly></input>
            <div class="buttons">
              <button class="btn letter" value="A">
                A
              </button>
              <button class="btn letter" value="B">
                B
              </button>
              <button class="btn letter" value="C">
                C
              </button>
              <button class="btn number" value="1">
                1
              </button>
              <button class="btn number" value="2">
                2
              </button>
              <button class="btn number" value="3">
                3
              </button>
              <button class="btn number" value="4">
                4
              </button>
              <button class="btn number" value="5">
                5
              </button>
              <button class="btn number" value="6">
                6
              </button>
              <button class="btn number" value="7">
                7
              </button>
              <button class="btn number" value="8">
                8
              </button>
              <button class="btn number" value="9">
                9
              </button>
            </div>
          </div>
          <div class="coins">
            <div class="money">
              <div class="circle"></div>
            </div>
          </div>
        </div>

        <div class="grab">
          <div class="rectangle"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
