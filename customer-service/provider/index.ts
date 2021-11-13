import { configureStore } from "@reduxjs/toolkit";
import reviewReducer from "./modules/review";
import checkReducer from "./modules/check";
import reserveReducer from "./modules/reserve";
import alertReducer from "../provider/modules/alert";

// 최상위 사가
import rootSaga from "../middleware";
import createSagaMiddleware from "@redux-saga/core";

// saga middleware 생성
// middleware: 중간에 먼가를 처리하는 소프트웨어
// redux saga는 redux 상태처리 전/후에 먼가를 해주는 라이브러리
const sagaMiddleware = createSagaMiddleware();

// global state(전역 상태) 저장소 만듦
export const store = configureStore({
  // 각 state별로 처리할 reducer 목록
  reducer: {
    review: reviewReducer,
    check: checkReducer,
    reserve: reserveReducer,
    alert: alertReducer,
  },

  // redux store(dispatcher)에 미들웨어 적용
  middleware: [sagaMiddleware],
  devTools: true, // 개발툴 사용여부
});

// saga middleware를 실행
// rootSaga와 하위에 정의한 감지(take)할 Saga Action들에 대해서 감지 시작
sagaMiddleware.run(rootSaga);

// root state 타입 정의
// 가장 최상위 state
export type RootState = ReturnType<typeof store.getState>;

// dispatch 타입 정의
// dispatch 함수의 generic type
export type AppDispatch = typeof store.dispatch;
