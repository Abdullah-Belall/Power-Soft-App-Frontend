import { TextField } from "@mui/material";

export default function MyInput({
  placeHolder,
  value,
  onChange,
  type = "text",
  disabled = false,
}: {
  placeHolder: string;
  value: string;
  onChange?: {
    keyName: string;
    func: (key: string, value: string) => void;
  };
  type?: "text" | "password";
  disabled?: boolean;
}) {
  return (
    <TextField
      label={placeHolder}
      variant="filled"
      className="w-full"
      value={value}
      onChange={(e) => onChange?.func(onChange.keyName, e.target.value)}
      type={type}
      disabled={disabled}
    />
  );
}
