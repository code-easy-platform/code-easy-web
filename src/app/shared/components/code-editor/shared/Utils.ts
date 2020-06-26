import { ItemType } from "./enums/ItemType";

export class Utils {

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

}
