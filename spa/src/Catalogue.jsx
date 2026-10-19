import { useEffect, useState } from "react";
import { euros, listItems } from "../../mock/api";

// The same component as mf/catalogue/src/Catalogue.jsx. The only difference:
// here the choice goes to the parent through a prop (onAdd).
export default function Catalogue({ onAdd }) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    listItems().then(setItems);
  }, []);

  return (
    <section className="catalogue">
      <h2>Catalogue</h2>
      {items === null ? (
        <p className="muted">Loading…</p>
      ) : (
        <div className="cards">
          {items.map((item) => (
            <article key={item.id} className="card">
              <h3>{item.name}</h3>
              <p>{item.reference} · {euros(item.price)}</p>
              <button type="button" onClick={() => onAdd(item)}>Add</button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
