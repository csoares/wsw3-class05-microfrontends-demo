// The mock API: the same items as the catalogue stub of example 01, with a
// small delay so that the "loading" state is visible. Both versions of the app
// (the SPA and the catalogue micro frontend) import this file, so the data can
// never be the reason they look different.
const ITEMS = [
  { id: 1, reference: "ABC-123", name: "M6 screw", price: 0.12 },
  { id: 2, reference: "ABC-124", name: "M6 nut", price: 0.05 },
  { id: 3, reference: "DEF-310", name: "Steel hinge", price: 2.4 },
  { id: 4, reference: "DEF-311", name: "Drawer runner", price: 7.9 },
];

export function listItems() {
  return new Promise((resolve) => setTimeout(() => resolve(ITEMS), 400));
}

export const euros = (value) =>
  value.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
