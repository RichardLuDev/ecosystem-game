export interface IGameObject
{
    x: number;
    y: number;
    z: number;
    rotation: number;

    setPosition(x: number, y: number) : IGameObject;
    setPosition(x: number, y: number, z: number) : IGameObject;
    setRotation(rotation: number) : IGameObject;
}