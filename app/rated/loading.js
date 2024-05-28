import "./page.css";
import { Loader } from "@mantine/core";
const LoadingData = () => {
  return (
    <div className="wrapper__loader">
      <Loader color="violet" type="bars" />
    </div>
  );
};
export default LoadingData;
