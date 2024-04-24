const ethers = require('ethers');
const fs = require('fs');
require('dotenv').config();

(async () => {
  const provider = new ethers.JsonRpcProvider('https://rpc1.mainnet.lachain.network')

  // Use your wallet's private key to deploy the contract
  const privateKey = process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider)
  const metadata = JSON.parse(fs.readFileSync('./v2-periphery-69617118cda519dab608898d62aaa79877a61004/build/UniswapV2Router02.json').toString())
  const price = (await provider.getFeeData()).gasPrice
  // console.log({ gasPrice: gasPrice.toString() });
  // Set gas limit and gas price, using the default Ropsten provider
  // const price = ethers.utils.formatUnits(await provider.getGasPrice(), 'gwei')
  const options = { gasLimit: 100000, gasPrice: price }

  // Deploy the contract
  const factory = new ethers.ContractFactory(metadata.abi, metadata.evm.bytecode.object, wallet)
  const contract = await factory.deploy("0xCEaB4e71463c643B7E5776D14995D8015e1Fa14b", "0xdcb679Ac6C72d438e66D39f3FB3364dED7254FC9")
  await contract.waitForDeployment()
  console.log(`Deployment successful! Contract Address: ${await contract.getAddress()}`)
})()
