import Layout from "../../components/layout";
import { Card, Button } from "react-bootstrap";
import EventsStyles from "../../styles/Event.module.css";
import router from "next/router";
import axios from "axios";

interface EventData {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface IndexProp {
  events: EventData[];
}

const Event = ({ events }: IndexProp) => {
  return (
    <div className=" event-wrap">
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
            <div key={index}>
              <Card.Body className="d-flex">
                <Card.Img
                  className="me-3"
                  src={events.thumbnailUrl}
                  alt={events.title}
                  style={{ width: "150px", height: "150px," }}
                />

                <div className={EventsStyles.title}>
                  <div className="my-3">
                    <Card.Text style={{ fontWeight: "bold" }}>
                      아이웰 남자 눈 성형
                    </Card.Text>
                    <Card.Text>아이웰 남자눈_남자니까남자담게!</Card.Text>
                    <Card.Text>아이웰 성형외과</Card.Text>
                    <Card.Text style={{ fontWeight: "bold" }}>97만원</Card.Text>
                  </div>
                </div>
              </Card.Body>
            </div>
          </Card>
        ))}
      </div>

      {/* 더보기 페이징 */}
      <div className="btn-wrap d-flex justify-content-center">
        <button
          className="btnSize btn btnLine"
          style={{ width: "200px" }}
          onClick={() => {
            router.push("/review");
          }}
        >
          더보기
        </button>
      </div>
      {/* // 더보기 페이징 */}
    </div>
  );
};

export async function getServerSideProps() {
  const res = await axios.get<EventData[]>(
    `https://jsonplaceholder.typicode.com/photos?_start=0&_end=10`
  );
  const events = res.data;

  return { props: { events } };
}

export default Event;
