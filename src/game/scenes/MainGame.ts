import * as Phaser from 'phaser';

import Scene = Phaser.Scene
import Grid = Phaser.GameObjects.Grid;
import Rectangle = Phaser.GameObjects.Rectangle;

import { Animal } from '../logic/Animal';
import { ZigZagEvasionTactic } from '../logic/evasionTactics/ZigZagEvasionTactic';

export class MainGame extends Scene
{
    static readonly CAMERA_ZOOM : number = 10;
    static readonly ANIMAL_SIZE : number = 1;

    static readonly CARNIVORE_RUN_SPEED : number = 5;
    static readonly CARNIVORE_TURN_SPEED : number = 1;

    static readonly HERBIVORE_RUN_SPEED : number = 5;
    static readonly HERBIVORE_TURN_SPEED : number = 5;

    grid : Grid;

    carnivore : Animal;
    herbivore : Animal;

    constructor()
    {
        super('MainGame');
    }

    create()
    {
        this.cameras.main.setZoom(MainGame.CAMERA_ZOOM, MainGame.CAMERA_ZOOM)
        this.cameras.main.centerOn(0, 0);
        this.cameras.main.setBackgroundColor(0x136d15);

        this.grid = this.add.grid(0, 0, 10000, 10000, 10, 10);
        this.grid.setStrokeStyle(0.05);

        this.carnivore = new Animal(
            this.add.rectangle(
                0,
                -10,
                MainGame.ANIMAL_SIZE * 2,
                MainGame.ANIMAL_SIZE,
                0xDECC9C),
            new ZigZagEvasionTactic(
                3000,
                Math.PI / 2),
            MainGame.CARNIVORE_RUN_SPEED,
            MainGame.CARNIVORE_TURN_SPEED);
            
        this.carnivore.gameObject.setRotation(this.toRadians(90));

        this.herbivore = new Animal(
            this.add.rectangle(
                0,
                10,
                MainGame.ANIMAL_SIZE * 2,
                MainGame.ANIMAL_SIZE,
                0xBA8759),
            new ZigZagEvasionTactic(
                3000,
                Math.PI / 2),
            MainGame.HERBIVORE_RUN_SPEED,
            MainGame.HERBIVORE_TURN_SPEED);
        
        this.herbivore.gameObject.setRotation(this.toRadians(90));

        this.cameras.main.startFollow(this.carnivore.gameObject);
    };

    update(_time: number, deltaTimeMs: number)
    {
        let carnToHerbRelativeDirection = Phaser.Math.Angle.Between(
            this.carnivore.gameObject.x,
            this.carnivore.gameObject.y,
            this.herbivore.gameObject.x,
            this.herbivore.gameObject.y);
        
        this.herbivore.setThreatDirection(this.capRadians(carnToHerbRelativeDirection + Math.PI));
        this.carnivore.setFoodDirection(carnToHerbRelativeDirection);

        this.herbivore.update(deltaTimeMs);
        this.carnivore.update(deltaTimeMs);       
    }

    toRadians(degrees: number) : number
    {
        return degrees * Math.PI / 180;
    }

    capRadians(radians: number): number
    {
        const PI = Math.PI;
        return ((radians + PI) % (2 * PI) + 2 * PI) % (2 * PI) - PI;
    }
}