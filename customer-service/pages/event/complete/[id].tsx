import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../provider";
import EventsStyle from "../../styles/Event.module.css";

const Complete = () => {
  const router = useRouter();

  const id = router.query.id as string;

  const reserve = useSelector((state: RootState) =>
    state.reserve.data.find((item) => item.id === +id)
  );

  return (
    <div className="width500">
      <h2 className="title text-center">상담 예약 신청이 완료 되었습니다</h2>
      <table className="table">
        <tbody>
          <tr>
            <th>이름</th>
            <td>{reserve && reserve?.rezName}</td>
          </tr>
          <tr>
            <th>연락처</th>
            <td>{reserve?.rezPhone}</td>
          </tr>
          <tr>
            <th>상담날짜</th>
            <td>{reserve?.seeDate}</td>
          </tr>
          <tr>
            <th>상담시간</th>
            <td>{reserve?.seeTime}</td>
          </tr>
        </tbody>
      </table>

      <div className="btn-wrap d-flex">
        <div className="w-100 d-flex justify-content-center">
          <button
            className="btnSize btn btnBg"
            onClick={() => {
              router.push(`/`);
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Complete;
