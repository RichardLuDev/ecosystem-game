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
        for (const gameEntity of this.gameEntityContainer.getAllGameEntities())
        {
            if (gameEntity.position != null)
            {
                gameEntity.position.x += 0.1;
                gameEntity.position.rotation += 0.1;
            }
        }
    }

    private getNextId() : number
    {
        return this.idIncrement++;
    }
}