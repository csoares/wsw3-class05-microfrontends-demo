import { euros } from "../../mock/api";

// The same component as mf/cart/src/Cart.jsx, minus the event listener: here
// the lines arrive as a prop.
export default function Cart({ lines }) {
  const total = lines.reduce((sum, item) => sum + item.price, 0);

  return (
    <aside className="cart">
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
