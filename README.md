## API3 Hackathon - Getting Started

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

[API3 Docs](https://docs.api3.org)

[Guides for QRNG, Airnode and dAPIs](https://docs.api3.org/guides/)

[API3 Discord](https://discord.com/channels/758003776174030948/765618225144266793)

## Getting Started with API3

This repo contains some basic contracts and scripts to get started with using and integrating API3's first-party oracles. This repo contains guides for:

- [QRNG](https://docs.api3.org/reference/qrng/)

- [Airnode](https://docs.api3.org/reference/airnode/latest/understand/)

- [dAPIs](https://docs.api3.org/reference/dapis/understand/)

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

Make sure to head over to all the scripts under `/deploy` and check the contract and airnode addresses. To compile and deploy the contracts:

```bash
$ yarn compile
```

```bash
$ yarn deploy
```

## Running the Scripts

### QRNG - Quantum Random Number Generator

To use the QRNG services, you'll first have to fund the `sponsorWallet` that will cover the gas cost of the fulfillment of the request. To read more about how QRNG works, [click here](https://docs.api3.org/guides/qrng/). To fund your `sponsorWallet`, run:

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

You can deploy an Airnode for any REST API and make a request to it on-chain. [Click here](https://docs.api3.org/guides/airnode/deploy-airnode/deploy-aws/) to read more about deploying an Airnode. If you want to make a request to an already deployed Airnode, make sure to set your parameters in `scripts/request_rrp` and run:

```shell
yarn request-rrp
```

Also check out [this guide](https://docs.api3.org/guides/airnode/calling-an-airnode/) to learn more about calling an Airnode.

The scripts in this repo are configured to make a request to the [SportMonks F1 API](https://docs.sportmonks.com/formula-one/) Airnode. You can check out the `config.json` under /`airnode-config` to see all the available endpoints for the Airnode.

### API3 dAPIs - Price feeds

Check out [this guide](https://docs.api3.org/guides/dapis/subscribing-self-funded-dapis/) to learn how to subscribe to self-funded dAPIs.
 To read the price of an asset from the API3 dAPIs, make sure to set your proxy address during deployment and run:

```shell
yarn read-dapi
```

You can also check [this guide](https://docs.api3.org/guides/dapis/read-a-dapi/) on how to read from a dAPI Proxy.