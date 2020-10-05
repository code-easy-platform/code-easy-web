import { EItemType, IConnection, IFlowItem } from "./../../components/external";
import { IBasicConfigurations } from "./IBasicConfigurations";

/**
 * Flow item representation with all its properties
 */
export interface IFlowItemComponent extends IBasicConfigurations<EItemType>, Omit<IFlowItem, 'itemType'> {
    label: IBasicConfigurations['label'];
    connections: IConnection[];
}
