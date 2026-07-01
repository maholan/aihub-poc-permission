# ปราญช์ (Pranch) — Pitch (1 หน้า)

> 📂 [FEATURES](FEATURES.md) · [SUMMARY](SUMMARY.md) · [VISION](VISION.md) · [ROADMAP](ROADMAP.md) · [PRICING](PRICING.md)

---

## หนึ่งประโยค
**ปราญช์ = สมองขององค์กร** — ใส่ความรู้ทั้งหมดเข้าไป ถามได้เหมือนคุยกับคนเก่งที่สุดในบริษัท. **On-prem, ปลอดภัยระดับราชการ, ฉลาดขึ้นเองทุกวัน.** (product ของ Maholan, ขายหลายองค์กร)

## ปัญหา
องค์กรไทยมีความรู้กระจัดกระจาย (ไฟล์/Slack/ticket/wiki) + AI ต่างชาติ **บังคับ cloud** → ราชการ/แบงก์ที่ห้ามข้อมูลออกนอก **ใช้ไม่ได้เลย**.

## ทำไมชนะ — 4 moat (คู่แข่งไม่มี)
1. **On-prem first** — ลงในองค์กร, air-gap, Local Model → ตลาด blue ocean ที่ Glean/ChatGPT/Copilot เข้าไม่ได้
2. **Zero-config** — โยนไฟล์เข้า ระบบจัด collection/tag/ชั้นความลับ/route model เอง
3. **Glass-box trust** — ทุกคำตอบมี confidence + citation ถึงประโยค + เตือนเมื่อข้อมูลขัด
4. **🌐 ปราชญ์ Ecosystem** — หน่วยงานแชร์ความรู้ข้ามองค์กรให้ AI กันได้ = **network effect (moat ชั้นสุด ลอกไม่ได้)**

## 🌟 5-Minute Magic (เดโมปิดการขาย)
ลาก 50 ไฟล์ ไม่กรอกอะไร → ระบบจัด 6 collection + เดาชั้นความลับ + ผูกลับ→Local + เจอไฟล์ขัดกัน → เสนอคำถามให้ลอง → ตอบพร้อม citation + เกจมั่นใจ + "ใช้ 0.4 บาท" → เด้ง *"องค์กรขาดเอกสารเรื่อง X — หาให้ไหม?"*
→ **คู่แข่งหยุดข้อ 4 เราต่างที่ทุกข้อ**

## ทำอะไรได้ (23 feature, 5 กลุ่ม)
- **Foundation** — on-prem, LDAP/AD/SSO, RBAC, guardrail, audit
- **Knowledge & RAG** — ingest/OCR, semantic search, connectors (Slack/Jira live-tap), built-in packs (น้ำ/อากาศ/ข่าว)
- **🌟 Intelligence** — zero-config, glass-box, Smart Home (Perplexity-style), Personal Memory, learning flywheel
- **AI Engine** — multi-model + **Routing Policy** (ลับ→Local, เงินหมด→fallback), token/credit, classification
- **Build & Extend** — Agent + ปราญช์-as-MCP-server, Skills, Community Artifacts, Knowledge Ops

> **Pattern เด่น:** เลือกความรู้ → AI สังเคราะห์เป็น skill/agent/tool/persona → user review ก่อนใช้.

## ตลาด & ลูกค้าแรก
ราชการไทย + enterprise (data sensitive). **กปน. = anchor customer** → TOR ผ่านมาตรฐาน gov โหดสุด = ใบเบิกทาง + node แรกของ ecosystem (ดึงหน่วยงานน้ำ/รัฐเข้าตาม).

## เงิน (credit model)
**1 credit = 1 บาท** · `credit = tokens × อัตรา(แยก in/out) × markup`. งบ 500k บาท/ปี = ~575,000 query (mix). **Routing คุมต้นทุน** — คำถามเดียวกัน Flash-Lite vs Fable ต่างกัน 38×. Built-in packs + edition = recurring revenue.

## แผน (Roadmap)
- **P1 On-prem MVP** — deploy/Local Model, auth/RBAC, RAG, routing, Smart Home, zero-config, glass-box, audit
- **P2 Extend** — serve outward (Agent/MCP), connectors+live-tap, Skills, Personal Memory, Knowledge Ops, SaaS, built-in packs
- **P3 Scale** — Ecosystem federation, Community Artifacts marketplace, ambient (LINE/voice), self-maintaining KB

## สรุปจุดขาย
> ลงในองค์กรได้ (on-prem) + ใช้ง่ายสุด (zero-config) + เชื่อได้ (glass-box) + governance ไทย-gov ที่ต่างชาติทำไม่ได้ + ยิ่งหลายองค์กรใช้ยิ่งฉลาดร่วมกัน (ecosystem). **ใครสร้างเครือข่ายก่อน = เจ้าตลาด.**
