import React from 'react';

import { FieldGroup } from './fields/FieldGroup';
import { IProperty } from '../interfaces';
import { Field } from './Field';

interface FieldsListProps {
    fields: IProperty[];
}
export const FieldsList: React.FC<FieldsListProps> = ({ fields = [] }) => {

    let groups: string[] = [];
    fields.forEach(prop => {
        if (prop.group.value && (!groups.some(group => group === prop.group.value))) {
            groups.push(prop.group.value);
        }
    });

    return (
        <div className="flex-column overflow-auto full-height">
            {fields
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
                        {fields.filter(prop => prop.group.value === group).map((field, index) => (
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
