import { useToast } from 'vue-toastification'
export function useAlert() {
  const toast = useToast()

  function alert(message, type = 'success') {
    const options = {
      position: 'top-center',
      timeout: 2000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.64,
      showCloseButtonOnHover: true,
      hideProgressBar: false,
      closeButton: 'button',
      icon: true,
      rtl: false,
    }

    switch (type) {
      case 'success':
        toast.success(message, options)
        break
      case 'error':
        toast.error(message, options)
        break
      case 'warning':
        toast.warning(message, options)
        break
      case 'info':
        toast.info(message, options)
        break
    }
  }

  return { alert }
}
