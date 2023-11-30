import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOutThunk } from 'redux/auth/auth.reducer';
import css from './UserMenu.module.css';
import { selectuserData } from 'redux/auth/auth.selectors';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectuserData).email;

  const onLogOut = () => {
    dispatch(logOutThunk());
  };

  return (
    <div className={css.log_out_container}>
      <p className={css.user_name}>{userEmail}</p>
      <button className={css.log_out_btn} onClick={onLogOut}>
        Logout
      </button>
    </div>
  );
};
