// The slice on its own, at http://localhost:4101 - with no shell at all. This
// is how its team works and tests it. The page look comes from the shared CSS;
// inside the shell, the shell brings it.
import { mount } from "./mount";
import "../../../mock/app.css";

mount(document.getElementById("standalone"));
