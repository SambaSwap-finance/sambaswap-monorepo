const ethers = require('ethers');
const fs = require('fs');
require('dotenv').config();

(async () => {
  const provider = new ethers.JsonRpcProvider('https://rpc1.mainnet.lachain.network')

  // Use your wallet's private key to deploy the contract
  const privateKey = process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider)
  const metadata = JSON.parse(fs.readFileSync('./v2-core-816075049f811f1b061bca81d5d040b96f4c07eb/build/UniswapV2Factory.json').toString())
  const price = (await provider.getFeeData()).gasPrice
  // console.log({ gasPrice: gasPrice.toString() });
  // Set gas limit and gas price, using the default Ropsten provider
  // const price = ethers.utils.formatUnits(await provider.getGasPrice(), 'gwei')
  const options = { gasLimit: 100000, gasPrice: price }

  // Deploy the contract
  const factory = new ethers.ContractFactory(metadata.abi, metadata.evm.bytecode.object, wallet)
  const contract = await factory.deploy(wallet.address)
  await contract.waitForDeployment()
  console.log(`Deployment successful! Contract Address: ${await contract.getAddress()}`)
})()
