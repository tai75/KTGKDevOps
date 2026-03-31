# KTGKDevOps

Du an giua ky DevOps (Local) dap ung cac yeu cau: Backend + Frontend + Database + Docker + Docker Compose + Git + Docker Hub.

## 1. Tinh nang da co

### Backend
- `GET /health` -> `{ "status": "ok" }`
- `GET /api/students` -> lay danh sach sinh vien tu database
- `POST /api/students` -> them sinh vien vao database
- `PUT /api/students/:id` -> cap nhat sinh vien

### Frontend
- Hien thi danh sach sinh vien lay tu backend
- Co form + button de tao du lieu moi
- Trang thong tin ca nhan qua route `/about`

### Database
- Su dung MongoDB container rieng
- Du lieu luu that trong DB, khong hard-code danh sach

### Environment Variables (.env)
- `PORT`
- `DB_URL`
- `DB_HOST`
- `APP_NAME`

## 2. Chay du an bang Docker Compose

### Buoc 1: vao thu muc project
```bash
cd KTGKDevOps
```

### Buoc 2: build va chay
```bash
docker compose up -d --build
```

### Buoc 3: kiem tra
- Frontend: http://localhost:8080
- About page: http://localhost:8080/about
- Health check: http://localhost:8080/health

### Buoc 4: dung he thong
```bash
docker compose down
```

## 3. Yeu cau Git (repo rieng + branch + commit)

Neu ban muon tach thanh repository rieng cho bai thi:

```bash
cd KTGKDevOps
git init
git add .
git commit -m "chore: initialize KTGKDevOps project"
git branch develop
git checkout develop
git checkout -b feature/student-api
```

### Goi y toi thieu 5 commit ro rang
1. `chore: initialize backend express and env config`
2. `feat: add health check and student APIs with mongodb`
3. `feat: add frontend pages and student form interaction`
4. `chore: add dockerfiles and compose stack`
5. `docs: add setup guide and submission checklist`

Branch toi thieu:
- `main` (hoac `master`)
- `develop`
- `feature/student-api` (hoac ten feature bat ky)

## 4. Docker Hub (build + push)

Thay `YOUR_DOCKERHUB_USERNAME` bang tai khoan cua ban:

```bash
docker build -t YOUR_DOCKERHUB_USERNAME/ktgkdevops-backend:latest ./backend
docker build -t YOUR_DOCKERHUB_USERNAME/ktgkdevops-frontend:latest ./frontend

docker login
docker push YOUR_DOCKERHUB_USERNAME/ktgkdevops-backend:latest
docker push YOUR_DOCKERHUB_USERNAME/ktgkdevops-frontend:latest
```

## 5. Checklist nop bai

- [ ] Chay duoc toan bo he thong bang `docker compose up -d --build`
- [ ] Co route `/about` hien thi ho ten, MSSV, lop
- [ ] Co anh chup man hinh trang `/about` khi app dang chay
- [ ] `GET /health` tra ve `{ "status": "ok" }`
- [ ] Co su dung `.env` voi `PORT`, `DB_URL/DB_HOST`, `APP_NAME`
- [ ] Co toi thieu 5 commit message ro rang
- [ ] Co it nhat 3 branch (`main/master`, `develop`, `feature`)
- [ ] Push image backend + frontend len Docker Hub
