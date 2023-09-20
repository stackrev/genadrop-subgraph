import { Bytes } from "@graphprotocol/graph-ts";
import {
  AdminChanged as AdminChangedEvent,
  ApprovalForAll as ApprovalForAllEvent,
  BeaconUpgraded as BeaconUpgradedEvent,
  CollectionInit as CollectionInitEvent,
  Initialized as InitializedEvent,
  TransferBatch as TransferBatchEvent,
  TransferBatch1 as TransferBatch1Event,
  TransferSingle as TransferSingleEvent,
  URI as URIEvent,
  Upgraded as UpgradedEvent,
} from "../generated/NftSingle/NftSingle";
import { Collection, NFT, User } from "../generated/schema";

export function handleTransferSingle(event: TransferSingleEvent): void {
  const nftId = Bytes.fromHexString(
    event.address
      .toHexString()
      .concat(Bytes.fromBigInt(event.params.id).toHexString())
  );
  let nft = NFT.load(nftId);
  if (!nft) nft = new NFT(nftId);

  nft.tokenID = event.params.id;
  nft.createdAtTimestamp = event.block.timestamp;
  nft.chain = 43113;
  nft.isSoulBound = false;
  nft.isListed = false;
  nft.isSold = false;

  let owner = User.load(event.params.to);
  if (!owner) {
    owner = new User(event.params.to);
  }
  nft.owner = owner.id;

  let userNfts = owner.nfts;
  if (!userNfts) userNfts = [];
  userNfts.push(nft.id);
  owner.nfts = userNfts;

  let collection = Collection.load(event.address);
  if (collection == null) {
    collection = new Collection(event.address);
  }
  nft.collection = collection.id;

  let collectionNfts = collection.nfts;
  if (!collectionNfts) collectionNfts = [];
  collectionNfts.push(nft.id);
  collection.nfts = collectionNfts;

  owner.save();
  collection.save();
  nft.save();
}

export function handleURI(event: URIEvent): void {
  const nftId = Bytes.fromHexString(
    event.address
      .toHexString()
      .concat(Bytes.fromBigInt(event.params.id).toHexString())
  );

  let nft = NFT.load(nftId);
  if (!nft) nft = new NFT(nftId);

  nft.tokenID = event.params.id;
  nft.tokenIPFSPath = event.params.value;

  nft.save();
}

// ===========================================================================================================

export function handleCollectionInit(event: CollectionInitEvent): void {
  let collection = new Collection(event.params.collectionAddress);

  let creator = User.load(event.params.collectionOwner);
  if (creator == null) {
    creator = new User(event.params.collectionOwner);
  }

  collection.creator = creator.id;
  collection.name = event.params.collectionName;
  collection.description = "";

  creator.save();
  collection.save();
}
