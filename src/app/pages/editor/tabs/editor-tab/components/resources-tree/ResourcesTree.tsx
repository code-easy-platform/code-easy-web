import React, { Component } from 'react';

import { TabButton, TabGroup } from '../../../../../../shared/components/tab-button/TabButton';
import { CurrentResTreeTab } from '../../../../../../shared/enuns/CurrentTab';

export default class ResourcesTree extends Component {

    state = {
        currentResTreeTab: CurrentResTreeTab.router
    }

    render() {
        return (
            <div style={{ flex: 1, flexDirection: "column" }}>
                <TabGroup>
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
                </TabGroup>
                <div style={{ display: this.state.currentResTreeTab === CurrentResTreeTab.router ? "block" : "none" }}>
                    Router
                </div>
                <div style={{ display: this.state.currentResTreeTab === CurrentResTreeTab.action ? "block" : "none" }}>
                    Action
                </div>
                <div style={{ display: this.state.currentResTreeTab === CurrentResTreeTab.data ? "block" : "none" }}>
                    Data
                </div>
            </div>
        );
    }
}
