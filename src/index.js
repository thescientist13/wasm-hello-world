import init from "./assets/wasm_hello_world.js";

async function getHelloWorldModule() {
  return await init("./assets/wasm_hello_world_bg.wasm");
}

export { getHelloWorldModule };