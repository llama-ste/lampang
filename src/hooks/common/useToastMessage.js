import { toast } from "react-toastify";

const useToastMessage = () => {
  const toastType = {
    success: (message) => toast.success(message),
    error: (message) => toast.error(message),
    warning: (message) => toast.warning(message),
  };

  const showToast = (type, message) => {
    toast.dismiss();
    toast.clearWaitingQueue();
    toastType[type](message);
  };

  return showToast;
};

export default useToastMessage;
