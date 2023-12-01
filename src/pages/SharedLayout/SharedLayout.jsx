import { NavLink } from 'react-router-dom';
import css from './SharedLayout.module.css';
import { useSelector } from 'react-redux';
import { selectAuthenticated } from 'redux/auth/auth.selectors';

import { UserMenu } from 'components/UserMenu/UserMenu';
import { ToastNotify } from 'components/ToastNotify/ToastNotify';

export const SharedLayout = ({ children }) => {
  const authenticated = useSelector(selectAuthenticated);

  return (
    <div>
      <ToastNotify />
      <header>
        <nav className={css.navigation_links}>
          {authenticated ? (
            <>
              <div>
                <NavLink
                  className="shared_layout_item_link shared_layout_item_link_contacts"
                  to="/"
                >
                  Contacts
                </NavLink>
              </div>
              <UserMenu />
            </>
          ) : (
            <>
              <div className={css.auth_container}>
                <NavLink className="shared_layout_item_link" to="/login">
                  Login
                </NavLink>
                <NavLink className="shared_layout_item_link" to="/register">
                  Register
                </NavLink>
              </div>
            </>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};
