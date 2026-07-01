# ปราญช์ (Pranch) — Product Vision

> 📂 [📌 **FEATURES** (ไฟล์หลัก)](FEATURES.md) · [SUMMARY](SUMMARY.md) · [ROADMAP](ROADMAP.md) · [PRICING](PRICING.md) · [BRAINSTORM](BRAINSTORM.md)

> **ปราญช์** (จาก "ปราชญ์" = ผู้รู้/นักปราชญ์) = สมองขององค์กร. ทุกองค์กรเอาความรู้ทั้งหมดใส่เข้าไป แล้วถามได้เหมือนคุยกับคนเก่งที่สุดในบริษัท — ใช้ง่ายจนน่าตกใจ ปลอดภัยระดับราชการ และฉลาดขึ้นเองทุกวัน.

**นี่คือ product ของ Maholan** — platform ขายหลายองค์กร. ไม่ใช่งานสั่งทำรายเดียว.
ชื่อสื่อ "ปราชญ์ประจำองค์กร" — โดดเด่น เป็นไทย จำง่าย. (romanization: Pranch / Prach — รอเคาะ)
กปน. (การประปานครหลวง) = ลูกค้า anchor รายแรก + ข้อพิสูจน์ว่าเราผ่านมาตรฐาน gov/enterprise ที่โหดที่สุด (security, audit, ชั้นความลับ, token governance). สิ่งที่ลูกค้าหินที่สุดต้องการ = เป็น feature มาตรฐานของ product เลย.

---

## ตลาด & positioning
- **กลุ่มเป้าหมาย**: **ราชการไทย + enterprise** (รัฐวิสาหกิจ, การเงิน, องค์กรใหญ่) — กลุ่ม data sensitive ที่ "ห้ามข้อมูลออกนอก"
- **Deployment: on-prem ก่อน** (air-gapped ได้, Local Model เป็นหลัก) → SaaS ตามทีหลัง. นี่คือจุดต่างหลัก: ต่างชาติบังคับ cloud, เราลงในองค์กรได้
- **ทำไมชนะ**: คู่แข่ง (Glean, ChatGPT Enterprise, Notion AI, Copilot) = cloud-only / ตั้งค่ายาก / กล่องดำ / ไม่รองรับ gov ไทย. เราเอา **on-prem + ใช้ง่าย + เชื่อได้ + governance ไทย** มาชนกลางหน้า.
- **ทำไม on-prem สำคัญ**: ราชการ/แบงก์ไทยจำนวนมากมีนโยบายห้ามส่งข้อมูลขึ้น cloud ต่างชาติ → ตลาดนี้ต่างชาติเข้าไม่ได้เลย = blue ocean

## 4 moat ที่ลอกไม่ได้
1. **Zero-config** — มันจัดการตัวเอง, ไม่ต้องตั้งค่า
2. **Glass-box trust** — เชื่อ/ตรวจได้ทุกคำตอบ (จุดตายของ AI องค์กร)
3. **Self-improving** — ยิ่งใช้ยิ่งฉลาด = flywheel
4. **🌐 ปราชญ์ Ecosystem** — หน่วยงานที่ใช้ปราญช์แชร์ความรู้ให้ AI กันได้ = **network effect**. moat ชั้นสุดที่ลอกไม่ได้ (3 ตัวบนลอกได้ในที่สุด แต่ ecosystem ที่มีหน่วยงานไทยอยู่แล้ว ลอกไม่ได้). ใครสร้างเครือข่ายก่อนเป็นเจ้าตลาด.

---

## 🌟 The 5-minute magic (เดโมที่ปิดการขาย)
0. เปิดแอป → **Smart Home เฉพาะฉัน** (Perplexity-style): ask-anything bar + การ์ดที่ระบบหยิบมาให้ตามพฤติกรรม
1. ลากไฟล์ 50 ไฟล์เข้า — **ไม่ต้องกรอกอะไร**
2. 30 วิ: "จัดเป็น 6 collection, ติด tag, เดาชั้นความลับ, 3 ไฟล์ลับ→ผูก Local Model อัตโนมัติ, เจอ 2 ไฟล์ขัดกัน" → ยืนยันทีเดียว
3. ขึ้น **"ลองถามนี่สิ"** — คำถามจริงที่ตอบได้จากเอกสารคุณ
4. ถาม → ตอบพร้อม citation คลิกถึงประโยค + เกจมั่นใจ + "ใช้ Public-GPT 0.4 บาท" (ถ้าลับจะขึ้น "ใช้ Local — ข้อมูลไม่ออกนอก")
5. เด้ง: **"องค์กรคุณยังไม่มีเอกสารเรื่อง X ที่คนถามบ่อย — หาให้ไหม?"**

คู่แข่งหยุดข้อ 4. เราต่างที่ 0, 1, 2, 5.

