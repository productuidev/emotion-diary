import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const {id} = useParams(); // 현재 전달받은 id
  console.log(id);

  return (
    <div>
      <h2>Edit</h2>
    </div>
  );
}

export default Edit;