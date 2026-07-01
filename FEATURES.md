# ปราญช์ (Pranch) — Feature List

> 📌 **ไฟล์หลัก (single source of truth).** อื่นๆ: [SUMMARY](SUMMARY.md) ภาพรวมผู้บริหาร · [VISION](VISION.md) วิสัยทัศน์/positioning · [ROADMAP](ROADMAP.md) phase+coverage · [PRICING](PRICING.md) credit model · [PERMISSIONS](PERMISSIONS.md) สิทธิ์ ABAC 2 แกน · [PITCH](PITCH.md) 1 หน้า · [BRAINSTORM](BRAINSTORM.md) idea pool (historical)

Product ของ **Maholan** — สมองขององค์กร. **On-prem first** · ตลาด **ราชการไทย + enterprise** · ขายหลายองค์กร.
กปน. = ลูกค้า anchor; TOR ของมัน = ชุด Enterprise/Gov compliance ที่ขายต่อได้ (§15).

**Legend** — Priority: `Must` · `Nice` · `Diff` (moat/จุดขาย) | Phase: `P1` MVP · `P2` · `P3` | Src: 🎨 Figma · ✨ ใหม่ · 📋 compliance · 🌟 differentiator

> 🌟 = 3 moat: **Zero-config · Glass-box trust · Self-improving**. ดู `VISION.md` / `SUMMARY.md`.

---

## 1. Platform & Deployment 🏢 (on-prem first = จุดต่างหลัก)
- [ ] **On-prem install** — Docker/K8s package, one-line installer · `Must` · `P1` · ✨
- [ ] **Air-gapped mode** — ไม่มี internet, Local Model ล้วน · `Diff` · `P1` · 🌟
- [ ] **Local Model เต็มรูป** — self-hosted LLM + embedding (ห้ามข้อมูลออกนอก) · `Must` · `P1` · ✨
- [ ] **BYO-model / BYO-key** — เสียบ model/credential เอง · `Must` · `P1` · ✨
- [ ] **Org admin console** — จัดการ users/roles/quota/models เอง · `Must` · `P1` · 🎨
- [ ] **Tenant-ready data model** — ออกแบบเผื่อ multi-tenant ตั้งแต่แรก (แม้ P1 = single-org) · `Must` · `P1` · ✨
- [ ] **SaaS multi-tenant** — option ตามมา · `Must` · `P2` · ✨
- [ ] **Self-serve onboarding** — สมัคร→ใช้ใน 5 นาที · `Diff` · `P2` · 🌟
- [ ] **White-label branding** (โลโก้/สี/โดเมน) · `Nice` · `P2` · ✨
- [ ] **Pricing tiers + usage metering + billing** · `Must` · `P2` · ✨
- [ ] **Edition gating** (Free/Pro/Enterprise/Gov) · `Must` · `P2` · ✨
- [ ] **Embed widget / SDK** ฝังแอปลูกค้า · `Diff` · `P3` · 🌟

## 2. Auth & Security 🔒 (📋 gov-grade = จุดขาย)
- [ ] **Login** + session + error states · `Must` · `P1` · 🎨
- [ ] **Enterprise auth: LDAP / AD / SSO** (SAML/OIDC) · `Must` · `P1` · 📋 (3.3.4.1)
- [ ] **MFA / forced password change** · `Must` · `P1` · 🎨
- [ ] **RBAC / ABAC** — สิทธิ์ผูก **ตำแหน่ง+หน่วยงาน** (ไม่ใช่ตัวคน), least-privilege, ครอบทุก resource. ดู [PERMISSIONS.md](PERMISSIONS.md) · `Must` · `P1` · 📋 (3.3.4.2, 3.3.5)
- [ ] **Org-chart binding** — sync HR/AD → โยกย้าย/เลื่อนระดับ สิทธิ์ปรับอัตโนมัติ + ตำแหน่งชั่วคราว (ช่วยราชการ, time-boxed) · `Must` · `P2` · ✨
- [ ] **Feature rights** — View/Chat/Edit/Connector × กลุ่ม (Officer/Executive) + sub-groups (HR/Design) · `Must` · `P1` · 📋(3.3.5)
- [ ] **TLS ≥1.2** data-in-transit · `Must` · `P1` · 📋 (3.3.4.3)
- [ ] **OWASP Top 10** (SQLi/XSS/CSRF) + rate limiting · `Must` · `P1` · 📋 (3.3.7)
- [ ] **Guardrail input** — block prompt injection / secret requests / policy breach · `Must` · `P1` · 📋 (3.3.6.1)
- [ ] **Guardrail output** — filter leak ข้อมูลที่ไม่มีสิทธิ์ · `Must` · `P1` · 📋 (3.3.6.2)
- [ ] **Guardrail อธิบายได้** — block + เหตุผล + วิธีถามใหม่ · `Diff` · `P1` · 🌟
- [ ] **STIGs/DISA-ready** + vuln fix SLA ≤5 วัน · `Must` · `P2` · 📋 (3.3.2)

## 3. Knowledge / Collections 📚
- [ ] **Collections list + table** (name/desc/doc count/updated) · `Must` · `P1` · 🎨
- [ ] **Create collection** + validation · `Must` · `P1` · 🎨
- [ ] **Collection detail tabs** — Documents / Permissions / Chunk Preview / Policies · `Must` · `P1` · 🎨
- [ ] **Documents table** (title/type/source/tags/status/actions) · `Must` · `P1` · 🎨
- [ ] **Permissions matrix** (Owner/Editor/Viewer) · `Must` · `P2` · 🎨
- [ ] **Collection policies** (chunk rule, retention, allow-internet toggle) · `Should` · `P2` · 🎨
- [ ] **Sub-collections** (nested) · `Should` · `P2` · 🎨
- [ ] **Bulk doc actions** (re-embed/move/delete/tag) · `Nice` · `P2` · ✨

