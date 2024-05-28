import "./Empty.css";
import Image from "next/image";
import Link from "next/link";

import { MyButton } from "../MyButton/MyButton";
const Empty = () => {
  return (
    <div className="wrapper">
      <div className="empty__container">
        <Image src="/empty.svg" width={400} height={300} alt="empty" />
        <p>You haven't rated any films yet</p>
        <MyButton>
          <Link href={"/"}>Find movies</Link>
        </MyButton>
      </div>
    </div>
  );
};
export { Empty };
