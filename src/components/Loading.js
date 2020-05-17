import React from "react";
import { Spinner, Container, ToastHeader, Toast, ToastBody } from "reactstrap";

const Loading = (props) => {
  return (
    <Container className="d-flex justify-content-center">
      <Toast className="mt-5 window">
        <ToastHeader>Fetching data...</ToastHeader>
        <ToastBody className=" d-flex justify-content-center">
          <Spinner className="mr-2" color="primary"></Spinner>
          {props.load}
        </ToastBody>
      </Toast>
    </Container>
  );
};

export default Loading;
