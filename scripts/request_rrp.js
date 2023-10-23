const hre = require('hardhat');
const airnodeAdmin = require('@api3/airnode-admin');
const { encode } = require ('@api3/airnode-abi');

async function main() {
  const RrpRequester = await hre.deployments.get('RrpRequester');
  const RrpRequesterContract = new hre.ethers.Contract(RrpRequester.address, RrpRequester.abi, (await hre.ethers.getSigners())[0]);

  // Set the request parameters for your Airnode Request.
  const airnodeAddress = "";
  const airnodeXpub = "";
  const endpointId = "";
  const sponsor = RrpRequester.address;
  const sponsorWallet = await airnodeAdmin.deriveSponsorWalletAddress(
    airnodeXpub,
    airnodeAddress,
    sponsor
  );
  // Encode your API Params. Check out the docs for more info https://docs.api3.org/reference/airnode/latest/specifications/airnode-abi.html
  const params = [
    { type: 'string', name: '', value: '' }, { type: 'string', name: '', value: '' }, { type: 'string', name: '_path', value: '' }, { type: 'string', name: '_type', value: 'int256' }
    ];
  const encodedParameters = encode(params);

  // Make a request...
  const receipt = await RrpRequesterContract.makeRequest(airnodeAddress, endpointId, sponsor, sponsorWallet, encodedParameters, {gasLimit: 500000});
  console.log('Created a request transaction, waiting for it to be confirmed...');
  // and read the logs once it gets confirmed to get the request ID
  const requestId = await new Promise((resolve) =>
    hre.ethers.provider.once(receipt.hash, (tx) => {
      // We want the log from RrpRequesterContract
      const log = tx.logs.find((log) => log.address === RrpRequesterContract.address);
      const parsedLog = RrpRequesterContract.interface.parseLog(log);
      resolve(parsedLog.args.requestId);
    })
  );
  console.log(`Transaction is confirmed, request ID is ${requestId}`);

  // Wait for the fulfillment transaction to be confirmed and read the logs to get the random number
  console.log('Waiting for the fulfillment transaction...');
  const log = await new Promise((resolve) =>
    hre.ethers.provider.once(RrpRequesterContract.filters.RequestFulfilled(requestId, null), resolve)
  );
  const parsedLog = RrpRequesterContract.interface.parseLog(log);
  const decodedData = parsedLog.args.response;
  console.log(`Fulfillment is confirmed, decodedData is ${decodedData.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });