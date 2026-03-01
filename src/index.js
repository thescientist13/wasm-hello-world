import init from "./assets/wasm_hello_world.js";

// async function getHelloWorldModule() {
//   return await init("./assets/wasm_hello_world_bg.wasm");
// }

// export { getHelloWorldModule };


// import { getHelloWorldModule } from './index.js';
//       let helloWorld;

//       console.log({ getHelloWorldModule });
//       (async function() {
//         try {
//           helloWorld = await getHelloWorldModule();
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       })();

document.addEventListener('DOMContentLoaded', async () => {
  const helloWorld = await init("./assets/wasm_hello_world_bg.wasm");
  const form = document.querySelector('#add-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const one = parseInt(form.get('number-one'), 10);
    const two = parseInt(form.get('number-two'), 10);
    const sum = helloWorld.add(one, two);

    document.querySelector("#output").textContent = `Result: ${one} + ${two} = ${sum}`;
  });
});