# วิธี Deploy Demo นี้

Build ก่อนทุกครั้ง:
```bash
npm run build
```
ผลลัพธ์จะอยู่ที่โฟลเดอร์ `dist/`

---

## ตัวเลือกการ Deploy

### 1. Vercel (แนะนำ – ฟรี ไม่ต้องตั้งค่า)
- สมัครที่ [vercel.com](https://vercel.com)
- อัปโหลดโปรเจกต์ (ลากโฟลเดอร์หรือเชื่อม GitHub)
- Vercel รู้จัก Vite อัตโนมัติ ไม่ต้องตั้งค่าเพิ่ม
- ได้ลิงก์เช่น `https://ewa-demo-run-xxx.vercel.app`

### 2. Netlify (ฟรี)
- สมัครที่ [netlify.com](https://netlify.com)
- วิธีง่าย: ไปที่ **Sites → Add new site → Deploy manually** แล้วลากโฟลเดอร์ `dist/` (หลังรัน `npm run build`) ใส่ในช่อง drag & drop
- หรือเชื่อม GitHub แล้วตั้ง Build command: `npm run build`, Publish directory: `dist`

### 3. GitHub Pages (ฟรี ถ้ามี repo บน GitHub)
- Push โค้ดขึ้น GitHub
- ไปที่ repo → **Settings → Pages** → Source เลือก **GitHub Actions** หรือ **Deploy from a branch**
- ถ้าใช้ branch: เลือก branch ที่มีผล build แล้วตั้ง root เป็น `/` หรือโฟลเดอร์ที่เก็บ `dist/`
- ถ้า deploy จาก branch ที่มีแค่ `dist/`: ตั้ง branch นั้นเป็น source และ root เป็น `/`

### 4. Cloudflare Pages (ฟรี)
- สมัครที่ [pages.cloudflare.com](https://pages.cloudflare.com)
- เชื่อม GitHub หรืออัปโหลดโฟลเดอร์ `dist/`
- Build command: `npm run build`, Build output directory: `dist`

### 5. รันบนเซิร์ฟเวอร์เอง (VPS / VM)
- บนเครื่องเซิร์ฟเวอร์: `git clone ...` แล้วรัน `npm install` และ `npm run build`
- ใช้เว็บเซิร์ฟเวอร์ (เช่น Nginx, Caddy) ชี้ root ไปที่โฟลเดอร์ `dist/`
- หรือรัน `./serve.sh` (ใช้ Python) ที่โฟลเดอร์ `dist/` ก็ได้ ถ้าไม่ต้องการตั้ง Nginx

### 6. Azure Static Web Apps
- ถ้าใช้ Azure อยู่แล้ว: สร้าง Static Web App แล้วเชื่อมกับ GitHub หรืออัปโหลดจาก `dist/`
- Build command: `npm run build`, Output location: `dist`

---

## สรุปสั้นๆ
| วิธี           | ความง่าย | ฟรี | เหมาะกับ                    |
|----------------|----------|-----|-----------------------------|
| Vercel         | ⭐⭐⭐     | ✅  | Demo / ใช้เร็ว              |
| Netlify        | ⭐⭐⭐     | ✅  | Demo / ลากวาง dist          |
| GitHub Pages   | ⭐⭐      | ✅  | มี repo GitHub อยู่แล้ว     |
| Cloudflare     | ⭐⭐      | ✅  | เน้นความเร็ว CDN            |
| VPS + Nginx    | ⭐       | ขึ้นกับโฮสต์ | ควบคุมเซิร์ฟเวอร์เอง |
