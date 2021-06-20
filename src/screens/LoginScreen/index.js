import React, { useContext, useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';
import { AppContext } from '../../context';
import { useHistory } from "react-router-dom";


export default function LoginScreen(){
  const appContext = useContext(AppContext);
  let history = useHistory();

  const onLoginSuccess = () => {
    history.push("/missions");
  }

  useEffect(() => {
    appContext.setTitle("Login");
  }, []);

  return <Button variant={"contained"} onClick={onLoginSuccess}>Login</Button>
}