import React, { Component } from 'react';

import { IdeConfigStorage } from '../../services';

interface ITwoColumnsResizableProps {
    id: string,
    children: [JSX.Element, JSX.Element],
    variant: 'left' | 'center' | 'right',
}
export class TwoColumnsResizable extends Component<ITwoColumnsResizableProps> {
    private isRight = this.props.variant === 'right';

    leftChild = this.props.children[0];
    rightChild = this.props.children[1];

    state = { colX: IdeConfigStorage.getColumnsResizableSize(this.props.id) }

    componentDidMount() {
        window.addEventListener("resize", () => this.setState({}));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => this.setState({}));
    }

    mouseMove = (event: any) => {
        this.setState({ colX: this.isRight ? (window.innerWidth - event.pageX + 6) : event.pageX });
    }

    mouseUp = () => {
        window.onmouseup = null;
        window.onmousemove = null;
        window.document.body.style.cursor = 'unset';
        IdeConfigStorage.setColumnsResizableSize(this.props.id, this.state.colX);
    }

    mouseDown = () => {
        window.document.body.style.cursor = 'e-resize';
        window.onmousemove = this.mouseMove;
        window.onmouseup = this.mouseUp;
    }

    render = () => (
        <div className="flex1 full-width">
            <div className="col-align-left display-block" style={{ width: window.innerWidth - this.state.colX }}>{this.leftChild}</div>
            <hr className='hr hr-vertical' />
            <div className={`display-block col-align-${this.props.variant}`} style={{ width: !this.isRight ? (window.innerWidth - this.state.colX) : this.state.colX }}>
                <div className="grabber-col-right" onMouseDown={this.mouseDown} />
                <div className="full-height full-width">
                    {this.rightChild}
                </div>
            </div>
        </div>
    );
}
