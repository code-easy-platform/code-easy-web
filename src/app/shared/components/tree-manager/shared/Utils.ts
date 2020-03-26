export class Utils {

    /**
     * Retorna um valor randomico.
     */
    public static getRandomId() {
        const min = Math.ceil(10000);
        const max = Math.floor(100000000);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
}
