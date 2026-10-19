// The mount contract: the shell calls mount(element) and keeps the function it
// returns, to unmount. The shell does not know this is React.
import { createRoot } from "react-dom/client";
import Catalogue from "./Catalogue";

export function mount(element) {
  const root = createRoot(element);
  root.render(<Catalogue />);
  return () => root.unmount();
}
