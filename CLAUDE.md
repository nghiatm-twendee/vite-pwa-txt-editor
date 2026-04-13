# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server with HMR
npm run build      # Type-check (tsc -b) then build for production
npm run lint       # Run ESLint across entire codebase
npm run preview    # Preview the production build locally
```

No test suite is configured yet.

## Architecture

This is a **PWA text editor** built with React 19 + TypeScript + Vite. The app can be installed on devices and works offline via a Workbox service worker (registration type: `prompt` — users see a toast when an update is available).

### Key Files

- `vite.config.ts` — Vite + TailwindCSS + VitePWA plugin config. Path alias `@/` maps to `./src/`.
- `src/main.tsx` — Entry point; wraps `<App>` in `<RootLayout>` which composes all providers.
- `src/App.tsx` — Root component; currently minimal, renders `<PWABadge>`.
- `src/components/layout/index.tsx` — `RootLayout` composes `ThemeProvider`, `TooltipProvider`, `SidebarProvider`, `RootSideBar`, and `RootMenuBar` around main content.

### Component Layers

| Layer | Path | Notes |
|---|---|---|
| Layout | `src/components/layout/` | `RootLayout`, `menu-bar/`, `side-bar/` |
| Providers | `src/components/provider/theme/` | `ThemeProvider` + `useTheme()` hook; persists to `localStorage` |
| UI primitives | `src/components/ui/` | Headless Base UI React + CVA variants + Tailwind |
| Hooks | `src/hooks/` | `use-mobile.ts` (768px breakpoint) |
| Utils | `src/lib/utils.ts` | `cn()` — clsx + tailwind-merge helper |

### UI Component Pattern

All UI primitives (`button`, `sidebar`, `menubar`, etc.) use **Base UI React** as the headless base and **CVA (class-variance-authority)** for variant styling. Import the `cn()` utility from `@/lib/utils` for merging Tailwind classes.

### Theming

Dark mode is implemented via CSS custom properties (oklch color space) in `src/index.css`. The `ThemeProvider` applies `.dark` / `.light` classes to `document.documentElement` and syncs with the OS via `prefers-color-scheme`. The `ModeToggle` component in `src/components/provider/theme/mode-toggle.tsx` exposes the light/dark/system switcher.

### Styling conventions

- Always import lucide icons using the `Icon` suffix (e.g. `CheckIcon`, `SunIcon`) to make it obvious the import is an icon.
- Do not add classNames that are already handled by the component's defaults or by a parent component's styling.

### Coding conventions

- Always define function parameters as a single destructured object, with optional params defaulted inline. This keeps call sites stable when new params are added later.
  ```ts
  // Preferred
  function foo({ a, b = "default" }: { a: string; b?: string }): string { ... }

  // Avoid
  function foo(a: string, b = "default"): string { ... }
  ```

- Always define event handlers as named functions before the component's `return`, prefixed with `handle` + the purpose (e.g. `handleSelectFile`, `handleCloseFile`). Never write inline arrow functions directly in JSX event props. This makes intent readable by name without having to read the implementation.
  ```tsx
  // Preferred
  const handleSave = () => save(file);
  return <Button onClick={handleSave}>Save</Button>;

  // Avoid
  return <Button onClick={() => save(file)}>Save</Button>;
  ```

### shadcn Components

The repo uses the shadcn component pattern (`components.json` config present). New shadcn components can be added via the shadcn CLI. See `.agents/skills/shadcn/` for the local skill definition.
