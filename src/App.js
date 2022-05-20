import React, { useReducer, useRef } from "react";

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
  return newState;
};

// Context API
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

// 일기 더미데이터 (시간순)
const dummyData = [
  { id:1, emotion:1, content:"오늘의일기 1번", date:1653055859902, },
  { id:2, emotion:2, content:"오늘의일기 2번", date:1653055859903, },
  { id:3, emotion:3, content:"오늘의일기 3번", date:1653055859904, },
  { id:4, emotion:4, content:"오늘의일기 4번", date:1653055859905, },
  { id:5, emotion:5, content:"오늘의일기 5번", date:1653055859906, },
]

function App() {
  // data의 기본 state는 []
  const [data, dispatch] = useReducer(reducer, []);
  //console.log(new Date().getTime(dummyData)); // 현재시간

  // 일기 id로 사용
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
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