## 4. Ingest & Processing 📥 (📋 3.2 File Management)
- [ ] **Upload PDF / DOCX / TXT** (min) · `Must` · `P1` · 📋 (3.2.1)
- [ ] **Ingest wizard** (source → content → collection/tags/metadata → options → review) · `Must` · `P1` · 🎨
- [ ] **OCR สำหรับสแกน/ไม่มี text layer** + user review ก่อน save · `Must` · `P1` · 📋 (3.2.2)
- [ ] **Metadata form** — title, owner dept, **ชั้นความลับ**, keywords · `Must` · `P1` · 📋 (3.2.4)
- [ ] **Processing status pipeline** (Upload→Parse→Chunk→Embed→Index) · `Must` · `P1` · 📋 (3.2.3)
- [ ] **Max 100MB/upload** + reject+warn · `Must` · `P1` · 📋 (3.2.9)
- [ ] **Success/failure screens** + retry · `Must` · `P1` · 🎨
- [ ] **Chunking** (TokenTextSplitter, bge-m3, 512/128) · `Must` · `P1` · 🎨
- [ ] **Vector insert** (Qdrant) + Minio object store · `Must` · `P1` · 🎨
- [ ] **Document state machine** (CREATED→...→READY→ARCHIVED/DELETED) · `Must` · `P1` · 🎨
- [ ] **Job state machine** (QUEUED→RUNNING→SUCCEEDED/FAILED/CANCELED) + retries · `Must` · `P1` · 🎨
- [ ] **Async job queue + workers** · `Must` · `P1` · ✨
- [ ] **Image → OCR/LLM description → embed** (multimodal) · `Should` · `P2` · 🎨
- [ ] **Table → LLM description → embed** · `Should` · `P2` · 🎨
- [ ] **Chunk dedup** (cosine ≥0.8 → ignore) · `Should` · `P2` · 🎨
- [ ] **Delete/change doc → AI หยุดอ้างของที่ลบ** · `Must` · `P1` · 📋 (3.2.7)

## 5. Search & Chat (RAG) 💬
- [ ] **Semantic search** เนื้อหา + metadata · `Must` · `P1` · 📋 (3.2.5)
- [ ] **Per-file RBAC** — เอกสารลับกว่าไม่โผล่ใน search/citation ของคนไม่มีสิทธิ์ · `Must` · `P1` · 📋 (3.2.6)
- [ ] **Chat layout** (conversation list / chat / retrieved sources) · `Must` · `P1` · 🎨
- [ ] **RAG controls** (collection select, rerank, answer style, temperature) · `Must` · `P1` · 🎨
- [ ] **Answer + citations + chunk cards** · `Must` · `P1` · 🎨
- [ ] **Chat history** (chat_id/q/a) · `Must` · `P1` · 🎨
- [ ] **Tool calling: Specific vs Overview** routing · `Should` · `P2` · 🎨
- [ ] **Overview path** (batch → LLM summary, recursive) · `Should` · `P2` · 🎨
- [ ] **Streaming responses** · `Should` · `P1` · ✨
- [ ] **Debug view** (query rewrite, chunk IDs, tokens, latency) · `Nice` · `P2` · 🎨

## 6. 🌟 Smart Assist / Zero-config (moat #1)
- [ ] **Auto-everything ingest** — เดา collection/tag/classification/chunk/model, ยืนยันทีเดียว · `Diff` · `P1`
- [ ] **Suggest create collection** — ไม่มีอันที่ fit → เสนอใหม่ + ตั้งชื่อ/desc อัตโนมัติ · `Diff` · `P1`
- [ ] **Auto-route to existing collection** + confidence % · `Diff` · `P1`
- [ ] **Auto-classification ชั้นความลับ** + เหตุผล → admin review · `Diff` · `P1`
- [ ] **Smart defaults ทุก field** (ไม่บังคับกรอก) · `Diff` · `P1`
- [ ] **Auto-tag / auto-metadata** · `Should` · `P2`
- [ ] **Duplicate warning at ingest** · `Should` · `P2`
- [ ] **Self-organizing collections** (สร้าง/แตก/รวมเอง) · `Diff` · `P2`
- [ ] **Bulk drop → cluster preview** · `Nice` · `P3`

## 7. 🌟 Glass-box Trust (moat #2)
- [ ] **Confidence meter** ทุกคำตอบ + เตือน retrieval อ่อน · `Diff` · `P1`
- [ ] **Citation คลิกถึงประโยค** ในต้นทาง · `Diff` · `P1`
- [ ] **Explainable retrieval** (ทำไมเลือก chunk นี้) · `Diff` · `P2`
- [ ] **Conflict detection** (เอกสารขัดกัน → โชว์ทั้งคู่) · `Diff` · `P2`
- [ ] **Permission simulator** (admin จำลองมุม user) · `Diff` · `P2`
- [ ] **Source-confidence indicator** · `Should` · `P2`
- [ ] **Empty-result fallback** (เสนอ web/ingest/rephrase) · `Should` · `P2`

## 8. 🌟 Self-maintaining & Learning (moat #3) 🏆
- [ ] **Capture-to-knowledge (in-chat)** — AI ดึงข้อมูลนอก (web/Data Service) ตอบในแชท → เด้งถาม "เก็บเข้า knowledge ไหม?" → ยืนยัน → auto-ingest (เดา collection/tag/ชั้นความลับ). ต้องมี: provenance (URL/วันที่ + flag external-unverified), RBAC (ลับห้ามจาก external), dedup, review queue (external → pending → approve, optional) · `Diff` · `P2`
- [ ] **Knowledge gap report** — ตอบไม่ได้บ่อย → เสนอ ingest · `Diff` · `P2`
- [ ] **Feedback 👍👎 → eval → ปรับ retrieval/prompt** · `Diff` · `P2`
- [ ] **Auto-version chain** (ใหม่ทับเก่า, อ้างล่าสุด) · `Diff` · `P2`
- [ ] **Staleness watch** · `Diff` · `P3`
- [ ] **Contradiction sweep** · `Diff` · `P3`
- [ ] **คำถามฮิต → auto-FAQ/pin** · `Diff` · `P3`
- [ ] **Collection freshness score** · `Nice` · `P3`

## 9. Multi-Model & Routing Policy 🔌

### Model registry
- [ ] **Multi-model: Local + Public (paid)** — Claude/GPT + self-hosted · `Must` · `P1` · 📋 (3.5.1)
- [ ] **Model CRUD UI** (name/provider/model-id/endpoint/credential) · `Must` · `P1` · 📋 (3.5.2-3)
- [ ] **ใส่ token/credential Public model** + encrypted (ไม่โผล่ UI/log/response) · `Must` · `P1` · 📋 (3.5.5)
- [ ] **Model RBAC** + assign org/dept/user ใช้ model ไหน · `Must` · `P1` · 📋 (3.5.4)
- [ ] **Cost calc per request** (in/out token แยก) · `Must` · `P1` · 📋 (3.5.6)

