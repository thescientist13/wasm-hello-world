/*
 *
 * Manages web standard resource related operations for WASM.
 * This is a Greenwood default plugin.
 *
 */
import fs from "node:fs/promises";
import type { Compilation, ResourcePlugin, Resource, Config, RollupPlugin } from "@greenwood/cli";
import type { Plugin } from 'rollup';

class StandardWasmResource implements Resource {
  compilation: Compilation;
  extensions: string[];
  contentType: string;

  constructor(compilation: Compilation) {
    this.compilation = compilation;
    this.extensions = ["wasm"];
    this.contentType = "application/wasm";
  }

  async shouldServe(url: URL, request: Request) {
    console.log('should serve', { url, env: process.env.__GWD_COMMAND__, headers: request.headers  });
    return url.protocol === "file:"
      && this.extensions.includes(url.pathname.split(".").pop() ?? '')
      // && (process.env.__GWD_COMMAND__ === 'build' && !request.headers.get('Accept')?.includes('text/javascript'));
  }

  async serve(url: URL) {
    console.log('SERVE!!!!', { url });
    const body = await fs.readFile(url);

    return new Response(body, {
      headers: {
        "Content-Type": this.contentType,
      },
    });
  }
}

function externalismWasmRollupPlugin(): Plugin {
  return {
    name: "greenwood-resource-loader",
    async resolveId(id) {
      if (id.endsWith(".wasm")) {
        return {
          id,
          external: true,
        };
      }
    },
  }
}

const greenwoodPluginStandardWasm = function(): [ResourcePlugin, RollupPlugin] {
  return [
    {
      type: "resource",
      name: "plugin-standard-wasm:resource",
      provider: (compilation) => new StandardWasmResource(compilation),
      isGreenwoodDefaultPlugin: true,
      isStandardStaticResource: true,
    }, {
      type: "rollup",
      name: "plugin-standard-wasm:rollup",
      provider: () => [],
    }
  ];
}

export default {
  plugins: [
    greenwoodPluginStandardWasm()
  ]
} satisfies Config;
