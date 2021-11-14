---
layout: default
title: Future Work
nav_order: 12
parent: Whitepaper Overview
---

# Future Work: Smart Contracts, Confidential Assets, Confidential IP, and more ▾

Incognito is a work in progress. Further research and development will be carried out by the Core Development Team and the Incognito community.

## Incognito Mode for Smart Contracts

Right now, thousands of developers all over the world are programming smart contracts to build decentralized applications (commonly known as “dapps”). Arguably, privacy concerns play a part in discouraging adoption beyond the crypto niche, as traditional investors hesitate to expose how much they trade on a trading dapp like Uniswap, or how often they invest & borrow on a lending dapp like Compound.

What is needed is the incognito mode for smart contracts. There are some teams actively working on privacy for smart contracts, such as Oasis and RenVM [Cheng et al., 2019; Ren, 2019]. We believe there is a different approach.

We’re exploring a way to simply unshield the input when making a smart contract function call, then shield the output (or “returned value”) from it. The smart contract runs as-is on Ethereum.

This avoids the need to build a new EVM from scratch. We reuse the existing Ethereum EVM and thousands of existing Ethereum dapps and focus on solving the privacy problem for dapp users. Developers can build dapps as usual on Ethereum, and also offer their users the choice of accessing these dapps in incognito mode.

