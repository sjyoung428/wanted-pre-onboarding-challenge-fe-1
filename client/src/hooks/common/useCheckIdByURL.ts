import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useCheckIdByURL = () => {
  const [checkId, setCheckId] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    setCheckId(pathname.split("/")[2]);
  }, [pathname]);

  return checkId;
};

export default useCheckIdByURL;
