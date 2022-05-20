import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();

  // img
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const strDate = new Date(parseInt(date)).toLocaleDateString();
  const goDetail = () => {
    navigate(`/diary/${id}`)
  };

  return (
    <div className="DiaryItem">
      <div
        className={["emotionImgWrapper", `emotionImgWrapper${emotion}`].join(" ")}
        onClick={goDetail}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt={`감정점수 ${emotion}점`} />
      </div>
      <div className="infoWrapper" onClick={goDetail}>
        <div className="DiaryDate">{strDate}</div>
        <div className="DiaryContentPreview">{content.slice(0, 25)}</div>
      </div>
      <div className="btnWrapper">
        <MyButton text={"수정하기"} />
      </div>
    </div>
  );
};

export default DiaryItem;