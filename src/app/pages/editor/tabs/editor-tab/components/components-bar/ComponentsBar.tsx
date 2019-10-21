import React, { Component } from 'react';
import { ItemToDrag } from '../code-editor/components/item-drag/ItemDrag';

export default class ComponentsBar extends Component {
    render() {
        return (
            <div id="toolList" className="draggable-list">
                <div className="draggable-item">
                    <p className="align-start">tst</p>
                    {/* <ItemDrag id={null} title="Drag me ">Drag me </ItemDrag> */}
                    <ItemToDrag id={null} title="Drag me " />
                </div >
            </div >
        );
    }
}
