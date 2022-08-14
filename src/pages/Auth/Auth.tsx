import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Theme } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { googleProvider, auth, signInWithPopup, GoogleAuthProvider } from "src/config/firebase";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
  },
}));

interface IProps {}

const Auth: React.FC<IProps> = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClick = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(token, user);
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  return (
    <div className={classes.root}>
      <Button variant="outlined" startIcon={<GoogleIcon />} onClick={handleClick}>
        Sign in with google
      </Button>
    </div>
  );
};

export default Auth;
