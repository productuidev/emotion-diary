import React, { useEffect, useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

// 2개의 파라미터 (state, action)
const reducer = (state, action) => {
  let newState = [];
  switch(action.type){
    case "INIT" : {
      return action.data;
    }
    case "CREATE" : {
      // const newItem = { ...action.data };
      newState = [action.data, ...state]; // 변경될 값
      break;
    }
    case "REMOVE" : {
      newState = state.filter((it)=>it.id !== action.targetId);
      break;
    }
    case "EDIT" : {
      newState = state.map((it)=>it.id === action.data.id ? {...action.data} : it);
      break;
    }
    default:
      return state;
  }

  // reducer를 거쳐서 일기 렌더링
  // newState가 return되기 전 localStorage에 저장 (직렬화) 
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

// Context API
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  useEffect(()=>{
    const localData = localStorage.getItem("diary");
    if(localData.length != null && localData.length > 2) {
      const diaryList = JSON.parse(localData).sort((a,b) => parseInt(b.id) - parseInt(a.id));
      dataId.current = parseInt(diaryList[0].id)+1;
      
      dispatch({type:"INIT", data:diaryList});
    }
  }, []);

  // data의 기본 state는 []에서 dummyData 받기
  const [data, dispatch] = useReducer(reducer, []);
  //console.log(new Date().getTime(dummyData)); // 현재시간

  // 일기 id로 사용
  // dummyData를 사용하게 될 경우 key의 초기값 변경
  // key 초기값 변경
  const dataId = useRef(0);

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type : "CREATE",
      data : {
        id: dataId.current,
        date : new Date(date).getTime(),
        content,
        emotion,
      }
    });
    dataId.current += 1;
  }

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId});
  };

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type : "EDIT",
      data : {
        id : targetId,
        date : new Date(date).getTime(),
        content,
        emotion,
      }
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate, onEdit, onRemove}}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
