import { AnimalCoreComponent } from "./animal/AnimalCoreComponent";
import { AnimalMovementComponent } from "./animal/AnimalMovementComponent";
import { DynamicsComponent } from "./common/DynamicsComponent";
import { PositionComponent } from "./common/PositionComponent";
import { SensedDataComponent } from "./sensors-emitters/SensedDataComponent";

export class GameEntity
{
    //TODO: Use emitter for destoryed event.

    constructor(
        public readonly id: number,
        public readonly position: PositionComponent,
        public readonly dynamics: DynamicsComponent,
        public readonly animalCore: AnimalCoreComponent,
        public readonly animalMovement: AnimalMovementComponent,
        public readonly sensedData: SensedDataComponent,
        public isDestroyed: boolean = false)
    {
    }

    destroy()
    {
        this.isDestroyed = true;
    }
}