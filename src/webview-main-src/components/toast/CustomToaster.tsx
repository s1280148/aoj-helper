import { Toaster } from "react-hot-toast";

/**
 * react-hot-toastのトースター
 * @returns react-hot-toastのトースター
 */
const CustomToaster: React.FC = () => {
  return (
    <Toaster
      toastOptions={{
        className: "dark:bg-darkMode-bg",
        position: "top-left",
      }}
    />
  );
};

export default CustomToaster;
