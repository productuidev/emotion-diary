const DiaryItem = ({ id, emotion, content, date }) => {
  return (
    <div className="DiaryItem">
      <div className={[
        "emotionImgWrapper",
        `emotionImgWrapper${emotion}`
      ].join(" ")}>
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt={`감정점수 ${emotion}점`} />
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DiaryItem;