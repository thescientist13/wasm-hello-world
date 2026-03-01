import init from "./pkg/wasm_hello_world.js";

async function getHelloWorldModule() {
  return await init("./pkg/wasm_hello_world_bg.wasm");
}

export { getHelloWorldModule };