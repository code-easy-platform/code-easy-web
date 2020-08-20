import React, { Component, memo } from 'react';

import { LoadingIndicator } from '../loading-indicator/LoadingIndicator';
import { AlertService, AlertTypes } from './AlertService';
import './BottonStatusBar.css';
import { IdeVersion } from '../version/IdeVersion';

class _BottonStatusBar extends Component {
    private alertSubscrition: any;

    state = {
        color: '',
        message: '',
        messageLong: '',
        type: AlertTypes.normal,
    }

    componentDidMount() {
        this.alertSubscrition = AlertService.getMessage().subscribe(data => this.setState({
            messageLong: data.messageLong,
            message: data.message,
            color: data.color,
            type: data.type,
        }));
    }

    componentWillUnmount = () => this.alertSubscrition.unsubscribe();

    render() {

        return (
            <div style={{ backgroundColor: this.state.color }} className="status-bar-main width-auto z1 padding-sx padding-left-s padding-right-s display-flex flex-items-center background-highlighted">
                {this.state.type === AlertTypes.loading && <LoadingIndicator />}
                <div className="flex1 margin-left-s flex-items-center" title={this.state.messageLong}>
                    {this.state.message}
                </div>
                <IdeVersion prefix={"v. "} />
            </div>
        );
    }
}

export const BottonStatusBar = memo(_BottonStatusBar)
