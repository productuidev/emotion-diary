const DiaryItem = ({ id, emotion, content, date }) => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const strDate = new Date(parseInt(date)).toLocaleDateString();

  return (
    <div className="DiaryItem">
      <div className={[
        "emotionImgWrapper",
        `emotionImgWrapper${emotion}`
      ].join(" ")}>
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt={`감정점수 ${emotion}점`} />
      </div>
      <div className="infoWrapper">
        <div className="DiaryDate">{strDate}</div>
        <div className="DiaryContentPreview">{content.slice(0, 25)}</div>
      </div>
      <div>

      </div>
    </div>
  );
};

export default DiaryItem;