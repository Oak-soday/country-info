import React, { useState, useEffect } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}



const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error('Error caught by boundary:', error);
      setHasError(true); // Trigger state update to render fallback UI
    };

    window.addEventListener('error', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError) {
    return <h1>Something went wrong.</h1>; // Render fallback UI
  }

  return <>{children}</>; // Render children if no error
};

export default ErrorBoundary;
