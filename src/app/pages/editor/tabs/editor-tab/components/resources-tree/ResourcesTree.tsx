import React, { Component } from 'react';

import './ResourcesTree.scss';
import { TabButton } from '../../../../../../shared/components/tab-button/TabButton';

export default class ResourcesTree extends Component {
    render() {
        return (
            <div className="res-main">
                <TabButton
                    onClick={() => { }}
                    isSelected={true}
                    className="btn-open-routers-tab"
                    title="Routers"
                    content="Routers"
                    style={{flex: 1}}
                />
                <TabButton
                    onClick={() => { }}
                    isSelected={true}
                    className="btn-open-actions-tab"
                    title="Actions"
                    content="Actions"
                    style={{flex: 1}}
                />
                <TabButton
                    onClick={() => { }}
                    isSelected={true}
                    className="btn-open-data-tab"
                    title="Data"
                    content="Data"
                    style={{flex: 1}}
                />
            </div>
        );
    }
}
