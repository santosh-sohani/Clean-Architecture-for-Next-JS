import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userID: string | null;
}

const initialState: UserState = {
  userID: "IK001",
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserID: (state, action: PayloadAction<string>) => {
      state.userID = action.payload;
    },
  },
});

export const { setUserID } = userSlice.actions;
export default userSlice.reducer;