// The bridge between the shell and a slice: download the remote, call
// mount(element), and call the returned function on the way out. If the remote
// does not answer, only this zone says so - the rest of the page carries on.
import { useEffect, useRef, useState } from "react";

export default function RemoteZone({ name, load }) {
  const box = useRef(null);
  const [state, setState] = useState("loading");

  useEffect(() => {
    let unmount;
    let alive = true;

    load()
      .then((remote) => {
        if (!alive) return;
        unmount = remote.mount(box.current);
        setState("ready");
      })
      .catch((error) => {
        console.error(`remote "${name}" failed to load`, error);
        if (alive) setState("failed");
      });

    return () => {
      alive = false;
      // deferred: React refuses to unmount another root in the middle of a render.
      if (unmount) setTimeout(unmount, 0);
    };
  }, [name, load]);

  return (
    <div>
      {state === "loading" && <p className="muted">Loading the {name} section…</p>}
      {state === "failed" && (
        <p className="unavailable" role="alert">
          The <strong>{name}</strong> section is temporarily unavailable.
        </p>
      )}
      <div ref={box} />
    </div>
  );
}
