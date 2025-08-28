# BOB-EAT

<div align="center">
  <img src="public/gryffindor.jpg" alt="Gryffindor Logo" width="200"/>
  <h2>Welcome to the Gryffindor repository!</h2>
</div>



## 🔧 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **State Management**: Zustand, Tanstack Query v5
- **Styling**: Tailwind CSS
- **Architecture**: Feature-Sliced Design (FSD)
- **Lint/Formatter**: Biome
- **Utils**: Husky

## 🚀 Getting Started

### Installation

```bash
pnpm install
```

### Development Server

```bash
pnpm dev
```

## 📋 FSD Layer Rules

### 1. Import Rules

Each layer can only import from layers below it:

```
app → pages → widgets → features → entities → shared
```

### 2. Export Patterns

#### Shared Layer
Export by segments individually:
```typescript
// ✅ Recommended
import { Button, Modal } from '@/shared/ui'
import { formatDate, debounce } from '@/shared/lib'
import { httpClient } from '@/shared/api'

// ❌ Avoid
import { Button, formatDate, httpClient } from '@/shared'
```

#### Features & Entities Layer
Public API pattern:
```typescript
// features/auth/index.ts
export { LoginForm, SignupForm } from './ui'
export { useAuthStore } from './model'
export { authApi } from './api'
```

### 3. State Management Location

#### Global State (`app/store`)
- Authentication state
- App settings (theme, language)
- Global UI state (modal, toast)

#### Feature State (`features/*/model`)
- Page-specific form state
- Filter and search state
- Feature-specific temporary data

#### Entity State (`entities/*/model`)
- Server data cache
- Domain object state