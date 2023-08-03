import {
  AdminChanged as AdminChangedEvent,
  BeaconUpgraded as BeaconUpgradedEvent,
  CollectionCreated as CollectionCreatedEvent,
  Initialized as InitializedEvent,
  Upgraded as UpgradedEvent,
} from "../generated/NftCollection/NftCollection";
import { Collection, User } from "../generated/schema";
import { NftMinter as NftMinterTemplate } from "../generated/templates";

export function handleAdminChanged(event: AdminChangedEvent): void {
  // let entity = new AdminChanged(  // let entity = new AdminChanged(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity.previousAdmin = event.params.previousAdmin
  // entity.newAdmin = event.params.newAdmin
  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash
  // entity.save()
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

// =================================================================

export function handleCollectionCreated(event: CollectionCreatedEvent): void {
  let collection = new Collection(event.params.collectionAddress);

  collection.address = event.params.collectionAddress;

  let creator = User.load(event.params.collectionOwner);
  if (!creator) creator = new User(event.params.collectionOwner);
  let creatorCollections = creator.collections;
  if (!creatorCollections) creatorCollections = [];
  creatorCollections.push(collection.id);
  creator.collections = creatorCollections;

  collection.creator = creator.id;
  collection.name = event.params.collectionName;
  collection.description = event.params.collectiondescription;
  collection.nfts = [];

  collection.save();
  creator.save();

  NftMinterTemplate.create(event.params.collectionAddress);

  // // collection.blockNumber = event.block.number
  // // collection.blockTimestamp = event.block.timestamp
  // // collection.transactionHash = event.transaction.hash

  // collection.save()
}
