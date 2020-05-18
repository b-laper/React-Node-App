import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const LogIn = (props) => {
  return (
    <div className="boxing">
      <Form>
        <FormGroup>
          <Label for="emailnew">Login/Email</Label>
          <Input
            type="email"
            name="email"
            id="email-new"
            placeholder="enter your email address"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password-new">Password</Label>
          <Input
            type="password"
            name="password"
            id="password-new"
            placeholder="enter your password"
          />
        </FormGroup>

        <Button color="info">Log In</Button>
      </Form>
    </div>
  );
};

export default LogIn;
