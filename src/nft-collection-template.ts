import { Bytes } from "@graphprotocol/graph-ts";
import {
  NftCollection as NftCollectionContract,
  ApprovalForAll as ApprovalForAllEvent,
  Initialized as InitializedEvent,
  TransferBatch as TransferBatchEvent,
  TransferBatch1 as TransferBatch1Event,
  TransferSingle as TransferSingleEvent,
  URI as URIEvent,
} from "../generated/templates/NftCollection/NftCollection";
import { NFT, Collection, User } from "../generated/schema";
import { log } from "@graphprotocol/graph-ts";

export function handleTransferBatch1(event: TransferBatch1Event): void {
  let collection = Collection.load(event.address);
  if (!collection) {
    collection = new Collection(event.address);
  }

  let collectionNfts = collection.nfts;
  if (!collectionNfts) collectionNfts = [];

  let owner = User.load(event.params.to);
  if (!owner) {
    owner = new User(event.params.to);
  }
  let userNfts = owner.nfts;
  if (!userNfts) userNfts = [];

  for (let i = 0; i < event.params.ids.length; i++) {
    const tokenId = event.params.ids[i];
    const nftId = Bytes.fromHexString(
      event.address
        .toHexString()
        .concat(Bytes.fromBigInt(event.params.ids[i]).toHexString())
    );
    let nft = NFT.load(nftId);
    if (!nft) nft = new NFT(nftId);
    collectionNfts.push(nft.id);

    nft.tokenID = event.params.ids[i];
    nft.chain = 43113;
    nft.owner = owner.id;
    nft.collection = collection.id;

    userNfts.push(nft.id);
    nft.createdAtTimestamp = event.block.timestamp;
    nft.save();
  }
  collection.nfts = collectionNfts;
  collection.save();
  owner.nfts = userNfts;
  owner.save();
}

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

//===============================================================

export function handleTransferBatch(event: TransferBatchEvent): void {
  log.warning(event.address.toHexString(), []);
  let collection = Collection.load(event.address);
  if (!collection) {
    collection = new Collection(event.address);
  }

  let collectionNfts = collection.nfts;
  if (!collectionNfts) collectionNfts = [];

  let owner = User.load(event.params.to);
  if (!owner) {
    owner = new User(event.params.to);
  }
  let userNfts = owner.nfts;
  if (!userNfts) userNfts = [];

  for (let i = 0; i < event.params.ids.length; i++) {
    const tokenId = event.params.ids[i];
    const nftId = Bytes.fromHexString(
      event.address
        .toHexString()
        .concat(Bytes.fromBigInt(event.params.ids[i]).toHexString())
    );
    let nft = NFT.load(nftId);
    if (!nft) nft = new NFT(nftId);
    collectionNfts.push(nft.id);

    nft.tokenID = event.params.ids[i];
    nft.chain = 43113;
    nft.owner = owner.id;
    nft.collection = collection.id;

    userNfts.push(nft.id);
    nft.createdAtTimestamp = event.block.timestamp;
    nft.save();
  }
  collection.nfts = collectionNfts;
  collection.save();
  owner.nfts = userNfts;
  owner.save();
}
