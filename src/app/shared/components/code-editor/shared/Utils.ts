import { ItemType } from "../models/ItemFluxo";

export class Utils {

    /**
     * Retorna um valor randomico.
     */
    public static getRandomId() {
        const min = Math.ceil(10000);
        const max = Math.floor(100000000);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public static useNewBranch = (currentBranchsLength: number, itemType: ItemType) => {
        switch (itemType) {
            case ItemType.IF:
                return currentBranchsLength < 2; // Só usa nova branch para um if se ele ainda tiver menos de 2 branchs.

            case ItemType.SWITCH:
                return true; // Sempre usa uma nova branch para um swicth.

            case ItemType.END:
                return false; // Nunca usa uma nova branch para um END.

            case ItemType.ASSIGN:
                return currentBranchsLength < 1; // Apenas uma nova branch para um assing.

            case ItemType.FOREACH:
                return currentBranchsLength < 2; // Apenas duas branchs para um FOREACH.

            case ItemType.START:
                return currentBranchsLength < 1; // Apenas uma branchs para um START.

            case ItemType.COMMENT:
                return true; // Apenas uma branchs para um START.

            default:
                return currentBranchsLength < 1;

        }
    }

    public static getAngle(currX: number, currY: number, endX: number, endY: number): number {
        var angle = Math.atan2(currX - endX, currY - endY) * (180 / Math.PI);

        if (angle < 0) {
            angle = Math.abs(angle);
        } else {
            angle = 360 - angle;
        }

        return angle;
    }

}
