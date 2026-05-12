import { AnimalCoreComponent } from "./animal/AnimalCoreComponent";
import { AnimalMovementComponent } from "./animal/AnimalMovementComponent";
import { FoodType } from "./animal/FoodType";
import { DynamicsComponent } from "./common/DynamicsComponent";
import { PositionComponent } from "./common/PositionComponent";
import { GameEntity } from "./GameEntity";
import { SensedDataComponent } from "./sensors-emitters/SensedDataComponent";

export class GameEntityFactory
{
    private static readonly CARNIVORE_RUN_SPEED : number = 5;
    private static readonly CARNIVORE_TURN_SPEED : number = 1;

    private static readonly HERBIVORE_RUN_SPEED : number = 4;
    private static readonly HERBIVORE_TURN_SPEED : number = 5;

    createCarnivore(
        x: number,
        y: number,
        rotation: number) : GameEntity
    {
        return new GameEntity(
            "carnivore",
            new PositionComponent(x, y, 0, rotation),
            new DynamicsComponent(),
            new AnimalCoreComponent(FoodType.Meat),
            new AnimalMovementComponent(
                GameEntityFactory.CARNIVORE_RUN_SPEED,
                GameEntityFactory.CARNIVORE_TURN_SPEED),
            new SensedDataComponent()
        );
    }

    createHerbivore(
        x: number,
        y: number,
        rotation: number) : GameEntity
    {
        return new GameEntity(
            "herbivore",
            new PositionComponent(x, y, 0, rotation),
            new DynamicsComponent(),
            new AnimalCoreComponent(FoodType.Plant),
            new AnimalMovementComponent(
                GameEntityFactory.HERBIVORE_RUN_SPEED,
                GameEntityFactory.HERBIVORE_TURN_SPEED),
            new SensedDataComponent()
        );
    }
}