import { AbstractConnector } from '@web3-react/abstract-connector'
import { ConnectorUpdate } from '@web3-react/types'

export class WalletConnectV2 extends AbstractConnector {
  async activate(): Promise<ConnectorUpdate> {
    return {
      provider: await eval('window.getWalletConnectProvider()'),
      chainId: await eval('window.getChainId()'),
      account: await eval('window.getAccount()')
    }
  }
  async getProvider(): Promise<any> {
    return await eval('window.getWalletConnectProvider()')
  }
  async getChainId(): Promise<number | string> {
    return await eval('window.getChainId()')
  }
  async getAccount(): Promise<null | string> {
    return await eval('window.getAccount()')
  }
  async deactivate(): Promise<void> {
    return await eval('window.deactivateWalletConnect()')
  }
}
