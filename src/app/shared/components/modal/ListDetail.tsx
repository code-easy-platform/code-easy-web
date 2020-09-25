import React, { useCallback, useEffect, useState } from 'react';


export const OptionItemContent: React.FC = ({ children }) => {
    return (
        <>{children}</>
    );
}


export interface IOptionListItem {
    title: string;
    isSelected?: boolean;
    description?: string;
}
interface ListDetailProps {
    menuOptions: IOptionListItem[];
    children: [] | React.ReactElement<typeof OptionItemContent>
}
export const ListDetail: React.FC<ListDetailProps> = ({ menuOptions, children }) => {

    const [options, setOptions] = useState(menuOptions);
    useEffect(() => {
        setOptions(menuOptions);
    }, [menuOptions]);

    const handleSelectMenuItem = useCallback((position: number) => {
        setOptions([
            ...options.map((option, index) => ({
                ...option,
                isSelected: index === position,
            })),
        ]);
    }, [options]);

    return (
        <div className="flex1">
            <section className="flex2 padding-top-xs padding-bottom-xs background-panels">
                {options.map(({ title, description, isSelected }, index) => (
                    <div
                        key={index}
                        title={description}
                        onMouseDown={() => handleSelectMenuItem(index)}
                        className={`hover active padding-s cursor-pointer${isSelected ? ' selected' : ''}`}
                    >
                        {title}
                    </div>
                ))}
            </section>
            <hr className="hr hr-vertical hr-white" />
            <section className="flex5 padding-s flex-column">
                {
                    Array.isArray(children)
                        ? options.map(({ isSelected }, index) => {
                            if (!isSelected) return null;
                            if (!children) return null;

                            return children[index];
                        })
                        : children
                }
            </section>
        </div>
    );
}
