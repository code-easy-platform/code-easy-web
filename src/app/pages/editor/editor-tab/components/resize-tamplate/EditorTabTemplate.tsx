import React, { Component } from 'react';

interface IRecipeProps {
    columnLeft?: any,
    columnCenter: any,
    columnRight: any,
}

interface IRecipeState { }

export class EditorTabTemplate extends Component<IRecipeProps, IRecipeState> {

    state = {
        isResizeColLeft: false,
        isResizeColRight: false,
        colLeftX: 150,
        colRightX: 300,
    }

    mouseUp = () => {
        this.setState({
            isResizeColLeft: false,
            isResizeColRight: false,
        });
    }

    mouseMove(event: any) {
        if (this.state.isResizeColLeft === true) {
            // this.setState({ colLeftX: event.pageX + 5 });
        } else if (this.state.isResizeColRight === true) {
            this.setState({ colRightX: (window.innerWidth - event.pageX) + 4 });
        }
    }

    render() {
        return (
            <div className="flex1" onMouseMove={this.mouseMove.bind(this)} onMouseUp={this.mouseUp}>
                <div className='col-left'>
                    <div >
                        {this.props.columnLeft/* Coluna da esquerda */}
                    </div>
                    <div className="grabber-col-left" onMouseDown={() => this.setState({ isResizeColLeft: true })}></div>
                </div>
                <div className="col-center">
                    <div className="flex1">
                        {this.props.columnCenter/* Coluna do centro */}
                    </div>
                </div>
                <div className='col-right' style={{ width: this.state.colRightX }}>
                    <div className="grabber-col-right" onMouseDown={() => this.setState({ isResizeColRight: true })}></div>
                    <div className="flex1">
                        {this.props.columnRight/* Coluna da direita */}
                    </div>
                </div>
            </div>
        );
    }
}

export default EditorTabTemplate;
