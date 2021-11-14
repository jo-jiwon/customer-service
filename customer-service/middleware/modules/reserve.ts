import reserveReducer, {
  addReserve,
  initialCompleted,
} from "../../provider/modules/reserve";
import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ReserveItem } from "../../provider/modules/reserve";
import { call, put, takeEvery } from "@redux-saga/core/effects";
import api, {
  ReserveItemRequest,
  ReserveItemResponse,
} from "../../api/reserve";
import { AxiosResponse } from "axios";
import { addAlert } from "../../provider/modules/alert";

//-------------------------- saga action 생성
export const requestAddReserve = createAction<ReserveItem>(
  `${reserveReducer.name}/requestAddReserve`
);

//-------------------------- saga action 처리
function* addData(action: PayloadAction<ReserveItem>) {
  yield console.log("--addData--");

  try {
    // payload 객체
    const reserveItemPayload = action.payload;
    // rest api로 보낼 요청 객체
    const reserveItemRequest: ReserveItemRequest = {
      rezName: reserveItemPayload.rezName,
      rezPhone: reserveItemPayload.rezPhone,
      seeDate: reserveItemPayload.seeDate,
      seeTime: reserveItemPayload.seeTime,
      eventId: reserveItemPayload.eventId,
    };
    // rest api에 post로 데이터를 보냄
    const result: AxiosResponse<ReserveItemResponse> = yield call(
      api.add,
      reserveItemRequest
    );

    // redux state를 변경함
    // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
    const reserveItem: ReserveItem = {
      id: result.data.id,
      rezName: result.data.rezName,
      rezPhone: result.data.rezPhone,
      seeDate: result.data.seeDate,
      seeTime: result.data.seeTime,
      eventId: result.data.eventId,
    };

    // alert박스 추가
    yield put(
      addAlert({
        id: nanoid(),
        variant: "success",
        message: "예약되었습니다.",
      })
    );
    // dispatcher
    yield put(addReserve(reserveItem));

    // completed 속성 삭제
    yield put(initialCompleted());
  } catch (e: any) {
    // 에러발생
    yield put(
      addAlert({
        id: nanoid(),
        variant: "danger",
        message: "빈칸 없이 작성해주세요.",
      })
    );
  }
}

//-------------------------- saga action 감지
export default function* reserveSaga() {
  // 추가 처리
  yield takeEvery(requestAddReserve, addData);
}
