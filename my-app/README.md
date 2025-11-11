## My Notes (Next.js + Ionic + Capacitor)

Cross‑platform notes app built with Next.js 15, React 19, Ionic React 8 for UI, Tailwind CSS v4 for styling, and Capacitor 7 for native Android/iOS packaging.

### Features
- Responsive, animated UI with Ionic components
- Masonry (staggered) note grid for a Pinterest‑like layout
- Weekly date scroller and category chips
- Note editor and simple storage via a lightweight hook
- Ready to package for Android/iOS using Capacitor

### Tech Stack
- Next.js `15.5.6` (App Router, Webpack)
- React `19.1.0`
- Ionic React `^8.2.6`
- Capacitor `^7.4.4`
- Tailwind CSS `^4` (via `@tailwindcss/postcss`)
- TypeScript `^5`

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+
- For mobile:
  - Android Studio (Android SDK)
  - Xcode (on macOS) for iOS builds

### Getting Started

```bash
# install dependencies
npm install

# run dev server (http://localhost:3000)
npm run dev
```

Open the app at `http://localhost:3000`. Edits in `src/` hot‑reload automatically.

### Available Scripts

```bash
# Development
npm run dev

# Lint
npm run lint

# Production build (web)
npm run build

# Start production server (after build)
npm run start

# Build web and sync native projects (Capacitor)
npm run build:mobile

# Open native IDEs
npm run android
npm run ios
```

### Project Structure
- `src/app/` Next.js App Router pages and layout
  - `page.tsx` home screen (search, date scroller, category chips, grid)
  - `note/edit/` note editor route
- `src/components/`
  - `NoteGrid.tsx` responsive masonry grid
  - `NoteList.tsx` list mode (unused by default UI but available)
- `src/hooks/`
  - `useNoteStorage.ts` local storage logic for notes
- `src/app/globals.css` global styles, Tailwind v4 layers, custom theme tokens
- `capacitor.config.ts` Capacitor app configuration

### Styling
- Tailwind v4 is loaded via CSS at the top of `globals.css`:

```css
@import "tailwindcss";
```

- The app defines many CSS custom properties for theming and uses small utility classes from Tailwind where helpful.
- The note grid uses a CSS columns masonry:
  - Container: `.masonry`
  - Child items: `.masonry-item`
  - Breakpoints set column counts for 1/2/3/4 columns.

### Masonry Grid Notes
The grid is implemented with pure CSS columns for performance and simplicity. Relevant classes live in `globals.css`:

- `.masonry`: sets `column-count` per breakpoint and `column-gap`.
- `.masonry-item`: uses `break-inside: avoid` to prevent splitting.

This approach gracefully handles responsive widths; cards will naturally stagger and fill vertical gaps.

### Mobile (Capacitor) Workflow
1. Build the web assets and sync native platforms:
   ```bash
   npm run build:mobile
   ```
2. Open the platform project:
   ```bash
   npm run android
   # or
   npm run ios
   ```
3. Run from Android Studio or Xcode on emulator/device.

If you change web code, re‑run `npm run build:mobile` (or `npm run build && npx cap sync`) to refresh native assets.

### Troubleshooting
- Tailwind v4 plugin imports must use the v4 syntax. The project intentionally avoids unsupported imports like `"tw-animate-css"`. If you want additional animation utilities, install a supported package and use the v4 `@plugin` directive:
  ```bash
  npm i tailwindcss-animate
  ```
  Then in `globals.css`:
  ```css
  @import "tailwindcss";
  @plugin "tailwindcss-animate";
  ```

- If styles seem off, ensure PostCSS is configured to use `@tailwindcss/postcss` (already included in `devDependencies`) and that `postcss.config.mjs` exists.

### Accessibility
- Interactive elements include ARIA roles and states where appropriate (e.g., date scroller, tabs).
- Color choices aim for sufficient contrast in both light/dark contexts.

### License
This project is provided as‑is, without warranty. You may adapt and use the code for personal or educational projects. For commercial use, review dependencies’ licenses.

### Credits
- Ionic Team for Ionic React
- Vercel for Next.js
- The Tailwind CSS community

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
