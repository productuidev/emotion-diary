import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
}

const New = () => {
  console.log(getStringDate(new Date()));
  const [date, setDate] = useState();

  const navigate = useNavigate();
  return (
    <div>
      <MyHeader
        headText={"새 일기쓰기"}
        leftChild={<MyButton text={"< 뒤로가기"} onClick={()=>navigate(-1)} />}
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="inputBox">
            <input
              type="date"
              value={date}
              onChange={(e)=>setDate(e.target.value)} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default New;