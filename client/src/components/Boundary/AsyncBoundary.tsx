import { ReactNode, Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";

interface Props {
  loadingFallback: ReactNode;
  errorFallback: ReactNode;
  children: ReactNode;
}

const AsyncBoundary = ({ loadingFallback, errorFallback, children }: Props) => {
  return (
    <ErrorBoundary onError={errorFallback}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;

// 참고: https://jbee.io/react/error-declarative-handling-1/#usage
