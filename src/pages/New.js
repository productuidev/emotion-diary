import { useNavigate } from "react-router-dom";

import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";

const New = () => {
  const navigate = useNavigate();
  return (
    <div>
      <MyHeader
        headText={"새 일기쓰기"}
        leftChild={<MyButton text={"< 뒤로가기"} onClick={()=>navigate(-1)} />} />
    </div>
  );
}

export default New;