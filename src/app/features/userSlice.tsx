import { PayloadAction, createSlice } from "@reduxjs/toolkit"
// import { createAsyncThunk } from "@reduxjs/toolkit"

interface initialstateType {
  loading: boolean
  adminUser: null | object
  error: string
}

const initialState: initialstateType = {
  loading: false,
  adminUser: null,
  error: "",
}

// const fetchUser = createAsyncThunk("user/fetchUser", () => {})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<object>) => {
      state.adminUser = action.payload
    },
  },
})

export const { getUser } = userSlice.actions

export default userSlice.reducer
