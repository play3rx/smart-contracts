## SportMonks F1 API Airnode Config

This repo contains the config files for the SportMonks's Airnode deployed on Goerli Testnet. It currently just supports the F1 API endpoints. For more info, you can refer to the API documentation [here](https://docs.sportmonks.com/formula-one/).

For the Hackathon, the API key is hardcoded within the Airnode and can be used for free by the Hackathon participants. Refer to `receipt.json` for the `airnodeAddress` and `airnodeXpub`


## How to use

Make sure to set your RRP Address in `deploy/deploy_RrpRequester.js` before deploying the `RrpRequester.sol`.

After setting the RRP Address, head over to `scripts/fund_rrp.js` and add your `airnodeAddress` and `airnodeXpub` again. This script is responsible for deriving your `sponsorWallet` and funding it.

After setting up the funding script, head over to `scripts/request_rrp.js` and add your `airnodeAddress`, `airnodeXpub`, `endpointId` (from the `config.json` file) and your parameters. The script uses `@api3/airnode-abi` to encode the parameters off-chain that are then passed to the `makeRequest` function of the Airnode.

- `endpointId` can be found in the `config.json` file in this directory. Make sure that it matches the endpoint you would want to use. Refer to the F1 SportMonks API documentation [here](https://docs.sportmonks.com/formula-one/).

- `encodedParamaters` are required to call the `makeRequest` function which specifies all the parameters that an endpoint needs. You would also have to specify the `_path` of the returned json object that needs to be picked up by the Airnode and `_type` specifies the datatype of the returned object.