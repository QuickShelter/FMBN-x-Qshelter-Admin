import { Component, ErrorInfo, ReactNode } from "react";
import error from "@/assets/error.png";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage?: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: undefined,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by error boundary:", error, errorInfo);
    this.setState({
      hasError: true,
      errorMessage: error.message || "An Error Occured. Please check your code",
    });
    // You can log the error to a logging service or perform other actions here
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Render fallback UI when an error occurs
      return (
        <div className="flex flex-1 gap-2 flex-col justify-center items-center">
          <img src={error} alt="" />
          <span>{this.state.errorMessage}</span>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
