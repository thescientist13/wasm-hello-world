import init from "./assets/wasm_hello_world.js";

document.addEventListener('DOMContentLoaded', async () => {
  const helloWorld = await init(new URL("./assets/wasm_hello_world_bg.wasm", import.meta.url).href);
  const form = document.querySelector('#add-form') as HTMLFormElement;
  const output = document.querySelector("#output") as HTMLElement;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const one = parseInt(formData.get('number-one') as string, 10);
    const two = parseInt(formData.get('number-two') as string, 10);
    const sum = helloWorld.add(one, two);

    output.textContent = `Result: ${one} + ${two} = ${sum}`;
  });
});