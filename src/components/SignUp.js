import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const SignUp = (props) => {
  return (
    <div className="boxing">
      <Form>
        <FormGroup>
          <Label for="emailnew">Email</Label>
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
        <FormGroup>
          <Label for="confirm your password">Confirm Password</Label>
          <Input
            type="password"
            name="password"
            id="password-confirm"
            placeholder="your password"
          />
        </FormGroup>
        <Button color="primary">Submit</Button>
      </Form>
    </div>
  );
};

export default SignUp;
