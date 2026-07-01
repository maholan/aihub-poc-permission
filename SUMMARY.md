# ปราญช์ (Pranch) — Executive Summary

> 📂 [📌 **FEATURES** (ไฟล์หลัก)](FEATURES.md) · [VISION](VISION.md) · [ROADMAP](ROADMAP.md) · [PRICING](PRICING.md) · [BRAINSTORM](BRAINSTORM.md)

สรุปภาพรวม **product**. รายละเอียดเต็มใน [FEATURES.md](FEATURES.md).

---

## Product คืออะไร
**ปราญช์** (จาก "ปราชญ์" = ผู้รู้) — enterprise AI knowledge/assistant platform ของ **Maholan**, ขายหลายองค์กร, **on-prem first** (air-gapped, Local Model หลัก; SaaS ตามมา).
ไม่ใช่แค่ RAG chatbot — เป็น **"สมองขององค์กร"**: ใส่ความรู้ทั้งหมดเข้าไป → ถาม/ตอบ/ทำงานด้วย AI อย่างปลอดภัย ตรวจสอบได้ ฉลาดขึ้นเอง.

> **กปน. (การประปานครหลวง) = ลูกค้า anchor รายแรก**, ไม่ใช่นิยาม product. TOR ของ กปน. = ข้อพิสูจน์ว่าเราผ่านมาตรฐาน gov/enterprise โหดสุด → กลายเป็นชุด **Enterprise/Gov compliance** ที่ขายต่อได้ทุกองค์กร.

**Stack:** Qdrant (vector), Minio (object), bge-m3 embedding (512/128), agentic LLM, relational DB. Models: Claude + GPT + Local (BYO ได้).

---

## ตลาด & positioning
- **เป้าหมาย**: **ราชการไทย + enterprise** (รัฐวิสาหกิจ, การเงิน, องค์กรใหญ่) — data sensitive, ห้ามข้อมูลออกนอก
- **Deployment: on-prem ก่อน** (air-gapped, Local Model หลัก) — จุดต่างหลัก ต่างชาติบังคับ cloud เข้าตลาดนี้ไม่ได้
- **คู่แข่ง**: Glean, ChatGPT Enterprise, Notion AI, Copilot — cloud-only / ตั้งค่ายาก / กล่องดำ / ไม่รองรับ gov ไทย
- **ช่องว่าง (blue ocean)**: on-prem + ใช้ง่ายสุด + เชื่อได้ + governance ไทย-gov → ตลาดที่ต่างชาติเข้าไม่ได้เลย

## 4 moat (ลอกไม่ได้)
1. **Zero-config** — โยนไฟล์เข้า ระบบจัด collection/tag/ชั้นความลับ/route model เอง
2. **Glass-box trust** — confidence + citation ถึงประโยค + เตือนเมื่อข้อมูลขัด/ไม่พอ
3. **Self-improving** — knowledge gap report + learning flywheel → ยิ่งใช้ยิ่งฉลาด
4. **🌐 ปราชญ์ Ecosystem** — หน่วยงานแชร์ความรู้ให้ AI กันได้ = network effect (moat ชั้นสุด, ลอกไม่ได้)

**5-minute magic:** ลาก 50 ไฟล์ ไม่กรอกอะไร → จัดให้+เดาชั้นความลับ+เจอไฟล์ขัดกัน → เสนอคำถาม → ตอบพร้อม citation+confidence+ราคา → เด้ง "องค์กรขาดเอกสารเรื่อง X". **คู่แข่งหยุดข้อ 4 เราต่างที่ 1,2,5.**

---

## โครงสร้าง feature (FEATURES.md — 22 section, จัด 5 กลุ่ม)

**A. Foundation (on-prem core)**
- §1 **Platform & Deployment** — on-prem first, air-gap, BYO-model, multi-tenant-ready
- §2 **Auth & Security** — LDAP/AD/SSO, RBAC, guardrail in/out, OWASP, TLS 📋
- §14 **Admin / Monitoring / Audit** — audit log ≥1ปี, dashboard 📋
- §15 **Global** — nav/top bar, global search, ⌘K (Smart Home = หน้า default)

