import router from "next/router";
import { MutableRefObject, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../provider";
import { addCheck, CheckItem } from "../../provider/modules/check";
import EventsStyle from "../../styles/Event.module.css";

// const id = router.query.id as string;

const Check = () => {
  const priceInput = useRef() as MutableRefObject<HTMLInputElement>;
  const clinicInput = useRef() as MutableRefObject<HTMLInputElement>;
  const dispatch = useDispatch<AppDispatch>();

  const createCheck = () => {
    const data: CheckItem = {
      price: priceInput.current.value,
      clinic: clinicInput.current.value,
    };
    // redux action
    dispatch(addCheck(data));
    router.push(`/reviews/create`);
  };

  return (
    <div className="width700">
      <h2 className="title text-center">영수증 등록</h2>
      <table className="table" style={{ marginBottom: "0" }}>
        <tbody>
          <tr>
            <th>카드사명</th>
            <td>
              <select className="form-select">
                <option value="default" disabled>
                  카드사를 선택해주세요..
                </option>
                <option value="1">KB국민카드</option>
                <option value="2">신한카드</option>
                <option value="3">하나카드</option>
                <option value="4">롯데카드</option>
                <option value="5">BC카드</option>
                <option value="6">NH농협카드</option>
                <option value="7">삼성카드</option>
                <option value="8">현대카드</option>
              </select>
            </td>
            {/* <td>{photoItem.title}</td> */}
          </tr>
          <tr>
            <th>카드번호</th>
            <td>
              <input
                type="text"
                maxLength={16}
                placeholder="카드번호 16자리를 입력해주세요.."
                className="form-control"
              />
            </td>
            {/* <td>{photoItem.description}</td> */}
          </tr>
          <tr>
            <th>승인번호</th>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <th>승인금액</th>
            <td className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="예시) 100"
                ref={priceInput}
              />
              <span className="text-nowrap my-auto ms-2">만원</span>
            </td>
          </tr>
          <tr>
            <th>시술병원</th>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="시술병원명을 입력해주세요.."
                ref={clinicInput}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <p
        className=" mb-3"
        style={{
          color: "#aaa",
          height: "30px",
          lineHeight: "30px",
          fontSize: "14px",
        }}
      >
        <i className="bi bi-info-circle me-1"></i>영수증 등록 후 후기를 작성 할
        수 있습니다.
      </p>

      <div className="btn-wrap d-flex">
        <div className="w-100 d-flex justify-content-center">
          <button
            className="btnSize btn btnBg me-1"
            onClick={() => {
              createCheck();
            }}
          >
            영수증 등록
          </button>
          <button
            className="btnSize btn btnLine"
            onClick={() => {
              router.push(`/reviews`);
            }}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default Check;
