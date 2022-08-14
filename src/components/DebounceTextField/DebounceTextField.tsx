import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

type IProps = TextFieldProps & {
  callback: (value: string) => void;
  value: string;
};

const DebounceTextField: React.FC<IProps> = ({ callback, ...props }) => {
  const [valueState, setValueState] = React.useState<string>(props.value);

  React.useEffect(() => {
    let timeout = setTimeout(() => {
      callback(valueState);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
    // @ts-ignore
  }, [valueState]); // must not add callback to dependency

  React.useEffect(() => {
    // setValueState(props.value);
  }, [props.value]);

  return (
    <TextField
      {...props}
      onChange={(e) => {
        props.onChange && props.onChange(e);
        setValueState(e.target.value);
      }}
      value={valueState}
    />
  );
};

export default DebounceTextField;
