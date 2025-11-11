# Next.js + Capacitor Mobile App

Project React + Capacitor sử dụng Next.js thay vì Vite, sẵn sàng để phát triển mobile app.

## Cấu trúc Project

- **Next.js App**: React app với TypeScript, Tailwind CSS
- **Capacitor**: Cross-platform mobile development
- **Android**: Native Android project trong thư mục `android/`
- **iOS**: Native iOS project trong thư mục `ios/`
- **Web Build**: Static export trong thư mục `out/`

## Scripts Available

```bash
# Development
npm run dev          # Chạy Next.js dev server

# Build & Deploy
npm run build        # Build Next.js app (tạo thư mục out/)
npm run build:mobile # Build + copy assets vào native projects

# Mobile Development
npm run android      # Mở Android Studio
npm run ios          # Mở Xcode (macOS only)
```

## Workflow Development

1. **Phát triển web**: Chỉnh sửa code trong `src/`
2. **Build & Deploy**: `npm run build:mobile`
3. **Test mobile**: `npm run android` hoặc `npm run ios`

## Cấu hình

- **Next.js**: Cấu hình static export trong `next.config.ts`
- **Capacitor**: Cấu hình trong `capacitor.config.ts`
- **Web Dir**: `out/` (Next.js static export output)

## Lưu ý

- Mỗi lần thay đổi code, cần chạy `npm run build:mobile` để copy assets
- Android Studio cần được cài đặt để phát triển Android
- Xcode cần được cài đặt để phát triển iOS (macOS only)
- Project đã được cấu hình sẵn với TypeScript và Tailwind CSS



