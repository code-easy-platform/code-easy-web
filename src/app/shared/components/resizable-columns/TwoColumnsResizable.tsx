import React, { Component } from 'react';
import { Storage } from '../../services/LocalStorage';

interface IRecipeProps {
    id: string,
    columnLeft: JSX.Element,
    columnRight: JSX.Element,
    aligment: 'left' | 'center' | 'right',
}

export class TwoColumnsResizable extends Component<IRecipeProps> {
    private isRight = this.props.aligment === 'right';
        
    state = { colX: 300 }

    componentDidMount() {
        this.setState({ colX: Storage.getColumnsResizableSize(this.props.id) });
    }

    mouseMove = (event: any) => {
        this.setState({ colX: this.isRight ? (window.innerWidth - event.pageX) : event.pageX });
    }

    mouseUp = () => {
        window.onmouseup = null;
        window.onmousemove = null;
        window.document.body.style.pointerEvents = 'unset';
        Storage.setColumnsResizableSize(this.props.id, this.state.colX);
    }

    mouseDown = () => {
        window.document.body.style.pointerEvents = 'none';
        window.onmousemove = this.mouseMove;
        window.onmouseup = this.mouseUp;
    }

    render = () => (<>
        {this.props.columnLeft}

        <div className={`col-align-${this.props.aligment}`} style={{ width: !this.isRight ? (window.innerWidth - this.state.colX) : this.state.colX }}>
            <div className="grabber-col-right" onMouseDown={this.mouseDown} />
            <hr className='hr hr-vertical' />
            {this.props.columnRight}
        </div>
    </>);

}
