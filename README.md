# ปราญช์ (Pranch) — AI Knowledge Platform (by Maholan)

เอกสารแนวทาง + PoC ระบบสิทธิ์ สำหรับทีมออกแบบ DB / UI-UX

## 🔗 ดู PoC ผ่านเว็บ
- **PoC ระบบสิทธิ์ (interactive):** _(GitHub Pages — จะขึ้นหลัง deploy)_ `https://<org>.github.io/<repo>/`
- **Artifact สรุปแนวทาง (นำเสนอ):** https://claude.ai/code/artifact/056f103a-0bad-4123-a8be-47c5ecb8ff24

## 📄 เอกสาร (อ่านตามลำดับ)
| ไฟล์ | คือ |
|---|---|
| [SUMMARY.md](SUMMARY.md) | สรุปผู้บริหาร (เริ่มที่นี่) |
| [VISION.md](VISION.md) | วิสัยทัศน์ + positioning + moats |
| [FEATURES.md](FEATURES.md) | ฟีเจอร์ทั้งหมด (23 หมวด) + tag priority/phase |
| [ROADMAP.md](ROADMAP.md) | แผน P1/P2/P3 + coverage |
| [PERMISSIONS.md](PERMISSIONS.md) | **โมเดลสิทธิ์ ABAC** (2 แกน, tree, exception, config surface) |
| [PRICING.md](PRICING.md) | credit model + ตัวอย่างคำนวณ |
| [PITCH.md](PITCH.md) | สรุป 1 หน้า |

## 🧭 ทีมออกแบบดูอะไร
- **DB / data model** → `poc/src/data/model.ts` (draft schema: users, roles, units, groups, domains, actions, collections=tree, node_access) + `poc/src/lib/access.ts` (ตรรกะสิทธิ์)
- **UI / UX** → PoC 3 หน้า: ผู้ใช้ · สิทธิ์&บทบาท · Collections (tree) — flow สำหรับทำ hi-fi ต่อ
- **กฎ/นโยบาย** → `PERMISSIONS.md`

## 💻 รัน PoC ในเครื่อง
```bash
cd poc
npm install
npm run dev      # เปิด http://localhost:5173
```

## Stack
- PoC: Vite + React + TypeScript (client-only mockup, ไม่มี backend)
- Product จริง (แผน): on-prem, Qdrant + Minio + bge-m3 + LLM (Claude/GPT/Local)