### 🌟 Routing Policy Engine (config ได้ = หัวใจ)
ระบบเลือก model อัตโนมัติตาม **กฎที่ config ได้** — user ไม่ต้องเลือกเอง.
- [ ] **Classification-based routing** — ไม่ติด tag ลับ → ใช้ Public ได้อัตโนมัติ; ติดลับ → **บังคับ Private/Local** · `Diff` · `P1` · 🌟 📋(3.9.2)
- [ ] **Hard security rule** — เอกสารลับ **ห้าม** ออก Public ไม่ว่ากรณีใด (override ไม่ได้) · `Must` · `P1` · 📋(3.9.2)
- [ ] **Budget-exhaustion fallback** — เงิน/quota Public หมด → fallback ไป Local อัตโนมัติ (ใช้งานต่อได้ ไม่ล่ม) · `Diff` · `P1` · 🌟
- [ ] **Cost/complexity tier** — คำถามง่าย → model เล็ก/ถูก; ยาก → ใหญ่ · `Diff` · `P2` · 🌟
- [ ] **Fallback chain** — กำหนดลำดับ เช่น `Public-GPT → Public-Claude → Local`; ตัวไหนล่ม/หมดเงิน → ตัวถัดไป · `Diff` · `P2` · 🌟
- [ ] **Routing rule builder (admin UI)** — เงื่อนไข: classification × cost × dept × task type → model · `Diff` · `P2` · 🌟
- [ ] **Routing transparency** — ทุกคำตอบบอก "ใช้ model ไหน + ทำไม" (ลับ→Local / เงินหมด→fallback) · `Diff` · `P1` · 🌟
- [ ] **Routing simulator** — admin ทดสอบกฎก่อนใช้จริง (เอกสารแบบนี้→model ไหน) · `Nice` · `P2` · 🌟
- [ ] **Per-dept/user model policy** — กำหนดได้ว่าใครใช้ Public ได้ ใครเฉพาะ Local · `Should` · `P2` · 📋(3.5.4)

### MCP / Data Service
- [ ] **MCP / Data Service list** (≤15, auto-fetch) · `Must` · `P1` · 📋 (3.1.1)
- [ ] **Data Service CRUD UI** (name/desc/params/required) · `Must` · `P1` · 📋 (3.1.2-3)
- [ ] **🌟 Generate tool/Data Service** — จาก API doc / DB schema / knowledge → AI ร่าง params/desc → user review → ใช้ · `Diff` · `P2`
- [ ] **Data Service RBAC + log + timeout + HTTPS/token auth** · `Must` · `P1` · 📋 (3.1.4-7)
- [ ] **Auto tool-use** (เลือก RAG/Data Service/web เอง) · `Diff` · `P2` · 🌟
- [ ] **MCP marketplace ภายใน** · `Diff` · `P3` · 🌟

## 10. Persona 🎭 (📋 3.4)
- [ ] **Org Persona** (admin-only, locked, non-overridable) · `Must` · `P1` · 📋 (3.4.1.1)
- [ ] **Persona validation** (reject injection/escalation) · `Must` · `P1` · 📋 (3.4.3)
- [ ] **Persona affects tone only** (ไม่แตะ security/access) · `Must` · `P1` · 📋 (3.4.2)
- [ ] **Persona log** (create/edit/delete) · `Must` · `P1` · 📋 (3.4.6)
- [ ] **Personal Persona** (bounded by org) · `Must` · `P2` · 📋 (3.4.1.2)
- [ ] **Persona preview** (ตัวอย่างก่อน/หลัง) · `Diff` · `P2` · 🌟
- [ ] **🌟 Adaptive persona** — เรียนรู้จากพฤติกรรม (ชอบตอบสั้น/ทางการ/ภาษา/รูปแบบ) → สรุป → **เสนออัพเดต personal persona → user ยืนยัน** (ผูก §17 signals + §21 memory + §8 flywheel) · `Diff` · `P3`
  - bounded เหมือนเดิม: แตะแค่สไตล์ ไม่แตะ security/scope (📋 3.4.2); personal เท่านั้น; review ก่อน apply

## 11. Token & Credit 💰 (📋 3.6)
- [ ] **Token ledger** — per-model in/out rate, cap งบ/ปี · `Must` · `P1` · 📋 (3.6.1)
- [ ] **Quota allocation** org/dept/user (monthly, ≤parent) · `Must` · `P1` · 📋 (3.6.2)
- [ ] **80% usage alert** · `Must` · `P1` · 📋 (3.6.3)
- [ ] **Usage reports** session/user/dept × model · `Must` · `P1` · 📋 (3.6.6)
- [ ] **Cost calc per request** (separate in/out token) · `Must` · `P1` · 📋 (3.5.6)
- [ ] **Cost-before-send** (โชว์ราคาก่อนยิง) · `Diff` · `P2` · 🌟
- [ ] **Quota foresight** (พยากรณ์วันหมด) · `Diff` · `P2` · 🌟
- [ ] **Top-up + approval workflow** · `Must` · `P2` · 📋 (3.6.4)
- [ ] **Billing cycle + summary** · `Must` · `P2` · 📋 (3.6.5)
- [ ] **Answer cache** (ซ้ำ→ไม่เผา token) · `Nice` · `P3` · 🌟

## 12. Serve Outward — Agents + Knowledge-as-a-Service 🤖📡

ปราญช์ไม่ใช่แค่ "ที่ให้คนเข้ามาถาม" — แต่ **ให้บริการข้อมูล/ความรู้ออกไปข้างนอก** 2 ทาง: (A) Agent ผ่าน REST API, (B) เปิดตัวเองเป็น **MCP server** ให้ระบบ/คนอื่นเสียบใช้.

### A. Agent (REST API) — 📋 3.7
- [ ] **Agent CRUD** (name/scope/persona/allowed data services) — admin only · `Must` · `P2` · 📋 (3.7.1)
- [ ] **Per-agent API endpoint + key** · `Must` · `P2` · 📋 (3.7.2)
- [ ] **Same guardrail/log/transaction as main** · `Must` · `P2` · 📋 (3.7.3)
- [ ] **Per-agent log + cost + token quota** · `Must` · `P2` · 📋 (3.7.4,6,7)
- [ ] **Revoke/disable instantly** · `Must` · `P2` · 📋 (3.7.5)
- [ ] **No-code agent builder** · `Diff` · `P2` · 🌟
- [ ] **🌟 Generate agent จาก knowledge** — เลือก collection/docs → AI เสนอ agent (persona + ขอบเขต + skills + data services + model/routing แนะนำ) → **user review → adopt/แก้/ทิ้ง** · `Diff` · `P2`
- [ ] **Agent sandbox/test** · `Nice` · `P2` · ✨
- [ ] **Agent anomaly watch + auto-throttle** · `Diff` · `P2` · 🌟

