import React, { Component } from 'react';

import { ProjectsStorage } from '../../services/storage/ProjectsStorage';
import './ResizeTemplate.css';

interface IRecipeProps {
    useMinMaxHeight?: boolean,
    bottom: JSX.Element,
    maxBottomHeight?: string,
    minBottomHeight?: string,
    top: JSX.Element,
    id: string,
}

export class TwoRowsResizable extends Component<IRecipeProps> {

    state = { bottomHeight: 400 }

    componentDidMount() {
        window.addEventListener("resize", () => this.setState({}));
        this.setState({ bottomHeight: ProjectsStorage.getColumnsResizableSize(this.props.id) });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => this.setState({}));
    }

    mouseMove = (event: any) => {
        this.setState({ bottomHeight: (window.innerHeight - event.pageY) - 20, });
    }

    mouseUp = () => {
        window.onmouseup = null;
        window.onmousemove = null;
        window.document.body.style.cursor = 'unset';
        ProjectsStorage.setColumnsResizableSize(this.props.id, this.state.bottomHeight);
    }

    mouseDown = () => {
        window.document.body.style.cursor = 'n-resize';
        window.onmousemove = this.mouseMove;
        window.onmouseup = this.mouseUp;
    }

    render() {
        const useMinMaxHeight = this.props.useMinMaxHeight ? this.props.useMinMaxHeight : true;

        return (
            <div className="flex1 display-block full-width full-height">
                <div className="full-width" style={{
                    maxHeight: useMinMaxHeight && (this.props.maxBottomHeight || '90%'),
                    minHeight: useMinMaxHeight && (this.props.minBottomHeight || '10%'),
                    height: (window.innerHeight - this.state.bottomHeight) - 56,
                }}>{this.props.top}</div>

                <hr className='hr' />

                <div className="full-width" style={{
                    height: this.state.bottomHeight,
                    maxHeight: useMinMaxHeight && (this.props.maxBottomHeight || '95%'),
                    minHeight: useMinMaxHeight && (this.props.minBottomHeight || '10%'),
                }}>
                    <div className="grabber-col-right-resize-y" onMouseDown={this.mouseDown} />
                    <div className="flex1 full-width">{this.props.bottom}</div>
                </div>
            </div>
        );
    }
}
