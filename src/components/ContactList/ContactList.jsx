import { ContactItem } from 'components/ContactItem/ContactItem';

import { useDispatch, useSelector } from 'react-redux';

import css from './ContactList.module.css';
import { useEffect } from 'react';
import { getContacts } from 'redux/contacts/contacts.reducer';
import {
  contactsFilter,
  mainContacts,
} from 'redux/contacts/contacts.selectors';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(mainContacts).items;
  const filter = useSelector(contactsFilter);

  const visibleContacts = () => {
    const listByName = contacts.filter(item =>
      item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase().trim())
    );
    const listByNumber = contacts.filter(item =>
      item.number
        .toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase().trim())
    );

    const generalList = listByName.length !== 0 ? listByName : listByNumber;

    return filter === '' ? contacts : generalList;
  };

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);
  const isShowContacts =
    Array.isArray(visibleContacts()) && visibleContacts().length > 0;
  return (
    <>
      <ul className={css.list_contact}>
        {isShowContacts &&
          visibleContacts().map(item => {
            return (
              <ContactItem
                key={item.id}
                name={item.name}
                number={item.number}
                id={item.id}
                isFavorite={item.isFavorite}
                idForFavorite={item.idForFavorite}
              />
            );
          })}
      </ul>
    </>
  );
};
