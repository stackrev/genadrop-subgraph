import { Bytes } from "@graphprotocol/graph-ts";
import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  Transfer as TransferEvent
} from "../generated/SoulBound/SoulBound"
import { Collection, User, NFT } from "../generated/schema"

const contractAddress = "0x90a23D02152fB58a19b1d9604B592aD331Fd3FDB"

export function handleApproval(event: ApprovalEvent): void {
  // let entity = new Approval(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity.owner = event.params.owner
  // entity.approved = event.params.approved
  // entity.tokenId = event.params.tokenId

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash

  // entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  // let entity = new ApprovalForAll(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity.owner = event.params.owner
  // entity.operator = event.params.operator
  // entity.approved = event.params.approved

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash

  // entity.save()
}

export function handleTransfer(event: TransferEvent): void {


  let nft = NFT.load(Bytes.fromHexString(contractAddress.concat(Bytes.fromBigInt(event.params.tokenId).toHexString())))
  if(!nft)
    nft = new NFT(Bytes.fromHexString(contractAddress.concat(Bytes.fromBigInt(event.params.tokenId).toHexString())))

  nft.tokenID = event.params.tokenId
  nft.createdAtTimestamp = event.block.timestamp
  nft.chain = 43113
  nft.isSoulBound = true
  nft.isListed = false
  nft.isSold = true

  let owner = User.load(event.params.to);
  if (!owner) {
    owner = new User(event.params.to);
    owner.address = event.params.to;
  }
  nft.owner = owner.id
  
  let userNfts = owner.nfts
  if(!userNfts) userNfts = []
  userNfts.push(nft.id)
  owner.nfts = userNfts

  let collection = Collection.load(Bytes.fromHexString(contractAddress))
  if(collection == null){
    collection = new Collection(Bytes.fromHexString(contractAddress))
    collection.address = Bytes.fromHexString(contractAddress);
  }
  nft.collection = collection.id

  let collectionNfts = collection.nfts
  if(!collectionNfts) collectionNfts = []
  collectionNfts.push(nft.id)
  collection.nfts = collectionNfts
  owner.save()
  collection.save()
  nft.save()


  // let entity = new Transfer(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity.from = event.params.from
  // entity.to = event.params.to
  // entity.tokenId = event.params.tokenId

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash

  // entity.save()
}
