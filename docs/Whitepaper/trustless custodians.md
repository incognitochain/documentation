---
layout: default
title: Trustless Custodians
nav_order: 3
parent: Whitepaper Overview
---

# A Decentralized Approach to Cryptocurrency Custodianship ▾

Custodians play a crucial role in the shielding mechanism that turns cryptocurrencies - like BTC, ETH and USDT - into privacy coins [[Incognito, 2019a]](https://incognito.org/t/shielding-cryptocurrencies-turning-cryptocurrencies-into-privacy-coins/83).

Existing custodian solutions like Bitgo and Coinbase Custody are centralized and expensive. Trusted third parties are security holes [[Szabo, 2001]](https://nakamotoinstitute.org/trusted-third-parties/). In addition, the very nature of centralized custody necessitates the sharing of a user’s private information to third parties.

Incognito takes a decentralized approach to custodianship; there are multiple custodians instead of one centralized authority like [Bitgo](https://www.bitgo.com) or [Coinbase Custody](https://custody.coinbase.com). Anyone can become a custodian by simply supplying a bond.

We implemented a smart contract on Ethereum that controls bonds and runs exactly as programmed. Not only is the Bond smart contract trustless, it also provides real-time processing, as opposed to the multi-day manual process adopted by centralized custodian companies.

We initially implemented a fixed custodian fee structure for simplicity’s sake. This could be further improved by implementing a market-driven custodian fee structure where users are able to set their own fees and custodians are able to compete for user deposits.

||INCOGNITO|BITGO|
| --- | --- | --- |
|Privacy|✓|✕|
|Trustless|✓|✕|
|Insured by collateral|✓|✕|
|Processing time|Instant|Days|
|Fees|Low|High|

*Table 1. A comparison between Incognito and centralized custodians like Bitgo and Coinbase Custody.*

## The Bond Smart Contract

The Bond smart contract glues together Incognito, custodians, and other cryptonetworks like Bitcoin and Binance Chain. There will be multiple implementations of the Bond smart contract on different cryptonetworks, including Incognito itself, using their respective cryptoassets as collateral.

The first implementation is programmed as an Ethereum smart contract [[Wood, 2014]](https://ethereum.github.io/yellowpaper/paper.pdf). We chose Ethereum because its smart contract platform is battle-tested and it has many liquid cryptoassets that are suitable collateral types.

![](https://we.incognito.org/uploads/default/original/1X/c278ebf8d45eca79c508e9f665b0cf79753a863c.png) 
*Figure 1. The Bond smart contract is programmed to glue together custodians, Incognito, and other cryptonetworks like Bitcoin and Binance Chain.*

The Bond smart contract is programmed to:

* Escrow collateral, in ETH and liquid ERC20 tokens, bonded by custodians
* Set the maximum total amount of user deposits that a custodian can accept based on the Collateral-to-Deposit ratio
* Verify deposit proofs on other cryptonetworks and submit valid proofs to Incognito for minting privacy coins
* Verify burn proofs of privacy coins on Incognito and instruct custodians to release public coins
* Verify custodians’ release proofs on other cryptonetworks and free up their collateral; custodians can withdraw their collateral tokens or take new user deposits
* Liquidate collateral when custodians misbehave or collateral amount drops below deposit amount

## Over-Collateralized Bonds

Custodians must first bond some collateral into the Bond smart contract. Bonded collateral tokens are required as a recourse when custodians misbehave. The Bond smart contract only accepts ETH and liquid ERC20 tokens as collateral.

Because cryptocurrency prices are volatile, bond values are also volatile. It is necessary to ask custodians to overbond so that the total amount of user deposits to a single custodian does not exceed the total value of the collateral bonded by that custodian.

We introduce a parameter α, initially set as 200%. α is the Collateral-to-Deposit ratio, which makes sure that user deposits never exceed the amount of total custodian collateral even if there is a significant drop in collateral value.

For example, as a custodian, Alice needs to bond at least $2000 worth of ETH and ERC20 tokens in the Bond smart contract if she wants to take $1,000 worth of BTC user deposits.

## Auto-Liquidation

Over-collateralization ensures that custodians do not misbehave.

During the unshielding process, if Alice doesn't send the public coins back to Bob in full, Alice’s bonded collateral will be used to repay Bob. In this case, the public coins that Bob receives – Alice’s collateral to be precise – may be different from Bob’s original public coin, but their total value is the same or greater than the value of Bob’s original deposit.

Auto-liquidation also kicks in if the value of bonded collateral drops significantly. Custodians must add more collateral to avoid auto-liquidation. We introduce a parameter 𝛽, initially set as 120%. If α is the upper bound, 𝛽 is the lower bound or the liquidation threshold. 𝛽 is designed to make sure that total custodian collateral amounts do not drop below total user deposits.

A future improvement could be automatically liquidating collateral on a decentralized exchange like Kyber [[Luu and Yaron, 2017]](https://home.kyber.network/assets/KyberNetworkWhitepaper.pdf), Uniswap [[Adam, 2018]](https://hackmd.io/C-DvwDSfSxuh-Gd4WKE_ig), or Incognito pDEX [[Incognito, 2019b]](https://incognito.org/t/pdex-the-first-privacy-protecting-decentralized-exchange/66).

## Incentives

First, custodians earn shielding fees and unshielding fees. The initial fee structure is simple – a fixed shielding fee of 0.01% and an unshielding fee of 0.01%.

Later, as part of a market-driven pricing structure, users could set their own fees and custodians could choose to process the transactions with the highest fees first. A more complex fee structure would take into account shielding, unshielding, and custodial times.

Second, custodians also earn PRV, the native coin of Incognito, through shield mining. In traditional cryptonetworks, mining rewards come solely from block mining, where miners earn rewards for producing new blocks. In Incognito, there is shield mining in addition to block mining, where custodians also mine PRV for shielding public coins. The more a custodian shields, the bigger the PRV rewards the custodian earns. The Incognito DAO funds shield mining rewards.

The shield mining reward ***r<sub>i</sub>*** for a custodian ***c<sub>i</sub>*** at block height ***k***, is computed as follows, where ***R<sub>k</sub>*** is the total shield mining reward for that block, ***n*** is the number of custodians, and ***b<sub>i</sub>*** is the bonded collateral value from custodian ***c<sub>i</sub>*** .

![381x130,50%](https://we.incognito.org/uploads/default/original/1X/008312d0d08c23febab066a0310a6707ca8f04ba.png)  

We have proposed a decentralized approach to custodianship. While this mechanism is designed for Incognito specifically, we hope that the community will find this design helpful and expand upon it to build more fully-decentralized systems of custodians.