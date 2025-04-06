import React from 'react';

const ErrorMessage = ({ error }) => {
    if (!error) return null;
    
    return (
        <div className="error-message">
            ⚠️ {error.message || "Something went wrong!"}
        </div>
    );
};

export default ErrorMessage;
