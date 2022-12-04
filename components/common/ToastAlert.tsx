import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastAlert: React.FC<{
  showToastAlert: boolean;
  setShowToastAlert: React.Dispatch<React.SetStateAction<boolean>>;
  alertData:{type:string,message:string}
}> = ({ showToastAlert, setShowToastAlert,alertData }) => {
  const toggleShowA = () => setShowToastAlert(!showToastAlert);

  return (
    <ToastContainer className="p-3" position={"bottom-end"}>
      <Toast show={showToastAlert} onClose={toggleShowA} delay={3000} autohide bg={alertData.type}>
        <Toast.Header>
          <strong className="me-auto">Employee Manager</strong>
        </Toast.Header>
        <Toast.Body>{alertData.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastAlert;
