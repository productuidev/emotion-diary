import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import { emotionList } from "../util/emotion";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();

  const strDate = new Date(parseInt(date)).toLocaleDateString();
  const goDetail = () => { navigate(`/diary/${id}`) };
  const goEdit = () => { navigate(`/edit/${id}`) }

  return (
    <div className="DiaryItem">
      <div
        className={["emotionImgWrapper", `emotionImgWrapper${emotion}`].join(" ")}
        onClick={goDetail}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt={`${emotionList.emotion_descript}`} />
      </div>
      <div className="infoWrapper" onClick={goDetail}>
        <div className="DiaryDate">{strDate}</div>
        <div className="DiaryContentPreview">{content.slice(0, 25)}</div>
      </div>
      <div className="btnWrapper">
        <MyButton text={"수정하기"} onClick={goEdit} />
      </div>
    </div>
  );
};

// HOC 
export default React.memo(DiaryItem);