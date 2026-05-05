import { Animal } from "./Animal";
import { AnimalType } from "./AnimalType";
import { IGameObjectFactory } from "./engine-abstractions/IGameObjectFactory";
import { ZigZagEvasionTactic } from "./evasion-tactics/ZigZagEvasionTactic";

export class AnimalFactory
{
    private static readonly CARNIVORE_SIZE : number = 1;
    private static readonly CARNIVORE_COLOR : number = 0xDECC9C;
    private static readonly CARNIVORE_RUN_SPEED : number = 5;
    private static readonly CARNIVORE_TURN_SPEED : number = 1;
    private static readonly CARNIVORE_ZIG_ZAG : number = Math.PI / 2;
    private static readonly CARNIVORE_ZIG_ZAG_INTERVAL : number = Math.PI / 2;

    private static readonly HERBIVORE_SIZE : number = 1;
    private static readonly HERBIVORE_COLOR : number = 0xBA8759;
    private static readonly HERBIVORE_RUN_SPEED : number = 5;
    private static readonly HERBIVORE_TURN_SPEED : number = 5;
    private static readonly HERBIVORE_ZIG_ZAG : number = Math.PI / 2;
    private static readonly HERBIVORE_ZIG_ZAG_INTERVAL : number = Math.PI / 2;

    private readonly gameObjectFactory: IGameObjectFactory
    
    constructor(gameObjectFactory: IGameObjectFactory)
    {
        this.gameObjectFactory = gameObjectFactory;
    }

    createCarnivore(x: number, y: number, rotation: number) : Animal
    {
        let carnivore = new Animal(
            AnimalType.Carnivore,
            this.gameObjectFactory.rectangle(
                x,
                y,
                AnimalFactory.CARNIVORE_SIZE * 2,
                AnimalFactory.CARNIVORE_SIZE,
                AnimalFactory.CARNIVORE_COLOR),
            new ZigZagEvasionTactic(
                AnimalFactory.CARNIVORE_ZIG_ZAG_INTERVAL,
                AnimalFactory.CARNIVORE_ZIG_ZAG),
            AnimalFactory.CARNIVORE_RUN_SPEED,
            AnimalFactory.CARNIVORE_TURN_SPEED);
            
        carnivore.gameObject.setRotation(rotation);
        return carnivore;
    }

    createHerbivore(x: number, y: number, rotation: number) : Animal
    {
        let herbivore = new Animal(
            AnimalType.Herbivore,
            this.gameObjectFactory.rectangle(
                x,
                y,
                AnimalFactory.HERBIVORE_SIZE * 2,
                AnimalFactory.HERBIVORE_SIZE,
                AnimalFactory.HERBIVORE_COLOR),
            new ZigZagEvasionTactic(
                AnimalFactory.HERBIVORE_ZIG_ZAG_INTERVAL,
                AnimalFactory.HERBIVORE_ZIG_ZAG),
            AnimalFactory.HERBIVORE_RUN_SPEED,
            AnimalFactory.HERBIVORE_TURN_SPEED);
            
        herbivore.gameObject.setRotation(rotation);
        return herbivore;
    }
}