import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../provider";
import { addReserve, ReserveItem } from "../../../provider/modules/reserve";
import EventsStyle from "../../styles/Event.module.css";
import Image from "next/image";
import { nanoid } from "@reduxjs/toolkit";
import { requestAddReserve } from "../../../middleware/modules/reserve";
import { GetServerSideProps } from "next";
import axios from "axios";

interface EventData {
  id: number;
  title: string;
  photoUrl: string;
  fileType: string;
  fileName: string;
  description: string;
  clinic: string;
  keyword: string;
  price: string;
  createdTime: string;
}

interface DetailProp {
  event: EventData;
}

const Reserve = ({ event }: DetailProp) => {
  // 입력 폼 ref 객체
  const rezNameInput = useRef() as MutableRefObject<HTMLInputElement>;
  const rezPhoneInput = useRef() as MutableRefObject<HTMLInputElement>;
  const seeDateInput = useRef() as MutableRefObject<HTMLInputElement>;
  const seeTimeSelect = useRef() as MutableRefObject<HTMLSelectElement>;
  // dispatch 함수 만들기
  const dispatch = useDispatch<AppDispatch>();

  // 데이터 배열 가져오기
  const ReserveData = useSelector((state: RootState) => state.reserve.data);
  // 추가 완료 여부 state 변경감지 및 가져오기
  const isAddCompleted = useSelector(
    (state: RootState) => state.reserve.isAddCompleted
  );

  // 객체 가져오기
  const router = useRouter();

  // event id 가져오기
  const id = router.query.id as string;
  console.log(id);

  // isCompleted 값이 변경되면 처리
  useEffect(() => {
    // true이면 화면이동
    isAddCompleted && router.push(`/event/complete/${ReserveData[0].id}`);
  }, [isAddCompleted, router, dispatch]);

  const handleAddClick = () => {
    const reserveId = ReserveData[0] ? ReserveData[0].id + 1 : 1;

    const item: ReserveItem = {
      id: reserveId,
      rezName: rezNameInput.current.value,
      rezPhone: rezPhoneInput.current.value,
      seeDate: seeDateInput.current.value,
      seeTime: seeTimeSelect.current.value,
      eventId: +id,
    };

    // redux action
    // dispatch(addReserve(item));

    // saga action
    dispatch(requestAddReserve(item));

    // router.push(`/event/complete/${item.id}`);
  };

  return (
    <div className="width500">
      <h2 className="title text-center">상담 예약</h2>
      <div className="card mb-3">
        <Image
          src={event.photoUrl}
          className="card-img-top"
          alt={event.title}
          layout="responsive"
          objectFit="cover"
          width={180}
          height={110}
        />
        <div className="card-body d-flex">
          <div className="card-title my-auto" style={{ width: "50%" }}>
            {event.title}
          </div>
          <div
            className="d-flex justify-content-end my-auto"
            style={{ width: "50%" }}
          >
            <div className="card-text me-3">{event.clinic}</div>
            <div
              className="card-text justify-content-end"
              style={{ fontWeight: "bold" }}
            >
              {event.price}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  // const a = id;
  const res = await axios.get<EventData[]>(
    `http://localhost:8080/events/${id}`
  );
  const event = res.data;

  return { props: { event } };
};

export default Reserve;
