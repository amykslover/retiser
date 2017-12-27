import React from "react";
import Hero from "../components/Hero";
import Button from "../components/Button";

const Home = () =>
  <div>
    <Hero backgroundImage="https://banyanhill.com/wp-content/uploads/not-too-late-for-retirement.jpg">
      <h1>Retiser</h1>
      <h2>Letting you know when you need to up your savings game.</h2>
    </Hero>
        <Button
        href="/api/signup"
        type="primary"
        user="user"
        text="New Account"
        >
        New Account
        </Button>
        <Button
        href="/api/login"
        type="default"
        user="user"
        text="Account Login"
        >
        Sign In
        </Button>
    	<Button
        href="/api/auth/google"
        type="danger"
        user="google-plus"
        text="Use Google"
        >
        Use Google
        </Button>
  </div>

export default Home;