import * as Phaser from 'phaser';

import Scene = Phaser.Scene
import Grid = Phaser.GameObjects.Grid;

import { Animal } from '../game-logic/Animal';
import { AnimalFactory } from '../game-logic/AnimalFactory';
import { RandomUtils } from '../math/RandomUtils';

export class MainGame extends Scene
{
    private static readonly CAMERA_ZOOM : number = 3;
    
    private static readonly CARNIVORE_COUNT = 10;
    private static readonly HERBIVORE_COUNT = 10;
    private static readonly SPAWN_BOUNDS = 50;

    private animalFactory : AnimalFactory;

    grid : Grid;
    animals : Animal[];

    constructor()
    {
        super('MainGame');
    }

    create()
    {
        this.cameras.main.setZoom(MainGame.CAMERA_ZOOM, MainGame.CAMERA_ZOOM)
        this.cameras.main.centerOn(0, 0);
        this.cameras.main.setBackgroundColor(0x136d15);

        this.animalFactory = new AnimalFactory(this.add);

        this.grid = this.add.grid(0, 0, 10000, 10000, 10, 10);
        this.grid.setStrokeStyle(0.05);

        this.animals = [];

        for(let i = 0; i < MainGame.CARNIVORE_COUNT; i++)
        {
            this.animals.push(this.animalFactory.createCarnivore(
                RandomUtils.randomBetween(-MainGame.SPAWN_BOUNDS, MainGame.SPAWN_BOUNDS),
                RandomUtils.randomBetween(-MainGame.SPAWN_BOUNDS, MainGame.SPAWN_BOUNDS),
                RandomUtils.randomBetween(-Math.PI, Math.PI)));
        }

        for(let i = 0; i < MainGame.HERBIVORE_COUNT; i++)
        {
            this.animals.push(this.animalFactory.createHerbivore(
                RandomUtils.randomBetween(-MainGame.SPAWN_BOUNDS, MainGame.SPAWN_BOUNDS),
                RandomUtils.randomBetween(-MainGame.SPAWN_BOUNDS, MainGame.SPAWN_BOUNDS),
                RandomUtils.randomBetween(-Math.PI, Math.PI)));
        }
    };

    update(_time: number, deltaTimeMs: number)
    {
        this.animals.forEach((animal: Animal) =>
        {
            animal.update(deltaTimeMs);
        });      
    }
}