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

    /** Retorna uma string sem caracteres especiais, espaços e quebras de linha  */
    public static getNormalizedString = (value: string) => value.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    /** Executa o download de um arquivo */
    public static downloadFile = (filename: string, fileType: 'json', content: string) => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', `${filename}.${fileType}`);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    /** Valida o campo de name do projeto */
    public static isValidName(name: string) {
        return !(/^(?! )((?! {2})(?<! )$[a-zA-Z ]){3,50}$/.test(name));
    }

    /** Valida o campo de versão do projeto */
    public static isValidVersion(version: string) {
        return !(/^\d{1,2}\.\d{1,2}\.\d{1,2}$/.test(version));
    }

    /** 
     * Compares two Date objects and returns e number value that represents 
     * the result:
     * 0 if the two dates are equal.
     * 1 if the first date is greater than second.
     * -1 if the first date is less than second.
     * @param date1 First date object to compare.
     * @param date2 Second date object to compare.
     */
    public static compareDate(date1: Date, date2: Date): number {

        // With Date object we can compare dates them using the >, <, <= or >=.
        // The ==, !=, ===, and !== operators require to use date.getTime(),
        // so we need to create a new instance of Date with 'new Date()'
        let d1 = new Date(date1);
        let d2 = new Date(date2);

        // Check if the dates are equal
        let same = d1.getTime() === d2.getTime();
        if (same) return 0;

        // Check if the first is greater than second
        if (d1 > d2) return 1;

        // Check if the first is less than second
        if (d1 < d2) return -1;

        return 0;
    }

}
