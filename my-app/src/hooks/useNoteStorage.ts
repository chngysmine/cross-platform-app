"use client"

import { useCallback, useEffect, useState } from "react"
import { Preferences } from "@capacitor/preferences"

export interface Note {
  id: string
  content: string
  createdAt: string
  category?: "all" | "important" | "todo" | "shopping"
}

const STORAGE_KEY = "my_notes"

function generateSeedNotes(): Note[] {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  function makeDate(dayOffset: number) {
    const d = new Date(start)
    d.setDate(start.getDate() + dayOffset)
    return d.toISOString()
  }

  const important: Note[] = [
    {
      id: cryptoId(),
      content: "Important\n• Tóm tắt kết quả họp tuần\n• Danh sách rủi ro Q4\n• Hành động ưu tiên",
      createdAt: makeDate(0),
      category: "important",
    },
    {
      id: cryptoId(),
      content: "Important\n• Kế hoạch ra mắt tính năng M1\n• Yêu cầu pháp lý cần rà soát",
      createdAt: makeDate(1),
      category: "important",
    },
    {
      id: cryptoId(),
      content: "Important\n• KPI tháng này\n• Điểm nghẽn kỹ thuật chính",
      createdAt: makeDate(2),
      category: "important",
    },
    {
      id: cryptoId(),
      content: "Important\n• Danh sách stakeholder\n• Timeline truyền thông",
      createdAt: makeDate(3),
      category: "important",
    },
    {
      id: cryptoId(),
      content: "Important\n• Họp chiến lược quý sau\n• Nghiên cứu thị trường tóm tắt",
      createdAt: makeDate(4),
      category: "important",
    },
  ]

  const todo: Note[] = [
    {
      id: cryptoId(),
      content: "To‑do list\n1. Trả lời email khách hàng\n2. Chuẩn bị demo\n3. Tạo issue QA",
      createdAt: makeDate(0),
      category: "todo",
    },
    {
      id: cryptoId(),
      content: "To‑do list\n1. Cập nhật roadmap\n2. Review PR #245\n3. Hẹn lịch user interview",
      createdAt: makeDate(1),
      category: "todo",
    },
    {
      id: cryptoId(),
      content: "To‑do list\n1. Viết tài liệu hướng dẫn\n2. Tổng hợp phản hồi beta",
      createdAt: makeDate(2),
      category: "todo",
    },
    {
      id: cryptoId(),
      content: "To‑do list\n1. Chuẩn bị báo cáo tuần\n2. Dọn backlog",
      createdAt: makeDate(3),
      category: "todo",
    },
    {
      id: cryptoId(),
      content: "To‑do list\n1. Phân tích log lỗi\n2. Kiểm thử hồi quy",
      createdAt: makeDate(4),
      category: "todo",
    },
  ]

  const shopping: Note[] = [
    {
      id: cryptoId(),
      content: "Shopping list\n• Gạo\n• Pasta\n• Sữa chua\n• Phô mai\n• Bơ",
      createdAt: makeDate(0),
      category: "shopping",
    },
    {
      id: cryptoId(),
      content: "Shopping list\n• Trứng\n• Thịt gà\n• Rau xanh\n• Cam",
      createdAt: makeDate(1),
      category: "shopping",
    },
    {
      id: cryptoId(),
      content: "Shopping list\n• Bánh mì\n• Cà phê\n• Sữa hạt",
      createdAt: makeDate(2),
      category: "shopping",
    },
    {
      id: cryptoId(),
      content: "Shopping list\n• Cá hồi\n• Khoai tây\n• Sốt tiêu đen",
      createdAt: makeDate(3),
      category: "shopping",
    },
    {
      id: cryptoId(),
      content: "Shopping list\n• Yến mạch\n• Táo\n• Bơ đậu phộng",
      createdAt: makeDate(4),
      category: "shopping",
    },
  ]

  const mixed: Note[] = [
    {
      id: cryptoId(),
      content:
        "Product Meeting\n1. Review action items\n2. Dev update\n3. User insights\n4. Competitor review\n5. Roadmap",
      createdAt: makeDate(0),
    },
    { id: cryptoId(), content: "Daily Review\n• Wins\n• One challenge\n• Top priority", createdAt: makeDate(1) },
    {
      id: cryptoId(),
      content: "Ideas\n• Micro‑interactions cho editor\n• Swipe để định dạng nhanh",
      createdAt: makeDate(2),
    },
    { id: cryptoId(), content: "Notes\nGhi chú nhanh về phân tích cạnh tranh tuần này.", createdAt: makeDate(3) },
  ]

  return [...important, ...todo, ...shopping, ...mixed]
}

async function readNotesFromStorage(): Promise<Note[]> {
  const { value } = await Preferences.get({ key: STORAGE_KEY })
  if (!value) return []
  try {
    const parsed = JSON.parse(value) as Note[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function writeNotesToStorage(notes: Note[]): Promise<void> {
  await Preferences.set({
    key: STORAGE_KEY,
    value: JSON.stringify(notes),
  })
}

export function useNoteStorage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true
    readNotesFromStorage().then(async (n) => {
      if (isMounted) {
        if (n.length === 0) {
          const seeded = generateSeedNotes()
          setNotes(seeded)
          await writeNotesToStorage(seeded)
          setLoading(false)
        } else {
          setNotes(n)
          setLoading(false)
        }
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  const save = useCallback(async (next: Note[]) => {
    setNotes(next)
    await writeNotesToStorage(next)
  }, [])

  const addNote = useCallback(
    async (content: string) => {
      const newNote: Note = {
        id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
        content,
        createdAt: new Date().toISOString(),
      }
      const next = [newNote, ...notes]
      await save(next)
      return newNote
    },
    [notes, save],
  )

  const updateNote = useCallback(
    async (id: string, content: string) => {
      const next = notes.map((n) => (n.id === id ? { ...n, content } : n))
      await save(next)
    },
    [notes, save],
  )

  const deleteNote = useCallback(
    async (id: string) => {
      const next = notes.filter((n) => n.id !== id)
      await save(next)
    },
    [notes, save],
  )

  return { notes, loading, addNote, updateNote, deleteNote }
}

function cryptoId(): string {
  return globalThis.crypto?.randomUUID?.() ?? String(Date.now() + Math.random())
}
