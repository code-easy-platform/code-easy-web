import React, { Component } from 'react';
import { Storage } from '../../services/LocalStorage';

interface IRecipeProps {
    columnCenter: JSX.Element,
    columnRight: JSX.Element,
    id: string,
}

export class TwoColumnsResizable extends Component<IRecipeProps> {
    state = { colRightX: 300, }

    componentWillMount() {
        this.setState({
            colRightX: Storage.getColumnsResizableSize(this.props.id),
        });
    }

    mouseMove = (event: any) => {
        this.setState({ colRightX: (window.innerWidth - event.pageX) });
    }

    mouseUp = () => {
        window.onmouseup = null;
        window.onmousemove = null;
        Storage.setColumnsResizableSize(this.props.id, this.state.colRightX);
    }

    mouseDown = () => {
        window.onmousemove = this.mouseMove;
        window.onmouseup = this.mouseUp;
    }

    render = () => (<>
        {this.props.columnCenter}

        <div className='col-right' style={{ width: this.state.colRightX }}>
            <div className="grabber-col-right" onMouseDown={this.mouseDown} />
            <hr className='hr hr-vertical' />
            {this.props.columnRight}
        </div>
    </>);

}
