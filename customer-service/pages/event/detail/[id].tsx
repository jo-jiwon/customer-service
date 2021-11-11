import axios from "axios";
import { useRouter } from "next/router";
import router from "next/router";
import { Card } from "react-bootstrap";
import { GetServerSideProps } from "next";
import Image from "next/image";

interface EventData {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface DetailProp {
  event: EventData;
}

const EventDetail = ({ event }: DetailProp) => {
  const router = useRouter();
  // const id = router.query.id as string;
  const id = event.id.toString();

  return (
    <div className="width700">
      <h2 className="title text-center">시술후기 상세보기</h2>
      <div className="card">
        <Image
          src={event.thumbnailUrl}
          className="card-img-top"
          alt={event.title}
          layout="responsive"
          objectFit="cover"
          width={220}
          height={150}
        />
        <div className="card-body">
          <div className="card-title" style={{ fontWeight: "bold" }}>
            {event.title}
          </div>
          <div className="card-text">아이웰 성형외과</div>
          <div className="card-text" style={{ fontWeight: "bold" }}>
            97만원
          </div>
        </div>
        <div className="card-body">
          <div className="card-title" style={{ fontWeight: "bold" }}>
            상세설명
          </div>
          <div className="card-text">
            보내는 얼마나 사람은 새가 별과 능히 원대하고, 끓는다. 우리 보배를
            피어나기 공자는 인생의 곳이 대중을 황금시대다. 품었기 뜨거운지라,
            그러므로 곧 위하여 봄바람이다. 풍부하게 부패를 있는 이상은 위하여
            인생의 생의 청춘의 하였으며, 철환하였는가? 청춘의 보내는 청춘
            노래하며 인류의 살 방황하였으며, 품고 황금시대다. 실현에 동산에는
            불러 석가는 온갖 거친 것이다.
            <br />
            하였으며, 없는 붙잡아 인생에 찾아다녀도, 청춘의 우는 그것은 피가
            때문이다. 두기 예수는 있는 커다란 사라지지 품으며, 밝은 역사를
            그것을 철환하였는가? 더운지라 것이다.보라, 노래하며 능히 심장은
            그들은 희망의 것이다. 얼음과 수 되려니와, 천자만홍이 산야에
            철환하였는가? 되려니와, 피는 풀이 방지하는 커다란 일월과 설레는
            품었기 싸인 아니다. 인생에 그러므로 하여도 인도하겠다는 약동하다.
          </div>
        </div>
        <div className="card-body">
          <div className="card-title" style={{ fontWeight: "bold" }}>
            상세설명
          </div>
          <div className="card-text">
            끓는 아니더면, 청춘에서만 사는가 위하여, 장식하는 가슴에 이상
            위하여서. 위하여 때에, 귀는 이상 오직 그들은 교향악이다. 투명하되
            것이다.보라, 가지에 대한 보는 청춘에서만 행복스럽고 쓸쓸한 심장은
            보라. 동력은 못할 안고, 것은 그들에게 심장의 곧 봄바람이다. 이상
            지혜는 황금시대를 칼이다. 꽃 인생의 따뜻한 얼음과 있는가?
            <br />
            것은 무엇을 무한한 그들의 청춘의 용감하고 노래하며 교향악이다.
            방황하여도, 있으며, 얼마나 끝에 무한한 풍부하게 천하를 전인
            이것이다. 아니한 것은 천자만홍이 봄바람이다. 같으며, 봄바람을
            그림자는 우리 아름다우냐? 대중을 새가 것은 약동하다. 산야에 그들에게
            역사를 아니다. 어디 별과 할지니, 있는 얼음이 하는 사는가 대중을
            때문이다.
          </div>
        </div>
      </div>
      <div className="btn-wrap d-flex">
        <div className="w-100 d-flex justify-content-center">
          <button
            className="btnSize btn btnBg me-1"
            onClick={() => {
              router.push(`/event/reserve/${id}`);
            }}
          >
            상담예약
          </button>
          <button
            className="btnSize btn btnLine"
            onClick={() => {
              router.push(`/event`);
            }}
          >
            이벤트 목록
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
    `https://jsonplaceholder.typicode.com/photos/${id}`
  );
  const event = res.data;

  return { props: { event } };
};

export default EventDetail;
