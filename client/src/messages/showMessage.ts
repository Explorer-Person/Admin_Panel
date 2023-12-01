import { toast, ToastOptions, TypeOptions } from "react-toastify";

const showMessage = (toastMessage: string, type: TypeOptions) => {
  const toastOptions: ToastOptions = {
    type: type,
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
   toast(toastMessage, toastOptions);
};

export default showMessage;
