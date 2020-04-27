import React, { useState, useEffect } from 'react';

import { ListItem } from './shared/components/ListItem';
import { IItem } from './shared/interfaces';

interface PropertiesEditorProps {
    /** Itens que serão listado para edição */
    itens: IItem[],
    /** Controla a largura das inputs */
    inputsWidth?: number;
    /** Acionada toda vez que um campo perde o foco ou que algum campo modifica o valor */
    onChange?(itens: IItem[]): void,
    /** Acionada toda vez que as inputs são redimencionadas */
    onChangeInputWidth?(width: number): void,
}

/** Permite a edição de vários itens de em foma de lista */
export const PropertiesEditor: React.FC<PropertiesEditorProps> = ({ inputsWidth = 180, itens, onChangeInputWidth, onChange = (_: any) => { } }) => {

    /** Controla o estado estado do wisth das inputs */
    const [inputWidth, setInputWidth] = useState<number>(inputsWidth);
    useEffect(() => {
        setInputWidth(inputsWidth);
    }, [inputsWidth]);

    /** Controla o estado dos itens */
    const [state, setState] = useState<{ itens: IItem[] }>({ itens });
    useEffect(() => {
        setState({ itens });
    }, [itens]);

    const onChangeListItem = (data: IItem, listItemIndex: number) => {
        state.itens[listItemIndex] = data;

        setState({ ...state });
        onChange(state.itens || itens);
    }

    const changeInputWidth = (newWidth: number) => {

        if (onChangeInputWidth) {
            onChangeInputWidth(newWidth);
        }

        setInputWidth(newWidth);
    }

    return (
        <div className="flex1 flex-column overflow-auto">
            {state.itens.map((item, index) => {
                return (<>
                    <ListItem
                        onChange={data => onChangeListItem(data, index)}
                        onChangeInputWidth={changeInputWidth}
                        inputWidth={inputWidth}
                        key={item.id}
                        {...item}
                    />
                    <div style={{ minHeight: '30px' }} />
                </>);
            })}
        </div>
    );

}
