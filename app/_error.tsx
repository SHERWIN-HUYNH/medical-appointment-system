// pages/_error.tsx
import React from 'react';
import { NextPageContext } from 'next';

interface ErrorPageProps {
  statusCode: number;
  errorMessage?: string;
}

const ErrorPage = ({ statusCode, errorMessage }: ErrorPageProps) => {
  const showDetails = process.env.NODE_ENV === 'development';

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Error Occurred</h1>
      <p>Status Code: {statusCode}</p>
      {showDetails && errorMessage ? (
        <pre
          style={{
            color: 'red',
            backgroundColor: '#f0f0f0',
            padding: '1rem',
            borderRadius: '5px',
            whiteSpace: 'pre-wrap',
            textAlign: 'left',
            maxWidth: '80%',
            margin: '1rem auto',
          }}
        >
          {errorMessage}
        </pre>
      ) : (
        <p>Something went wrong. Please try again later.</p>
      )}
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? (err.statusCode ?? 500) : 404;
  const errorMessage = err ? err.message : 'Unknown error';
  return { statusCode, errorMessage };
};

export default ErrorPage;