---

## เสาหลัก product (7)

### 1 — Zero-config brain 🌟
ทุก field ที่บังคับกรอก = ความล้มเหลว UX. Auto-everything ingest (เดา collection/tag/classification/chunk/model), self-organizing collections (สร้าง/แตก/รวมเอง), auto-classification ชั้นความลับ + เหตุผล.

### 2 — Glass-box trust 🌟
Confidence meter, citation คลิกถึงประโยค, conflict detection, explainable retrieval ("ทำไมเลือก chunk นี้"), guardrail อธิบายได้, permission simulator.

### 3 — Self-maintaining knowledge 🏆
Knowledge gap report, staleness watch, contradiction sweep, auto-version chain, freshness score. **คลังความรู้ที่มีชีวิต ไม่ใช่ที่เก็บไฟล์ตาย.**

### 4 — Proactive agent 🏆
Watch topics, daily briefing, quota foresight, anomaly watch. **เชิงรุก > ตั้งรับ.**

### 5 — Agentic auto-pilot + Routing Policy 🌟
ถามคำเดียว ระบบเลือกเอง: RAG / Data Service / web / เทียบหลายแหล่ง. Auto-scope.
**Model Routing Policy Engine (config ได้)** = หัวใจ: ไม่ลับ→Public อัตโนมัติ, ลับ→บังคับ Local (hard rule, override ไม่ได้), เงิน/quota หมด→fallback Local (ไม่ล่ม), ง่าย→model เล็ก/ถูก. ทุกคำตอบบอก "ใช้ model ไหน + ทำไม".

### 6 — Ambient + เสียบได้ทุกที่ 🏆
**ทางเข้า**: ฝัง LINE / Teams / เว็บภายใน, voice ไทย, ⌘K command bar, right-click ingest.
**ทางออก (Knowledge-as-a-Service)**: ปราญช์เปิดตัวเป็น **MCP server** + REST agent → AI client ใดก็ได้ (Claude Desktop/Cursor/IDE/ระบบอื่น) เสียบมาใช้ความรู้องค์กร. **สมองเดียว ทุกทางเข้า-ออก, governance เดียวคุมหมด.**

### 6.5 — Connectors: ดูดความรู้จากทุกที่ 🏆
ความรู้องค์กรไม่ได้อยู่แค่ในไฟล์ — อยู่ใน Slack/ticket/wiki/code. ปราญช์ไปเกาะ (MCP-first) แล้วแปลงเป็น knowledge อัตโนมัติ. **Live-tap + resolution mining**: เกาะ IT Helpdesk/Slack → ticket ที่แก้จบ = knowledge เอง → ถามซ้ำตอบเอง = ลดงาน support 50%+ โดยไม่ต้องเขียน KB.

### 6.6 — Built-in Knowledge ติดมากับ product 🏆 (คู่แข่งให้ "ถังเปล่า")
ปราญช์มาพร้อม **knowledge packs ที่ Maholan ดูแล** (ผ่าน MCP) — น้ำ, อากาศ/PM2.5, ข่าว, กฎหมาย/ราชกิจจา, open gov data. ลูกค้าได้คุณค่า **วันแรก** ไม่ต้อง ingest เอง, ผสมกับความรู้องค์กรในคำตอบเดียว. ธุรกิจ: ปิดดีลเร็ว + recurring revenue จาก pack subscription + lock-in.

### 7 — Learning flywheel 🌟🏆
Feedback → eval → ปรับ retrieval/prompt. คำถามฮิต → auto-FAQ. Gap → ingest → loop. **moat ที่ยิ่งใช้ยิ่งห่างคู่แข่ง.**
- **Knowledge Ops cycle** (ทีมกลาง): ตรวจเจอช่องว่าง → แก้ (เอกสาร/source/prompt/skill/agent) → verify → วัดผล. คลังที่ดูแลให้สดเสมอ ไม่ใช่คลังเน่า.

### 7.5 — Generate-from-knowledge 🌟 (pattern เด่น)
เลือกความรู้ก้อนเดียว → AI สังเคราะห์เป็น **skill / agent / tool / collection / persona** → user review ก่อนใช้. ขยาย zero-config จาก "จัดของ" ไปถึง "สร้างเครื่องมือให้". ลดงานสร้างเองมหาศาล.

### 7.6 — Personalization stack 🌟 (ยิ่งใช้ยิ่งเป็นของฉัน)
**Smart Home** (feed) + **Personal Memory** (จำตัวตน/บริบท, per-user, on-prem) + **Adaptive Persona** (สไตล์ที่เรียนรู้เอง) + **flywheel** — กิน signal เดียวกัน. bounded ทุกตัว: ไม่แตะ security/data scope.

