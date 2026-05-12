import { GameEntityContainer } from "./GameEntityContainer";
import { GameEntityFactory } from "./GameEntityFactory";

export class Game
{
    private gameEntityContainer: GameEntityContainer;
    private gameEntityFactory: GameEntityFactory;

    constructor()
    {
        this.gameEntityContainer = new GameEntityContainer();
        this.gameEntityFactory = new GameEntityFactory();
    }

    update(time: number, deltaTimeMs: number)
    {
    }
}