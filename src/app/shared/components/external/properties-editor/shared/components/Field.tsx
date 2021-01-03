import React from 'react';
import { useObserverValue } from 'react-observing';

import {
    InputSelectionYesNo, InputExpression, InputSelection,
    InputViewOnly, SimpleString, InputSwitch, InputSimpleNumber,
    InputImportFile, InputBigString, InputFullBigString, Assign,
} from './fields/inputs/';
import { IProperty } from '../interfaces';
import { TypeOfValues } from '../enums';

interface FieldProps {
    field: IProperty;
}
export const Field: React.FC<FieldProps> = ({ field }) => {
    const type = useObserverValue(field.type);

    switch (type) {
        case TypeOfValues.viewOnly:
            return <InputViewOnly {...field} />;

        case TypeOfValues.string:
            return <SimpleString {...field} />;

        case TypeOfValues.boolean:
            return <InputSwitch {...field} />;

        case TypeOfValues.number:
            return <InputSimpleNumber {...field} />;

        case TypeOfValues.binary:
            return <InputImportFile {...field} />;

        case TypeOfValues.bigstring:
            return <InputBigString {...field} />;

        case TypeOfValues.fullBigString:
            return <InputFullBigString {...field} />;

        case TypeOfValues.selection:
            return <InputSelection {...field} />;

        case TypeOfValues.yesNoSelection:
            return <InputSelectionYesNo {...field} />;

        case TypeOfValues.expression:
            return <InputExpression {...field} />;

        case TypeOfValues.assign:
            return <Assign {...field} />;

        case TypeOfValues.hidden:
            return null;

        default:
            return null;
    }
}
