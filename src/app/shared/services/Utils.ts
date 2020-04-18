import { v4 as uuidv4 } from 'uuid';

export class Utils {

    /**
     * Retorna um valor randomico.
     */
    public static getRandomId(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /** Retorna um UUID */
    public static getUUID = () => uuidv4();

}