**B. Knowledge & RAG (รับ-เก็บ-ค้น)**
- §3 **Collections** · §4 **Ingest & Processing** (OCR, classification, pipeline) 📋
- §5 **Search & Chat (RAG)** — semantic search, citations, streaming
- §16 🔗 **Connectors** — Slack/Notion/Jira/ServiceNow + live-tap + resolution mining
- §18 📦 **Built-in Knowledge** — packs น้ำ/อากาศ/ข่าว/กฎหมาย (Maholan ดูแล)
- §23 🔄 **Knowledge Ops** — คอนโซลทีมกลาง: ตรวจเจอช่องว่าง → แก้ (เอกสาร/source/prompt/skill/agent) → verify → วัดผล (closed loop)

**C. 🌟 Intelligence & Personalization (moats)**
- §6 **Zero-config** (moat #1) — auto collection/tag/classification
- §7 **Glass-box Trust** (moat #2) — confidence, citation-to-sentence, conflict detect
- §8 **Self-maintaining & Learning** (moat #3) — gap report, capture-to-knowledge, flywheel
- §17 🏠 **Smart Home** — Perplexity-style, behavior-driven (หน้า default)
- §21 🧠 **Personal Memory** — จำตัวตน/บริบทราย user, per-user isolation
- §10 **Persona** — org + personal + adaptive (เรียนรู้จากพฤติกรรม) 📋

**D. AI Engine & Cost**
- §9 **Multi-Model & Routing Policy** — Local+Public, ลับ→Local, เงินหมด→fallback 📋
- §11 **Token & Credit** — เครดิตกลาง ≤500k/ปี, จัดสรร org/dept/user 📋
- §13 **Data Governance & Classification** — model routing ตามชั้นความลับ 📋

**E. Build & Extend (สร้าง-แชร์-ขยาย)**
- §12 📡 **Serve Outward** — Agent REST + ปราญช์-as-MCP-server (Knowledge-as-a-Service) 📋
- §22 🛠️ **Skills** — default + custom + generate จาก knowledge → review
- §20 🧩 **Community Artifacts** — persona/agent/prompt/collection publish/fork/หยิบไปใช้
- §19 🌐 **ปราชญ์ Ecosystem** — federation ข้ามองค์กร (network effect, moat ชั้นสุด)

> **Generate-from-knowledge → review** เป็น pattern ร่วม: §22 skill, §12 agent, §9 tool/Data Service, §8 capture, §10 persona — เลือกความรู้ → AI สังเคราะห์ → user review ก่อนใช้.
> Tag: 🎨 Figma · ✨ ใหม่ · 📋 compliance(TOR) · 🌟 differentiator · Priority `Must`/`Nice`/`Diff` · Phase `P1`/`P2`/`P3`

## ความสามารถเด่นล่าสุด (highlight ประชุม)
- 🏠 **Smart Home เฉพาะฉัน** — หน้า default, dynamic ตามพฤติกรรม (คล้าย Perplexity Discover แต่ดึงสมององค์กร)
- 🔌 **Routing Policy Engine** — auto เลือก model: ไม่ลับ→Public, ลับ→Local (hard rule), budget หมด→fallback Local, โปร่งใสบอกเหตุผล
- 🔗 **Connectors + live-tap** — เกาะ Slack/helpdesk/ticket → resolution mining เป็น knowledge อัตโนมัติ
- 📡 **Serve outward** — ปราญช์เปิดตัวเป็น MCP server + REST agent ให้ระบบ/คนอื่นเสียบใช้ (Knowledge-as-a-Service), governance เดียวคุม
- 🔁 **MCP สองทาง** — ขาเข้า (consume §9) + ขาออก (serve §12B) + marketplace ภายใน (§16)
- 📦 **Built-in Knowledge** — packs (น้ำ/อากาศ/ข่าว/กฎหมาย) ติดมากับ product, คุณค่า day-1, recurring revenue + lock-in (คู่แข่งให้ถังเปล่า)
- 🌐 **ปราชญ์ Ecosystem** — หน่วยงานที่ใช้ปราญช์แชร์ความรู้ข้ามองค์กรให้ AI กันได้ (consent+governance, ปราญช์↔ปราญช์ ผ่าน MCP, trust group, federation marketplace). **moat ชั้นสุด = network effect**; กปน. = node แรก ดึงหน่วยงานน้ำ/รัฐเข้าตาม

## Roadmap (ROADMAP.md)
- **P1 Foundation + governed core (on-prem)**: on-prem/air-gap install + Local Model, auth/RBAC/LDAP, file pipeline, RAG chat, multi-model + **routing policy** (classification/budget fallback), token/credit, MCP consume core, org persona, classification, guardrail, audit + flagship: **Smart Home core**, auto-collection, confidence/citation
- **P2 Extend**: serve outward (agent REST + **ปราญช์-as-MCP-server**), personal persona, approval workflow, **connectors + live-tap/resolution mining**, web research, SaaS multi-tenant + self-serve, edition gating, **Smart Home behavior-feed**, smart layer, flywheel
- **P3 Polish**: ambient (LINE/Teams/voice/⌘K), self-maintaining KB เต็มรูป, embed SDK, MCP marketplace, i18n, mobile

> on-prem first → P1 ตัด multi-tenant SaaS/billing ออก (เลื่อนไป P2); เน้น single-org on-prem ให้ลงได้จริงก่อน

**Build core:** model registry + token ledger + guardrail + classification = **"governed AI call" middleware** ก้อนเดียว, ทุก tenant + Agent reuse.

---

## Compliance = จุดขาย (Enterprise/Gov edition)
Data classification + model routing · guardrail in/out · full audit (≥1yr, replay) · LDAP/AD/SSO · RBAC ทุก resource · TLS/OWASP/rate-limit/STIGs-ready · multi-level persona. → ปิดดีลราชการ/แบงก์ที่ต่างชาติเข้าไม่ได้.

## 3 อันชนะตลาด
🥇 Zero-config ingest ที่เดาถูกจริง · 🥈 Glass-box trust · 🥉 **ปราชญ์ Ecosystem (network effect)** — moat ชั้นสุด

---

## ไฟล์ในโปรเจค
| ไฟล์ | คือ |
|---|---|
| `SUMMARY.md` | ไฟล์นี้ — สรุปผู้บริหาร (เริ่มที่นี่) |
| `VISION.md` | north star + positioning + 11 เสาหลัก + ปรัชญา |
| `FEATURES.md` | feature ทั้งหมด + checkbox/priority/phase + platform + compliance |
| `ROADMAP.md` | phase plan + coverage map + build order |
| `BRAINSTORM.md` | idea pool (divergent) |
| `MWA AI 69_เอกสารแนบ 2 ...md` (~/Downloads) | กปน. TOR — reference compliance ของลูกค้า anchor |

**Figma:** Design `MQSmD9bzILOt4tITLPHC2n` · Board `vUWfVP3lAKvPEKMkiYH2Po` (ออกแบบไว้ช่วง กปน. — ใช้เป็นฐาน UX, ต้องขยายเป็น product)

---

## เคาะแล้ว
- ชื่อ product: **ปราญช์** (romanization Pranch/Prach — รอเคาะตัวสะกดอังกฤษ)
- Deployment: **on-prem first** (air-gap, Local Model หลัก)
- ตลาด: **ราชการไทย + enterprise**

## ค้าง
- romanization ชื่ออังกฤษ ("Pranch"?)
- "ขอบเขตงานที่เคยทำไว้ตอนแรก" — มีไฟล์อื่นอีกไหม? ชี้ path มา cross-check

ถัดไป: เจาะ zero-config / demo pitch / ตารางเทียบคู่แข่ง / business model + pricing / เริ่ม design.
