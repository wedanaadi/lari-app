import { toast } from 'react-toastify'

type ToastNotificationProps = {
  message: string,
  type?: 'info' | 'success' | 'warning' | 'error',
}
export const ToastNotification = async ({ message, type }: ToastNotificationProps) => {
  const id = toast.loading("Please wait...")
  setTimeout(() => {
    switch (type) {
      case 'info':
        toast.update(id, { render: message, type: type, isLoading: false, autoClose: 2000 });
        break;
      case 'success':
        toast.update(id, { render: message, type: type, isLoading: false, autoClose: 2000 });
        break;
      case 'warning':
        toast.update(id, { render: message, type: type, isLoading: false, autoClose: 2000 });
        break;
      case 'error':
        toast.update(id, { render: message, type: type, isLoading: false, autoClose: 2000 });
        break;
      default:
        toast(message);
        break;
    }
  }, 500);
}
