import { useParams } from "react-router-dom"; // custom hooks

// pathVariable = id
const Diary = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <h1>Diary</h1>
      <p>이곳은 다이어리 상세 페이지 입니다.</p>
    </div>
  );
}

export default Diary;