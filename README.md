# wasm-hello-world

Web Assembly ["Hello World" example](https://wasmbyexample.dev/examples/hello-world/hello-world.rust.en-us.html).

## Setup

1. Have Rust and Cargo installed
1. Have NodeJS LTS installed (or run `nvm use`)
1. Clone the repo
1. Run `cargo install`
1. Run `npm ci`

## Commands

To generate the library, run:

```sh
$ wasm-pack build --target web
```

To run the dev server (after having generated the library), run:

```sh
$ npm start
```