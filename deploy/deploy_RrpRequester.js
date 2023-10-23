const hre = require("hardhat");
const airnodeAdmin = require('@api3/airnode-admin');
const { getApi } = require('../scripts/apis.js');

module.exports = async () => {
    const apiData = getApi(hre.network);
    // AirnodeRRP Contract address. Get the address for your chain from the https://docs.api3.org/
    airnodeRrp = "0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd";
    const RrpRequester = await hre.deployments.deploy("RrpRequester", {
        args: [airnodeRrp],
        from: (await hre.getUnnamedAccounts())[0],
        log: true,
    });
    console.log(`Deployed RrpRequester at ${RrpRequester.address}`);
    console.log(`RrpRequester contract deployed!`);
    const RrpRequesterContract = new hre.ethers.Contract(
        RrpRequester.address,
        RrpRequester.abi,
        hre.ethers.provider.getSigner()
    );
};