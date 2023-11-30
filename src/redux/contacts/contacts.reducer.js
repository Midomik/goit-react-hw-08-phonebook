import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { instance } from 'redux/auth/auth.reducer';

// const instance = axios.create({
//   baseURL: 'https://655f2569879575426b44a797.mockapi.io/',
// });



const contactInitialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },

  filter: '',
};

export const getContacts = createAsyncThunk(
  'contacts/get',
  async (_, thunkApi) => {
    try {
      // const promise = await axios.get(`${baseURLForFavorite}contacts`);

      // const dataForFavorite = promise.data;

      // let changedData = data;
      // console.log(data);
      // for (let i = 0; i < data.length; i++) {
      //   changedData[i] = {
      //     ...changedData[i],
      //     idForFavorite: dataForFavorite[i].id,
      //     isFavorite: dataForFavorite[i].isFavorite,
      //   };
      // }
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
      // const promise = await axios.post(
      //   `${baseURLForFavorite}contacts`,
      //   contactInfo
      // );
      // const dataForFavorite = promise.data;

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
      // await axios.delete(
      //   `${baseURLForFavorite}contacts/${contact_id.idForFavorite}`
      // );
      await instance.delete(`contacts/${contact_id}`);
      return contact_id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// export const addToFavorite = createAsyncThunk(
//   'contacts/add_to_favorite',
//   async (contact_info, thunkApi) => {
//     try {
//       console.log(contact_info);
//       await axios.put(
//         `${baseURLForFavorite}contacts/${contact_info.idForFavorite}`,
//         {
//           isFavorite: !contact_info.isFavorite,
//         }
//       );
//       return contact_info.idForFavorite;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

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
      .addCase(getContacts.pending, (state, action) => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      });

    builder
      .addCase(addContact.pending, (state, action) => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        console.log(action.payload);
        state.contacts.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
      });

    builder
      .addCase(removeContact.pending, (state, { payload }) => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(removeContact.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items.filter(
          item => item.id !== payload
        );
      })
      .addCase(removeContact.rejected, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.error = payload;
      });

    // builder
    //   .addCase(addToFavorite.pending, (state, { payload }) => {
    //     state.contacts.isLoading = true;
    //   })
    //   .addCase(addToFavorite.fulfilled, (state, { payload }) => {
    //     state.contacts.isLoading = false;
    //     state.contacts.items.map(item =>
    //       item.idForFavorite === payload
    //         ? (item.isFavorite = !item.isFavorite)
    //         : 0
    //     );
    //   })
    //   .addCase(addToFavorite.rejected, (state, { payload }) => {
    //     state.contacts.isLoading = false;
    //     state.contacts.error = payload;
    //   });
  },
});

export const { filterContactList } = ContactsSlice.actions;

export const contactsReducer = ContactsSlice.reducer;
