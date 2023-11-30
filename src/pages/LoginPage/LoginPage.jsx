import React from 'react';
import css from './LoginPage.module.css';
import { useDispatch } from 'react-redux';
import { loginThunk } from 'redux/auth/auth.reducer';

export const LoginPage = () => {
  const dispatch = useDispatch();

  const handlerSubmit = e => {
    e.preventDefault();

    const email = e.currentTarget.elements.userEmail.value;
    const password = e.currentTarget.elements.userPassword.value;

    const userData = { email, password };
    console.log('submit');
    dispatch(loginThunk(userData));
  };
  return (
    <form onSubmit={handlerSubmit} className={css.login_form}>
      <label className={css.form_lable}>
        <p className={css.title_item}>Email:</p>
        <input
          className={css.name_input}
          type="email"
          required
          placeholder="abc@gmail.com"
          name="userEmail"
        />
      </label>
      <label>
        <p className={css.title_item}>Password:</p>
        <input
          className={css.name_input}
          type="password"
          required
          placeholder="*******"
          name="userPassword"
          minLength={7}
        />
      </label>
      <br />
      <br />
      <button className={css.sub_btn} type="submit">
        Sign In
      </button>
    </form>
  );
};
