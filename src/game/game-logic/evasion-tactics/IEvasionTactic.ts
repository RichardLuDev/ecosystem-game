export interface IEvasionTactic
{
    evasionDirection(threadDirection: number, deltaTimeMs: number): number;
}