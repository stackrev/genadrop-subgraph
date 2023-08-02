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
} from "../generated/SingleNftMinter/SingleNftMinter";
import { Collection, NFT, User } from "../generated/schema";

const contractAddress = "0x41109163d8cf45E9dDd32801A8deb54b9513b1FA";

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
  let nft = NFT.load(
    Bytes.fromHexString(
      contractAddress.concat(Bytes.fromBigInt(event.params.id).toHexString())
    )
  );
  if (!nft)
    nft = new NFT(
      Bytes.fromHexString(
        contractAddress.concat(Bytes.fromBigInt(event.params.id).toHexString())
      )
    );

  nft.tokenID = event.params.id;
  nft.createdAtTimestamp = event.block.timestamp;
  nft.chain = 43113;
  nft.isSoulBound = false;
  nft.isListed = false;
  nft.isSold = false;

  let owner = User.load(event.params.to);
  if (!owner) {
    owner = new User(event.params.to);
    owner.address = event.params.to;
  }
  nft.owner = owner.id;

  let userNfts = owner.nfts;
  if (!userNfts) userNfts = [];
  userNfts.push(nft.id);
  owner.nfts = userNfts;

  let collection = Collection.load(Bytes.fromHexString(contractAddress));
  if (collection == null) {
    collection = new Collection(Bytes.fromHexString(contractAddress));
    collection.address = Bytes.fromHexString(contractAddress);
  }
  nft.collection = collection.id;

  let collectionNfts = collection.nfts;
  if (!collectionNfts) collectionNfts = [];
  collectionNfts.push(nft.id);
  collection.nfts = collectionNfts;

  owner.save();
  collection.save();
  nft.save();

  // let entity = new TransferSingle(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity.operator = event.params.operator
  // entity.from = event.params.from
  // entity.to = event.params.to
  // entity.SingleNftMinter_id = event.params.id
  // entity.value = event.params.value

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash

  // entity.save()
}

export function handleURI(event: URIEvent): void {
  let nft = NFT.load(
    Bytes.fromHexString(
      contractAddress.concat(Bytes.fromBigInt(event.params.id).toHexString())
    )
  );
  if (!nft)
    nft = new NFT(
      Bytes.fromHexString(
        contractAddress.concat(Bytes.fromBigInt(event.params.id).toHexString())
      )
    );

  nft.tokenID = event.params.id;
  nft.tokenIPFSPath = event.params.value;

  nft.save();
  // let entity = new URI(event.transaction.hash.concatI32(event.logIndex.toI32()))
  // entity.value = event.params.value
  // entity.SingleNftMinter_id = event.params.id

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

// ===========================================================================================================

export function handleCollectionInit(event: CollectionInitEvent): void {
  let collection = new Collection(event.params.collectionAddress);

  collection.address = event.params.collectionAddress;

  let creator = User.load(event.params.collectionOwner);
  if (creator == null) {
    creator = new User(event.params.collectionOwner);
    creator.address = event.params.collectionOwner;
  }

  collection.creator = creator.id;
  collection.name = event.params.collectionName;
  collection.description = "";

  creator.save();
  collection.save();

  // let entity = new CollectionInit(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity.collectionAddress = event.params.collectionAddress
  // entity.collectionOwner = event.params.collectionOwner
  // entity.collectionName = event.params.collectionName

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash
}

export function handleTransferBatch(event: TransferBatchEvent): void {
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
