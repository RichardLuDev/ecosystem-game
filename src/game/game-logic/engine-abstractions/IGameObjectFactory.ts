import { IGameObject } from "./IGameObject";

export interface IGameObjectFactory
{
    rectangle(
        x?: number | undefined,
        y?: number | undefined,
        width?: number | undefined,
        height?: number | undefined,
        fillColor?: number | undefined,
        fillAlpha?: number | undefined): IGameObject;
}