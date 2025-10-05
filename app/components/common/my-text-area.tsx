import { TextField } from "@mui/material";

export default function MyTextArea({
  value,
  onChange,
  label,
  disabled = false,
  onChangeFunc,
}: {
  value: string;
  onChange?: {
    keyName: string;
    func: (key: string, value: string) => void;
  };
  label: string;
  disabled?: boolean;
  onChangeFunc?: (value: string) => void;
}) {
  return (
    <TextField
      fullWidth
      label={label}
      multiline
      rows={4}
      value={value}
      onChange={(e) =>
        onChange
          ? onChange.func(onChange.keyName, e.target.value)
          : onChangeFunc
          ? onChangeFunc(e.target.value)
          : null
      }
      variant="filled"
      disabled={disabled}
    />
  );
}
