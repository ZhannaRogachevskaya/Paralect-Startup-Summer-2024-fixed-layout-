import { Button } from "@mantine/core";
import "./MyButton.css";
import Link from "next/link";

const MyButton = ({ children }) => {
  return (
    <Button variant="filled" color="#9854F6">
      {children}
    </Button>
  );
};
export { MyButton };
