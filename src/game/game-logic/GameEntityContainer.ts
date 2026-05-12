import { GameEntity } from "./GameEntity"

export class GameEntityContainer
{
    private gameEntities: GameEntity[]

    constructor()
    {
        this.gameEntities = [];
    }

    getAllGameEntities() : readonly GameEntity[]
    {
        return this.gameEntities;
    }

    add(gameEntity: GameEntity) : void
    {
        this.gameEntities.push(gameEntity);
    }

    removeDestoryed()
    {
        //TODO: Can swap last entity with removed entity to avoid splicing.
        for (let i = this.gameEntities.length - 1; i >=0; i--)
        {
            if (this.gameEntities[i].isDestroyed)
            {
                this.gameEntities.splice(i, 1);
            }
        }
    }
}