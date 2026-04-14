import { useRegisterSW } from 'virtual:pwa-register/react'

function PWABadge() {
  // periodic sync is disabled, change the value to enable it, the period is in milliseconds
  // You can remove onRegisteredSW callback and registerPeriodicSync function
  const period = 0

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return
      if (r?.active?.state === 'activated') {
        registerPeriodicSync(period, swUrl, r)
      }
      else if (r?.installing) {
        r.installing.addEventListener('statechange', (e) => {
          const sw = e.target as ServiceWorker
          if (sw.state === 'activated')
            registerPeriodicSync(period, swUrl, r)
        })
      }
    },
  })

  function handleClose() {
    setNeedRefresh(false)
  }

  const handleReload = () => updateServiceWorker(true)

  return (
    <div role="alert" aria-labelledby="toast-message">
      {needRefresh && (
        <div className="fixed bottom-0 right-0 z-10 m-4 rounded border border-border bg-card p-3 text-left text-card-foreground shadow-lg">
          <div className="mb-2">
            <span id="toast-message">New content available, click on reload button to update.</span>
          </div>
          <div className="flex gap-1.5">
            <button className="rounded-sm border border-border px-2.5 py-0.5 outline-none hover:bg-accent hover:text-accent-foreground" onClick={handleReload}>Reload</button>
            <button className="rounded-sm border border-border px-2.5 py-0.5 outline-none hover:bg-accent hover:text-accent-foreground" onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PWABadge

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
function registerPeriodicSync(period: number, swUrl: string, r: ServiceWorkerRegistration) {
  if (period <= 0) return

  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine)
      return

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        'cache': 'no-store',
        'cache-control': 'no-cache',
      },
    })

    if (resp?.status === 200)
      await r.update()
  }, period)
}