### B. 🌟 ปราญช์ as MCP Server (Knowledge-as-a-Service)
เปิด knowledge องค์กรเป็น **MCP server** → AI client ใดก็ได้ (Claude Desktop, Cursor, IDE, agent อื่น) เสียบเข้ามาใช้ความรู้ปราญช์ได้.
- [ ] **Expose MCP server** — publish endpoint มาตรฐาน MCP ให้ external client ต่อ · `Diff` · `P2` · 🌟
- [ ] **MCP tools/resources** — search / ask / retrieve chunks / list collections เป็น MCP tool · `Diff` · `P2` · 🌟
- [ ] **Per-consumer auth + scope** — API key/OAuth, จำกัด collection + classification + RBAC ต่อผู้เรียก · `Must` · `P2`
- [ ] **Same governance** — guardrail in/out + audit + token quota เหมือน channel หลัก (เอกสารลับไม่รั่วออก MCP) · `Must` · `P2` · 📋(3.3.6, 3.9)
- [ ] **Rate limit + quota ต่อ consumer** · `Must` · `P2`
- [ ] **Consumer usage dashboard** (ใครเรียกอะไร เท่าไร) · `Should` · `P2`
- [ ] **Publish เป็น Agent หรือ MCP เลือกได้** — agent เดียว expose ได้ทั้ง REST + MCP · `Diff` · `P3` · 🌟

> **มุมมอง pitch**: ปราญช์ = "สมององค์กรที่เสียบเข้าเครื่องมืออะไรก็ได้". ทีม dev ใช้ผ่าน IDE, ระบบอื่นเรียกผ่าน MCP/REST, คนทั่วไปใช้ผ่าน web/LINE — สมองเดียว ทุกทางเข้า-ออก. governance เดียวคุมหมด.

## 13. Data Governance & Classification 🛡️ (📋 3.9)
> โมเดลสิทธิ์เต็ม (2 แกน Domain × Tier, org-chart binding, AND logic) → [PERMISSIONS.md](PERMISSIONS.md)
- [ ] **Data classification levels** — ทั่วไป(ไม่ลับ)/ลับ/ลับมาก/ลับที่สุด + per-level control · `Must` · `P1` · 📋 (3.9.1)
- [ ] **2-axis access: Domain × Tier** — เห็นได้ต้อง (มีสิทธิ์ domain) AND (clearance ≥ tier); most-restrictive wins · `Must` · `P1` · ✨ 📋(3.2.6)
- [ ] **Retrieval-time enforcement** — เอกสารไม่มีสิทธิ์ ไม่โผล่ search/AI/citation · `Must` · `P1` · 📋(3.2.6, 3.9.3)
- [ ] **Classification-aware model routing** (เอกสารลับ ✗ Public Model) · `Must` · `P1` · 📋 (3.9.2) · 🌟
- [ ] **Scope data to user permission** เสมอ · `Must` · `P1` · 📋 (3.9.3)
- [ ] **PII auto-redact** ก่อนส่ง Public Model · `Nice` · `P2` · 🌟

## 14. Admin, Monitoring & Audit 📊
- [ ] **People** (list/add/remove users) · `Must` · `P1` · 🎨
- [ ] **User groups** (create/delete + add/remove people) · `Should` · `P2` · 🎨
- [ ] **Content admin** (archive/transfer ownership/delete) · `Should` · `P2` · 🎨
- [ ] **AI-call audit log** (time/user/model/prompt/response) · `Must` · `P1` · 📋 (3.8.1)
- [ ] **Usage dashboard** by time/user/dept/model · `Must` · `P1` · 📋 (3.8.2)
- [ ] **Audit retention ≥1 ปี** · `Must` · `P1` · 📋 (3.8.3)
- [ ] **Audit replay** (เล่นย้อน prompt+sources) · `Diff` · `P2` · 🌟
- [ ] **Per-resource action log** (file/model/data-service/persona) · `Must` · `P1` · 📋 (3.1.5, 3.2.8, 3.5.7)
- [ ] **Alerts panel** (failed jobs/quota/connector expiry) · `Should` · `P2` · 🎨
- [ ] **Logs table + filters** + job detail drawer · `Should` · `P2` · 🎨

## 15. Global / Cross-cutting 🌐
- [ ] **Left sidebar nav + top bar** (Smart Home แรกสุด, workspace selector, global search, New Ingest, user menu) · `Must` · `P1` · 🎨
- [ ] **Smart Home = หน้า default** (ดู §17) — เปิดแอปเจอก่อน · `Must` · `P1` · 🌟
- [ ] **Admin/Monitoring Dashboard** (KPI cards, recent activity, health banner) — view ของ admin, ไม่ใช่ landing · `Must` · `P1` · 🎨
- [ ] **Global search** (title/tag/source) · `Should` · `P2` · 🎨
- [ ] **Empty-state next-best-action** ทุกหน้า · `Should` · `P1` · 🌟
- [ ] **⌘K command bar** · `Diff` · `P2` · 🌟
- [ ] **Web Research** (search + crawl → ingest) · `Should` · `P2` · 🎨
- [ ] **Indexes & Embeddings** (queue, rebuild, re-embed, playground) · `Should` · `P2` · 🎨
- [ ] **Ambient: ฝัง LINE/Teams** · `Diff` · `P3` · 🌟
- [ ] **Voice ภาษาไทย** · `Diff` · `P3` · 🌟
- [ ] **i18n (Thai/English)** · `Nice` · `P2` · ✨
- [ ] **Daily briefing / watch topics** · `Diff` · `P3` · 🌟

## 16. 🔗 Connectors & Knowledge Sources (ดูดทุกที่ที่ความรู้องค์กรอยู่)

**แนวคิดหลัก**: ความรู้องค์กรไม่ได้อยู่แค่ในไฟล์ — อยู่ใน Slack, ticket, wiki, code, อีเมล. ปราญช์ **ไปเกาะแหล่งเหล่านี้** แล้วเปลี่ยนเป็น knowledge อัตโนมัติ.
**กลยุทธ์ต่อ**: MCP-first — มี MCP server → เกาะผ่าน MCP (reuse §9 Data Service); ไม่มี → native API connector / webhook. *On-prem/air-gap: เกาะเฉพาะแหล่งภายใน (internal GitLab/Confluence/helpdesk).*

