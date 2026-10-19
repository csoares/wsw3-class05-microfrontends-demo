import { useEffect, useState } from "react";
import { euros, listItems } from "../../../mock/api";

// Change this to "v2", run "npm run deploy:catalogue" and reload the micro
// frontend version: the new label appears without touching the shell or the
// cart. The SPA only changes when the whole app is built again.
const VERSION = "v1";

// The same component as spa/src/Catalogue.jsx. The only difference: there is
// no parent to hand the choice to, so it is announced as an event. Whoever
// cares (the cart, the shell's counter) listens; the catalogue knows neither.
export default function Catalogue() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    listItems().then(setItems);
  }, []);

  const add = (item) => window.dispatchEvent(new CustomEvent("cart:add", { detail: item }));

  return (
    <section
      className="catalogue seam"
      data-seam={`catalogue-mf · :4101 · ${VERSION}`}
      style={{ "--seam-colour": "#c0392b" }}
    >
      <h2>Catalogue</h2>
      {items === null ? (
        <p className="muted">Loading…</p>
      ) : (
        <div className="cards">
          {items.map((item) => (
            <article key={item.id} className="card">
              <h3>{item.name}</h3>
              <p>{item.reference} · {euros(item.price)}</p>
              <button type="button" onClick={() => add(item)}>Add</button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
