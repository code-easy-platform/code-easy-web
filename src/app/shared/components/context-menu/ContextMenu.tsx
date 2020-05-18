import React from 'react';

import { ContextMenuService } from './ContextMenuService';
import './ContextMenu.css';

export interface IContextItemList {
    icon?: any;
    label: string;
    action(): any;
    disabled?: boolean;
    useConfirmation?: boolean;
    confirmationMessage?: string;
}
interface ContextMenuSate {
    actions: IContextItemList[],
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

        window.onclick = () => {
            this.setState({
                isShow: false,
                actions: [],
                left: -100,
                top: -100,
            });
        };

    }

    componentWillUnmount = () => this.menuSubscrition.unsubscribe();


    render = () => (<>
        {this.state.isShow && <div className="context-menu padding-bottom-xs padding-top-xs fade-in" style={{ left: this.state.left, top: this.state.top }}>
            {this.props.title && <div className="context-menu-title">{this.props.title}</div>}
            {this.state.actions.map((action) => (
                action.label !== '-'
                    ? <div
                        key={action.label}
                        className={`context-menu-list-item${action.disabled ? ' disabled' : ''}`}
                        onClick={
                            action.disabled
                                ? undefined
                                : () => {
                                    ContextMenuService.clearMessages();
                                    if (action.useConfirmation) {
                                        if (window.confirm(action.confirmationMessage || 'Continue?')) {
                                            action.action();
                                        }
                                    } else {
                                        action.action();
                                    }
                                }
                        }
                    >
                        {action.icon && <img className="padding-right-s" width={15} height={15} src={action.icon} alt={action.label} />}
                        {action.label}
                    </div>
                    : <hr className="hr-white margin-bottom-xs margin-top-xs border-default" />
            ))}
        </div>}
    </>);
}
