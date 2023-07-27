import {
  CollectionCreated as CollectionCreatedEvent,
} from "../generated/NftCollection/NftCollection"
import { Collection } from "../generated/schema"

export function handleCollectionCreated(event: CollectionCreatedEvent): void {
  let entity = new Collection(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.collectionAddress = event.params.collectionAddress
  entity.creator = event.params.collectionOwner
  entity.name = event.params.collectionName
  entity.description = event.params.collectiondescription

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}