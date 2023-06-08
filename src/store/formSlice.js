import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    isForm: false,
    formValue: "",
    isTagInput: false,
  },
  reducers: {
    isFormOpened(state) {
      state.isForm = !state.isForm;
    },
    updateFormValue(state, action) {
      state.formValue = action.payload.task;
    },
    isTagInputOpened(state) {
      state.isTagInput = !state.isTagInput;
    },
  },
});

export const { isFormOpened, updateFormValue, isTagInputOpened } =
  formSlice.actions;

export default formSlice.reducer;
