// The shell: the frame (banner, header, layout) and two zones. Compare with
// spa/src/App.jsx - there is no cart state here and no import of the
// catalogue or the cart: only their names, resolved at run time.
import { useEffect, useState } from "react";
import RemoteZone from "./RemoteZone";

// functions, not imports: each remote is only downloaded when its zone mounts.
const loadCatalogue = () => import("catalogue/mount");
const loadCart = () => import("cart/mount");

export default function App() {
  const [seams, setSeams] = useState(false);
  const [count, setCount] = useState(0);

  // the header counter listens to the same event the cart listens to. No store
  // shared between the slices: just the event.
  useEffect(() => {
    const onAdd = () => setCount((n) => n + 1);
    window.addEventListener("cart:add", onAdd);
    return () => window.removeEventListener("cart:add", onAdd);
  }, []);

  return (
    <div className={seams ? "seams" : undefined}>
      <div className="banner">
        <strong>Micro frontends</strong> a shell + two remotes · three builds · three deploys
        <label>
          <input type="checkbox" checked={seams} onChange={(e) => setSeams(e.target.checked)} /> show the seams
        </label>
        <a href="http://localhost:4000">see the SPA version →</a>
      </div>
      <div className="seam" data-seam="shell · :4100" style={{ "--seam-colour": "#555" }}>
        <header className="header">
          <strong>UFP Orders</strong>
          <span>Cart: {count}</span>
        </header>
        <main className="layout">
          <RemoteZone name="catalogue" load={loadCatalogue} />
          <RemoteZone name="cart" load={loadCart} />
        </main>
      </div>
    </div>
  );
}
