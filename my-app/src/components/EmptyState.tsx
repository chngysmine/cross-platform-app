import { IonContent, IonIcon, IonText } from "@ionic/react"
import { documentTextOutline } from "ionicons/icons"

export default function EmptyState() {
  return (
    <IonContent className="ion-padding ion-text-center">
      <div style={{ marginTop: "20vh" }}>
        <IonIcon icon={documentTextOutline} style={{ fontSize: 64, opacity: 0.6 }} />
        <IonText>
          <h2 style={{ marginTop: 16 }}>No notes yet</h2>
          <p style={{ marginTop: 8, opacity: 0.8 }}>Tap the + button to create your first note.</p>
        </IonText>
      </div>
    </IonContent>
  )
}
