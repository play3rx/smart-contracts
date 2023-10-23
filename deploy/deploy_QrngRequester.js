const hre = require("hardhat");
const credentials = require("../credentials.json");
const airnodeAdmin = require('@api3/airnode-admin');
const { getApi } = require('../scripts/apis.js');

module.exports = async () => {
    const apiData = getApi(hre.network);
    // AirnodeRRP Contract address. Get the address for your chain from the https://docs.api3.org/
    airnodeRrp = "0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd";
    const QrngRequester = await hre.deployments.deploy("QrngRequester", {
        args: [airnodeRrp],
        from: (await hre.getUnnamedAccounts())[0],
        log: true,
    });
    console.log(`Deployed QrngRequester at ${QrngRequester.address}`);
    console.log(`QrngRequester contract deployed!`);
    const QrngRequesterContract = new hre.ethers.Contract(
        QrngRequester.address,
        QrngRequester.abi,
        hre.ethers.provider.getSigner()
    );

    // Set the request parameters for your QRNG Request. QRNG Parameters are set in ../scripts/apis.js. You can find the addresses yourself at https://docs.api3.org/
    // Also deriving the sponsorWalletAddress from the xpub, airnode and airnodeRrp address using @api3/airnode-admin.
    const sponsorWalletAddress = await airnodeAdmin.deriveSponsorWalletAddress(
        apiData.xpub,
        apiData.airnode,
        QrngRequester.address
      );

      const receipt = await QrngRequesterContract.setRequestParameters(
        apiData.airnode,
        apiData.endpointIdUint256,
        apiData.endpointIdUint256Array,
        sponsorWalletAddress,
        {gasLimit: 500000}
      );
      console.log('Setting QRNG request parameters...');
      await new Promise((resolve) =>
        hre.ethers.provider.once(receipt.hash, () => {
          resolve();
        })
      );
      console.log('QRNG Request parameters set');
    };