import { Card, Button } from "react-bootstrap";
// import Image from "next/image";
import EventsStyles from "../styles/Event.module.css";
import ReviewStyles from "../styles/Reviews.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../provider";
import { Image } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";
import { getTimeString } from "../lib/string";
import { requestFetchReviews } from "../middleware/modules/review";

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

interface IndexProp {
  events: EventData[];
}

const Index = ({ events }: IndexProp) => {
  const review = useSelector((state: RootState) => state.review);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // 컴포넌트가 마운팅되는 시점에 실행
  useEffect(() => {
    if (!review.isFetched) {
      // 서버에서 데이터를 받아오는 action을 디스패치함
      dispatch(requestFetchReviews());
    }
  }, [dispatch, review.isFetched]);

  return (
    <div>
      {/* event-wrap */}
      <div className="event-wrap">
        <h2 className="title">
          이벤트
          <span className="title-bg" />
        </h2>

        <div className={EventsStyles.events}>
          {events.map((events: any, index: any) => (
            <Card
              key={index}
              className="d-flex"
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push(`/event/detail/${events.id}`);
              }}
            >
              <Card.Body className="d-flex">
                <Card.Img
                  className="me-3"
                  src={events.photoUrl}
                  alt={events.title}
                  style={{ width: "150px", height: "150px," }}
                />

                <div className={EventsStyles.title}>
                  <div className="my-3">
                    <Card.Text style={{ fontWeight: "bold" }}>
                      {events.title}
                    </Card.Text>
                    <Card.Text>{events.description}</Card.Text>
                    <Card.Text>{events.clinic}</Card.Text>
                    <Card.Text style={{ fontWeight: "bold" }}>
                      {events.price}
                    </Card.Text>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
        <div className="d-flex justify-content-center my-5">
          <button
            className="btnSize btn btnLine"
            onClick={() => {
              router.push("/event");
            }}
          >
            이벤트 목록 가기
          </button>
        </div>
      </div>
      {/* // event-wrap */}
      {/* review-wrap */}
      <div className="width700 review-wrap">
        <div className={ReviewStyles.reviewTop}>
          <div className="d-flex ">
            <h2 className="title" style={{ width: "50%" }}>
              시술후기
              <span className="title-bg" />
            </h2>
            <div
              className="title d-flex justify-content-end"
              style={{ width: "50%" }}
            >
              <button
                className="btnSize btn btnBg my-auto"
                onClick={() => {
                  router.push("/reviews/check");
                }}
              >
                <i className="bi bi-plus-lg me-1"></i>
                시술후기 작성
              </button>
            </div>
          </div>
        </div>
        <div className={ReviewStyles.reviews}>
          {review.data.map((item, index) => (
            <div
              key={`review-item-${index}`}
              className="card d-flex"
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push(`/reviews/detail/${item.id}`);
              }}
            >
              <div className="card-body d-flex">
                <Image
                  className="me-3"
                  src={item.reviewPhotoUrl}
                  alt={item.title}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />

                <div
                  className={ReviewStyles.title}
                  style={{ margin: "auto 0" }}
                >
                  <div className="my-3" style={{ display: "grid" }}>
                    <p
                      className="card-title"
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {item.title}
                    </p>

                    <p className="card-text">{item.description}</p>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#999" }}>
                    {getTimeString(item.createdTime)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 더보기 페이징 */}
        <div className="btn-wrap d-flex justify-content-center">
          <button
            className="btnSize btn btnLine"
            style={{ width: "200px" }}
            onClick={() => {
              router.push("/reviews");
            }}
          >
            시술후기 목록 가기
          </button>
        </div>
        {/* // 더보기 페이징 */}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await axios.get<EventData[]>(`http://localhost:8080/events`);

  const events = res.data;
  // const events = [
  //   {
  //     albumId: 1,
  //     id: 1,
  //     title: "아이웰 눈 성형",
  //     text: "이상이 피가 얼음이 싹이 그들의 너의 않는 이상의 아름다우냐? 무한한 방황하여도, 원질이 원대하고, 얼마나 불러 힘차게 위하여서. 피부가 어디 그들의 풍부하게 많이 어디 품으며, 같이, 그들에게 것이다. 피는 위하여 끓는 생생하며, 사랑의 노년에게서 뜨거운지라, 낙원을 운다. 봄날의 두기 열락의 돋고, 풀밭에 만물은 청춘 맺어, 따뜻한 철환하였는가? 인간이 황금시대를 전인 거친 사막이다. 듣기만 대한 그것은 그들의 원질이 그리하였는가? 않는 바이며, 열락의 봄바람이다. 우리 있는 우리는 구할 옷을 황금시대의 품으며, 소금이라 주는 피다. 듣기만 없으면, 앞이 주는 부패뿐이다. ",
  //     url: "https://via.placeholder.com/600/92c952",
  //     thumbnailUrl: "https://via.placeholder.com/150/92c952",
  //   },
  //   {
  //     albumId: 1,
  //     id: 2,
  //     title: "카카오 코 성형",
  //     text: "이상이 피가 얼음이 싹이 그들의 너의 않는 이상의 아름다우냐? 무한한 방황하여도, 원질이 원대하고, 얼마나 불러 힘차게 위하여서. 피부가 어디 그들의 풍부하게 많이 어디 품으며, 같이, 그들에게 것이다. 피는 위하여 끓는 생생하며, 사랑의 노년에게서 뜨거운지라, 낙원을 운다. 봄날의 두기 열락의 돋고, 풀밭에 만물은 청춘 맺어, 따뜻한 철환하였는가? 인간이 황금시대를 전인 거친 사막이다. 듣기만 대한 그것은 그들의 원질이 그리하였는가? 않는 바이며, 열락의 봄바람이다. 우리 있는 우리는 구할 옷을 황금시대의 품으며, 소금이라 주는 피다. 듣기만 없으면, 앞이 주는 부패뿐이다. ",
  //     url: "https://via.placeholder.com/600/771796",
  //     thumbnailUrl: "https://via.placeholder.com/150/771796",
  //   },
  //   {
  //     albumId: 1,
  //     id: 3,
  //     title: "네이버 앞트임 성형",
  //     text: "이상이 피가 얼음이 싹이 그들의 너의 않는 이상의 아름다우냐? 무한한 방황하여도, 원질이 원대하고, 얼마나 불러 힘차게 위하여서. 피부가 어디 그들의 풍부하게 많이 어디 품으며, 같이, 그들에게 것이다. 피는 위하여 끓는 생생하며, 사랑의 노년에게서 뜨거운지라, 낙원을 운다. 봄날의 두기 열락의 돋고, 풀밭에 만물은 청춘 맺어, 따뜻한 철환하였는가? 인간이 황금시대를 전인 거친 사막이다. 듣기만 대한 그것은 그들의 원질이 그리하였는가? 않는 바이며, 열락의 봄바람이다. 우리 있는 우리는 구할 옷을 황금시대의 품으며, 소금이라 주는 피다. 듣기만 없으면, 앞이 주는 부패뿐이다. ",
  //     url: "https://via.placeholder.com/600/24f355",
  //     thumbnailUrl: "https://via.placeholder.com/150/24f355",
  //   },
  //   {
  //     albumId: 1,
  //     id: 4,
  //     title: "다음 귀 성형",
  //     text: "이상이 피가 얼음이 싹이 그들의 너의 않는 이상의 아름다우냐? 무한한 방황하여도, 원질이 원대하고, 얼마나 불러 힘차게 위하여서. 피부가 어디 그들의 풍부하게 많이 어디 품으며, 같이, 그들에게 것이다. 피는 위하여 끓는 생생하며, 사랑의 노년에게서 뜨거운지라, 낙원을 운다. 봄날의 두기 열락의 돋고, 풀밭에 만물은 청춘 맺어, 따뜻한 철환하였는가? 인간이 황금시대를 전인 거친 사막이다. 듣기만 대한 그것은 그들의 원질이 그리하였는가? 않는 바이며, 열락의 봄바람이다. 우리 있는 우리는 구할 옷을 황금시대의 품으며, 소금이라 주는 피다. 듣기만 없으면, 앞이 주는 부패뿐이다. ",
  //     url: "https://via.placeholder.com/600/d32776",
  //     thumbnailUrl: "https://via.placeholder.com/150/d32776",
  //   },
  //   {
  //     albumId: 1,
  //     id: 5,
  //     title: "암온더넥스트레벨 성형",
  //     text: "이상이 피가 얼음이 싹이 그들의 너의 않는 이상의 아름다우냐? 무한한 방황하여도, 원질이 원대하고, 얼마나 불러 힘차게 위하여서. 피부가 어디 그들의 풍부하게 많이 어디 품으며, 같이, 그들에게 것이다. 피는 위하여 끓는 생생하며, 사랑의 노년에게서 뜨거운지라, 낙원을 운다. 봄날의 두기 열락의 돋고, 풀밭에 만물은 청춘 맺어, 따뜻한 철환하였는가? 인간이 황금시대를 전인 거친 사막이다. 듣기만 대한 그것은 그들의 원질이 그리하였는가? 않는 바이며, 열락의 봄바람이다. 우리 있는 우리는 구할 옷을 황금시대의 품으며, 소금이라 주는 피다. 듣기만 없으면, 앞이 주는 부패뿐이다. ",
  //     url: "https://via.placeholder.com/600/f66b97",
  //     thumbnailUrl: "https://via.placeholder.com/150/f66b97",
  //   },
  //   {
  //     albumId: 1,
  //     id: 6,
  //     title: "오마이가쉬 세비지",
  //     text: "이상이 피가 얼음이 싹이 그들의 너의 않는 이상의 아름다우냐? 무한한 방황하여도, 원질이 원대하고, 얼마나 불러 힘차게 위하여서. 피부가 어디 그들의 풍부하게 많이 어디 품으며, 같이, 그들에게 것이다. 피는 위하여 끓는 생생하며, 사랑의 노년에게서 뜨거운지라, 낙원을 운다. 봄날의 두기 열락의 돋고, 풀밭에 만물은 청춘 맺어, 따뜻한 철환하였는가? 인간이 황금시대를 전인 거친 사막이다. 듣기만 대한 그것은 그들의 원질이 그리하였는가? 않는 바이며, 열락의 봄바람이다. 우리 있는 우리는 구할 옷을 황금시대의 품으며, 소금이라 주는 피다. 듣기만 없으면, 앞이 주는 부패뿐이다. ",
  //     url: "https://via.placeholder.com/600/56a8c2",
  //     thumbnailUrl: "https://via.placeholder.com/150/56a8c2",
  //   },
  //   {
  //     albumId: 1,
  //     id: 7,
  //     title: "유튜브 입 성형",
  //     text: "이상이 피가 얼음이 싹이 그들의 너의 않는 이상의 아름다우냐? 무한한 방황하여도, 원질이 원대하고, 얼마나 불러 힘차게 위하여서. 피부가 어디 그들의 풍부하게 많이 어디 품으며, 같이, 그들에게 것이다. 피는 위하여 끓는 생생하며, 사랑의 노년에게서 뜨거운지라, 낙원을 운다. 봄날의 두기 열락의 돋고, 풀밭에 만물은 청춘 맺어, 따뜻한 철환하였는가? 인간이 황금시대를 전인 거친 사막이다. 듣기만 대한 그것은 그들의 원질이 그리하였는가? 않는 바이며, 열락의 봄바람이다. 우리 있는 우리는 구할 옷을 황금시대의 품으며, 소금이라 주는 피다. 듣기만 없으면, 앞이 주는 부패뿐이다. ",
  //     url: "https://via.placeholder.com/600/b0f7cc",
  //     thumbnailUrl: "https://via.placeholder.com/150/b0f7cc",
  //   },
  //   {
  //     albumId: 1,
  //     id: 8,
  //     title: "넷플릭스 콧구멍 성형",
  //     text: "이상이 피가 얼음이 싹이 그들의 너의 않는 이상의 아름다우냐? 무한한 방황하여도, 원질이 원대하고, 얼마나 불러 힘차게 위하여서. 피부가 어디 그들의 풍부하게 많이 어디 품으며, 같이, 그들에게 것이다. 피는 위하여 끓는 생생하며, 사랑의 노년에게서 뜨거운지라, 낙원을 운다. 봄날의 두기 열락의 돋고, 풀밭에 만물은 청춘 맺어, 따뜻한 철환하였는가? 인간이 황금시대를 전인 거친 사막이다. 듣기만 대한 그것은 그들의 원질이 그리하였는가? 않는 바이며, 열락의 봄바람이다. 우리 있는 우리는 구할 옷을 황금시대의 품으며, 소금이라 주는 피다. 듣기만 없으면, 앞이 주는 부패뿐이다. ",
  //     url: "https://via.placeholder.com/600/54176f",
  //     thumbnailUrl: "https://via.placeholder.com/150/54176f",
  //   },
  // ];

  return { props: { events } };
}

export default Index;
