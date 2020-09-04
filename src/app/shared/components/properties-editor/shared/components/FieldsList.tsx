import React, { useCallback } from 'react';

import { FieldGroup } from './fields/FieldGroup';
import { IProperty } from '../interfaces';
import { Field } from './Field';

interface FieldsListProps {
    fields: IProperty[];
    onChange?(fields: IProperty[]): void;
}
export const FieldsList: React.FC<FieldsListProps> = ({ fields = [], onChange }) => {

    let groups: string[] = [];
    fields.forEach(prop => {
        if (prop.group && (!groups.some(group => group === prop.group))) {
            groups.push(prop.group);
        }
    });

    const handleOnChange = useCallback((data: IProperty<any>) => {
        onChange && onChange(fields.map(current => {
            if (current.id === data.id) {
                return data;
            }
            return current;
        }));
    }, [fields, onChange]);

    return (
        <div className="flex-column overflow-auto full-height">
            {fields
                .filter(field => field.group === undefined)
                .map((field, index) => (
                    <Field
                        key={index}
                        field={field}
                        onChange={handleOnChange}
                    />
                ))
            }
            {groups.map((group, index) => {
                return (
                    <FieldGroup key={index} group={group}>
                        {fields.filter(prop => prop.group === group).map((field, index) => (
                            <Field
                                key={index}
                                field={field}
                                onChange={handleOnChange}
                            />
                        ))}
                    </FieldGroup>
                );
            })}
        </div>
    );
}
