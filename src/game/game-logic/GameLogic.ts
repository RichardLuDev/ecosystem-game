import { GameEntity } from "./GameEntity";
import { GameEntityContainer } from "./GameEntityContainer";
import { GameEntityFactory } from "./GameEntityFactory";

export class GameLogic
{    
    public readonly gameEntityContainer: GameEntityContainer;
    public readonly gameEntityFactory: GameEntityFactory;

    private idIncrement = 1;

    constructor()
    {
        this.gameEntityContainer = new GameEntityContainer();
        this.gameEntityFactory = new GameEntityFactory();
    }

    addEntity(gameEntity: GameEntity) : number
    {
        gameEntity.setID(this.getNextId());
        this.gameEntityContainer.add(gameEntity);
        return gameEntity.getID();
    }

    update(time: number, deltaTimeMs: number)
    {
    }

    private getNextId() : number
    {
        return this.idIncrement++;
    }
}