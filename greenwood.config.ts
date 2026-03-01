/*
 *
 * Manages web standard resource related operations for WASM.
 * This is a Greenwood default plugin.
 *
 */
import fs from "node:fs/promises";
import type { Compilation, ResourcePlugin, Resource, Config } from "@greenwood/cli";

class StandardWasmResource implements Resource {
  compilation: Compilation;
  extensions: string[];
  contentType: string;

  constructor(compilation: Compilation) {
    this.compilation = compilation;
    this.extensions = ["wasm"];
    this.contentType = "application/wasm";
  }

  async shouldServe(url: URL) {
    return url.protocol === "file:" && this.extensions.includes(url.pathname.split(".").pop() ?? '');
  }

  async serve(url: URL) {
    const body = await fs.readFile(url);

    return new Response(body, {
      headers: {
        "Content-Type": this.contentType,
      },
    });
  }
}

const greenwoodPluginStandardWasm = function(): [ResourcePlugin] {
  return [
    {
      type: "resource",
      name: "plugin-standard-wasm:resource",
      provider: (compilation) => new StandardWasmResource(compilation),
    },
  ];
}

export default {
  plugins: [
    greenwoodPluginStandardWasm()
  ]
} satisfies Config;
