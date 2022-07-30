import Header from "../Header";
import { S } from "./styled";
import { LayoutProps } from "./types";

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <S.Container>{children}</S.Container>
    </>
  );
};

export default Layout;
