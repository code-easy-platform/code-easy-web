import React, { Component } from 'react';

import { LoadingIndicator } from '../loading-indicator/LoadingIndicator';
import { AlertService, AlertTypes } from '../tool-bar/AlertService';
import './BottonStatusBar.scss';

export class BottonStatusBar extends Component {
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
        switch (this.state.type) {
            case AlertTypes.loading:
                return (
                    <div className="status-bar-main" style={{ backgroundColor: this.state.color }}>
                        <LoadingIndicator />
                        <div style={{ flex: 1, textAlign: 'start', alignItems: 'center', marginLeft: '8px' }} title={this.state.messageLong}>{this.state.message}</div>
                    </div>
                );

            default:
                return (
                    <div className="status-bar-main" style={{ backgroundColor: this.state.color }}>
                        <div style={{ flex: 1, textAlign: 'start', alignItems: 'center' }} title={this.state.messageLong}>{this.state.message}</div>
                    </div>
                );
        }
    }
}
