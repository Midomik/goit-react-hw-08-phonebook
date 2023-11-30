// import { Form } from './Form/Form';
// import { ContactList } from './ContactList/ContactList';
// import { SearchContact } from './SearchContact/SearchContact';
import css from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from 'pages/SharedLayout/SharedLayout';
import { ContactsPage } from 'pages/ContactsPage/ContactsPage';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { RegisterPage } from 'pages/RegisterPage/RegisterPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { updateThunk } from 'redux/auth/auth.reducer';

import * as ROUTES from 'constants/routes';
import { RestrictedRoute } from 'components/RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';

const appRoutes = [
  {
    path: ROUTES.CONTACT_ROUTE,
    element: (
      <PrivateRoute>
        <ContactsPage />
      </PrivateRoute>
    ),
  },

  {
    path: ROUTES.LOGIN_ROUTE,
    element: (
      <RestrictedRoute>
        <LoginPage />
      </RestrictedRoute>
    ),
  },
  {
    path: ROUTES.REGISTER_ROUTE,
    element: (
      <RestrictedRoute>
        <RegisterPage />
      </RestrictedRoute>
    ),
  },
];

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateThunk());
  }, [dispatch]);
  return (
    // <div className={css.main_container}>
    //   <Form />
    //   <SearchContact />
    //   <ContactList />
    // </div>
    <div className={css.main_container}>
      <SharedLayout>
        <div className={css.container}>
          <Routes>
            {/* <Route path="/" element={<HomePage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/recently_dialed" element={<RecentlyDialed />} />
            <Route path="/favorite" element={<Favorite />} /> */}
            {appRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </div>
      </SharedLayout>
    </div>
  );
};
