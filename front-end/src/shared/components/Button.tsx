import Button from "@mui/material/Button";
import { CSSProperties, MouseEventHandler } from "react";

type ButtonProps = {
  children: React.ReactNode;
  color?: "primary" | "secondary";
  variant: "text" | "contained" | "outlined";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
};

export function CustomButton({
  children,
  color,
  variant,
  style,
  onClick,
}: ButtonProps) {
  return (
    <Button
      onClick={onClick}
      style={{ ...style, textTransform: "none", fontWeight: "400" }}
      variant={variant}
      color={color}
    >
      {children}
    </Button>
  );
}
