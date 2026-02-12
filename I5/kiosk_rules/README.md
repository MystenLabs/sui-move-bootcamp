# Kiosk Package

> Copied from https://github.com/MystenLabs/apps

Includes collection of transfer policies, kiosk extensions and libraries to work with all of them. It is meant to act as a Kiosk Sui Move monorepo with a set release cycle and a very welcoming setting for external contributions.

> `main` branch contains the latest release published on `mainnet` environment. The `testnet` branch contains the latest release published on `testnet` environment.

## Published Envs

Both _mainnet_ and _testnet_ branches are published, to use them, add the following to your `Move.toml`:

For testnet:
```toml
[dependencies]
kiosk = { git = "https://github.com/MystenLabs/apps.git", subdir = "kiosk", rev = "testnet" }
```

For mainnet:
```toml
[dependencies]
kiosk = { git = "https://github.com/MystenLabs/apps.git", subdir = "kiosk", rev = "main" }
```

## Contributing

We welcome contributions to the Kiosk package. If there's a feature you'd like to see or a bug you'd like to fix, the best way to make that happen is to implement it and submit a pull request. We'll do our best to work with you to get your changes included in the project. We guarantee the [Kiosk SDK](https://www.npmjs.com/package/@mysten/kiosk) support for all rules in this repository.
