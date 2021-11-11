import { useRouter } from "next/router";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../provider";
import { addReserve, ReserveItem } from "../../../provider/modules/reserve";
import EventsStyle from "../../styles/Event.module.css";
import Image from "next/image";
import { nanoid } from "@reduxjs/toolkit";

const Reserve = () => {
  const router = useRouter();

  const id = router.query.id as string;

  console.log(id);
  // 데이터 배열 가져오기
  const ReserveData = useSelector((state: RootState) => state.reserve.data);

  // ReserveData 가 업데이트 되고 44번줄 푸쉬가 되야하니까 useEffect 를
  // 사용해서 받아온 이후에 실행 되게 해라

  // dispatch 함수 만들기
  const dispatch = useDispatch<AppDispatch>();

  // input ref객체
  const rezNameInput = useRef<HTMLInputElement>(null);
  const rezPhoneInput = useRef<HTMLInputElement>(null);
  const seeDateInput = useRef<HTMLInputElement>(null);
  const seeTimeSelect = useRef<HTMLSelectElement>(null);

  console.log(rezNameInput.current?.value);

  const handleAddClick = () => {
    const reserveId = ReserveData[0] ? ReserveData[0].id + 1 : 1;

    const item: ReserveItem = {
      id: reserveId,
      rezName: rezNameInput.current ? rezNameInput.current.value : "",
      rezPhone: rezPhoneInput.current ? rezPhoneInput.current.value : "",
      seeDate: seeDateInput.current ? seeDateInput.current.value : "",
      seeTime: seeTimeSelect.current ? seeTimeSelect.current.value : "",
      eventId: +id,
    };
    dispatch(addReserve(item));
    router.push(`/event/complete/${item.id}`);
  };

  return (
    <div className="width500">
      <h2 className="title text-center">상담 예약</h2>
      {/* {!photoItem && (
          <div className="text-center my-5">데이터가 없습니다.</div>
        )} */}
      {/* {photoItem && ( */}

      <div className="card mb-3">
        <Image
          src="https://via.placeholder.com/150/56a8c2"
          className="card-img-top"
          alt=""
          layout="responsive"
          objectFit="cover"
          width={180}
          height={110}
        />
        <div className="card-body d-flex">
          <div className="card-title my-auto" style={{ width: "50%" }}>
            눈 쌍커풀 수술
          </div>
          <div
            className="d-flex justify-content-end my-auto"
            style={{ width: "50%" }}
          >
            <div className="card-text me-3">아이웰 성형외과</div>
            <div
              className="card-text justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              97만원
            </div>
          </div>
        </div>
      </div>

      <table className="table">
        <tbody>
          <tr>
            <th>이름</th>
            <td>
              <input type="text" className="form-control" ref={rezNameInput} />
            </td>
            {/* <td>{photoItem.title}</td> */}
          </tr>
          <tr>
            <th>연락처</th>
            <td>
              <input
                className="form-control"
                type="text"
                ref={rezPhoneInput}
                maxLength={11}
              />
            </td>
            {/* <td>{photoItem.description}</td> */}
          </tr>
          <tr>
            <th>상담날짜</th>
            <td>
              <input type="date" className="form-control" ref={seeDateInput} />
            </td>
          </tr>
          <tr>
            <th>상담시간</th>
            <td>
              <select
                name="dailyTime"
                className="form-select"
                ref={seeTimeSelect}
              >
                <option value="default" disabled>
                  시간을 선택해주세요..
                </option>
                <option value="10:00 ~ 11:00">10:00 ~ 11:00</option>
                <option value="11:00 ~ 12:00">11:00 ~ 12:00</option>
                <option value="13:00 ~ 14:00">13:00 ~ 14:00</option>
                <option value="14:00 ~ 15:00">14:00 ~ 15:00</option>
                <option value="15:00 ~ 16:00">15:00 ~ 16:00</option>
                <option value="16:00 ~ 17:00">16:00 ~ 17:00</option>
                <option value="17:00 ~ 18:00">17:00 ~ 18:00</option>
                <option value="18:00 ~ 19:00">18:00 ~ 19:00</option>
                <option value="19:00 ~ 20:00">19:00 ~ 20:00</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="btn-wrap d-flex">
        <div className="w-100 d-flex justify-content-center">
          <button
            className="btnSize btn btnBg me-1"
            onClick={() => {
              handleAddClick();
            }}
          >
            예약신청
          </button>
          <button
            className="btnSize btn btnLine"
            onClick={() => {
              router.push(`/event`);
            }}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
