import { AnimalCoreComponent } from "./animal/AnimalCoreComponent";
import { AnimalMovementComponent } from "./animal/AnimalMovementComponent";
import { DynamicsComponent } from "./common/DynamicsComponent";
import { PositionComponent } from "./common/PositionComponent";
import { SensedDataComponent } from "./sensors-emitters/SensedDataComponent";

export class GameEntity
{
    //TODO: Use emitter for destroyed event.
    private id: number  = -1;

    constructor(
        public readonly label: string,
        public readonly position: PositionComponent | null,
        public readonly dynamics: DynamicsComponent | null,
        public readonly animalCore: AnimalCoreComponent | null,
        public readonly animalMovement: AnimalMovementComponent | null,
        public readonly sensedData: SensedDataComponent | null,
        public isDestroyed: boolean = false)
    {
    }

    getID() : number
    {
        return this.id;
    }

    setID(id: number)
    {
        if (this.id != -1)
            throw new Error("ID has already been assigned");
        this.id = id;
    }

    destroy()
    {
        this.isDestroyed = true;
    }
}