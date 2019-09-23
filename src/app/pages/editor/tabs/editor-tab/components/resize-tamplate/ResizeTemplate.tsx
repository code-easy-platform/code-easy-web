import React, { Component } from 'react';

export enum TypeColluns {
    colLeft = 'colLeft',
    colRight = 'colRight',
    colTop = 'colTop',
}

interface IRecipeProps {
    type: TypeColluns,
    idFatherComponent: string,
}

interface IRecipeState { }

export class ResizeColluns extends Component<IRecipeProps, IRecipeState> {
    state = {
        isResizeColLeft: false,
        isResizeColRight: false,
        colLeftX: 0,
        colRightX: 0,
    }

    mouseUp = () => {
        this.setState({
            isResizeColLeft: false,
            isResizeColRight: false,
        });
    }

    mouseMove = (event: any) => {
        if (this.state.isResizeColLeft === true) {
            this.setState({ colLeftX: event.pageX + 5 });
        }
        if (this.state.isResizeColRight === true) {
            this.setState({ colRightX: (window.innerWidth - event.pageX) + 4 });
        }
    }

    /* onMouseMove={this.mouseMove.bind(this)} onMouseUp={this.mouseUp} */

    render() {
        if (this.props.type == TypeColluns.colRight) {
            return (
                <div className='col-right' style={{ width: this.state.colRightX }} onMouseUp={this.mouseUp}>
                    <div className="grabber-col-right" onMouseDown={() => this.setState({ isResizeColRight: true })}></div>

                    {this.props.children}
                </div>
            );
        } else if (this.props.type == TypeColluns.colLeft) {
            return (
                <div className='col-left' style={{ width: this.state.colLeftX }} onMouseUp={this.mouseUp}>

                    {this.props.children}

                    <div className="grabber-col-left" onMouseDown={() => this.setState({ isResizeColLeft: true })}></div>
                </div>
            );
        } else {
            return (<div>Vazio</div>);
        }
    }
}

export default ResizeColluns;
