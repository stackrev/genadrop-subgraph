import { Bytes } from "@graphprotocol/graph-ts";
import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  Transfer as TransferEvent,
} from "../generated/NftSoulBound/NftSoulBound";
import { Collection, User, NFT } from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
  const nftId = Bytes.fromHexString(
    event.address
      .toHexString()
      .concat(Bytes.fromBigInt(event.params.tokenId).toHexString())
  );
  let nft = NFT.load(nftId);
  if (!nft) nft = new NFT(nftId);

  nft.tokenID = event.params.tokenId;
  nft.createdAtTimestamp = event.block.timestamp;
  nft.chain = 43113;
  nft.isSoulBound = true;
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
