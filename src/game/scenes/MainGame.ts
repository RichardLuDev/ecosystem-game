import * as Phaser from 'phaser';

import Scene = Phaser.Scene;
import Grid = Phaser.GameObjects.Grid;

import { GameLogic } from '../game-logic/GameLogic';
import { RandomUtils } from '../math/RandomUtils';
import { FrontEndGameObjectFactory } from '../game-frontend/FrontEndGameObjectFactory';

export class MainGame extends Scene
{
    private static readonly CAMERA_ZOOM : number = 3;

    private static readonly CARNIVORE_STARTING_COUNT = 10;
    private static readonly HERBIVORE_STARTING_COUNT = 10;
    private static readonly SPAWN_BOUNDS = 50;

    private gameLogic: GameLogic;
    private frontEndGameObjectFactory: FrontEndGameObjectFactory;
    private grid : Grid;

    constructor()
    {
        super('MainGame');
    }

    create()
    {
        this.gameLogic = new GameLogic();
        this.frontEndGameObjectFactory = new FrontEndGameObjectFactory(this.add);

        this.cameras.main.setZoom(MainGame.CAMERA_ZOOM, MainGame.CAMERA_ZOOM)
        this.cameras.main.centerOn(0, 0);
        this.cameras.main.setBackgroundColor(0x136d15);
        
        this.grid = this.add.grid(0, 0, 1000, 1000, 10, 10);
        this.grid.setStrokeStyle(0.05);

        for(let i = 0; i < MainGame.CARNIVORE_STARTING_COUNT; i++)
        {
            let entity = 
                this.gameLogic.gameEntityFactory.createCarnivore(          
                    RandomUtils.randomBetween(-MainGame.SPAWN_BOUNDS, MainGame.SPAWN_BOUNDS),
                    RandomUtils.randomBetween(-MainGame.SPAWN_BOUNDS, MainGame.SPAWN_BOUNDS),
                    RandomUtils.randomBetween(-Math.PI, Math.PI));

            this.gameLogic.addEntity(entity);
            this.frontEndGameObjectFactory.create(entity, this);
        }

        for(let i = 0; i < MainGame.HERBIVORE_STARTING_COUNT; i++)
        {
            let entity = 
                this.gameLogic.gameEntityFactory.createHerbivore(          
                    RandomUtils.randomBetween(-MainGame.SPAWN_BOUNDS, MainGame.SPAWN_BOUNDS),
                    RandomUtils.randomBetween(-MainGame.SPAWN_BOUNDS, MainGame.SPAWN_BOUNDS),
                    RandomUtils.randomBetween(-Math.PI, Math.PI));

            this.gameLogic.addEntity(entity);
            this.frontEndGameObjectFactory.create(entity, this);
        }
    }

    update(time: number, deltaTimeMs: number)
    {
        this.gameLogic.update(time, deltaTimeMs);
    }
}