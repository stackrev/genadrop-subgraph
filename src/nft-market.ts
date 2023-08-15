import { Bytes } from "@graphprotocol/graph-ts";
import {
  AdminChanged as AdminChangedEvent,
  BeaconUpgraded as BeaconUpgradedEvent,
  BulkMarketItemCreated as BulkMarketItemCreatedEvent,
  Initialized as InitializedEvent,
  MarketItemCreated as MarketItemCreatedEvent,
  MarketItemSold as MarketItemSoldEvent,
  RecievedRoyalties as RecievedRoyaltiesEvent,
  Upgraded as UpgradedEvent,
} from "../generated/NftMarket/NftMarket";
import { Collection, NFT, User } from "../generated/schema";

export function handleAdminChanged(event: AdminChangedEvent): void {
  // let entity = new AdminChanged(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity.previousAdmin = event.params.previousAdmin
  // entity.newAdmin = event.params.newAdmin
  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash
  // entity.save()
}

export function handleBeaconUpgraded(event: BeaconUpgradedEvent): void {
  // let entity = new BeaconUpgraded(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity.beacon = event.params.beacon
  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash
  // entity.save()
}

export function handleUpgraded(event: UpgradedEvent): void {
  // let entity = new Upgraded(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity.implementation = event.params.implementation
  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash
  // entity.save()
}

// ====================================================================================================================

export function handleBulkMarketItemCreated(
  event: BulkMarketItemCreatedEvent
): void {
  // let entity = new BulkMarketItemCreated(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity.nftContract = event.params.nftContract
  // entity.seller = event.params.seller
  // entity.category = event.params.category
  // entity.price = event.params.price
  // entity.tokenId = event.params.tokenId
  // entity.owner = event.params.owner
  // entity.chain = event.params.chain
  // entity.description = event.params.description
  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash
  // nft.save()
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

export function handleMarketItemCreated(event: MarketItemCreatedEvent): void {
  const nftId = Bytes.fromHexString(
    event.params.nftContract
      .toHexString()
      .concat(Bytes.fromBigInt(event.params.tokenId).toHexString())
  );
  let nft = NFT.load(nftId);
  if (!nft) nft = new NFT(nftId);

  // nft.seller = event.params.seller
  nft.category = event.params.category;
  nft.price = event.params.price;
  nft.tokenID = event.params.tokenId;
  nft.owner = event.params.seller;
  nft.chain = 43113;
  nft.isListed = true;
  nft.isSold = false;
  nft.createdAtTimestamp = event.block.timestamp;
  nft.save();

  // let entity = new MarketItemCreated(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity.nftContract = event.params.nftContract
  // entity.seller = event.params.seller
  // entity.category = event.params.category
  // entity.price = event.params.price
  // entity.tokenId = event.params.tokenId
  // entity.owner = event.params.owner
  // entity.chain = event.params.chain

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash
}

export function handleMarketItemSold(event: MarketItemSoldEvent): void {
  const nftId = Bytes.fromHexString(
    event.params.nftContract
      .toHexString()
      .concat(Bytes.fromBigInt(event.params.tokenId).toHexString())
  );
  let nft = NFT.load(nftId);
  if (!nft) nft = new NFT(nftId);
  // nft.seller = event.params.seller
  // nft.category = event.params.category;
  nft.price = event.params.price;
  nft.tokenID = event.params.tokenId;
  nft.chain = 43113;
  nft.isListed = false;
  nft.isSold = true;
  nft.createdAtTimestamp = event.block.timestamp;
  nft.save();

  let seller = User.load(event.params.seller);
  if (!seller) seller = new User(event.params.seller);
  let sellerNfts = seller.nfts;
  if (!sellerNfts) sellerNfts = [];
  let filteredNfts: Array<Bytes> = new Array<Bytes>();
  for (let i = 0; i < sellerNfts.length; i++) {
    const nft: Bytes = sellerNfts[i];
    if (nft != nftId) {
      filteredNfts.push(nft);
    }
  }
  seller.nfts = filteredNfts;
  seller.save();

  // let entity = new MarketItemSold(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity.nftContract = event.params.nftContract
  // entity.seller = event.params.seller
  // entity.price = event.params.price
  // entity.tokenId = event.params.tokenId

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash
}

export function handleRecievedRoyalties(event: RecievedRoyaltiesEvent): void {
  // let entity = new RecievedRoyalties(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity.creator = event.params.creator
  // entity.buyer = event.params.buyer
  // entity.amount = event.params.amount
  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash
  // entity.save()
}
