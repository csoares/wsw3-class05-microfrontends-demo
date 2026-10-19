// The mount contract: the shell calls mount(element) and keeps the function it
// returns, to unmount. The shell does not know this is React.
import { createRoot } from "react-dom/client";
import Cart from "./Cart";

export function mount(element) {
  const root = createRoot(element);
  root.render(<Cart />);
  return () => root.unmount();
}
