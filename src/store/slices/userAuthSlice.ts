import { createSlice } from "@reduxjs/toolkit";
import { crateBlog, loginUser, signUpUser } from "./userThunk";

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    userLogout: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (state.loading = false), (state.userInfo = null), (state.error = null);
    },
    clearError: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (state.error = null), (state.loading = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUpUser.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as any;
        // state.error = actions.payload.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as any;
        // state.error = actions.payload.message;
      })
      .addCase(crateBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(crateBlog.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(crateBlog.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as any;
        // state.error = actions.payload.message;
      });
  },
});

export const { userLogout, clearError } = userSlice.actions;
export default userSlice.reducer;
