const hre = require('hardhat');
const airnodeAdmin = require('@api3/airnode-admin');
const { getApi } = require('../scripts/apis.js');

async function main() {

const amounts = {
  mainnet: { value: 0.05, unit: 'ETH' },
  arbitrum: { value: 0.01, unit: 'ETH' },
  avalanche: { value: 0.2, unit: 'AVAX' },
  bsc: { value: 0.003, unit: 'BNB' },
  fantom: { value: 1, unit: 'FTM' },
  gnosis: { value: 1, unit: 'xDAI' },
  metis: { value: 0.01, unit: 'METIS' },
  milkomeda: { value: 1, unit: 'milkADA' },
  moonbeam: { value: 0.1, unit: 'GLMR' },
  moonriver: { value: 0.01, unit: 'MOVR' },
  optimism: { value: 0.01, unit: 'ETH' },
  polygon: { value: 10, unit: 'MATIC' },
  rsk: { value: 0.0001, unit: 'RBTC' },
  base: { value: 0.01, unit: 'ETH' },
  mantle: { value: 10.00, unit: 'MNT' },
  linea: { value: 0.01, unit: 'ETH' },
  'polygon-zkevm': { value: 0.01, unit: 'ETH' },
  goerli: { value: 0.2, unit: 'ETH' },
  sepolia: { value: 0.05, unit: 'SEP' },
  'rsk-testnet': { value: 0.001, unit: 'RBTC' },
  'gnosis-testnet': { value: 0.05, unit: 'xDAI' },
  'bsc-testnet': { value: 0.005, unit: 'BNB' },
  'optimism-testnet': { value: 0.05, unit: 'ETH' },
  'moonbase-testnet': { value: 0.1, unit: 'GLMR' },
  'fantom-testnet': { value: 0.5, unit: 'FTM' },
  'avalanche-testnet': { value: 0.3, unit: 'AVAX' },
  'mumbai': { value: 0.05, unit: 'MATIC' },
  'milkomeda-testnet': { value: 0.5, unit: 'milkADA' },
  'arbitrum-testnet': { value: 0.01, unit: 'ETH' },
};

  const apiData = getApi(hre.network);
  const account = (await hre.ethers.getSigners())[0];
  const QrngRequester = await hre.deployments.get('QrngRequester');
  const QrngRequesterContract = new hre.ethers.Contract(QrngRequester.address, QrngRequester.abi, account);

  // We are deriving the sponsor wallet address from the QrngRequester contract address
  // using the @api3/airnode-admin SDK. You can also do this using the CLI
  // https://docs.api3.org/airnode/latest/reference/packages/admin-cli.html
  // Visit our docs to learn more about sponsors and sponsor wallets
  // https://docs.api3.org/airnode/latest/concepts/sponsor.html
  const sponsorWalletAddress = await airnodeAdmin.deriveSponsorWalletAddress(
    apiData.xpub,
    apiData.airnode,
    QrngRequester.address
  );

  const amountInEther = amounts[hre.network.name].value;
  const receipt = await account.sendTransaction({
    to: sponsorWalletAddress,
    value: hre.ethers.utils.parseEther(amountInEther.toString()),
  });
  console.log(
    `Funding sponsor wallet at ${sponsorWalletAddress} with ${amountInEther} ${amounts[hre.network.name].unit}...`
  );
  await new Promise((resolve) =>
    hre.ethers.provider.once(receipt.hash, () => {
      resolve();
    })
  );
  console.log('Sponsor wallet funded');
};

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});