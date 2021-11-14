import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CheckItem {
  price: string;
  clinic: string;
}

const initialState: CheckItem = {
  price: "",
  clinic: "",
};

// slice 생성
const checkSlice = createSlice({
  name: "check", // slice의 이름(state이름)
  initialState, // 이 slice의 state 초기값
  reducers: {
    // // PayloadAction<payload타입>
    // // Payload로 item객체를 받음
    addCheck: (state, action: PayloadAction<CheckItem>) => {
      const check = action.payload;
      state.price = check.price;
      state.clinic = check.clinic;
      //   state.isAddCompleted = true; // 추가가 되었음으로 표시
    },
  },
});

export const { addCheck } = checkSlice.actions;

export default checkSlice.reducer;