### Connector framework (core)
- [ ] **Connector framework** — auth (OAuth/API key/token), config, test, schedule, status · `Must` · `P2` · 🎨
- [ ] **MCP-first adapter** — ต่อ MCP server ใดก็ได้เป็น source (reuse Data Service layer) · `Diff` · `P2` · 🌟
- [ ] **Incremental / CDC sync** (ดูดเฉพาะที่เปลี่ยน) · `Should` · `P2` · ✨
- [ ] **Source ACL mapping** — เคารพสิทธิ์ต้นทาง (ใครเห็นใน Slack/Confluence = เห็นใน RAG เท่านั้น) · `Must` · `P2` · ✨
- [ ] **PII redact + classification on sync** · `Should` · `P2` · 🌟
- [ ] **DB connector** (Postgres/MySQL/MSSQL/Oracle) · `Should` · `P2` · 🎨

### 🌟 Live-tap channels (เกาะแบบต่อเนื่อง = differentiator)
- [ ] **Channel subscribe** — เกาะ Slack channel / Teams / helpdesk queue → ingest อัตโนมัติแบบ real-time · `Diff` · `P2`
- [ ] **Resolution mining** — ticket/helpdesk ที่ resolved → สกัดเป็น Q&A knowledge (ปัญหา→วิธีแก้) อัตโนมัติ · `Diff` · `P2`
- [ ] **Answer-in-place** — ตอบกลับใน Slack/ticket ด้วยความรู้เดิม (ก่อนคนต้องตอบซ้ำ) · `Diff` · `P3`
- [ ] **Thread → knowledge** — แชทที่จบด้วยคำตอบดี → เก็บเป็น knowledge, กรอง noise · `Diff` · `P3`

### Chat / Collaboration
- [ ] **Slack** (channels, threads, files) · `Should` · `P2`
- [ ] **Microsoft Teams** · `Should` · `P2`
- [ ] **LINE / LINE OA** (ไทย-first) · `Nice` · `P3`
- [ ] **Discord / Google Chat** · `Nice` · `P3`

### Docs / Wiki / Notes
- [ ] **Notion** · `Should` · `P2`
- [ ] **Confluence** (+ on-prem Data Center) · `Should` · `P2`
- [ ] **SharePoint / OneDrive** · `Should` · `P2`
- [ ] **Google Drive / Docs** · `Should` · `P2`
- [ ] **Obsidian** (vault markdown — local/synced) · `Nice` · `P3`
- [ ] **Dropbox / Box** · `Nice` · `P3`

### Ticketing / ITSM / Helpdesk (🔥 high-value knowledge)
- [ ] **Jira** (issues + comments → resolution knowledge) · `Should` · `P2`
- [ ] **ServiceNow** (ITSM, KB articles) · `Should` · `P2`
- [ ] **Zendesk / Freshdesk** (support tickets) · `Should` · `P2`
- [ ] **GitHub / GitLab Issues** · `Nice` · `P3`
- [ ] **Linear / osTicket** · `Nice` · `P3`

### Code / Dev
- [ ] **GitHub / GitLab** (repos, wikis, READMEs, PR discussions) · `Nice` · `P3`
- [ ] **Bitbucket** · `Nice` · `P3`

### Email / CRM / ERP
- [ ] **Gmail / Outlook-Exchange** (mailbox/shared inbox → knowledge) · `Nice` · `P3`
- [ ] **Salesforce / HubSpot** (CRM notes) · `Nice` · `P3`
- [ ] **SAP / ERP** (on-prem enterprise) · `Nice` · `P3`

### Storage / Feed
- [ ] **S3 / MinIO / GCS / Azure Blob** (bucket auto-ingest) · `Should` · `P2`
- [ ] **RSS / sitemap / web feed** · `Nice` · `P3`

> **Killer use case (pitch)**: เกาะ IT Helpdesk + Slack #support → ทุก ticket ที่แก้จบกลายเป็น knowledge อัตโนมัติ → ครั้งหน้าใครถามปัญหาเดิม ปราญช์ตอบเอง = ลดงาน support 50%+ โดยไม่ต้องเขียน KB เอง.

## 17. 🏠 Smart Home / "For You" (หน้าแรกเฉพาะฉัน — dynamic, flagship 🌟)

**= หน้า default ของแอป** (เปิดมาเจอก่อนทุกครั้ง). หน้าแรกที่ **ไม่เหมือนกันสักคน** — หยิบของมาให้เองตามพฤติกรรม/บทบาท/บริบท คล้าย Perplexity Discover แต่ดึงจาก **สมององค์กร**. เปิดมาปุ๊บรู้เลยว่าควรทำอะไรต่อ. นี่คือหน้าที่ทำให้ "ใช้ง่ายที่สุด". (Dashboard KPI = view แยกของ admin)

**Layout (pitch):** search bar ใหญ่กลางจอ (ถามได้ทันที) + feed การ์ดด้านล่างที่ระบบจัดให้:

### Core (P1 — สิ่งแรกที่ user เห็น)
- [ ] **Ask-anything bar เด่นกลางจอ** (Perplexity-style, ถามได้ทันทีไม่ต้องเข้าเมนู) · `Must` · `P1` · 🌟
- [ ] **Pick up where you left off** — แชท/เอกสารล่าสุด, งานค้าง · `Must` · `P1` · 🌟
- [ ] **Suggested questions เฉพาะคุณ** — จากบทบาท + สิ่งที่เพิ่งถาม + เอกสารใหม่ที่เกี่ยว · `Diff` · `P1` · 🌟
- [ ] **What's new in your world** — เอกสาร/ticket/อัพเดตใหม่ใน collection ที่คุณสนใจ · `Diff` · `P1` · 🌟
- [ ] **Adaptive quick actions** — ปุ่มที่คุณใช้บ่อย ลอยขึ้นเอง · `Should` · `P1` · 🌟
- [ ] **Empty-state ฉลาด** — user ใหม่/ข้อมูลน้อย → เสนอ next-best-action · `Should` · `P1` · 🌟

### Behavior-driven feed (P2 — ยิ่งใช้ยิ่งแม่น)
- [ ] **Personalized discover feed** — การ์ดหัวข้อที่ระบบ generate จากความรู้องค์กร ตรงความสนใจคุณ · `Diff` · `P2` · 🌟
- [ ] **Behavior signals engine** — เรียนรู้จากสิ่งที่ถาม/อ่าน/แผนก/เวลา → จัดอันดับ feed · `Diff` · `P2` · 🌟
- [ ] **Daily briefing inline** — สรุปสิ่งที่เปลี่ยนตั้งแต่ครั้งก่อน · `Diff` · `P2` · 🌟
- [ ] **Trending in org** — คำถามฮิต/เอกสารฮอตในองค์กร (respect สิทธิ์) · `Should` · `P2`
- [ ] **Knowledge gap ที่เกี่ยวกับคุณ** — "งานคุณยังไม่มีเอกสารเรื่องนี้" · `Diff` · `P2` · 🌟
- [ ] **Follow topics / collections** — กดติดตาม → feed ปรับตาม · `Should` · `P2`
- [ ] **Relevant agents/Data Services surface** — เครื่องมือที่บทบาทคุณน่าใช้ · `Nice` · `P2`

