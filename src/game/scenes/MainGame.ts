import { Scene } from 'phaser';

import Rectangle = Phaser.GameObjects.Rectangle;

export class MainGame extends Scene
{
    static readonly CAMERA_ZOOM : number = 10;
    static readonly ANIMAL_SIZE : number = 1;

    carnivore : Rectangle;
    herbivore : Rectangle;

    constructor()
    {
        super('MainGame');
    }

    create()
    {
        this.cameras.main.setZoom(MainGame.CAMERA_ZOOM, MainGame.CAMERA_ZOOM)
        this.cameras.main.centerOn(0, 0);
        this.cameras.main.setBackgroundColor(0x136d15);

        this.carnivore = this.add.rectangle(
            0,
            10,
            MainGame.ANIMAL_SIZE,
            MainGame.ANIMAL_SIZE,
            0xDECC9C);
        
        this.herbivore = this.add.rectangle(
            0,
            -10,
            MainGame.ANIMAL_SIZE,
            MainGame.ANIMAL_SIZE,
            0xBA8759);
    }

    update(_time: number, delta: number)
    {
        const velocity : number = 10; // [m/s]
        
        this.carnivore.x += this.getIncrement(velocity, delta);
    }

    getIncrement(velocity : number, deltaTimeMs : number)
    {
        return velocity * deltaTimeMs / 1000;
    }
}