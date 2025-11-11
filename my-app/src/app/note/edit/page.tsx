"use client"

import { IonButtons, IonButton, IonContent, IonHeader, IonPage, IonTextarea, IonTitle, IonToolbar } from "@ionic/react"
import { useNoteStorage } from "@/hooks/useNoteStorage"
import { Suspense, useCallback, useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { chevronBack } from "ionicons/icons"
import { IonIcon } from "@ionic/react"

function EditorInner() {
  const router = useRouter()
  const search = useSearchParams()
  const id = search.get("id") ?? ""
  const { notes, updateNote } = useNoteStorage()
  const current = useMemo(() => notes.find((n) => n.id === id), [notes, id])
  const [content, setContent] = useState<string>(current?.content ?? "")
  const [isSaved, setIsSaved] = useState(true)

  useEffect(() => {
    setContent(current?.content ?? "")
  }, [current?.content])

  const handleSave = useCallback(async () => {
    if (!id || !content.trim()) return
    await updateNote(id, content)
    setIsSaved(true)
    setTimeout(() => router.back(), 300)
  }, [content, id, updateNote, router])

  const handleContentChange = useCallback((value: string) => {
    setContent(value)
    setIsSaved(false)
  }, [])

  const applyFormat = useCallback(
    (before: string, after: string) => {
      const textarea = document.querySelector("textarea") as HTMLTextAreaElement
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selected = content.substring(start, end)
      const newContent = content.substring(0, start) + before + selected + after + content.substring(end)

      handleContentChange(newContent)
    },
    [content, handleContentChange],
  )

  return (
    <IonPage className="editor-page">
      <IonHeader translucent>
        <IonToolbar className="editor-toolbar">
          <IonButtons slot="start">
            <IonButton onClick={() => router.back()} aria-label="Go back" className="editor-button">
              <IonIcon icon={chevronBack} slot="icon-only" />
            </IonButton>
          </IonButtons>
          <IonTitle className="editor-title">Edit note</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSave} aria-label="Save note" className="editor-button" disabled={isSaved}>
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="editor-content">
        <IonTextarea
          autoGrow
          placeholder="Start typing..."
          value={content}
          onIonInput={(e) => handleContentChange(e.detail.value ?? "")}
          className="editor-textarea"
        />
      </IonContent>
      <div className="format-toolbar" role="toolbar" aria-label="Text formatting">
        <button className="format-btn" onClick={() => applyFormat("**", "**")} title="Bold" aria-label="Bold">
          <strong>B</strong>
        </button>
        <button className="format-btn" onClick={() => applyFormat("*", "*")} title="Italic" aria-label="Italic">
          <em>I</em>
        </button>
        <button
          className="format-btn"
          onClick={() => applyFormat("~~", "~~")}
          title="Strikethrough"
          aria-label="Strikethrough"
        >
          <s>S</s>
        </button>
        <button
          className="format-btn"
          onClick={() => applyFormat("- ", "")}
          title="Bullet point"
          aria-label="Bullet point"
        >
          •
        </button>
        <button
          className="format-btn"
          onClick={() => applyFormat("1. ", "")}
          title="Numbered list"
          aria-label="Numbered list"
        >
          1.
        </button>
        <button
          className="format-btn"
          onClick={() => applyFormat("```\n", "\n```")}
          title="Code block"
          aria-label="Code block"
        >
          &lt;&gt;
        </button>
      </div>
    </IonPage>
  )
}

export default function NoteEditPage() {
  return (
    <Suspense fallback={null}>
      <EditorInner />
    </Suspense>
  )
}
