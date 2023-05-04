import React, { Component, ErrorInfo, ReactNode } from "react";
import ErrorBoundaryContent from "./ErrorBoundaryContent";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);

        this.setState({
            error,
            errorInfo
        })
    }

    public render() {
        if (this.state.hasError) {
            return <ErrorBoundaryContent error={this.state.error} errorInfo={this.state.errorInfo}/>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
