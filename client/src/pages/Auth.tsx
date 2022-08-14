import AuthorForm from "@/components/Auth/AuthForm";
import { Helmet } from "react-helmet-async";

const Auth = () => {
  return (
    <>
      <Helmet>
        <title>사용자 인증</title>
      </Helmet>
      <AuthorForm />
    </>
  );
};

export default Auth;
