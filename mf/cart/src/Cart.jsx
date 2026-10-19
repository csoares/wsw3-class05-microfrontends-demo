import { useEffect, useState } from "react";
import { euros } from "../../../mock/api";

// The same component as spa/src/Cart.jsx, but the lines do not come as a prop:
// the cart owns its state and fills it from the "cart:add" event. The event
// name and its payload (an item) are the whole contract with the catalogue.
export default function Cart() {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const onAdd = (e) => setLines((current) => [...current, e.detail]);
    window.addEventListener("cart:add", onAdd);
    return () => window.removeEventListener("cart:add", onAdd);
  }, []);

  const total = lines.reduce((sum, item) => sum + item.price, 0);

  return (
    <aside className="cart seam" data-seam="cart-mf · :4102" style={{ "--seam-colour": "#7d3cb5" }}>
      <h2>Cart</h2>
      {lines.length === 0 ? (
        <p className="muted">Empty. Add something from the catalogue.</p>
      ) : (
        <>
          <ul>
            {lines.map((item, i) => (
              <li key={i}><span>{item.name}</span><span>{euros(item.price)}</span></li>
            ))}
          </ul>
          <p className="total"><span>Total</span><span>{euros(total)}</span></p>
        </>
      )}
    </aside>
  );
}