### Advanced (P3)
- [ ] **Proactive nudge** — "เมื่อวานมีระเบียบใหม่ออก กระทบงานคุณ — สรุปให้ไหม?" · `Diff` · `P3` · 🌟
- [ ] **Role-based home presets** (ผู้บริหารเห็นภาพรวม / support เห็น ticket / นักวิเคราะห์เห็น data) · `Diff` · `P3`
- [ ] **Time-aware** (เช้า=briefing, สิ้นเดือน=สรุป) · `Nice` · `P3`
- [ ] **Feedback บน feed** (👍👎/ซ่อน → ปรับความแม่น, ป้อน learning flywheel) · `Diff` · `P3` · 🌟

> **ผูกกับ §8 Learning flywheel**: ทุก interaction บนหน้าแรก = signal ปรับความแม่น. ยิ่งใช้ หน้าแรกยิ่งเป็น "ของฉัน".
> **Privacy/permission**: feed ต้อง respect classification + RBAC เสมอ — ไม่โผล่ของที่ไม่มีสิทธิ์ (ผูก §13).

## 18. 📦 Built-in Knowledge (Knowledge-as-a-Service ติดมากับ product) 🌟

ปราญช์มาพร้อม **knowledge MCP packs ที่ Maholan ดูแลให้** — ลูกค้าได้คุณค่าตั้งแต่วันแรก ไม่ต้อง ingest เอง. ผสมกับความรู้องค์กรในคำตอบเดียวได้.

### Core
- [ ] **Built-in knowledge packs** — เปิด-ปิดต่อ org, Maholan keep fresh อัตโนมัติ · `Diff` · `P2` · 🌟
- [ ] **ผสม built-in + org knowledge** ในคำตอบเดียว (+ citation แยกแหล่ง) · `Diff` · `P2` · 🌟
- [ ] **Knowledge pack marketplace** — subscribe pack ที่ต้องการ (business model: ขายเป็น add-on) · `Diff` · `P3` · 🌟
- [ ] **Managed/auto-update** — pack อัพเดตเองโดย Maholan (ลูกค้าไม่ต้องดูแล) · `Should` · `P2`
- [ ] **Domain/vertical packs** — ชุดตามอุตสาหกรรม (utilities/น้ำ, การเงิน, ราชการ) · `Diff` · `P3` · 🌟

### Pack ตัวอย่าง (ผ่าน MCP)
- [ ] **ข้อมูลน้ำ** — ระดับน้ำ/ปริมาณฝน/เขื่อน/คุณภาพน้ำ (เด่นสำหรับ กปน. + utilities) · `Diff` · `P2`
- [ ] **อากาศ / คุณภาพอากาศ** — weather, PM2.5, พยากรณ์ · `Should` · `P2`
- [ ] **ข่าว** — news feed (กรองตามหัวข้อ/หน่วยงาน) · `Should` · `P2`
- [ ] **กฎหมาย / ราชกิจจานุเบกษา / ระเบียบราชการ** · `Should` · `P3`
- [ ] **เศรษฐกิจ / อัตราแลกเปลี่ยน / ดัชนี** · `Nice` · `P3`
- [ ] **ข้อมูลภาครัฐเปิด (Open Gov Data)** · `Nice` · `P3`

> **Air-gap note**: pack ที่เป็น live data (อากาศ/ข่าว/น้ำ realtime) ต้องมี internet → on-prem/air-gap ใช้ผ่าน **sync gateway** (ดึงเป็นช่วง) หรือปิด. Static/snapshot pack ใช้ได้เต็ม.
> **มุมมองธุรกิจ**: built-in knowledge = (1) คุณค่า day-1 ปิดดีลเร็ว, (2) recurring revenue จาก pack subscription, (3) lock-in — ยิ่งพึ่ง pack ยิ่งย้ายยาก. ต่างจากคู่แข่งที่ให้ "ถังเปล่า".

## 19. 🌐 ปราชญ์ Ecosystem (Knowledge Federation — network effect moat) 🌟🏆

**วิสัยทัศน์ใหญ่**: หน่วยงานที่ใช้ปราญช์ด้วยกัน **แชร์ความรู้ข้ามองค์กรให้ AI กันได้** อย่างมีสิทธิ์ควบคุม. ยิ่งหลายองค์กรเข้าร่วม สมองรวมยิ่งฉลาด = **network effect ที่คู่แข่งลอกไม่ได้** (ไม่มี ecosystem ก็ไม่มี value นี้).

ปราญช์ ↔ ปราญช์ คุยกันผ่าน **MCP** (reuse §12B serve + §9 consume) — แต่ละองค์กรยังเป็นเจ้าของข้อมูลตัวเอง.

### Federation core
- [ ] **Org-to-org knowledge sharing** — org A แชร์ collection/pack ให้ปราญช์ของ org B · `Diff` · `P3` · 🌟
- [ ] **Granular consent + governance** — เลือกได้ว่าแชร์ collection ไหน, ชั้นความลับระดับไหน, read-only, ถอนคืนได้ · `Must` · `P3` · 🌟
- [ ] **Classification respected ข้ามองค์กร** — เอกสารลับไม่มีวันข้ามขอบเขต · `Must` · `P3` · 📋(3.9)
- [ ] **Ask across federation** — ถามแล้ว route ไปสมอง partner (ถ้าได้รับอนุญาต) + คำตอบระบุ "จากองค์กรไหน" · `Diff` · `P3` · 🌟
- [ ] **Audit ข้ามองค์กร** — log ว่าใคร org ไหนเข้าถึงความรู้อะไร · `Must` · `P3` · 📋(3.8)

### Trust groups / consortium
- [ ] **Trust group** — กลุ่มที่แชร์กัน เช่น กระทรวง + หน่วยงานในสังกัด, กลุ่มรัฐวิสาหกิจน้ำ · `Diff` · `P3` · 🌟
- [ ] **Hierarchical sharing** — องค์กรแม่เห็นของลูก, ลูกแชร์ขึ้นแม่ตามนโยบาย · `Should` · `P3`
- [ ] **Public knowledge exchange** — แชร์ open data ระหว่างหน่วยงานรัฐ · `Should` · `P3`

