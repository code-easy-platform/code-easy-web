import React, { Component } from 'react';

interface IRecipeProps {
    columnLeft?: any,
    columnCenter: any,
    columnRight: any,
}

interface IRecipeState { }

export class EditorTabTemplate extends Component<IRecipeProps, IRecipeState> {

    state = { isResizeColRight: false, colRightX: 300, }

    mouseMove = (event: any) => {
        if (this.state.isResizeColRight)
            this.setState({ colRightX: (window.innerWidth - event.pageX) + 4 });
    }

    mouseDown = () => {

        this.setState({ isResizeColRight: true });
        window.onmouseup = this.mouseUp;
        window.onmousemove = this.mouseMove;

    }

    mouseUp = () => {

        window.onmouseup = null;
        window.onmousemove = null;
        this.setState({ isResizeColRight: false });

    }

    render = () => (<>

        {/* Coluna do centro */}
        {this.props.columnCenter}

        <div className='col-right' style={{ width: this.state.colRightX }}>
            <div className="grabber-col-right" onMouseDown={this.mouseDown} />
            {this.props.columnRight/* Coluna da direita */}
        </div>

    </>);
}
