import React, { Component } from 'react';

import './ResizeTemplate.scss';

interface IRecipeProps {
    rowTop: any,
    rowBottom: any,
}

interface IRecipeState { }

export class ColRightTemplate extends Component<IRecipeProps, IRecipeState> {

    state = {
        isResizeRowBottom: false,
        rowBottomY: 400,
        rowTopY: 400,
    }

    mouseDown = () => { this.setState({ isResizeRowBottom: true }); }
    mouseUp = () => { this.setState({ isResizeRowBottom: false }); }

    mouseMove(event: any) {
        if (this.state.isResizeRowBottom === true)
            this.setState({ rowBottomY: (window.innerHeight - event.pageY) - 20, rowTopY: event.pageY - 55 });
    }

    render() {
        return (
            <div className="flex1 content" onMouseMove={this.mouseMove.bind(this)} onMouseUp={this.mouseUp}>
                <div className="flex1 padding6">
                    <div style={{ width: '100%', overflowY: 'auto', height: this.state.rowTopY }}>
                        {this.props.rowTop}
                    </div>
                </div>
                <div style={{ flexDirection: 'column', height: this.state.rowBottomY }}>
                    <div className="grabber-col-right-resize-y" onMouseDown={this.mouseDown}></div>
                    <div className="padding6">
                        {this.props.rowBottom}
                    </div>
                </div>
            </div>
        );
    }
}

export default ColRightTemplate;
