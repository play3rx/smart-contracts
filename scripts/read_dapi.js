const hre = require('hardhat');

async function main() {

  const DapiReader = await hre.deployments.get("DapiReader");
  const DapiReaderContract = new hre.ethers.Contract(
    DapiReader.address,
    DapiReader.abi,
    hre.ethers.provider.getSigner()
  );
// Read from dAPI. Returns timestamp and latest updated value.
  const value = await DapiReaderContract.readDataFeed();
  console.log(value);
  }
  main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });