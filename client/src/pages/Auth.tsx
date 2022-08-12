import Authorization from "@/components/Auth/Authorization";
import { Helmet } from "react-helmet-async";

const Auth = () => {
  return (
    <>
      <Helmet>
        <title>사용자 인증</title>
      </Helmet>
      <Authorization />
    </>
  );
};

export default Auth;
