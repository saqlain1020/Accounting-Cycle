import { useCallback } from "react";
import { toast, Id } from "react-toastify";

const useNotify = () => {
  const notifySystem = useCallback((title: string, message: string, type: string) => {
    console.log(`Notify: ${title} Message: ${message} Type: ${type}`);
  }, []);

  const notifySuccess = useCallback((message: string) => {
    toast.success(message);
  }, []);

  const notifyError = useCallback((message: string) => {
    toast.error(message);
  }, []);

  const notifyLoading = useCallback((message: string) => {
    const id = toast.loading(message);
    return id;
  }, []);

  const dismissNotify = useCallback((id: Id) => toast.dismiss(id), []);
  const dismissNotifyAll = useCallback(() => toast.dismiss(), []);

  return {
    notifySystem,
    notifySuccess,
    notifyError,
    notifyLoading,
    dismissNotify,
    dismissNotifyAll,
  };
};

export default useNotify;
