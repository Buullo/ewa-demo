# รัน EWA Demo (port 8085)

## วิธีที่ 1: ใช้ Python (ไม่ต้องมี Node ใหม่)

ใน Terminal รัน:

```bash
cd /Users/khunat/Downloads/ewa-demo-run
python3 -m http.server 8085
```

แล้วเปิดเบราว์เซอร์ไปที่:

**http://localhost:8085/index-standalone.html**

## วิธีที่ 2: ใช้ Vite (ต้องใช้ Node 18 ขึ้นไป)

ถ้าติดตั้ง Node 18+ แล้ว:

```bash
cd /Users/khunat/Downloads/ewa-demo-run
# กู้คืน App.jsx แบบมี import/export แล้ว
npm install
npm run dev
```

แล้วเปิด **http://localhost:8085**

---

หมายเหตุ: ตอนนี้โฟลเดอร์นี้ตั้งค่าให้รันแบบ standalone (React + Babel จาก CDN) เพื่อให้ใช้ได้กับ Node 12
