import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { HomePage } from './home-page/HomePage';
import { Editor } from './editor/Editor';


/* const PrivateRoute = ({ component, ...rest }: any) => {
    const isAuthenticated: boolean = LocalData.isLogged();
    const routeComponent = (props: any) => (
        isAuthenticated
            ? (<>
                {React.createElement(component, props)}
                <NavigatorComponent />
            </>)
            : <Redirect to={{ pathname: '/login' }} />
    );
    return <Route {...rest} render={routeComponent} />;
} */

export const Routes = () => {
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
