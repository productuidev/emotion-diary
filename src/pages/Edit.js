import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";

const Edit = () => {

  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  const {id} = useParams(); // 현재 전달받은 id
  const diaryList = useContext(DiaryStateContext);
  // console.log(id); // id 출력
  // console.log(diaryList); // 5개의 원본데이터 출력

  // 데이터는 컴포넌트가 mount된 시점에서 가져온다
  // 조건 : 일기데이터가 1개라도 있을 때만 가져온다 (id 오류 방지 형변환)
  // deps : id나 diaryList가 변할 때만 가져온다
  useEffect(()=>{
    if(diaryList.length>=1){
      const targetDiary = diaryList.find((it)=>parseInt(it.id) === parseInt(id));
      // console.log(targetDiary); // 가져온 id의 일기데이터 출력

      // 조건 : id가 있을 때 setOriginData로 전달 
      // 조건 : 경로에 id가 잘못 전달되었을 때 홈으로 (뒤로가기 방지)
      if(targetDiary) {
        setOriginData(targetDiary);
      }
      else {
        navigate('/', {replace:true});
      }
    }
  },[id, diaryList]);

  return (
    <div>
      <h2>Edit</h2>
    </div>
  );
}

export default Edit;