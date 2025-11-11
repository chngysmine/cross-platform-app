"use client"

import React from "react"
import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonNote } from "@ionic/react"
import { trash } from "ionicons/icons"
import type { Note } from "@/hooks/useNoteStorage"
import Link from "next/link"
import { IonIcon } from "@ionic/react"

export interface NoteListProps {
  notes: Note[]
  onDelete: (id: string) => void
}

function formatRelative(iso: string): string {
  const date = new Date(iso)
  const diffMs = Date.now() - date.getTime()
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return "just now"
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

const NoteRow = React.memo(function NoteRow({
  note,
  onDelete,
}: {
  note: Note
  onDelete: (id: string) => void
}) {
  return (
    <IonItemSliding>
      <Link href={`/note/edit?id=${note.id}`} legacyBehavior>
        <IonItem detail button>
          <IonLabel>
            <h2>{note.content.split("\n")[0] || "Untitled"}</h2>
            <p>{note.content.split("\n").slice(1).join(" ").slice(0, 80)}</p>
          </IonLabel>
          <IonNote slot="end">{formatRelative(note.createdAt)}</IonNote>
        </IonItem>
      </Link>
      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={() => onDelete(note.id)} aria-label="Delete note">
          <IonIcon icon={trash} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  )
})

export default function NoteList({ notes, onDelete }: NoteListProps) {
  return (
    <IonList inset>
      {notes.map((n) => (
        <NoteRow key={n.id} note={n} onDelete={onDelete} />
      ))}
    </IonList>
  )
}