### Ecosystem marketplace
- [ ] **Publish knowledge pack สู่ ecosystem** — องค์กรเผยแพร่ความรู้ (ฟรี/ขาย) ให้คนอื่นใช้ · `Diff` · `P3` · 🌟
- [ ] **Discover partner knowledge** — หา/ขอเชื่อมความรู้จากองค์กรอื่นในเครือข่าย · `Nice` · `P3`
- [ ] **Maholan = ตัวกลางความน่าเชื่อถือ** — verify identity, ค่า transaction · `Nice` · `P3`

> **Air-gap/gov note**: federation ต้องมีการเชื่อมต่อ — รองรับผ่าน **เครือข่ายภาครัฐที่ปลอดภัย** (GIN/เครือข่ายปิด) หรือ peering แบบ point-to-point ที่ตกลงกัน. ไม่ใช่ public internet.
> **เหตุผลเชิงกลยุทธ์**: นี่คือ moat ชั้นสุด — Zero-config/Trust/Self-improving ลอกได้ในที่สุด แต่ **ecosystem ที่มีหน่วยงานไทยอยู่แล้ว ลอกไม่ได้**. ใครเข้าก่อนเป็นเจ้าตลาด. กปน. = node แรก → ดึงหน่วยงานน้ำ/รัฐวิสาหกิจอื่นเข้าตาม.

---

## 20. 🧩 Community Artifacts (share & reuse) 🌟🏆

ของที่ user สร้าง (persona/agent/prompt/collection/template/policy/dashboard) = **artifact** ที่ publish / fork / หยิบไปใช้ได้. ต่อยอด moat ecosystem (§19) + flywheel. เลิกสร้างซ้ำ — best practice กระจายเอง.

### Artifact types (ที่ reuse ได้)
- [ ] **Persona / Agent / Prompt template** เป็น artifact · `Diff` · `P2`
- [ ] **Collection / Knowledge pack** (พร้อม/ไม่พร้อมข้อมูล) · `Diff` · `P3`
- [ ] **Data Service / MCP config** · `Diff` · `P3`
- [ ] **Ingest template** (chunk/OCR/classification presets) · `Nice` · `P3`
- [ ] **Routing policy / Dashboard / Playbook (saved workflow)** · `Nice` · `P3`

### Share & reuse mechanics
- [ ] **Publish + version** artifact · `Diff` · `P2`
- [ ] **Fork / clone** ("หยิบไปปรับ") + ผูกกลับ upstream (เห็น update) · `Diff` · `P2`
- [ ] **Install / add to my workspace** ทีเดียว · `Diff` · `P2`
- [ ] **Share scopes**: private → team → org → ecosystem (§19) → public marketplace · `Diff` · `P2`
- [ ] **Rate / review / usage count** (เห็นว่าอันไหนดี/ฮิต) · `Nice` · `P3`
- [ ] **Dependency resolution** — fork agent ดึง Data Service/persona ที่ผูกมาด้วย · `Should` · `P3`
- [ ] **Internal artifact gallery** (ค้น/เลือกของในองค์กร) · `Diff` · `P2`

### Governance (กันพัง — บังคับ)
- [ ] **Org persona override ไม่ได้** แม้ fork (📋 3.4.2) · `Must` · `P2`
- [ ] **Classification-aware sharing** — artifact ที่ผูกข้อมูลลับ ห้าม share ออกนอก scope (📋 3.9) · `Must` · `P2`
- [ ] **Review before publish** — สแกน prompt injection/คำสั่งอันตรายใน shared persona/prompt (📋 3.4.3) · `Must` · `P2`
- [ ] **Provenance + RBAC + revoke** — ใครสร้าง/แก้, ใครติดตั้งได้, ถอนได้ · `Must` · `P2`

> ผูกกับ §16 (MCP marketplace), §18 (built-in packs), §19 (ecosystem federation): artifact คือ "หน่วย" ที่ไหลในทุก marketplace/เครือข่าย. **Maholan curate "official" artifacts** เป็น value + lock-in เพิ่ม.

---

## 21. 🧠 Personal Memory (จำตัวตน/บริบทราย user) 🌟

จำข้อเท็จจริงถาวรเกี่ยวกับ user ข้ามห้องแชท → ปรับคำตอบ/persona/Smart Home ให้เป็น "ของฉัน". คล้าย ChatGPT memory แต่ enterprise-grade + on-prem.
ต่างจาก: §10 persona (สไตล์), §17 behavior feed (จัดอันดับ), chat history (ในห้องเดียว). อันนี้ = **ข้อเท็จจริงถาวรของ user**.

### Core
- [ ] **Auto-capture salient facts** — ระบบจับสิ่งสำคัญจากแชท → เสนอ "จำไว้ไหม?" (user ยืนยัน) · `Diff` · `P2`
- [ ] **Explicit "จำไว้ว่า..."** — user สั่งจำเอง · `Diff` · `P2`
- [ ] **หมวดความจำ** — บทบาท/แผนก, ความเชี่ยวชาญ, โปรเจคที่ทำอยู่, preference (สั้น/ยาว/ภาษา), do/don't, ศัพท์เฉพาะ · `Should` · `P2`
- [ ] **ใช้ memory ปรับคำตอบ** อัตโนมัติ (inject เป็น context) · `Diff` · `P2`
- [ ] **ผูกกับ Smart Home (§17) + persona (§10)** — feed/โทน ปรับตาม memory · `Diff` · `P3`

### User control (PDPA/GDPR + transparency)
- [ ] **Memory manager UI** — ดู/แก้/ลบ memory ทีละรายการ · `Must` · `P2`
- [ ] **Pause / opt-out** จำชั่วคราว/ปิดถาวร · `Must` · `P2`
- [ ] **"ทำไมตอบแบบนี้"** — โชว์ว่าใช้ memory ไหนปรับคำตอบ (ผูก glass-box §7) · `Diff` · `P3`

### Governance (บังคับ)
- [ ] **Per-user isolation เด็ดขาด** — memory ไม่รั่วข้าม user · `Must` · `P1`
- [ ] **Memory ≠ ขยายสิทธิ์** — จำ intent ได้ แต่ access ยังคุมด้วย RBAC/classification (หลักการ 📋 3.4.2) · `Must` · `P2`
- [ ] **PII handling + audit** (create/edit/delete memory + actor/time) · `Must` · `P2`
- [ ] **เก็บ on-prem** — memory ส่วนตัวไม่ออก cloud (จุดขาย privacy) · `Must` · `P1`

