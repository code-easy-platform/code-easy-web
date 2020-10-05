
export class LocalStorageService {
    static getInputsWidth(): number {
        const width = localStorage.getItem('INPUTS_WIDTH');
        if (width) {
            return Number(width);
        } else {
            return 60;
        }
    }
    static setInputsWidth(newWidth: number): number {
        localStorage.setItem('INPUTS_WIDTH', String(newWidth))
        return newWidth;
    }

    static getGroupsInOpen(group: string): boolean {
        const value = localStorage.getItem(group.toLocaleUpperCase() + '_GROUPS_OPEN');
        try {
            if (value !== null) {
                return JSON.parse(value);
            } else {
                return true;
            }
        } catch (_) {
            return true;
        }
    }
    static setGroupsInOpen(group: string, isOpen: boolean): boolean {
        localStorage.setItem(group.toLocaleUpperCase() + '_GROUPS_OPEN', String(isOpen))
        return isOpen;
    }
}
