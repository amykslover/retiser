import React from "react";
import Button from "../Button"
import LoginGoogle from "../Login"
import "./ButtonBar.css";

const ButtonBar = props =>
  <div className="buttonBar">
        <Button
        href="/api/signup"
        type="primary"
        user="user"
        text="Create"
        >
        </Button>
        <Button
        href="/api/login"
        type="default"
        user="user"
        text="Login"
        >
        </Button>
        <LoginGoogle
        type="danger"
        user="google-plus"
        text="Use Google"
        >
        </LoginGoogle>
   </div>;
export default ButtonBar;



