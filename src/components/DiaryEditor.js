import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "./../App";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

// DiaryEditor 함수에 isEdit, originData prop 넣어주기

const DiaryEditor = ({isEdit, originData}) => {
  const [emotion, setEmotion] = useState(3); // 3번 default
  const [date, setDate] = useState(getStringDate(new Date()));
  const [content, setContent] = useState();
  const contentRef = useRef();

  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  // 작성완료에 onEdit 공급
  // 삭제하기 onRemove 공급
  const {onCreate, onEdit, onRemove} = useContext(DiaryDispatchContext);
  const handleSubmit = () => {
    if(content.length < 1) {
      contentRef.current.focus();
      return;
    }

    // 작성완료 confirm 조건 추가 (새 일기 작성/수정 시)
    // 조건에 따라 수정/작성 완료 후 alert창으로 묻기
    if(window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")){
      // 새 일기 작성인 경우(수정이 아닌 경우)
      if(!isEdit) {
        onCreate(date, content, emotion);
      }
      // 수정중인 경우 (onEdit의 props : 원본 id, 날짜, 내용, 감정)
      else {
        onEdit(originData.id, date, content, emotion);
      }
    };

    navigate('/', {replace:true});
  };

  // 삭제하기
  const handleRemove = () => {
    if(window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate('/',{replace:true});
    }
  };

  // useEffect deps(isEdit, originData)가 바뀌면 원본데이터 받아오기
  // EditPage에서 렌더링하는 DiaryEditor에서만 useEffect가 동작하도록
  // 캘린더 setDate 당일 날짜, 원본 감정, 원본 내용
  useEffect(()=>{
    if(isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  },[isEdit, originData]);

  const navigate = useNavigate();

  return (
    <div className="DiaryEditor">
      {/* 제목 표시 조건 */}
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={<MyButton text={"< 뒤로가기"} onClick={()=>navigate(-1)} />}
        rightChild={isEdit && (<MyButton text={"삭제하기"} type={"negative"} onClick={handleRemove} />)}
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="inputBox">
            <input
              className="inputDate"
              type="date"
              value={date}
              onChange={(e)=>setDate(e.target.value)} />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="inputBox emotionListWrapper">
            {emotionList.map((it)=>(
              <EmotionItem key={it.emotion_id} {...it} onClick={handleClickEmote} isSelected={it.emotion_id === emotion} />
              // <div key={it.emotion_id}>{it.emotion_descript}</div>
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="inputBox textWrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e)=>setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="controlBox">
            <MyButton text={"취소하기"} onClick={()=>navigate(-1)} />
            <MyButton text={"작성완료"} type={"positive"} onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;