import { flexCenter } from "@/styles/flex";
import styled from "@emotion/styled";
import Header from "./Header";

const Container = styled.div`
  ${flexCenter}
  max-width: 100%;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 8rem;
`;

interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
