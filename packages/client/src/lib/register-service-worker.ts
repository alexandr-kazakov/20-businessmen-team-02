export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./service-worker.js')
        .then(registration => console.log('ServiceWorker registered: ', registration.scope))
        .catch((error: string) => console.log('ServiceWorker registration failed: ', error))
    })
  }
}
