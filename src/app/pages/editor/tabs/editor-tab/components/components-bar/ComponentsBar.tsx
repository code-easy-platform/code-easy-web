import React, { Component } from 'react';
import { ItemToDrag } from '../code-editor/components/item-drag/ItemDrag';

export default class ComponentsBar extends Component {
    render() {
        return (
            <div id="toolList" className="draggable-list">
                <div className="draggable-item">
                    <ItemToDrag id={null} allowDrag={true} title="Drag me " outputPosition={()=>{}} />
                </div >
            </div >
        )
    }
}
