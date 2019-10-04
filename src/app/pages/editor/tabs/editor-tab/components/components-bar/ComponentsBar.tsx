import React, { Component } from 'react';
// import ItemDrag from '../code-editor/components/item-drag/ItemDrag';

export default class ComponentsBar extends Component {
    render() {
        return (
            <div id="toolList" className="draggable-list">
                <div className="draggable-item">
                    <p className="align-start">tst</p>
                    {/* <ItemDrag key="5" id="5" left={40} top={500}>Drag me 5</ItemDrag>; */}
                </div >
            </div >
        );
    }
}
