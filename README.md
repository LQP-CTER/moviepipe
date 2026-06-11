# MoviePipe

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat&logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

**MoviePipe** là một nền tảng khám phá phim hiện đại với giao diện 3D immersive, kết hợp giữa backend API mạnh mẽ và frontend trực quan. Dự án giúp người dùng dễ dàng tìm kiếm, khám phá phim đang chiếu, xu hướng và thông tin chi tiết từ cơ sở dữ liệu TMDB.

---

## Tổng quan

MoviePipe bao gồm 2 phần chính:

- **Backend API** (`/`): Cinema Data Aggregation API xây dựng bằng TypeScript + Express, deploy trên Vercel Serverless. Cung cấp dữ liệu phim đã được chuẩn hóa từ TMDB.
- **Frontend** (`/frontend`): Giao diện web 3D hiện đại xây dựng bằng React + Vite + Three.js, không sử dụng icon, tập trung vào trải nghiệm người dùng với hiệu ứng 3D, glass morphism và animations mượt mà.

---

## Tính năng

### Backend API
- Phim đang chiếu với phân loại điểm số (high/mid/low)
- Tìm kiếm phim theo từ khóa
- Phim trending theo ngày/tuần
- Pure-function transformer layer cho dữ liệu chuẩn hóa
- Zero-config Vercel Serverless deployment

### Frontend 3D
- Background 3D với floating spheres và particle field
- Movie Cards với 3D tilt effect theo chuột
- Glass morphism design với gradient effects
- Dark theme chuyên nghiệp
- Responsive design cho mọi thiết bị
- Animations mượt mà (fade-in, float, shimmer, glow)
- Tìm kiếm real-time
- Không sử dụng icon, tập trung vào typography và visual effects

---

## Cấu trúc dự án

```
moviepipe/
├── src/                    # Backend API source code
│   ├── routes/
│   │   ├── movies.ts       # Route handlers cho /api/movies/*
│   │   └── trending.ts     # Route handler cho /api/trending
│   ├── services/
│   │   └── tmdb.ts         # TMDB API client (axios)
│   ├── transformers/
│   │   └── movie.ts        # Pure transformation functions
│   ├── types/
│   │   └── index.ts        # TypeScript interfaces
│   └── app.ts              # Express app setup
├── api/
│   └── index.ts            # Vercel serverless entry point
├── frontend/               # Frontend 3D web application
│   ├── src/
│   │   ├── api/            # API client functions
│   │   ├── components/     # React components
│   │   │   ├── Background3D.tsx   # 3D background scene
│   │   │   ├── Header.tsx         # Navigation header
│   │   │   ├── HeroBanner.tsx     # Hero section
│   │   │   ├── MovieCard.tsx      # 3D movie card
│   │   │   ├── MovieGrid.tsx      # Movie grid layout
│   │   │   └── Scene3D.tsx        # Three.js scene
│   │   ├── types/          # TypeScript type definitions
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   └── ...
└── README.md
```

---

## API Endpoints

### `GET /api/health`
Kiểm tra trạng thái service.

```json
{
  "status": "ok",
  "timestamp": "2026-06-11T10:00:00.000Z",
  "version": "1.0.0"
}
```

---

### `GET /api/movies/now-playing`
Trả về danh sách phim đang chiếu với phân loại điểm số.

```json
[
  {
    "id": 12345,
    "title": "Example Movie",
    "overview": "A short description...",
    "release_date": "2026-05-20",
    "vote_average": 7.8,
    "score_tier": "high",
    "poster_url": "https://image.tmdb.org/t/p/w500/abc123.jpg",
    "genre_ids": [28, 12]
  }
]
```

**Score tier logic:**
| Tier | Condition |
|------|-----------|
| `high` | `vote_average >= 7.5` |
| `mid` | `vote_average >= 6.0` |
| `low` | `vote_average < 6.0` |

---

### `GET /api/movies/search?q={query}`
Tìm kiếm phim theo từ khóa.

**Query params:**
- `q` *(required)* — từ khóa tìm kiếm

**Error (400):**
```json
{ "error": "query param q is required" }
```

---

### `GET /api/trending?window=day|week`
Trả về top 10 phim trending.

**Query params:**
- `window` — `day` hoặc `week` (mặc định: `week`)

```json
[
  {
    "rank": 1,
    "id": 67890,
    "title": "Trending Movie",
    "vote_average": 8.1,
    "score_tier": "high",
    ...
  }
]
```

---

## Cài đặt và chạy

### Backend API

**1. Clone và cài đặt dependencies**
```bash
git clone https://github.com/LQP-CTER/moviepipe.git
cd moviepipe
npm install
```

**2. Cấu hình environment**
```bash
cp .env.example .env
```

Thêm TMDB API key vào `.env`:
```
TMDB_API_KEY=your_key_here
```

> Lấy API key miễn phí tại [themoviedb.org](https://www.themoviedb.org/settings/api)

**3. Chạy dev server**
```bash
npm run dev
```

Server chạy tại `http://localhost:3000`

### Frontend 3D

**1. Cài đặt dependencies**
```bash
cd frontend
npm install
```

**2. Chạy dev server**
```bash
npm run dev
```

Frontend chạy tại `http://localhost:5173` và tự động proxy API calls đến backend port 3000.

---

## Deploy lên Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/LQP-CTER/moviepipe)

Hoặc qua CLI:
```bash
npm i -g vercel
vercel
```

Đặt `TMDB_API_KEY` trong Environment Variables của Vercel project.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Chạy backend dev server với ts-node |
| `npm run build` | Compile TypeScript |
| `npm start` | Chạy compiled output |
| `npm run typecheck` | Type-check without emitting |
| `cd frontend && npm run dev` | Chạy frontend dev server |
| `cd frontend && npm run build` | Build frontend production |

---

## Tech Stack

### Backend
- **Language:** TypeScript (strict mode)
- **Runtime:** Node.js
- **Framework:** Express.js
- **HTTP Client:** axios
- **Data Source:** [TMDB API](https://developers.themoviedb.org/3)
- **Deployment:** Vercel Serverless Functions

### Frontend
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS v4
- **3D Rendering:** Three.js + React Three Fiber + Drei
- **HTTP Client:** axios
- **UI Components:** Custom components (không dùng icon libraries)

---

## License

MIT
