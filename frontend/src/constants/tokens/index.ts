import { ChainId, Token, WETH } from '@uniswap/sdk-fork'
import KOVAN_TOKENS from './kovan'
import MAINNET_TOKENS from './mainnet'
import RINKEBY_TOKENS from './rinkeby'
import ROPSTEN_TOKENS from './ropsten'

type AllTokens = Readonly<{ [chainId in ChainId | 418 | 274]: Readonly<{ [tokenAddress: string]: Token }> }>
export const ALL_TOKENS: AllTokens = [
  // WETH on all chains
  ...Object.values(WETH),
  // chain-specific tokens
  ...MAINNET_TOKENS,
  ...RINKEBY_TOKENS,
  ...KOVAN_TOKENS,
  ...ROPSTEN_TOKENS,
]
  // // remap WETH to ETH
  // .map(token => {
  //   if (token.equals(WETH[token.chainId])) {
  //     ; (token as any).symbol = 'ETH'
  //       ; (token as any).name = 'Ether'
  //   }
  //   return token
  // })
  .concat([
    new Token(274 as ChainId, '0xDe09E74d4888Bc4e65F589e8c13Bce9F71DdF4c7', 18, 'UXD', 'Criptodolar UXD'),
    new Token(274 as ChainId, '0x42C8C9C0f0A98720dACdaeaC0C319cb272b00d7E', 18, 'WETH', 'Wrapped Ether (WETH)'),
  ])
  // put into an object
  .reduce<AllTokens>(
    (tokenMap, token) => {
      if (tokenMap[token.chainId][token.address] !== undefined) throw Error('Duplicate tokens.')
      return {
        ...tokenMap,
        [token.chainId]: {
          ...tokenMap[token.chainId],
          [token.address]: token
        }
      }
    },
    {
      [ChainId.MAINNET]: {},
      [ChainId.RINKEBY]: {},
      [ChainId.GÖRLI]: {},
      [ChainId.ROPSTEN]: {},
      [ChainId.KOVAN]: {},
      418: {},
      274: {}
    }
  )
