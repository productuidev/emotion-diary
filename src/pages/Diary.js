import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";

const Diary = () => {
  const { id } = useParams(); // pathVariable = id
  const diaryList = useContext(DiaryStateContext); // diaryList 가져오기

  useEffect(()=>{
    if(diaryList.length >= 1) {
      const targetDiary = diaryList.find((it)=>parseInt(it.id) === parseInt(id));
      console.log(targetDiary);
    }
  },[id, diaryList]);

  return (
    <div>
      <h1>Diary</h1>
      <p>이곳은 다이어리 상세 페이지 입니다.</p>
    </div>
  );
}

export default Diary;