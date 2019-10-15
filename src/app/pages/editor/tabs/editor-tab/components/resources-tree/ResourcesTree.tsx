import React, { Component } from 'react';

import './ResourcesTree.scss';
import { TabButton } from '../../../../../../shared/components/tab-button/TabButton';
import { CurrentResTreeTab } from '../../../../../../shared/enuns/CurrentTab';

export default class ResourcesTree extends Component {

    state = {
        currentResTreeTab: CurrentResTreeTab.router
    }

    render() {
        return (
            <div className="res-main">
                <TabButton
                    onClick={() => this.setState({ currentResTreeTab: CurrentResTreeTab.router })}
                    isSelected={this.state.currentResTreeTab === CurrentResTreeTab.router}
                    className="btn-open-routers-tab"
                    title="Routers"
                    content="Routers"
                    style={{ flex: 1 }}
                />
                <TabButton
                    onClick={() => this.setState({ currentResTreeTab: CurrentResTreeTab.action })}
                    isSelected={this.state.currentResTreeTab === CurrentResTreeTab.action}
                    className="btn-open-actions-tab"
                    title="Actions"
                    content="Actions"
                    style={{ flex: 1 }}
                />
                <TabButton
                    onClick={() => this.setState({ currentResTreeTab: CurrentResTreeTab.data })}
                    isSelected={this.state.currentResTreeTab === CurrentResTreeTab.data}
                    className="btn-open-data-tab"
                    title="Data"
                    content="Data"
                    style={{ flex: 1 }}
                />
            </div>
        );
    }
}
