// The SPA: the catalogue and the cart are components of the same app. The
// cart lives in App's state and goes down as props - one tree, one React, one
// build. Compare with mf/shell/src/App.jsx.
import { useState } from "react";
import Catalogue from "./Catalogue";
import Cart from "./Cart";

export default function App() {
  const [seams, setSeams] = useState(false);
  // the shared state: plain useState, because everything is in the same tree.
  const [cart, setCart] = useState([]);
  const add = (item) => setCart((lines) => [...lines, item]);

  return (
    <div className={seams ? "seams" : undefined} style={{ "--seam-colour": "#2c6fbb" }}>
      <div className="banner">
        <strong>SPA</strong> one app · one build · one deploy · everything from :4000
        <label>
          <input type="checkbox" checked={seams} onChange={(e) => setSeams(e.target.checked)} /> show the seams
        </label>
        <a href="http://localhost:4100">see the micro frontend version →</a>
      </div>
      <div className="seam" data-seam="spa · one bundle · :4000">
        <header className="header">
          <strong>UFP Orders</strong>
          <span>Cart: {cart.length}</span>
        </header>
        <main className="layout">
          <Catalogue onAdd={add} />
          <Cart lines={cart} />
        </main>
      </div>
    </div>
  );
}
