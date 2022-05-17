import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const id = searchParams.get("id");
  console.log("id :", id);

  const mode = searchParams.get("mode");
  console.log("mode :", mode);


  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 수정페이지 입니다.</p>
      <button onClick={()=>setSearchParams({who: "winterlood"})}>QS Change</button>
      <button onClick={()=>{navigate("/home")}}>Home</button>
      <button onClick={()=>{navigate(-1)}}>Back</button>
      <p>&nbsp;</p>
    </div>
  );
}

export default Edit;