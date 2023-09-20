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
}
