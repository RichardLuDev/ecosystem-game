export const MathUtils = 
{
    degreesToRadians: (degrees: number) : number =>
    {
        return degrees * Math.PI / 180;
    },
    
    normalizeRadians: (radians: number): number =>
    {
        const PI = Math.PI;
        return ((radians + PI) % (2 * PI) + 2 * PI) % (2 * PI) - PI;
    },

    integrate: (value: number, deltaTimeMs: number) : number =>
    {
        return value * deltaTimeMs / 1000;
    }
}