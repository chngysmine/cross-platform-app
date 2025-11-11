"use client"

import { IonApp, setupIonicReact } from "@ionic/react"
import { type PropsWithChildren, useEffect } from "react"

// Ensure Ionic is initialized on the client
setupIonicReact()

export default function ClientRoot({ children }: PropsWithChildren) {
  useEffect(() => {
    // Future: status bar, splash screen, etc.
  }, [])
  return <IonApp>{children}</IonApp>
}
