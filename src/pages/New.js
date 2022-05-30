import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  // title 가져온 후 상세페이지의 id 표시 (id번 일기)
  useEffect(()=>{
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - 새 일기`;
  },[]);

  return (
    <div>
      <DiaryEditor />
    </div>
  );
};

export default New;