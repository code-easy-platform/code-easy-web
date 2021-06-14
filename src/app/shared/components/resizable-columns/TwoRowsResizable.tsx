import { Component } from 'react';

import { IdeConfigStorage } from '../../services';
import './ResizeTemplate.css';

interface ITwoRowsResizableProps {
    children: [JSX.Element, JSX.Element],
    minBottomHeight?: string | number,
    maxBottomHeight?: string | number,
    useMinMaxHeight?: boolean,
    id: string,
}

export class TwoRowsResizable extends Component<ITwoRowsResizableProps> {
    topChild = this.props.children[0];
    bottomChild = this.props.children[1];

    state = { bottomHeight: IdeConfigStorage.getColumnsResizableSize(this.props.id) }

    componentDidMount() {
        window.addEventListener("resize", () => this.setState({}));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => this.setState({}));
    }

    mouseMove = (event: any) => {
        if (!this.props.minBottomHeight || this.state.bottomHeight > this.props.minBottomHeight) {
            this.setState({ bottomHeight: (window.innerHeight - event.pageY) - 20, });
        } else if ((window.innerHeight - event.pageY) - 20 > this.state.bottomHeight) {
            this.setState({ bottomHeight: (window.innerHeight - event.pageY) - 20, });
        }
    }

    mouseUp = () => {
        window.onmouseup = null;
        window.onmousemove = null;
        window.document.body.style.cursor = 'unset';
        IdeConfigStorage.setColumnsResizableSize(this.props.id, this.state.bottomHeight);
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
                }}>{this.topChild}</div>

                <hr className="hr" />
                <div className="grabber-col-right-resize-y" onMouseDown={this.mouseDown} />

                <div className="full-width" style={{
                    height: this.state.bottomHeight,
                    maxHeight: useMinMaxHeight && (this.props.maxBottomHeight || '95%'),
                    minHeight: useMinMaxHeight && (this.props.minBottomHeight || 100),
                }}>
                    <div className="flex1 full-width full-height">
                        {this.bottomChild}
                    </div>
                </div>
            </div>
        );
    }
}
