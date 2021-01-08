import { useEffect, useState } from "react";
import { ISubscription } from "react-observing";

import { IConnection } from "../interfaces";
import { useItems } from "./useFlowItems";
import { EFlowItemType } from "../enums";

export const useLineProps = (id: string | undefined, originId: string, targetId: string) => {
    const itemsStore = useItems();

    const [originFlowItemType, setOriginFlowItemType] = useState<EFlowItemType>(EFlowItemType.acorn);
    const [originConnections, setOriginConnections] = useState<IConnection[]>([]);
    const [originIsDisabled, setOriginIsDisabled] = useState<boolean>(false);
    const [originHeight, setOriginHeight] = useState<number>(0);
    const [originWidth, setOriginWidth] = useState<number>(0);
    const [originLeft, setOriginLeft] = useState<number>(0);
    const [originTop, setOriginTop] = useState<number>(0);
    useEffect(() => {
        const subscriptions: ISubscription[] = [];
        const originItem = itemsStore.value.find(item => item.id.value === originId);
        if (originItem) {
            subscriptions.push(originItem.height.subscribe((value = 0) => setOriginHeight(value)));
            subscriptions.push(originItem.width.subscribe((value = 0) => setOriginWidth(value)));
            subscriptions.push(originItem.flowItemType.subscribe(setOriginFlowItemType));
            subscriptions.push(originItem.connections.subscribe(setOriginConnections));
            subscriptions.push(originItem.isDisabled.subscribe(setOriginIsDisabled));
            subscriptions.push(originItem.left.subscribe(setOriginLeft));
            subscriptions.push(originItem.top.subscribe(setOriginTop));

            setOriginFlowItemType(originItem.flowItemType.value);
            setOriginConnections(originItem.connections.value);
            setOriginIsDisabled(originItem.isDisabled.value);
            setOriginHeight(originItem.height.value || 0);
            setOriginWidth(originItem.width.value || 0);
            setOriginLeft(originItem.left.value);
            setOriginTop(originItem.top.value);
        }
        return () => subscriptions.forEach(subscription => subscription.unsubscribe());
    }, [itemsStore.value, originId]);


    const [targetConnections, setTargetConnections] = useState<IConnection[]>([]);
    const [targetHeight, setTargetHeight] = useState<number>(0);
    const [targetWidth, setTargetWidth] = useState<number>(0);
    const [targetLeft, setTargetLeft] = useState<number>(0);
    const [targetTop, setTargetTop] = useState<number>(0);
    useEffect(() => {
        const subscriptions: ISubscription[] = [];
        const targetItem = itemsStore.value.find(item => item.id.value === targetId);
        if (targetItem) {
            subscriptions.push(targetItem.height.subscribe((value = 0) => setTargetHeight(value)));
            subscriptions.push(targetItem.width.subscribe((value = 0) => setTargetWidth(value)));
            subscriptions.push(targetItem.connections.subscribe(setTargetConnections));
            subscriptions.push(targetItem.left.subscribe(setTargetLeft));
            subscriptions.push(targetItem.top.subscribe(setTargetTop));

            setTargetConnections(targetItem.connections.value);
            setTargetHeight(targetItem.height.value || 0);
            setTargetWidth(targetItem.width.value || 0);
            setTargetLeft(targetItem.left.value);
            setTargetTop(targetItem.top.value);
        }
        return () => subscriptions.forEach(subscription => subscription.unsubscribe());
    }, [itemsStore.value, targetId]);


    const [connectionDescription, setConnectionDescription] = useState<string | undefined>();
    const [connectionIsSelected, setConnectionIsSelected] = useState<boolean>(false);
    const [connectionLabel, setConnectionLabel] = useState<string | undefined>('');
    useEffect(() => {
        const subscriptions: ISubscription[] = [];
        const connection = originConnections.find(connection => connection.id.value === id);
        if (connection) {
            subscriptions.push(connection.connectionDescription.subscribe(setConnectionDescription));
            subscriptions.push(connection.connectionLabel.subscribe(setConnectionLabel));
            subscriptions.push(connection.isSelected.subscribe(setConnectionIsSelected));

            setConnectionDescription(connection.connectionDescription.value);
            setConnectionLabel(connection.connectionLabel.value);
            setConnectionIsSelected(connection.isSelected.value);
        }
        return () => subscriptions.forEach(subscription => subscription.unsubscribe());
    }, [id, originConnections, setConnectionDescription, setConnectionIsSelected, setConnectionLabel]);


    // Find the target component
    const isCurved = targetConnections.some(connection => connection.targetId.value === originId);
    // Origin is a comment?
    const isComment = originFlowItemType === EFlowItemType.comment;
    // Line type
    const lineType = isComment ? 'dotted' : 'normal';
    // Used to guide the line arrow when connected
    const radius = targetWidth - (targetWidth / 4);

    // Calc the correct positions of the line arrow
    const top2 = id !== undefined ? targetTop + (targetHeight / 2) : originTop + (originHeight / 2);
    const left2 = id !== undefined ? targetLeft + (targetWidth / 2) : originLeft + (originWidth / 2);
    const newLeft = originLeft + (originWidth / 2);
    const newTop = originTop + (originHeight / 2);


    return {
        connectionDescription: connectionDescription,
        lineType: lineType as "dotted" | "normal",
        isSelected: connectionIsSelected,
        connectionLabel: connectionLabel,
        isDisabled: originIsDisabled,
        left: newLeft,
        top: newTop,
        isComment,
        isCurved,
        radius,
        left2,
        top2,
    };
}
