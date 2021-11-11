import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ReserveItem {
  id: number;
  rezName: string;
  rezPhone: string;
  seeDate: string;
  seeTime: string;
  eventId?: number;
}

// state 타입
export interface ReserveState {
  data: ReserveItem[]; // 리뷰 아이템 배열
  isFetched: boolean; // 서버에서 데이터를 받아온지에 대한 정보
}

const initialState: ReserveState = {
  data: [],
  isFetched: false,
};

const reserveSlice = createSlice({
  name: "reserve",
  initialState,
  reducers: {
    addReserve: (state, action: PayloadAction<ReserveItem>) => {
      const reserve = action.payload;
      console.log(reserve);
      // const reserveItem = state.data.unshift(reserve)
      state.data.unshift(reserve);
    },
  },
});

export const { addReserve } = reserveSlice.actions;

export default reserveSlice.reducer;
