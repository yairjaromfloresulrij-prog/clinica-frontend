import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertaBanner } from "./AlertaBanner";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  tieneError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    tieneError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { tieneError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    void error;
    void info;
  }

  render() {
    if (this.state.tieneError) {
      return (
        this.props.fallback ?? (
          <AlertaBanner
            tipo="error"
            mensaje="Ocurrió un problema al mostrar esta sección. Intentá nuevamente."
          />
        )
      );
    }

    return this.props.children;
  }
}
