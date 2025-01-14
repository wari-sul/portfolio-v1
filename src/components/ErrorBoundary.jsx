import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }
  
    componentDidCatch(error, errorInfo) {
      console.error('Error caught by boundary:', error);
      console.error('Error Info:', errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return (
          <div className="text-white p-4">
            <h1>Something went wrong</h1>
            <pre>{this.state.error?.toString()}</pre>
          </div>
        );
      }
      return this.props.children;
    }
}

export default ErrorBoundary;