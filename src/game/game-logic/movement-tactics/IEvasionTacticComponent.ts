export interface IEvasionTacticComponent
{
    evasionDirection(threadDirection: number, deltaTimeMs: number): number;
}