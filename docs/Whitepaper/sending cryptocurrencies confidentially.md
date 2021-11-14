---
layout: default
title: Sending Cryptocurrencies Confidentially
nav_order: 4
parent: Whitepaper Overview
---

# Sending Cryptocurrencies Confidentially ▾

Once public coins are shielded, they can be confidentially sent, received, stored and traded as privacy coins. A custodian may keep a record of how many privacy coins have been minted but will have no knowledge of how these privacy coins are used afterward. Every privacy coin transaction is confidential and untraceable, even by custodians and validators. Incognito uses several cryptographic primitives, such as linkable ring signature scheme, homomorphic commitment scheme, and zero-knowledge range proofs, to shield sending addresses, receiving addresses, and transacted amounts.

## Fungibility: The Basis of Monetary Privacy

All privacy coins issued in the Incognito network are fungible – one of the basic requirements of money. One unit of currency must be identical and interchangeable with another.

As their history can be traced, most cryptocurrencies, including BTC and ETH, are not fungible. If BTC units become associated with illegal or illicit activities at any point in their history, they could be blacklisted as tainted bitcoins. Anyone could refuse to accept them, and holders might be forced to sell them for less.

A dollar bill, by contrast, is fungible. One is easily interchangeable with another and does not lose value based on how it was previously used. Privacy coins issued on Incognito share this important quality.

## Ring Signatures: Shielding Sending Addresses