### 7.7 — Share & reuse 🌟🏆
**Community Artifacts**: persona/agent/prompt/skill/collection → publish/fork/หยิบไปใช้ (private→team→org→ecosystem→public). governance-gated. เลิกสร้างซ้ำ + best practice กระจายเอง + ต่อ network effect.

---

## เสาหลักที่เพิ่มเพราะเป็น "product" (ไม่ใช่งานสั่งทำ)

### 8 — Multi-tenant platform 🌟
- แยก tenant/org เด็ดขาด (data isolation, ต่อ tenant: model/persona/quota/branding)
- **Self-serve onboarding** — สมัคร→ใช้ได้ใน 5 นาที ไม่ต้องรอ sales
- Org admin จัดการเองได้ทั้งหมด (users, roles, quota, models)

### 9 — On-prem first 🏆 (จุดต่างหลัก)
- **On-prem / air-gapped เป็นอันดับแรก** — ลงในองค์กรได้ ไม่ต้องพึ่ง cloud ต่างชาติ
- **Local Model เต็มรูป** — ตอบโจทย์ "ห้ามส่งเอกสารลับออกนอก" (ตลาดที่ต่างชาติเข้าไม่ได้)
- BYO-model & BYO-key — ลูกค้าเสียบ model/credential ตัวเอง
- **ติดตั้งง่าย** (one-line installer / Docker/K8s package) — on-prem ต้องไม่ปวดหัว
- SaaS / private cloud = option ตามมาทีหลัง

### 10 — White-label & extensibility 🏆
- ปรับ branding ต่อองค์กร (โลโก้/สี/ชื่อ)
- **Agent API + MCP marketplace** — ลูกค้าต่อระบบตัวเอง / แชร์ Data Service ที่อนุมัติแล้ว
- Embed widget / SDK ฝังในแอปลูกค้า

### 11 — Cost & packaging 💰
- Token/credit governance หลายระดับ (org/dept/user) + approval workflow → ขายเป็น tier ได้
- Usage analytics ละเอียด → ลูกค้าเห็นคุณค่า + ต่อสัญญา
- Pricing: per-seat / per-token / enterprise flat — ยืดหยุ่นตาม segment

---

## Compliance = จุดขาย (ได้มาจากโจทย์ กปน. แต่เป็นของทุกคน)
ชุด enterprise-grade ที่ทำให้ปิดดีลราชการ/แบงก์ได้:
- **Data classification + model routing** (เอกสารลับ ✗ Public Model)
- **Guardrail in/out** (prompt injection, leak prevention)
- **Full audit log** (prompt/response/actor/time, ≥1 ปี, replay ได้)
- **Enterprise auth** (LDAP/AD/SSO), RBAC least-privilege ทุก resource
- **Security**: TLS, OWASP Top 10, rate limit, STIGs-ready
- **Multi-level persona** governance

> ขายเป็น **"Enterprise / Gov edition"** — คู่แข่งต่างชาติทำ compliance ไทย/gov ไม่ได้ นี่คือช่องว่างตลาด.

---

## ปรัชญา product (ตัดสินใจทุก feature)
1. ทุกการตั้งค่าที่บังคับ = bug — มี default ฉลาดเสมอ
2. AI มั่วแล้วเงียบ = ทำลายความเชื่อ — โชว์ confidence + ที่มาเสมอ
3. คลังความรู้ต้องมีชีวิต — ไม่ใช่ที่เก็บไฟล์ตาย
4. เชิงรุก > ตั้งรับ
5. governance = จุดขาย ไม่ใช่ภาระ
6. **product ไม่ใช่ project** — ทุกอย่างต้อง multi-tenant, self-serve, scale ได้ ตั้งแต่วันแรก

## ปราชญ์ Ecosystem (วิสัยทัศน์ moat ชั้นสุด) 🌐
หน่วยงานที่ใช้ปราญช์ → **แชร์ความรู้ข้ามองค์กรให้ AI กันได้** (มีสิทธิ์ควบคุม, ปราญช์↔ปราญช์ ผ่าน MCP). Trust group (กระทรวง+สังกัด, กลุ่มน้ำ/รัฐวิสาหกิจ), ask across federation (คำตอบระบุแหล่งองค์กร), ecosystem marketplace (เผยแพร่/ขาย knowledge pack). กปน. = node แรก → ดึงหน่วยงานน้ำ/รัฐเข้าตาม. **ยิ่งหลายองค์กรเข้าร่วม value ยิ่งทบ — คู่แข่งไม่มีเครือข่าย = ไม่มี value นี้.**

## 3 อันที่ถ้าทำได้ ชนะตลาด
🥇 Zero-config ingest ที่ "เดาถูกจริง" · 🥈 Glass-box trust · 🥉 **ปราชญ์ Ecosystem (network effect)**
