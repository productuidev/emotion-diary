// 중복 사용할 수 있는 공통 코드가 있다면
// 별도로 디렉토리를 생성 후 해당 코드를 이동시켜 export해 재사용

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

export const emotionList = [
  {
    emotion_id : 1,
    emotion_img : process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript : '완전 좋음'
  },
  {
    emotion_id : 2,
    emotion_img : process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript : '좋음'
  },
  {
    emotion_id : 3,
    emotion_img : process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript : '그럭저럭'
  },
  {
    emotion_id : 4,
    emotion_img : process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript : '나쁨'
  },
  {
    emotion_id : 5,
    emotion_img : process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript : '끔찍함'
  },
];