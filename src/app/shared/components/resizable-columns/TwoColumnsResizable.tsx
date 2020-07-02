import React, { Component } from 'react';

import { ProjectsStorage } from '../../services/storage/ProjectsStorage';

interface IRecipeProps {
    id: string,
    left: JSX.Element,
    right: JSX.Element,
    aligment: 'left' | 'center' | 'right',
}
export class TwoColumnsResizable extends Component<IRecipeProps> {
    private isRight = this.props.aligment === 'right';

    state = { colX: 300 }

    componentDidMount() {
        this.setState({ colX: ProjectsStorage.getColumnsResizableSize(this.props.id) });
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
        ProjectsStorage.setColumnsResizableSize(this.props.id, this.state.colX);
    }

    mouseDown = () => {
        window.document.body.style.cursor = 'e-resize';
        window.onmousemove = this.mouseMove;
        window.onmouseup = this.mouseUp;
    }

    render = () => (
        <div className="flex1 full-width">
            <div className="col-align-left display-block" style={{ width: window.innerWidth - this.state.colX }}>{this.props.left}</div>
            <hr className='hr hr-vertical' />
            <div className={`display-block col-align-${this.props.aligment}`} style={{ width: !this.isRight ? (window.innerWidth - this.state.colX) : this.state.colX }}>
                <div className="grabber-col-right" onMouseDown={this.mouseDown} />
                <div className="full-height full-width">
                    {this.props.right}
                </div>
            </div>
        </div>
    );

}
