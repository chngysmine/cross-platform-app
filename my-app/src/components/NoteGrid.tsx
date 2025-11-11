import { IonCard, IonCardContent, IonIcon, IonChip, IonLabel } from "@ionic/react"
import { createOutline } from "ionicons/icons"
import Link from "next/link"
import type { Note } from "@/hooks/useNoteStorage"

export interface NoteGridProps {
  notes: Note[]
  query: string
}

function pickColor(index: number): string {
  const palette = ["note-blue", "note-pink", "note-yellow", "note-green"]
  return palette[index % palette.length]
}

export default function NoteGrid({ notes, query }: NoteGridProps) {
  const filtered = query ? notes.filter((n) => n.content.toLowerCase().includes(query.toLowerCase())) : notes

  return (
    <>
      <div className="masonry note-grid-row">
        {filtered.map((n, i) => {
          const lines = n.content.split("\n")
          const title = lines[0] || "Untitled"
          const body = lines.slice(1).join(" ")
          return (
            <div key={n.id} className="masonry-item">
              <div
                className="fade-in-up"
                style={{
                  animationDelay: `${Math.min(i, 12) * 50}ms`,
                  animationDuration: "0.5s",
                }}
              >
                <Link href={`/note/edit?id=${n.id}`} className="note-card-link">
                  <IonCard className={`note-card ${pickColor(i)}`}>
                    <IonCardContent>
                      <h3 className="note-title">{title}</h3>
                      <p className="note-body">{body.slice(0, 160)}</p>
                      <div className="note-card-footer">
                        <IonChip outline={true} color="medium" className="note-chip">
                          <IonIcon icon={createOutline} />
                          <IonLabel>Edit</IonLabel>
                        </IonChip>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
