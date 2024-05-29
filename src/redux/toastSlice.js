import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    message: '',
    type: '', // 'success', 'error', 'info', etc.
    isOpen: false,
  },
  reducers: {
    showToast: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.isOpen = true;
    },
    hideToast: (state) => {
      state.isOpen = false;
      state.message = '';
      state.type = '';
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
