import { Bytes } from "@graphprotocol/graph-ts";
import {
  ApprovalForAll as ApprovalForAllEvent,
  Initialized as InitializedEvent,
  TransferBatch as TransferBatchEvent,
  TransferBatch1 as TransferBatch1Event,
  TransferSingle as TransferSingleEvent,
  URI as URIEvent,
} from "../generated/NftMinter/NftMinter";
import { NFT, Collection, User } from "../generated/schema";

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  // let entity = new ApprovalForAll(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity.account = event.params.account
  // entity.operator = event.params.operator
  // entity.approved = event.params.approved
  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash
  // entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  // let entity = new Initialized(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity.version = event.params.version
  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash
  // entity.save()
}

export function handleTransferBatch1(event: TransferBatch1Event): void {
  // let entity = new TransferBatch1(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity.operator = event.params.operator
  // entity.from = event.params.from
  // entity.to = event.params.to
  // entity.ids = event.params.ids
  // entity.values = event.params.values
  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash
  // entity.save()
}

export function handleTransferSingle(event: TransferSingleEvent): void {
  // let entity = new TransferSingle(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity.operator = event.params.operator
  // entity.from = event.params.from
  // entity.to = event.params.to
  // entity.NftMinter_id = event.params.id
  // entity.value = event.params.value
  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash
  // entity.save()
}

export function handleURI(event: URIEvent): void {
  // let entity = new URI(event.transaction.hash.concatI32(event.logIndex.toI32()))
  // entity.value = event.params.value
  // entity.NftMinter_id = event.params.id
  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash
  // entity.save()
}

//===============================================================

export function handleTransferBatch(event: TransferBatchEvent): void {
  // for (let i = 0; i < event.params.ids.length; i++) {
  //   const tokenId = event.params.ids[i];
  //   const nftId = Bytes.fromHexString(
  //     event.params.operator
  //       .toHexString()
  //       .concat(Bytes.fromBigInt(event.params.ids[i]).toHexString())
  //   );
  //   let nft = NFT.load(nftId);
  //   if (!nft) nft = new NFT(nftId);
  //   let collection = Collection.load(event.params.operator);
  //   if (!collection) {
  //     collection = new Collection(event.params.operator);
  //   }
  //   nft.collection = collection.id;
  //   nft.tokenID = event.params.ids[i];
  //   nft.chain = 43113;
  //   let owner = User.load(event.params.to);
  //   if (!owner) {
  //     owner = new User(event.params.to);
  //     owner.address = event.params.to;
  //   }
  //   nft.owner = owner.id;
  //   let userNfts = owner.nfts;
  //   if (!userNfts) userNfts = [];
  //   userNfts.push(nft.id);
  //   owner.nfts = userNfts;
  //   nft.createdAtTimestamp = event.block.timestamp;
  //   nft.save();
  //   owner.save();
  //   collection.save();
  // }
  // let entity = new TransferBatch(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity.operator = event.params.operator
  // entity.from = event.params.from
  // entity.to = event.params.to
  // entity.ids = event.params.ids
  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash
  // entity.save()
}
