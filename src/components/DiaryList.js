import { useState } from "react";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

// Memu
const ControlMenu = ({value, onChange, optionList}) => {
  return (
    <select value={value} onChange={(e)=>onChange(e.target.value)}>
      {optionList.map((it,idx)=>(
        <option value={it.value}>{it.name}</option>
      ))}
    </select>
  );
}

// List
const DiaryList = ({diaryList}) => {
  // sort
  const [sortType, setSortType] = useState("latest");
  // filter
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if(sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      }
      else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));
    const sortedList = copyList.sort(compare);
    
    return sortedList;
  }

  return (
    <div>
      <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
      {getProcessedDiaryList().map((it)=>(
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = { diaryList: [], };

export default DiaryList;