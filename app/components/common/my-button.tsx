import { Button } from "@mui/material";

export default function MyButton({
  onClick,
  name,
}: {
  onClick: (() => Promise<void>) | (() => void);
  name: string;
}) {
  return (
    <Button
      onClick={onClick}
      sx={{ fontFamily: "roboto" }}
      className="!bg-main !rounded-3xl !px-[30px]"
      variant="contained"
    >
      {name}
    </Button>
  );
}
