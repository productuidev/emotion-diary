import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

// ControlMemu 성능 최적화 (HOC 고차컴포넌트 : 컴포넌트 하나를 인자로 받아서 강화된 컴포넌트로 전달, Memoization)
// Memu
const ControlMenu = React.memo(({value, onChange, optionList}) => {
  // mount되었을 때 잘 되었는지 useEffect로 확인
  // useEffect(()=>{
  //   console.log("Control Menu");
  // });

  return ( 
    <select className="ControlMenu" value={value} onChange={(e)=>onChange(e.target.value)}>
      {optionList.map((it, index) => (
        <option key={index} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  )
});

// List
const DiaryList = ({diaryList}) => {
  // navigate
  const navigate = useNavigate();
  // sort
  const [sortType, setSortType] = useState("latest");
  // filter
  const [filter, setFilter] = useState("all");

  // 정렬조건
  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if(filter === "good") {
        return parseInt(item.emotion) <= 3;
      }
      else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (a, b) => {
      if(sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      }
      else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it)=>filterCallBack(it));

    const sortedList = filteredList.sort(compare);    
    return sortedList;
  }

  return (
    <div className="DiaryList">
      <div class="menuWrapper">
        <div className="leftCol">
          <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} /> 
          <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
        </div>
        <div className="rightCol">
          <MyButton type={"positive"} text={"새 일기쓰기"} onClick={()=>navigate("./new")} />
        </div>
      </div>
      {getProcessedDiaryList().map((it)=>(
        // <div key={it.id}>
        //   {it.content} {it.emotion}
        // </div>
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = { diaryList: [], };

export default DiaryList;