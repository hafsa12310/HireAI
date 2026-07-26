import { useEffect, useState } from 'react'

type ScreenState = {
  step?: number
}

type CanvasManifest = {
  screens?: Record<string, { state?: ScreenState }>
}

export function useScreenInit() {
  const [screenState, setScreenState] = useState<ScreenState>({})

  useEffect(() => {
    if (typeof window === 'undefined') return

    const screenId = new URLSearchParams(window.location.search).get('mp_screen')
    if (!screenId) return

    const manifestUrl = './canvas.manifest.js'

    import(/* @vite-ignore */ manifestUrl)
      .then(({ manifest }: { manifest?: CanvasManifest }) => {
        setScreenState(manifest?.screens?.[screenId]?.state ?? {})
      })
      .catch(() => {
        setScreenState({})
      })
  }, [])

  return screenState
}
