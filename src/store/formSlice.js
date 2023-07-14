import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    isForm: false,
    formValue: "",
  },
  reducers: {
    isFormOpened(state) {
      state.isForm = !state.isForm;
    },
    updateFormValue(state, action) {
      state.formValue = action.payload.task;
    },
  },
});

export const { isFormOpened, updateFormValue } = formSlice.actions;

export default formSlice.reducer;
