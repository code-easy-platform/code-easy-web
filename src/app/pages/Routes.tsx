import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { HomePage } from './home-page/HomePage';
import { Editor } from './editor/Editor';

export const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/projects"} exact component={HomePage} />

                <Route path={"/editor/:id"} exact component={Editor} />

                <Route path='*' component={HomePage} />
            </Switch>
        </BrowserRouter>
    );
}