A ring signature scheme allows a member of a group to sign a message on behalf of the group without revealing the signer’s identity [Chaum and Van Heyst, 1991; Fujisaki and Suzuki, 2007; Van Saberhagen, 2013]. Signer anonymity is preserved by giving each member of the group equal chances of being the true signer. [QUEST](https://s8.hostingkartinok.com/uploads/thumbs/2020/11/1e5d26b9954e93786f05352737526ed5.png).

![619x172](https://we.incognito.org/uploads/default/original/1X/47f93facb7d51d3760194beac2a1d7d9a337c116.png) 

*Figure 1. The identity of the signer is obscured. For example, if you encounter a ring signature with the public keys of Annie, Bob, John, and Peter, you will be able to claim that one of these users is the signer, but not be able to pinpoint him or her.*

Group formation is spontaneous. There is no group manager to reveal the identity of the true signer. Due to these properties, we call the group an ad hoc group or a ring. The signer can form a group by simply collecting the public keys of other group members. These diversion group members, often called decoys or mixins, are pulled from historical transactions. The unified signature provides anonymity to the signer.

In Incognito, a ring signature is used to authorize the spending of an Unspent Transaction Output [Nakamoto, 2008], or “UTXO” without revealing the spender’s identity. The ring consists of the actual UTXO being spent as well as its decoys, which are various random outputs from historical transactions. The actual UTXO and its decoys collectively make up the inputs of the transaction. To the public, any of these inputs could equally be the actual output being spent.

![1258x614](https://we.incognito.org/uploads/default/original/1X/8623b51cc2f13acb46d906101fd17c0d5394701b.png) 

*Figure 2. Visualization of ring signature. The notion of ring signature was first proposed as a way of whistleblowing [Rivest et al., 2001]*

Since there is no way to verify which UTXO is being spent, we may have a double-spending problem [Finney, 1993]. To solve this, we implemented a variant of ring signature called Linkable Ring Signature [Liu et al., 2004], in which an additional property is added: linkability. With linkability, any signature issued under the same public key, whether in signing the same message or a different message, has a unique identifier – a serial number. With serial numbers in place, anyone can verify whether two signatures have been issued by the same group member without learning who the signer is. A serial number is derived from each UTXO being spent and is part of every ring signature. A list of all used serial numbers is stored permanently as part of the transaction data so that any new ring signature that attempts to reuse an existing serial number is automatically rejected for double-spending.

## Stealth Addresses: Shielding Receiving Addresses

In a typical cryptonetwork like Bitcoin or Ethereum, a public address is all that is needed for anyone to view incoming and outgoing transactions associated with that address [Reid and Harrigan, 2013]. These transactions are public and can be easily linked together to infer total balances and spending patterns.

To avoid transaction linking, Incognito automatically creates multiple one-time public keys – one for each incoming transaction. One-time public keys, also known as stealth addresses, can be thought of as one-time deposit boxes. Only the receiver can open the box to see what is inside and spend it.

![638x166](https://we.incognito.org/uploads/default/original/1X/dda68b8b2437069a9f7dc611e56af8a9fd3f4959.jpeg) 

*Figure 3. Creating multiple unique one-time keys*

Stealth addresses are based on the Diffie-Hellman key exchange protocol [Diffie and Hellman, 1976], a cryptographic method that allows two users to create a shared secret even in the presence of an adversary who can observe all communications between them.

An Incognito address consists of a public view key and a public spend key. A public spend key has a corresponding private spend key, which is used to authorize transactions. Similarly, a public view key has a corresponding private view key, which is used to receive payments.

When Alice wants to send privacy coins to Bob, Alice uses Bob’s public view key and public spend key, along with some fresh randomness, to derive a one-time public key for Bob’s new UTXO, in a way such that only Bob can compute the one-time private key corresponding to this one-time public key.

Bob uses his private view key to recognize the UTXO being sent to him by scanning all incoming transactions. Once the UTXO is found, Bob is able to compute the one-time private key that corresponds to the one-time public key. Bob can spend the UTXO with his private spend key.

![600x403](https://we.incognito.org/uploads/default/original/1X/873bc9a1df19f1f2b126e41819cac420d5ef7c61.png)

*Figure 4. Stealth addresses*

The transaction data is on the Incognito public ledger. Anyone can see that a new transaction has occurred, but cannot link the one-time public key in the transaction to Bob. If Bob were a merchant, for example, no one would be able to determine that he and Alice are doing business together.

## Confidential Transactions: Shielding Transacted Amounts

Confidential Transactions shield the transacted amounts [Maxwell, 2015]. Anyone can see that privacy coins are transacted on the Incognito public ledger, but cannot see the exact amounts.

![640x182](https://we.incognito.org/uploads/default/original/1X/873bc9a1df19f1f2b126e41819cac420d5ef7c61.png) 

*Figure 5. Confidential transaction amount*

The basic idea is to commit the input and output amounts of a transaction as Pedersen commitments [Pedersen, 1991]. A commitment is formed by the value itself and a randomness called a blinding factor, which prevents others from guessing the value. The value and the blinding factor can later be revealed by the committer so that everyone can use them to verify that the commitment was well-formed.

![600x131](https://we.incognito.org/uploads/default/original/1X/fd275709415ce545a49483cf316521911ea2c72a.jpeg) 

*Figure 6. Commitments are equipped with zero-knowledge range proofs to prove their validity*

The first problem with this approach is that validators can no longer verify the transaction, specifically the sum of inputs against outputs.

To solve this, we included a zero-knowledge proof of the validity of the confidential transaction in every transaction. Zero-knowledge proofs [Goldreich et al., 1991] enable the prover to demonstrate his knowledge of the truth of a particular statement without revealing anything beyond the fact that it is true.

Due to a cryptographic property called homomorphic [Gentry and Boneh, 2009], or malleable, all input commitments of a transaction can be added up to a single input commitment. Similarly, all output commitments can be added up to a single output commitment. The sum of commitments is a commitment to the sum of underlying values, with the blinding factor as the sum of blinding factors in individual commitments.

It turns out that a commitment to zero is a valid public key, of which the corresponding private key is the blinding factor. A sender now signs the difference between these two commitments, which is a commitment to zero, to prove that the balance is preserved. By including this commitment as a ring member in the ring signature, the sender can prove the claim by signing the transaction with this blinding factor as one of the private spend keys.

The second problem with this approach is that an attacker could create money out of thin air and inflate a privacy coin supply by committing to negative amounts.

To solve this, we associated each output commitment with a range proof [Boudot, 2000; Morais et al., 2019]. A range proof proves that the output amounts are positive, in the interval [0, 264), without revealing the actual amounts. Validators now can verify that the transaction is legitimate without knowing the actual amounts being transferred.

To implement range proofs, we employed Bulletproofs [Bunz et al., 2018]. Bulletproofs are short non-interactive zero-knowledge proofs designed to enable efficient confidential transactions, with no trusted setup required. Bulletproofs reduce the size of the old range proof from ~5KB to only 700 bytes. Bulletproofs also supports aggregation; combining several range proofs would only increase the size by several hundred bytes.