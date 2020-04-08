import React from 'react';

import { ContextMenuService } from './ContextMenuService';
import './ContextMenu.scss';

export interface IItemListContext {
    label: string;
    action(): any;
}
interface ContextMenuSate {
    actions: IItemListContext[],
    isShow: boolean,
    left: number,
    top: number,
}
export class ContextMenu extends React.Component<{ title?: string }> {
    private menuSubscrition: any;

    state: ContextMenuSate = {
        isShow: false,
        actions: [],
        left: 0,
        top: 0,
    }

    componentDidMount() {
        this.menuSubscrition = ContextMenuService.getMessage().subscribe(data => {
            this.setState({
                actions: data.actions,
                left: data.left,
                top: data.top,
                isShow: true,
            });
        });

        window.addEventListener('onclick', () => {
            this.setState({
                actions: [],
                isShow: false,
                left: 0,
                top: 0,
            });
        });

    }

    componentWillUnmount = () => this.menuSubscrition.unsubscribe();


    render = () => (<>
        {this.state.isShow && <div className="context-menu" style={{ left: this.state.left, top: this.state.top }}>
            {this.props.title && <div className="context-menu-title">{this.props.title}</div>}
            {this.state.actions.map((action) => (
                <div
                    key={action.label}
                    className="context-menu-list-item"
                    onClick={() => {
                        action.action();
                        ContextMenuService.clearMessages();
                    }}
                >
                    {action.label}
                </div>
            ))}
        </div>}
    </>);
}
