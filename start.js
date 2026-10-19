// Builds the four apps and serves them, each on its own port, as if each were
// published by a different team:
//
//   node start.js                    # everything
//   node start.js --without cart     # everything except the cart remote
//   node start.js --only cart        # just the cart remote (in a second terminal)
//
// Node standard library only. Ctrl+C stops every server.
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const APPS = [
  { name: "spa", config: "spa/vite.config.js", url: "http://localhost:4000" },
  { name: "catalogue", config: "mf/catalogue/vite.config.js", url: "http://localhost:4101" },
  { name: "cart", config: "mf/cart/vite.config.js", url: "http://localhost:4102" },
  { name: "shell", config: "mf/shell/vite.config.js", url: "http://localhost:4100" },
];

const args = process.argv.slice(2);
const flag = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const only = flag("--only");
const without = flag("--without");
const apps = APPS.filter((app) => (only ? app.name === only : app.name !== without));

const vite = fileURLToPath(new URL("node_modules/vite/bin/vite.js", import.meta.url));
const here = fileURLToPath(new URL(".", import.meta.url));
const children = [];

function run(app, command) {
  const child = spawn(process.execPath, [vite, command, "--config", app.config], { cwd: here });
  children.push(child);
  const prefix = `[${app.name}]`.padEnd(12);
  const print = (chunk) =>
    chunk.toString().split("\n").filter(Boolean).forEach((line) => console.log(prefix + line));
  child.stdout.on("data", print);
  child.stderr.on("data", print);
  return new Promise((resolve, reject) =>
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${app.name}: ${command} failed`))))
  );
}

process.on("SIGINT", () => {
  children.forEach((child) => child.kill());
  process.exit(0);
});

// one build at a time keeps the output readable; then all the servers at once.
for (const app of apps) await run(app, "build");
apps.forEach((app) => run(app, "preview").catch(() => {}));

console.log("\nReady:");
apps.forEach((app) => console.log(`  ${app.name.padEnd(10)} ${app.url}`));
console.log("\nCtrl+C stops everything.\n");
