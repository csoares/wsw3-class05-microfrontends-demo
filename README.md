# Demo — the same app, as a SPA and as micro frontends

For the end of the class: one small app (a catalogue and a cart) built twice. On screen the two
versions are the same app. What changes is how they are built, published and wired together, and
what happens when a part fails. The data is mocked (`mock/api.js`), so there is no backend to start.

## Run it

```bash
npm install
npm start
```

| Version | URL | What it is |
|---|---|---|
| SPA | http://localhost:4000 | one Vite project, one build, one deploy |
| Micro frontends | http://localhost:4100 | the shell: frame, header and two zones |
| catalogue remote | http://localhost:4101 | the catalogue slice, on its own |
| cart remote | http://localhost:4102 | the cart slice, on its own |

`npm start` builds the four apps and serves each one on its own port, as if each were published
by a different team. Ctrl+C stops everything.

## What to show, in this order

1. **They look the same.** Open 4000 and 4100 side by side and add a few items in each. The user
   cannot tell them apart.
2. **Show the seams.** Tick «show the seams» in both. The SPA is one block served from :4000. The
   micro frontend version is three pieces: the shell (:4100), the catalogue (:4101) and the cart
   (:4102). In DevTools → Network, the browser downloads `remoteEntry.js` from 4101 and from 4102.
3. **How they talk.** In `spa/src/App.jsx` the cart is a `useState` passed down as props. In the
   micro frontend version nothing is shared: the catalogue fires `cart:add`
   (`mf/catalogue/src/Catalogue.jsx`), and the cart and the header counter listen for it. The
   event name and its payload are the whole contract.
4. **Each slice runs on its own.** Open 4101 and 4102: the team works and tests without the shell.
5. **Deploy one slice.** In `mf/catalogue/src/Catalogue.jsx`, change `VERSION` to `"v2"`, run
   `npm run deploy:catalogue` in a second terminal, and reload 4100 with the seams on. The label
   now says `v2`, and neither the shell nor the cart was built again. In the SPA, any change
   means building and publishing the whole app. Put it back to `"v1"` afterwards.
6. **A slice fails.** Stop everything and start without the cart: `npm start -- --without cart`.
   On 4100 the cart zone says «The cart section is temporarily unavailable.», while the catalogue
   works and the header counter still counts. Start the cart in another terminal
   (`npm start -- --only cart`) and reload: it is back. In the SPA there is nothing to switch off.
   It is one piece: it all works or none of it does.

## And the cost

End with this. The micro frontend version has three projects, three builds, three ports, a
federation config with React shared as a `singleton`, a bridge (`mf/shell/src/RemoteZone.jsx`)
and an event contract to document. For one team, that is pure overhead: the SPA is the right
answer. Micro frontends pay off when several teams need to publish their part of the same product
without waiting for each other.

## The files

| File | What it does |
|---|---|
| `mock/api.js`, `mock/app.css` | the mocked data and the look, the same for both versions |
| `spa/src/App.jsx`, `Catalogue.jsx`, `Cart.jsx` | the SPA: components of one tree, state as props |
| `mf/shell/vite.config.js` | the host: the names and URLs of the remotes, React shared |
| `mf/shell/src/App.jsx`, `RemoteZone.jsx` | the frame, the counter, and mounting each remote with a fallback |
| `mf/catalogue/`, `mf/cart/` | the two remotes: `vite.config.js` exposes `./mount`; `src/mount.jsx` is the contract |
| `start.js` | builds and serves the four apps (`--without <name>`, `--only <name>`) |

Ports 4000 and 4100–4102 were picked to stay clear of 5000 (AirPlay on macOS) and of the
examples' 5001/5002 and 8080/8081, so the demo can run while an example is still up.
