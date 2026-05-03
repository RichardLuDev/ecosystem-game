import { AUTO, Game } from 'phaser';
import { MainGame as MainGame } from './scenes/MainGame';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 500,
    height: 500,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        MainGame,
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
