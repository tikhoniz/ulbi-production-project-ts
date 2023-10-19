import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type AddNewCommentSchema } from '../types/addNewComment'

const initialState: AddNewCommentSchema = {
  text: ''
}

export const addNewCommentSlice = createSlice({
  name: 'addNewComment',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    }
  }
  // extraReducers: (builder) => {
  //     builder
  //         .addCase(loginByUsername.pending, (state) => {
  //             state.error = undefined;
  //             state.isLoading = true;
  //         })
  //         .addCase(loginByUsername.fulfilled, (state) => {
  //             state.isLoading = false;
  //         })
  //         .addCase(loginByUsername.rejected, (state, action) => {
  //             state.isLoading = false;
  //             state.error = action.payload;
  //         });
  // },
})

// Action creators are generated for each case reducer function
export const { actions: addNewCommentActions } = addNewCommentSlice
export const { reducer: addNewCommentReducer } = addNewCommentSlice
