import React from 'react';
import { IObservable, useObserverValue } from 'react-observing';

import { FieldGroup } from './fields/FieldGroup';
import { IProperty } from '../interfaces';
import { Field } from './Field';

interface FieldsListProps {
    fields: IObservable<IProperty[]>;
}
export const FieldsList: React.FC<FieldsListProps> = ({ fields }) => {
    const properties = useObserverValue(fields);

    let groups: string[] = [];
    properties.forEach(prop => {
        if (prop.group.value && (!groups.some(group => group === prop.group.value))) {
            groups.push(prop.group.value);
        }
    });

    return (
        <div className="flex-column overflow-auto full-height">
            {properties
                .filter(field => field.group.value === undefined)
                .map((field, index) => (
                    <Field
                        key={index}
                        field={field}
                    />
                ))
            }
            {groups.map((group, index) => {
                return (
                    <FieldGroup key={index} group={group}>
                        {properties.filter(prop => prop.group.value === group).map((field, index) => (
                            <Field
                                key={index}
                                field={field}
                            />
                        ))}
                    </FieldGroup>
                );
            })}
        </div>
    );
}
