import React, { Component } from 'react';
import './BottonStatusBar.scss';

export default class BottonStatusBar extends Component {
    render() {
        return(
            <div className="status-bar-main" /* [style.backgroundColor] = "currentStatus?.color" */ >
                <div style={{flex: 1, textAlign: 'start'}}>teste</div>
            </div>
        );
    }
}
