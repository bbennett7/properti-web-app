import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import styles from './DefaultLayout.module.scss';
import RouteConfig from '../../router/RouteConfig';
import UserContext from '../../context/UserContext';
import SideNav from '../../components/SideNav/SideNav';
import helpers from '../../helpers';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const DefaultLayout = () => {
  const context = useContext(UserContext);
  const { user, loading } = context;

  if (loading) {
    return (
      <div className={styles.container}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <BrowserRouter>
        {!helpers.isMobile && user ? <SideNav /> : null}
        <>
          <Switch>
            {RouteConfig.map(route => {
              if (
                (user === null && route.authRequired) ||
                (user !== null && Object.keys(user).length > 0 && !route.authRequired)
              ) {
                return <Redirect key={route.path} from={route.path} exact to={route.redirect} />;
              }

              return (
                <Route
                  key={route.path}
                  exact={route.exact}
                  path={route.path}
                  name={route.name}
                  component={route.component}
                />
              );
            })}

            {user ? <Redirect to="/home" /> : <Redirect to="/" />}
          </Switch>
        </>
      </BrowserRouter>
    </div>
  );
};

export default DefaultLayout;
