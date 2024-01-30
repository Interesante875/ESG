import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.log(error, errorInfo);
  }

  handleClose = () => {
    // Reset the state to hide the modal
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      // Render the modal as fallback UI
      return (
        <div
          onClick={this.handleClose}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white p-6 rounded shadow-lg cursor-pointer">
            <h1 className="text-xl font-bold mb-4">Something went wrong.</h1>
            <p className="mb-4">Click anywhere to close this message.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