![](https://we.incognito.org/uploads/default/original/1X/ec88d7306430b0031c1ce138207143e3b69457d5.jpeg) 

*Figure 1. Incognito mode for smart contracts*

## Highway: Scale Incognito to 16,384 Validators

Despite its many benefits, pBFT consensus algorithms suffer from expensive communication costs. As the number of validators grows, Incognito needs a better way to broadcast messages.

We’re working on a new network topology – Highway – to scale Incognito to 16,384 validators (64 shards x 256 validators per shard). Highway nodes are specialized nodes responsible for receiving and forwarding messages inside the Incognito network. Highway is designed to solve two problems:

* Highway nodes act as an efficient channel for messages to be sent with minimal latency.
* For Incognito validators with home setups, NAT and firewalls could prevent them from connecting to the Incognito network. Highway nodes are configured with public IP addresses and stable network connections to help forward messages among validators behind NAT and firewalls.

Note that Highway nodes cannot forge or corrupt the message content in any way, because every message on the network is cryptographically signed. Highway’s only job is to make sure messages reach their destination as soon as possible.

![](https://we.incognito.org/uploads/default/original/1X/53822935d33528628c75283018cf30796b633381.jpeg) 

*Figure 2. Highway network topology*

## Confidential Assets: Unknown Asset Types

Incognito already implements ring signatures, stealth addresses, and confidential transactions to shield senders, receivers, and transacted amounts. Unlike Zcash and Monero, Incognito faces a unique problem as a platform for privacy coins: there are multiple privacy coins on Incognito. We’re working on adding Confidential Assets to Incognito by also shielding asset types.

![](https://we.incognito.org/uploads/default/original/1X/d5eeb35e2491f863863fd1ad2cd39ee78899c837.jpeg) 

*Figure 3. Shielded asset types*

## Confidential IP

All senders and receivers are shielded, as are the transacted amounts. Soon, asset types will also be shielded. Currently, however, IP addresses are exposed when transactions are initiated. While IP addresses are not stored on Incognito public ledger, it does leave a user open to network monitoring and analysis. This is a hard attack vector to pull off, but work is in progress to hide IP addresses and further improve the privacy of the Incognito network [Bojja Venkatakrishnan et al., 2017; Kovri, 2018].

## Privacy

Goal: provide a universal privacy platform

**1. Improve Bulletproofs verification time**

Ref.

B. Bünz, J. Bootle, D. Boneh, A. Poelstra, P. Wuille and G. Maxwell. Bulletproofs: Short Proofs for Confidential Transactions and More. Blockchain Protocol Analysis and Security Engineering 2018, http://web.stanford.edu/~buenz/pubs/bulletproofs.pdf

**2. Confidential assets based on Bulletproofs**

Ref.

TariLabs. Confidential Assets

https://tlu.tarilabs.com/digital-assets/confidential-assets/MainReport.html.

Cathie Yun. Building on Bulletproofs

https://medium.com/@cathieyun/building-on-bulletproofs-2faa58af0ba8.

## Availability

Goal: Increase robustness and availability of the chain

**1. Availability**

Design the mechanism such that the chain is always available, despite varying numbers of validators of a shard/beacon or the network traffic condition.

Ref.

Christian Badertscher, Peter Gazi, Aggelos Kiayias, Alexander Russell, and Vassilis Zikas. Ouroboros Genesis: Composable proof-of-stake blockchains with dynamic availability. Proceedings of the 2018 ACM SIGSAC Conference on Computer and Communications Security, CCS 2018, Toronto, ON, Canada, https://dl.acm.org/doi/pdf/10.1145/3243734.3243848

**2. Dynamic sharding**

Dynamically increase or decrease the number of shards. This enables balancing the chain scale up or down depending on changing requirements.

Ref.

Alex Skidanov and Illia Polosukhin. Nightshade: Near protocol sharding design. https://nearprotocol.com/downloads/Nightshade.pdf, 2019.

**3. Random number**

The random number must have the following properties:

* Unpredictable: No one should be able to predict the random number before it’s generated.

* Unbiased: The process of generating the random number should not be made biased by the participants.

* Verifiable: The validity of the generated random number should be verifiable.

* Scalable: The algorithm of randomness generation should scale to a large number of participants.

To achieve randomness, Incognito chain is currently using the block hash of Bitcoin chain. We are studying the VRF and VDF to independently generate an unbiased, unpredictable random number.

Ref.

E. Syta, P. Jovanovic, E. Kokoris-Kogias, N. Gailly, L. Gasser, I. Khoffi, M. J. Fischer, and B. Ford. Scalable Bias-Resistant Distributed Randomness. In 38th IEEE Symposium on Security and Privacy, May 2017. [https://eprint.iacr.org/2016/1067.pdf ](https://eprint.iacr.org/2016/1067.pdf)

Dan Boneh, Joseph Bonneau, Benedikt Bünz, and Ben Fisch. Verifiable delay functions. In CRYPTO 2018, 2018. https://eprint.iacr.org/2018/601.pdf

## Security

Goal: Strengthen the security of the chain

**1. Staking & slashing mechanism**

Currently, Incognito fixes the required staking amount. We are studying how to make the mechanism dynamic, to create incentives for more validators to join the network. The slashing mechanism will prevent the misbehaving nodes from harming the chain.

Ref.

A Kiayias, A Russell, B David, R Oliynykov - 2017, Ouroboros: A Provably Secure Proof-of-Stake Blockchain Protocol. https://link.springer.com/chapter/10.1007/978-3-319-63688-7_12

**2. Sharding: State Validity and Data Availability**

The partitioning aspect of sharding raises a significant potential problem: without downloading and validating the entire history of a particular shard, the participant cannot necessarily be certain that the state with which they interact is the result of some valid sequence of blocks, and that such sequence of blocks is indeed the canonical chain in the shard. This is a problem that doesn’t exist in a non-sharded blockchain.

We are studying Merkle Tree, Polynomial Commitment to allow participants to be able to verify the data correctness with only a small amount of data.

Ref.

https://ethresear.ch/t/using-polynomial-commitments-to-replace-state-roots/7095. 

Fisherman: any honest validator can provide proof that the block is invalid with a small amount of information.

Erasure Codes and Polkadot’s approach: each participant only stores some part of data. They are able to cooperate to verify the whole chain.

Ref.

https://nearprotocol.com/downloads/Nightshade.pdf.

https://polkadot.network/PolkaDotPaper.pdf.

## Scalability

Goal: Maximize tx throughput

Throughput is so far the toughest problem of blockchain. Incognito is applying Sharding techniques at the core layer, and studying how to apply Lightning/ PaymentChannel technique at the second layer.

Ref.

https://lightning.network/lightning-network-paper.pdf.

https://arxiv.org/pdf/1809.05088.pdf.

## On-chain storage

Goal: Minimize data stored-onchain

We are studying how to apply zk-SNARKs to minimize the data stored on-chain. Weighing the tradeoff between keeping transaction history and minimizing the ledger size. Looking into the possibility of removing the used UTXO.

Ref.

https://eprint.iacr.org/2013/879.pdf.

https://cdn.codaprotocol.com/v2/static/coda-whitepaper-05-10-2018-0.pdf.

https://www.allcryptowhitepapers.com/grin-whitepaper.

## Research on ZKPs Recent Advances

Goal: Further improve Incognito in keeping with wider advancements

This research subject is about investigating recent advances in zero-knowledge proofs and how Incognito can leverage potential improvements.

Ref.

Halo: Recursive Proof Composition without a Trusted Setup - https://eprint.iacr.org/2019/1021.pdf

SuperSonic https://www.benthamsgaze.org/2019/02/07/introducing-sonic-a-practical-zk-snark-with-a-nearly-trustless-setup/

Awesome Zero-Knowledge Proofs https://github.com/matter-labs/awesome-zero-knowledge-proofs