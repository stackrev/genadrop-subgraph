import {
  AdminChanged as AdminChangedEvent,
  BeaconUpgraded as BeaconUpgradedEvent,
  CollectionCreated as CollectionCreatedEvent,
  Initialized as InitializedEvent,
  Upgraded as UpgradedEvent,
} from "../generated/NftFactory/NftFactory";
import { Collection, User } from "../generated/schema";
import { NftCollection as NftCollectionTemplate } from "../generated/templates";
import { NftCollection } from "../generated/templates/NftCollection/NftCollection";
import { DataSourceContext, log } from "@graphprotocol/graph-ts";

// =================================================================

export function handleCollectionCreated(event: CollectionCreatedEvent): void {
  log.warning(event.params.collectionAddress.toHexString(), [
    event.params.collectionName,
    event.params.collectiondescription,
  ]);
  let collection = new Collection(event.params.collectionAddress);

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
  NftCollectionTemplate.create(event.params.collectionAddress);
}
