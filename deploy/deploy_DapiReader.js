const hre = require("hardhat");

module.exports = async () => {

    const DapiReader = await hre.deployments.deploy("DapiReader", {
        args: [],
        from: (await hre.getUnnamedAccounts())[0],
        log: true,
    });
    console.log(hre.network.name);
    console.log(`Deployed DapiReader at ${DapiReader.address}`);
    console.log(`DapiReader contract deployed!`);
    const DapiReaderContract = new hre.ethers.Contract(
        DapiReader.address,
        DapiReader.abi,
        hre.ethers.provider.getSigner()
    );

    // Set dAPI Proxy Address. Get the address from the https://market.api3.org/. This is the ETH/USD self-funded dAPI proxy on polygon mumbai.
    const DapiProxyAddress = "0x26690F9f17FdC26D419371315bc17950a0FC90eD";
    const setDapiProxy = await DapiReaderContract.setProxyAddress(DapiProxyAddress);
    await setDapiProxy.wait();

    console.log(`dAPI Proxy Address set to ${DapiProxyAddress}`);

    };