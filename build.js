/**
 * Build Script for LCARS UI Component Library
 * Uses esbuild for fast bundling
 */

import esbuild from "esbuild";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isWatch = process.argv.includes("--watch");

// Common build options
const commonOptions = {
  bundle: true,
  format: "esm",
  minify: !isWatch,
  sourcemap: true,
  target: ["es2022"],
  logLevel: "info",
};

async function build() {
  try {
    // Build main library bundle
    await esbuild.build({
      ...commonOptions,
      entryPoints: [join(__dirname, "src/index.js")],
      outfile: join(__dirname, "dist/lcars-ui.js"),
    });

    console.log("✓ Built dist/lcars-ui.js");

    // Build polyfills bundle separately
    await esbuild.build({
      ...commonOptions,
      entryPoints: [join(__dirname, "src/polyfills/index.js")],
      outfile: join(__dirname, "dist/polyfills.js"),
      external: ["@webcomponents/webcomponentsjs/*"],
    });

    console.log("✓ Built dist/polyfills.js");

    if (isWatch) {
      console.log("\n👀 Watching for changes...");
    }
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

// Watch mode
if (isWatch) {
  const ctx = await esbuild.context({
    ...commonOptions,
    entryPoints: [join(__dirname, "src/index.js")],
    outfile: join(__dirname, "dist/lcars-ui.js"),
  });

  await ctx.watch();
  console.log("👀 Watching for changes...");
} else {
  await build();
}
