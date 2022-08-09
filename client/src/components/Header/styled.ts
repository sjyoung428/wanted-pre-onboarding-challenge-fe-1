import styled from "@emotion/styled";
import { flexCenter } from "@/styles/flex";

const Navigation = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  padding: 0 1rem;
  height: 5rem;
  position: fixed;
  top: 0;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  ${flexCenter}
  font-size: 3rem;
`;

export const S = {
  Navigation,
  Title,
};
