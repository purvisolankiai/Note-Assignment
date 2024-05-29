import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  users: [],
  currentUser: null,
  dialogState: {
    UpdateUserDialog: false,
}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action) => {
      state.users.push(action.payload);
    },
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    handleUpdateUser: (state, action) => {
      const { firstname,lastname } = action.payload;
          state.currentUser.firstname = firstname;
          state.currentUser.lastname = lastname;
    toast.success('Profile Updated Successfully!')

  },
  handleUpdateUserDialog: (state, action) => {
    state.dialogState.UpdateUserDialog = action.payload;
},
},
});

export const { register, login,logout, handleUpdateUser, UpdateUserDialog,handleUpdateUserDialog} = userSlice.actions;
export default userSlice.reducer;