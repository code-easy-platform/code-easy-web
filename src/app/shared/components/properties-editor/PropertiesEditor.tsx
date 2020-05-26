import React, { useState, useEffect } from 'react';

import { ListItem } from './shared/components/ListItem';
import { IItem } from './shared/interfaces';
import './styles.css';

interface PropertiesEditorProps {
    /** Itens que serão listado para edição */
    item: IItem,
    /** Controla a largura das inputs */
    inputsWidth?: number;
    /** Acionada toda vez que um campo perde o foco ou que algum campo modifica o valor */
    onChange?(item: IItem): void,
    /** Acionada toda vez que as inputs são redimencionadas */
    onChangeInputWidth?(width: number): void,
}
/** Permite a edição de vários itens de em foma de lista */
export const PropertiesEditor: React.FC<PropertiesEditorProps> = ({ inputsWidth = 180, item, onChangeInputWidth, onChange = (_: any) => { } }) => {

    /** Controla o estado estado do wisth das inputs */
    const [inputWidth, setInputWidth] = useState<number>(inputsWidth);
    useEffect(() => {
        setInputWidth(inputsWidth);
    }, [inputsWidth]);

    /** Controla o estado dos itens */
    const [state, setState] = useState<{ item: IItem }>({ item });
    useEffect(() => {
        setState({ item });
    }, [item]);

    const onChangeListItem = (data: IItem) => {
        state.item = data;
        setState(state);
        onChange(state.item || item);
    }

    const changeInputWidth = (newWidth: number) => {
        if (onChangeInputWidth) {
            onChangeInputWidth(newWidth);
        }
        setInputWidth(newWidth);
    }

    return (
        <div className="flex1 flex-column full-width">
            <ListItem
                onChangeInputWidth={changeInputWidth}
                onChange={onChangeListItem}
                inputWidth={inputWidth}
                key={item.id}
                {...item}
            />
        </div>
    );

}
