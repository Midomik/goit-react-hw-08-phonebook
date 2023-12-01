import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';

import { instance } from 'redux/auth/auth.reducer';

const contactInitialState = {
  contacts: {
    items: [],
    isAdded: false,
    isLoading: false,
    error: null,
  },

  filter: '',
};

export const getContacts = createAsyncThunk(
  'contacts/get',
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get('contacts');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/add',
  async (contactInfo, thunkApi) => {
    try {
      const { data } = await instance.post('contacts', contactInfo);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const removeContact = createAsyncThunk(
  'contacts/delete',
  async (contact_id, thunkApi) => {
    try {
      await instance.delete(`contacts/${contact_id}`);
      return contact_id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const ContactsSlice = createSlice({
  name: 'contacts',

  initialState: contactInitialState,

  reducers: {
    filterContactList(state, { payload }) {
      state.filter = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        console.log(action.payload);
        state.contacts.items.push(action.payload);
        toast.success('Contact successfully added', {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .addCase(removeContact.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items.filter(
          item => item.id !== payload
        );
        toast.success('Contact successfully removed', {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .addMatcher(
        isAnyOf(getContacts.pending, addContact.pending, removeContact.pending),
        state => {
          state.contacts.isLoading = true;
          state.contacts.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getContacts.rejected,
          addContact.rejected,
          removeContact.rejected
        ),
        (state, { payload }) => {
          state.contacts.isLoading = false;
          state.contacts.error = payload;
        }
      );
  },
});

export const { filterContactList } = ContactsSlice.actions;

export const contactsReducer = ContactsSlice.reducer;
