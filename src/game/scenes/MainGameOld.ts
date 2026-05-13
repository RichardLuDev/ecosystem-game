import * as Phaser from 'phaser';

import Scene = Phaser.Scene
import Grid = Phaser.GameObjects.Grid;

import { Animal } from '../game-logic/Animal';
import { AnimalFactory } from '../game-logic/AnimalFactory';
import { RandomUtils } from '../math/RandomUtils';
import { SensorySystemOld } from '../game-logic/sensors-emitters/SensorySystemOld';

export class MainGameOld extends Scene
{
    private static readonly CAMERA_ZOOM : number = 3;
    
    private static readonly CARNIVORE_COUNT = 10;
    private static readonly HERBIVORE_COUNT = 10;
    private static readonly SPAWN_BOUNDS = 50;

    private animalFactory : AnimalFactory;
    private sensorySystem : SensorySystemOld;

    grid : Grid;
    animals : Animal[];

    constructor()
    {
        super('MainGameOld');
    }

    create()
    {
        this.cameras.main.setZoom(MainGameOld.CAMERA_ZOOM, MainGameOld.CAMERA_ZOOM)
        this.cameras.main.centerOn(0, 0);
        this.cameras.main.setBackgroundColor(0x136d15);

        this.animalFactory = new AnimalFactory(this.add);
        this.sensorySystem = new SensorySystemOld();

        this.grid = this.add.grid(0, 0, 10000, 10000, 10, 10);
        this.grid.setStrokeStyle(0.05);

        this.animals = [];

        for(let i = 0; i < MainGameOld.CARNIVORE_COUNT; i++)
        {
            this.animals.push(this.animalFactory.createCarnivore(
                RandomUtils.randomBetween(-MainGameOld.SPAWN_BOUNDS, MainGameOld.SPAWN_BOUNDS),
                RandomUtils.randomBetween(-MainGameOld.SPAWN_BOUNDS, MainGameOld.SPAWN_BOUNDS),
                RandomUtils.randomBetween(-Math.PI, Math.PI)));
        }

        for(let i = 0; i < MainGameOld.HERBIVORE_COUNT; i++)
        {
            this.animals.push(this.animalFactory.createHerbivore(
                RandomUtils.randomBetween(-MainGameOld.SPAWN_BOUNDS, MainGameOld.SPAWN_BOUNDS),
                RandomUtils.randomBetween(-MainGameOld.SPAWN_BOUNDS, MainGameOld.SPAWN_BOUNDS),
                RandomUtils.randomBetween(-Math.PI, Math.PI)));
        }
    };

    update(_time: number, deltaTimeMs: number)
    {
        this.sensorySystem.update(this.animals, deltaTimeMs);

        this.animals.forEach((animal: Animal) =>
        {
            animal.update(deltaTimeMs);
        });      
    }
}