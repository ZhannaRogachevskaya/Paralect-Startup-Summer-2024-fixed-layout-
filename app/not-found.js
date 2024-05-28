import Image from "next/image";
import Link from "next/link";
import { Button } from "@mantine/core";
const NotFound = () => {
  return (
    <div className="wrapper__not-found">
      <div className="logo_error">
        <Link href="/">
          <Image src="/logo.png" width={179} height={36} alt="logo" />
        </Link>
      </div>
      <div className="container">
        <Image src="/not-found.svg" width={656} height={196} />
        <div className="text">
          <h3>We can’t find the page you are looking for</h3>
          <Button variant="filled" color="#9854F6">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
