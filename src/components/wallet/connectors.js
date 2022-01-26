import { InjectedConnector } from '@web3-react/injected-connector'

const chains = {
  1: 'Ethereum',
  3: 'Ethereum testnet - Ropsten',
  4: 'Ethereum testnet - Rinkeby',
}

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 1337],
})

export { injected, chains }
