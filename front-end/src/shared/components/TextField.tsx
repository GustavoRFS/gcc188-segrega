import TextField from "@mui/material/TextField";
import { ChangeEventHandler, FormEventHandler, CSSProperties } from "react";

type TextFieldProps = {
  label?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onSubmit?: FormEventHandler<HTMLDivElement>;
  type?: "number" | "email" | "password";
  defaultValue?: "String";
  style?: CSSProperties;
};

export default function CustomTextField({
  label,
  onChange,
  type,
  style,
  onSubmit,
  defaultValue
}: TextFieldProps) {
  return (
    <TextField
      style={style}
      label={label}
      onChange={onChange}
      onSubmit={onSubmit}
      defaultValue={defaultValue}
      type={type}
      size="small"
    />
  );
}
