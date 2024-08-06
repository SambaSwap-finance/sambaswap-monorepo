import React from 'react'
import styled from 'styled-components'

import { ButtonSecondary } from '../Button'

const FooterFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  // ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  //   display: none;
  // `};
`
async function addLachainNetwork() {
  try {
    await (window.ethereum as any).request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x112',
          rpcUrls: ['https://rpc1.mainnet.lachain.network'],
          chainName: 'LaChain',
          nativeCurrency: {
            name: 'LAC',
            symbol: 'LAC',
            decimals: 18
          },
          blockExplorerUrls: ['https://explorer.lachain.network']
        }
      ]
    })
  } catch (error) {
    console.log(error)
  }
}

export default function Footer() {
  return (
    <FooterFrame>
      <ButtonSecondary p="8px 12px" onClick={addLachainNetwork}>
        <img
          width={'20px'}
          src="https://metamask.io/favicon-32x32.png?v=48400a28770e10dd52a8c0e539aeb282"
          style={{ marginRight: '8px' }}
        />{' '}
        Add LaChain
      </ButtonSecondary>
    </FooterFrame>
  )
}
