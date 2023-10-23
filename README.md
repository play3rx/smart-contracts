## API3 Hackathon - Getting Started

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Getting Started with API3

This repo contains some basic contracts and scripts to get started with using and integrating API3's first-party oracles.

## Installation and Setup

Clone the repo:
```shell
git clone https://github.com/api3-ecosystem/getting-started.git && cd getting-started
```

To install all the dependencies, run the following command:
```shell
yarn
```

- Make `credentials.json` and add your mnemonic for the network/s you will work with. This wallet needs to be funded to cover the gas costs to deploy/use the contracts.

```bash
$ cp credentials.example.json credentials.json
```

## Deploying the Contracts

To compile and deploy the contracts:

```bash
$ yarn compile
```

```bash
$ yarn deploy
```

## Running the Scripts

### QRNG - Quantum Random Number Generator

To use the QRNG services, you'll first have to fund the `sponsorWallet` that will cover the gas cost of the fulfillment of the request. To fund your sponsorWallet, run:

```shell
yarn fund-qrng
```

To request a single random number from the QRNG Airnode:
    
```shell
yarn request-qrng:uint256
```

To request an array of random numbers:

```shell
yarn request-qrng:array
```

### Airnode RRP - Request-Response Protocol

If you want to make a request to an already deployed Airnode, make sure to set your parameters in `scripts/request_rrp` and run:

```shell
yarn request-rrp
```

### API3 dAPIs - Price feeds

To read the price of an asset from the API3 dAPIs, make sure to set your proxy address during deployment and run:

```shell
yarn read-dapi
```