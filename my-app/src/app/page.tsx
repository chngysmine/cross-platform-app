"use client"

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonSearchbar,
  IonButtons,
  IonButton,
} from "@ionic/react"
import { add } from "ionicons/icons"
import { useCallback, useMemo, useState } from "react"
import { useNoteStorage } from "@/hooks/useNoteStorage"
import EmptyState from "@/components/EmptyState"
import { useRouter } from "next/navigation"
import NoteGrid from "@/components/NoteGrid"

export default function Home() {
  const { notes, loading, deleteNote, addNote } = useNoteStorage()
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [segment, setSegment] = useState("all")
  const [activeDate, setActiveDate] = useState<number>(0)

  const weekDays = useMemo(() => {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      const dow = d.toLocaleDateString(undefined, { weekday: "short" })
      const day = d.getDate()
      const mon = d.toLocaleDateString(undefined, { month: "short" })
      return { label: dow, day, mon }
    })
  }, [])

  function isSameDay(iso: string, offset: number): boolean {
    const base = new Date()
    base.setHours(0, 0, 0, 0)
    const target = new Date(base)
    target.setDate(base.getDate() + offset)
    const d = new Date(iso)
    return (
      d.getFullYear() === target.getFullYear() && d.getMonth() === target.getMonth() && d.getDate() === target.getDate()
    )
  }

  const filteredNotes = useMemo(() => {
    return notes
      .filter((n) => (segment === "all" ? true : (n.category ?? "all") === segment))
      .filter((n) => isSameDay(n.createdAt, activeDate))
      .filter((n) => (query ? n.content.toLowerCase().includes(query.toLowerCase()) : true))
  }, [notes, segment, activeDate, query])

  const handleCreate = useCallback(async () => {
    const created = await addNote("")
    router.push(`/note/edit?id=${created.id}`)
  }, [addNote, router])

  return (
    <IonPage className="editor-page">
      <IonHeader translucent>
        <IonToolbar className="home-toolbar">
          <IonTitle className="home-title">My Notes</IonTitle>
          <IonButtons slot="end">
            <IonButton aria-label="Notifications" className="bell-btn">
              🔔
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar className="home-toolbar">
          <IonSearchbar
            className="home-searchbar"
            placeholder="Search for notes"
            value={query}
            onIonInput={(e) => setQuery(e.detail.value ?? "")}
          />
        </IonToolbar>
        {/* Date scroller with smooth animations */}
        <IonToolbar className="home-toolbar">
          <div className="date-scroller" role="listbox" aria-label="Dates this week">
            {weekDays.map((d, i) => (
              <button
                key={i}
                role="option"
                aria-selected={activeDate === i}
                className={`date-pill ${activeDate === i ? "active" : ""}`}
                onClick={() => setActiveDate(i)}
                tabIndex={0}
                style={{
                  animationDelay: `${i * 30}ms`,
                  animation: "fadeInUp 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) both",
                }}
              >
                <span className="date-pill-dow">{d.label}</span>
                <span className="date-pill-day">{d.day}</span>
                <span className="date-pill-mon">{d.mon}</span>
              </button>
            ))}
          </div>
        </IonToolbar>
        {/* Category chips */}
        <IonToolbar className="home-toolbar">
          <div className="chip-scroll" role="tablist" aria-label="Categories">
            {[
              { id: "all", label: "All" },
              { id: "important", label: "Important" },
              { id: "todo", label: "To-do lists" },
              { id: "shopping", label: "Shopping" },
            ].map((c, idx) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={segment === c.id}
                className={`chip ${segment === c.id ? "active" : ""}`}
                onClick={() => setSegment(c.id)}
                style={{
                  animationDelay: `${idx * 40}ms`,
                  animation: "fadeIn 0.4s ease-out both",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {!loading && filteredNotes.length === 0 ? <EmptyState /> : <NoteGrid notes={filteredNotes} query={query} />}
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton aria-label="Create new note" onClick={handleCreate} className="fab-primary">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}
