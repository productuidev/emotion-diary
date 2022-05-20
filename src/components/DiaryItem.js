const DiaryItem = ({ id, emotion, content, date }) => {
  return (
    <div className="DiaryItem">
      <div className="emotionImgWrapper">
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DiaryItem;