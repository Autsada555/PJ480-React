import React from "react";

interface WarningBannerProps {
  message: string;
}

const WarningBanner: React.FC<WarningBannerProps> = ({ message }) => {
  return (
    <div
      style={{
        backgroundColor: "#fffae6", 
        color: "#856404", 
        padding: "10px 15px",
        border: "1px solid #ffeeba",
        borderRadius: "5px",
        fontSize: "16px",
        fontWeight: "bold",
      }}
    >
      {message}
    </div>
  );
};

export default WarningBanner;
