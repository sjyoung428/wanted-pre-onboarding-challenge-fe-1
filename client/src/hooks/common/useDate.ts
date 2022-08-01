import { useEffect, useState } from "react";

const useDate = (updatedAt: string) => {
  const [Time, setTime] = useState<string>();
  useEffect(() => {
    const date =
      new Date(updatedAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      " " +
      new Date(updatedAt).toLocaleDateString("ko-KR", {
        weekday: "long",
      });
    const time = Number(Date.now()) - Number(new Date(updatedAt));
    const timeString =
      time < 60 * 1000
        ? "방금 전"
        : time < 60 * 60 * 1000
        ? `${String(parseInt(String(time / (60 * 1000))))}분 전`
        : time < 24 * 60 * 60 * 1000
        ? `${String(parseInt(String(time / (60 * 60 * 1000))))}시간 전`
        : date;
    setTime(timeString); //날짜 한글로 변환
  }, [updatedAt]);
  return Time;
};
export default useDate;
