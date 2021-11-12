import { useRouter } from "next/router";
import { useRef } from "react";
import { ReviewItem, addReview } from "../../provider/modules/review";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../provider";
import { requestAddReview } from "../../middleware/modules/review";

const ReviewCreate = () => {
  const router = useRouter();
  const reviewData = useSelector((state: RootState) => state.review.data);
  const dispatch = useDispatch<AppDispatch>();

  const titleInput = useRef<HTMLInputElement>(null);
  const descTxta = useRef<HTMLTextAreaElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const keywordSelect = useRef<HTMLSelectElement>(null);

  const checkPrice = useSelector((state: RootState) => state.check.price);
  const checkClinic = useSelector((state: RootState) => state.check.clinic);

  const handleAddClick = () => {
    if (fileInput.current?.files?.length) {
      const imageFile = fileInput.current.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const item: ReviewItem = {
          id: reviewData.length > 0 ? reviewData[0].id + 1 : 1,
          title: titleInput.current ? titleInput.current.value : "",
          reviewPhotoUrl: reader.result ? reader.result.toString() : "",
          fileType: imageFile.type,
          fileName: imageFile.name,
          description: descTxta.current?.value,
          clinic: checkClinic,
          price: checkPrice,
          keyword: keywordSelect.current ? keywordSelect.current.value : "",
          createdTime: new Date().getTime(),
        };

        // redux action
        // dispatch(addReview(item));

        // saga action
        dispatch(requestAddReview(item));

        router.push("/reviews");
      };
      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <div className="width700">
      <h2 className="title text-center">시술후기 작성하기</h2>
      {/* {!photoItem && (
           <div className="text-center my-5">데이터가 없습니다.</div>
         )} */}
      {/* {photoItem && ( */}
      <table className="table">
        <tbody>
          <tr>
            <th>제목</th>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="제목을 입력해주세요.."
                ref={titleInput}
              />
            </td>
          </tr>
          <tr>
            <th>시술사진</th>
            <td>
              {/* <img /> */}
              <input
                className="form-control"
                type="file"
                accept="image/*"
                style={{ height: "33px" }}
                ref={fileInput}
                onChange={() => {
                  // changeFile();
                }}
              />
            </td>
          </tr>
          <tr>
            <th>시술키워드</th>
            <td>
              <select
                className="form-select"
                style={{ height: "35px" }}
                ref={keywordSelect}
              >
                <option>눈</option>
                <option>코</option>
                <option>입</option>
                <option>이마</option>
                <option>턱</option>
                <option>지방</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>후기내용</th>
            <td>
              <textarea
                className="form-control"
                placeholder="후기를 입력해주세요.."
                ref={descTxta}
              ></textarea>
            </td>
          </tr>
          <tr>
            <th>병원명</th>
            <td>{checkClinic}</td>
          </tr>
          <tr>
            <th>시술비용</th>

            <td>{checkPrice}만원</td>
          </tr>
        </tbody>
      </table>
      {/* )} */}

      <div className="btn-wrap d-flex">
        <div className="w-100 d-flex justify-content-center">
          <button
            className="btnSize btn btnBg me-1"
            onClick={() => {
              handleAddClick();
            }}
          >
            시술후기 등록
          </button>
          <button
            className="btnSize btn btnLine"
            onClick={() => {
              router.push(`/reviews/check`);
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCreate;
