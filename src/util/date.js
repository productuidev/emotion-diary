// 중복 사용할 수 있는 공통 코드가 있다면
// 별도로 디렉토리를 생성 후 해당 코드를 이동시켜 export해 재사용

export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

