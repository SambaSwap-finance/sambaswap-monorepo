import { createReducer } from '@reduxjs/toolkit'
import { TokenList } from '@uniswap/token-lists/dist/types'
import { DEFAULT_LIST_OF_LISTS, DEFAULT_TOKEN_LIST_URL } from '../../constants/lists'
import { updateVersion } from '../global/actions'
import { acceptListUpdate, addList, fetchTokenList, removeList, selectList } from './actions'

// Import the token list from a local file or define it inline
const FORCED_TOKEN_LIST: TokenList = {
  name: 'SambaSwap Choices',
  timestamp: '2020-09-01T00:00:00+00:00',
  version: {
    major: 1,
    minor: 0,
    patch: 0
  },
  tokens: [
    {
      address: '0x51115241c7b8361EeE88D8610f71d0A92cee5323',
      chainId: 274,
      name: 'USD Coin (USDC)',
      symbol: 'USDC',
      decimals: 18,
      logoURI: 'https://exchange.sushiswap.org/images/tokens/SUSHI.png'
    },
    {
      address: '0x7dC8b9e3B083C26C68f0B124cA923AaEc7FBee39',
      chainId: 274,
      name: 'Tether USD (USDT)',
      symbol: 'USDT',
      decimals: 18,
      logoURI: 'https://exchange.sushiswap.org/images/tokens/SUSHI.png'
    },
    {
      address: '0x2911a1AB18546cb501628Be8625C7503a2A7DB54',
      chainId: 274,
      name: 'WLAC',
      symbol: 'WLAC',
      decimals: 18,
      logoURI: 'https://exchange.sushiswap.org/images/tokens/SUSHI.png'
    },
    {
      address: '0xDe09E74d4888Bc4e65F589e8c13Bce9F71DdF4c7',
      chainId: 274,
      name: 'UXD',
      symbol: 'UXD',
      decimals: 18,
      logoURI: 'https://exchange.sushiswap.org/images/tokens/SUSHI.png'
    }
  ]
}

const UNISWAP_DEFAULT_LIST = FORCED_TOKEN_LIST

export interface ListsState {
  readonly byUrl: {
    readonly [url: string]: {
      readonly current: TokenList | null
      readonly pendingUpdate: TokenList | null
      readonly loadingRequestId: string | null
      readonly error: string | null
    }
  }
  readonly lastInitializedDefaultListOfLists?: string[]
  readonly selectedListUrl: string | undefined
}

const NEW_LIST_STATE: ListsState['byUrl'][string] = {
  error: null,
  current: null,
  loadingRequestId: null,
  pendingUpdate: null
}

type Mutable<T> = { -readonly [P in keyof T]: T[P] extends ReadonlyArray<infer U> ? U[] : T[P] }

const initialState: ListsState = {
  lastInitializedDefaultListOfLists: DEFAULT_LIST_OF_LISTS,
  byUrl: {
    ...DEFAULT_LIST_OF_LISTS.reduce<Mutable<ListsState['byUrl']>>((memo, listUrl) => {
      memo[listUrl] = NEW_LIST_STATE
      return memo
    }, {}),
    [DEFAULT_TOKEN_LIST_URL]: {
      error: null,
      current: UNISWAP_DEFAULT_LIST,
      loadingRequestId: null,
      pendingUpdate: null
    }
  },
  selectedListUrl: undefined
}

export default createReducer(initialState, builder =>
  builder
    .addCase(fetchTokenList.pending, (state, { payload: { requestId, url } }) => {
      state.byUrl[url] = {
        ...state.byUrl[url],
        loadingRequestId: requestId,
        error: null,
        current: UNISWAP_DEFAULT_LIST,
        pendingUpdate: null
      }
    })
    .addCase(fetchTokenList.fulfilled, (state, { payload: { requestId, tokenList, url } }) => {
      // Always use the forced token list
      state.byUrl[url] = {
        ...state.byUrl[url],
        loadingRequestId: null,
        error: null,
        current: UNISWAP_DEFAULT_LIST,
        pendingUpdate: null
      }
    })
    .addCase(fetchTokenList.rejected, (state, { payload: { url, requestId, errorMessage } }) => {
      // Even if the fetch fails, use the forced token list
      state.byUrl[url] = {
        ...state.byUrl[url],
        loadingRequestId: null,
        error: errorMessage,
        current: UNISWAP_DEFAULT_LIST,
        pendingUpdate: null
      }
    })
    .addCase(selectList, (state, { payload: url }) => {
      state.selectedListUrl = url
      if (!state.byUrl[url]) {
        state.byUrl[url] = {
          ...NEW_LIST_STATE,
          current: UNISWAP_DEFAULT_LIST
        }
      }
    })
    .addCase(addList, (state, { payload: url }) => {
      if (!state.byUrl[url]) {
        state.byUrl[url] = {
          ...NEW_LIST_STATE,
          current: UNISWAP_DEFAULT_LIST
        }
      }
    })
    .addCase(removeList, (state, { payload: url }) => {
      if (state.byUrl[url]) {
        delete state.byUrl[url]
      }
      if (state.selectedListUrl === url) {
        state.selectedListUrl = Object.keys(state.byUrl)[0]
      }
    })
    .addCase(acceptListUpdate, (state, { payload: url }) => {
      // Ignore updates and always use the forced token list
      state.byUrl[url] = {
        ...state.byUrl[url],
        pendingUpdate: null,
        current: UNISWAP_DEFAULT_LIST
      }
    })
    .addCase(updateVersion, state => {
      // Always use the forced token list for all URLs
      Object.keys(state.byUrl).forEach(url => {
        state.byUrl[url] = {
          ...state.byUrl[url],
          current: UNISWAP_DEFAULT_LIST,
          pendingUpdate: null
        }
      })

      state.lastInitializedDefaultListOfLists = DEFAULT_LIST_OF_LISTS
    })
)