> เสริม personal persona (TOR 3.4.1.2): persona = *สไตล์*, memory = *ข้อเท็จจริง*. ทั้งคู่ bounded — ไม่แตะ security/scope ข้อมูล.

---

## 22. 🛠️ Skills (ความสามารถที่โหลดตามงาน) 🌟

Skill = ชุด instruction/วิธีทำงาน/template ที่ AI โหลดมาใช้เมื่อเกี่ยวข้อง (progressive disclosure — description อยู่ใน context, โหลดเต็มเมื่อ trigger). 3 ชั้น:

### 1. Default skills (ติดมากับ ปราญช์, จำเป็น)
- [ ] **สรุปเอกสาร / สรุปประชุม** · `Must` · `P1`
- [ ] **Gen เอกสาร** (docx / xlsx / pptx / pdf) · `Should` · `P2`
- [ ] **แปลไทย ↔ อังกฤษ** · `Should` · `P2`
- [ ] **Extract / Classify / Citation / ตาราง-กราฟ / OCR review** · `Should` · `P2`
- [ ] **Maholan keep default skills fresh** (managed) · `Should` · `P2`

### 2. User-add custom skill
- [ ] **สร้าง skill เอง** — instruction + เงื่อนไข "ใช้เมื่อไหร่" (trigger) + tool/ไฟล์แนบ (optional) · `Diff` · `P2`
- [ ] **Skill RBAC** — ใครสร้าง/ใช้/แก้ได้ (org/dept/user) · `Must` · `P2`
- [ ] **Version + enable/disable** ต่อ skill · `Should` · `P2`

### 3. 🌟 Generate skill จาก knowledge (เด่น)
- [ ] **เลือก collection/docs → AI สังเคราะห์เป็น skill** (ขั้นตอน + บริบท + ศัพท์เฉพาะ) · `Diff` · `P2`
- [ ] **User review ก่อนใช้** — ดู/แก้/ทดสอบ → adopt / discard · `Diff` · `P2`
- [ ] **Re-generate เมื่อ knowledge อัพเดต** (skill ตามทันเนื้อหา) · `Nice` · `P3`

### Governance (บังคับ)
- [ ] **Review/scan ก่อน activate** — กัน prompt injection/คำสั่งอันตรายใน skill (หลักการ 📋 3.4.3) · `Must` · `P2`
- [ ] **Classification-aware** — skill ที่สังเคราะห์จาก knowledge ลับ ผูก scope/สิทธิ์ตามต้นทาง (📋 3.9) · `Must` · `P2`
- [ ] **Skill ≠ ขยายสิทธิ์** — โหลด skill ไม่ให้เข้าถึงข้อมูลเกินสิทธิ์ user · `Must` · `P2`
- [ ] **Audit** (สร้าง/แก้/ลบ/activate skill) · `Must` · `P2`

> Skill = artifact ชนิดหนึ่ง → share/fork ผ่าน §20, marketplace §16, ecosystem §19. ต่าง persona (§10 = บุคลิก/สไตล์): skill = *วิธีทำงานเฉพาะทาง*.

---

## 23. 🔄 Knowledge Ops — Central Improvement Cycle 🌟🏆

คอนโซลของ **ทีมดูแลความรู้กลาง** ปิด loop: ตรวจเจอช่องว่าง → แก้ → ยืนยันหายจริง → วัดผล. ต่อยอด §8 (detect) ให้เป็น *ลงมือแก้ได้จริง*. คลังความรู้ที่ปรับปรุงตัวเองโดยมีคนคุม.

### 1. คิวปัญหา (auto-populated)
- [ ] **Unanswered / low-confidence / conflict / 👎-feedback queue** — เข้าคิวอัตโนมัติ · `Diff` · `P2`
- [ ] **Cluster คำถามคล้ายกัน** + จัดอันดับตามความถี่/ผลกระทบ · `Diff` · `P2`
- [ ] **Assignment + ownership + SLA** (มอบหมายผู้รับผิดชอบ) · `Should` · `P3`

### 2. แก้ (remediation — action เดียวจบในคอนโซล)
- [ ] **เพิ่ม/แก้เอกสาร** หรือ **เพิ่ม connector/source** ตรงจากคิว · `Diff` · `P2`
- [ ] **แก้ prompt / จูน skill / ปรับ agent / ปรับ routing policy** จากคิว · `Diff` · `P2`
- [ ] **Mark "นอกขอบเขต"** (รู้ว่าจงใจไม่ตอบ) · `Should` · `P3`

### 3. Verify & วัดผล (ปิด loop)
- [ ] **Re-run คำถามที่เคยพัง → ยืนยันตอบได้** (regression test ความรู้) · `Diff` · `P2`
- [ ] **Metrics**: gap closure rate, coverage trend, freshness score, time-to-fix · `Diff` · `P3`
- [ ] **Knowledge health dashboard** (สุขภาพคลังกลางเป็นตัวเลข) · `Should` · `P3`

### Governance
- [ ] **RBAC** — role ทีมความรู้กลาง (ใครแก้/อนุมัติ) · `Must` · `P2`
- [ ] **Classification เคารพ + review ก่อน publish + audit** ทุก action · `Must` · `P2` · 📋(3.8, 3.9)

> ผูก §8 (gap report/flywheel), §22 (skill), §12 (agent), §9 (tool), §16 (connectors): ทุก remediation เรียกเครื่องมือเดิม. นี่คือ **"ตัวคุมวงจร" ของ self-maintaining KB** — เปลี่ยน "คลังเน่า" เป็น "คลังที่ทีมกลางดูแลให้สดเสมอ".

---

## Coverage vs กปน. TOR (compliance)
ครบทั้ง 3.1–3.9 กระจายใน §2,4,5,9,10,11,12,13,14 (tag 📋 + clause ID). 5 โมดูลที่ Figma ไม่มี (MCP·Persona·Token·Agent·Classification) = สร้างใหม่. Figma cover ~40%.

## Phase สรุป
- **P1 (on-prem MVP)**: §1 on-prem/Local, §2 security/auth, §3-5 KB+ingest+RAG, §6-7 zero-config+trust, §9 model+MCP core, §10 org persona, §11 token core, §13 classification, §14 audit
- **P2**: SaaS/billing, agent, personal persona, connectors, web research, smart layer, flywheel
- **P3**: ambient, self-maintaining เต็มรูป, voice, marketplace

> `Should` = กึ่ง Must/Nice. ถ้าต้องการ 2 ระดับล้วนบอกได้.
