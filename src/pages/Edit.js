import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";

import DiaryEditor from "../components/DiaryEditor";

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
  },[id, diaryList, navigate]);

  // targetDiary를 통해서 originData의 state를 저장해놓고
  // originData가 있으면, DiaryEditor를 렌더링
  // prop으로 원본데이터를 전달해주자 (isEdit, originData)
  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
}

export default Edit;