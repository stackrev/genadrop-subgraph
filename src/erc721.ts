import { log, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { ERC721, Transfer as TransferEvent } from "../generated/ERC721/ERC721";
import { NFT, Collection, User } from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
  // log.debug("Transfer detected. From: {} | To: {} | TokenID: {}", [
  //   event.params.from.toHexString(),
  //   event.params.to.toHexString(),
  //   event.params.tokenId.toHexString(),
  // ]);

  let instance = ERC721.bind(event.address);

  const nftId = Bytes.fromHexString(
    event.address
      .toHexString()
      .concat(Bytes.fromBigInt(event.params.tokenId).toHexString())
  );
  let nft = NFT.load(nftId);
  if (!nft) {
    nft = new NFT(nftId);
    nft.tokenID = event.params.tokenId;
    nft.collection = event.address;
    let uri = instance.try_tokenURI(event.params.tokenId);
    if (!uri.reverted) nft.tokenIPFSPath = uri.value;
  }
  nft.chain = 43113;
  nft.owner = event.params.to;

  let previousOwner = User.load(event.params.from);
  if (!previousOwner) {
    previousOwner = new User(event.params.from);
    // previousOwner.balance = BigInt.fromI32(0);
  }
  let sellerNfts = previousOwner.nfts;
  if (!sellerNfts) sellerNfts = [];
  let filteredNfts: Array<Bytes> = new Array<Bytes>();
  for (let i = 0; i < sellerNfts.length; i++) {
    const nftI: Bytes = sellerNfts[i];
    if (nftI != nftId) {
      filteredNfts.push(nftI);
    }
  }
  previousOwner.nfts = filteredNfts;
  // else {
  //   let prevBalance = previousOwner.balance;
  //   if (prevBalance > BigInt.fromI32(0)) {
  //     previousOwner.balance = prevBalance - BigInt.fromI32(1);
  //   }
  // }

  let newOwner = User.load(event.params.to);
  if (!newOwner) {
    newOwner = new User(event.params.to);
    // newOwner.balance = BigInt.fromI32(1);
  }
  let buyerNfts = previousOwner.nfts;
  if (!buyerNfts) buyerNfts = [];
  buyerNfts.push(nftId);
  newOwner.nfts = buyerNfts;
  // else {
  //   let prevBalance = newOwner.balance;
  //   newOwner.balance = prevBalance + BigInt.fromI32(1);
  // }

  // let transferId = event.transaction.hash
  //   .toHexString()
  //   .concat(":".concat(event.transactionLogIndex.toHexString()));
  // let transfer = Transfer.load(transferId);

  // if (transfer == null) {
  //   transfer = new Transfer(transferId);
  //   transfer.token = event.params.tokenId.toHexString();
  //   transfer.from = event.params.from.toHexString();
  //   transfer.to = event.params.to.toHexString();
  //   transfer.timestamp = event.block.timestamp;
  //   transfer.block = event.block.number;
  //   transfer.transactionHash = event.transaction.hash.toHexString();
  // }

  let collection = Collection.load(event.address);
  if (!collection) collection = new Collection(event.address);
  let collectionNfts = collection.nfts;
  if (!collectionNfts) collectionNfts = [];
  let isExist = false;
  for (let i = 0; i < collectionNfts.length; i++) {
    const nftI: Bytes = collectionNfts[i];
    if (nftI == nftId) {
      isExist = true;
      break;
    }
  }
  if (!isExist) collectionNfts.push(nftId);
  collection.nfts = collectionNfts;

  let name = instance.try_name();
  if (!name.reverted) {
    collection.name = name.value;
  }

  // let symbol = instance.try_symbol();
  // if (!symbol.reverted) {
  //   collection.symbol = symbol.value;
  // }

  // let totalSupply = instance.try_totalSupply();
  // if (!totalSupply.reverted) {
  //   collection.totalSupply = totalSupply.value;
  // }

  previousOwner.save();
  newOwner.save();
  nft.save();
  collection.save();
  // transfer.save();
}
