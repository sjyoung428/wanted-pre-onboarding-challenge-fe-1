import { useEffect, useState } from "react";

const useCheckIdByURL = (pathname: string) => {
  const [checkId, setCheckId] = useState("");
  useEffect(() => {
    setCheckId(pathname.split("/")[2]);
  }, [pathname]);

  return checkId;
};

export default useCheckIdByURL;
