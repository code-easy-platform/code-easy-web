
export class Utils {

    /**
     * Retorna um valor randomico.
     */
    public static getRandomKey(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
