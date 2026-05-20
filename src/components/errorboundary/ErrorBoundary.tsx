import {
    Component,
    ErrorInfo,
    ReactNode,
} from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError() {
        return {
            hasError: true,
        };
    }

    componentDidCatch(
        error: Error,
        errorInfo: ErrorInfo
    ) {
        console.error(
            "Application Error:",
            error,
            errorInfo
        );

        // Future:
        // Send error to Sentry / LogRocket
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-gray-900">
                    <div className="max-w-md text-center">
                        <h1 className="mb-4 text-3xl font-bold text-red-500">
                            Something went wrong
                        </h1>

                        <p className="mb-6 text-gray-600 dark:text-gray-300">
                            An unexpected error occurred.
                        </p>

                        <button
                            onClick={this.handleReload}
                            className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;