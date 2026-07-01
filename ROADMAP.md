# ปราญช์ (Pranch) — Roadmap & Coverage

> 📂 [📌 **FEATURES** (ไฟล์หลัก)](FEATURES.md) · [SUMMARY](SUMMARY.md) · [VISION](VISION.md) · [PRICING](PRICING.md) · [BRAINSTORM](BRAINSTORM.md)

Companion to [FEATURES.md](FEATURES.md) (ไฟล์หลัก). Product ของ Maholan — **on-prem first**, ตลาด gov ไทย + enterprise. กปน. = anchor; TOR ของมัน = ชุด compliance ที่ขายต่อได้.

---

## A. Delivery phases

### Phase 1 — On-prem MVP + governed core
Goal: ลงในองค์กรได้จริง (on-prem/air-gap) + secure, auditable, multi-model RAG ที่ user เปิดมาใช้ได้เลย.

**Platform & deploy (on-prem first)**
- On-prem install (Docker/K8s, one-line installer), air-gapped mode, Local Model เต็มรูป
- BYO-model / BYO-key, org admin console
- **Tenant-ready data model** (เผื่อ multi-tenant แม้ P1 = single-org)

**Security & auth**
- Login + **LDAP / AD / SSO** (3.3.4.1), MFA/password-change
- **RBAC** least-privilege ทุก resource (3.3.4.2, 3.3.5), TLS ≥1.2 (3.3.4.3), OWASP + rate limit (3.3.7)
- **Guardrail in/out** (3.3.6) + อธิบายได้
- **Audit log** core: AI calls (prompt/response/user/model/time) ≥1yr (3.8) + per-resource log

**Knowledge & RAG**
- File mgmt PDF/DOCX/TXT ≤100MB, OCR + user review (3.2.1–2, 3.2.9)
- Metadata + **classification/ชั้นความลับ** + keywords (3.2.4)
- Pipeline extract→chunk(bge-m3 512/128)→embed→Qdrant→Minio; state machine (3.2.3)
- Collections list/create/detail, semantic search + per-file RBAC by classification (3.2.5–6)
- Chat/RAG: answer + citations + chunk cards, chat history, controls; streaming

**Models, routing & cost**
- Multi-model Local + Public; model CRUD, encrypted credential (3.5)
- **🌟 Routing Policy Engine**: ไม่ลับ→Public, ลับ→Local (hard rule), budget หมด→fallback Local, transparency
- **Token & Credit** core: in/out rate, budget cap, quota org/dept/user, 80% alert, reports (3.6.1–3,6)
- **Data classification + model routing** (3.9)

**MCP, persona & flagship UX**
- **MCP / Data Service consume** (3.1): list ≤15, CRUD, RBAC, log, timeout, HTTPS/token auth
- **Org Persona** (3.4.1.1, 3.4.2–3, 3.4.6): locked, validation, log
- **🏠 Smart Home core** (§17): ask-anything bar, pick-up-where-left-off, suggested questions, what's-new (= หน้า default)
- **🌟 Zero-config**: auto-route ingest + suggest-create-collection + auto-classification
- **🌟 Glass-box**: confidence meter + citation-to-sentence
- **🛠️ Default skills** (§22): สรุป/แปลไทย-อังกฤษ/extract/classify/citation (ติดมา)

### Phase 2 — Serve outward + connectors + smart layer
- **Serve outward**: Agent REST API (3.7) + **ปราญช์-as-MCP-server** (Knowledge-as-a-Service §12B)
- **Personal Persona** (3.4.1.2); Token approval workflow + billing cycle (3.6.4–5)
- **🔗 Connectors + live-tap**: Slack/Teams/Notion/Confluence/Jira/ServiceNow + **resolution mining**, source ACL mapping, CDC sync
- **📦 Built-in Knowledge packs** (น้ำ/อากาศ/ข่าว) — managed by Maholan
- **SaaS multi-tenant** + self-serve onboarding + edition gating + billing
- **🏠 Smart Home behavior-feed**: personalized discover, behavior signals, daily briefing, knowledge-gap
- Web Research, Indexes & Embeddings UI, sub-collections, permissions matrix, multimodal (image/table), chunk dedup
- Admin: user groups, content archive/transfer/delete; Monitoring: alerts/logs/job drawer
- Smart layer: auto-tag, duplicate warning, query rewrite, conflict detection, audit replay, ⌘K
- **🔁 Learning flywheel**: feedback→eval, auto-version chain, **capture-to-knowledge (§8)**
- **🛠️ Skills (§22)**: custom + **generate จาก knowledge → review**
- **🧠 Personal Memory (§21)**: auto-capture + manager UI + per-user isolation (on-prem)
- **🌟 Generate-from-knowledge** ครบชุด: agent (§12) + tool/Data Service (§9) → review
- **🧩 Community Artifacts (§20)**: publish/version/fork + internal gallery (scope: org)
- **🔄 Knowledge Ops (§23)**: คิวปัญหา + remediate (เอกสาร/source/prompt/skill/agent) + verify (regression)

### Phase 3 — Ecosystem + ambient + scale
- **🌐 ปราชญ์ Ecosystem** (§19): org-to-org knowledge federation, consent/governance, trust groups, ask-across-federation, ecosystem marketplace
- **Ambient**: ฝัง LINE/Teams, voice ไทย, embed widget/SDK, right-click ingest
- Self-maintaining KB เต็มรูป: staleness watch, contradiction sweep, freshness score
- Proactive: watch topics, daily briefing → channels, role-based home presets
- **🎭 Adaptive persona (§10)**: เรียนรู้สไตล์จากพฤติกรรม → เสนออัพเดต → user ยืนยัน
- **🧩 Artifacts → ecosystem/public marketplace** (§20 share ข้ามองค์กร), curate official artifacts (Maholan)
- **🔄 Knowledge Ops metrics**: closure rate, coverage trend, freshness, health dashboard
- More connectors (S3/Drive/GitHub/email/CRM), MCP marketplace, knowledge pack marketplace
- Public API + webhooks, i18n Thai/EN, responsive/mobile, a11y, metrics (Prometheus/OTel)

---

## B. Coverage map — Figma design vs TOR (compliance)

| TOR clause | In Figma? | Note |
|---|---|---|
| 3.1 MCP / Data Service | ❌ none | โมดูลใหม่ (Connectors ใน Figma = DB, คนละอย่าง) |
| 3.2 File Management | ✅ mostly | Knowledge Library + Ingest cover; ขาด classification field, 100MB, file log |
| 3.3 Security | ⚠️ partial | มีแค่ SSO/login; guardrail/OWASP/LDAP/rate-limit ไม่มีใน design |
| 3.4 Persona | ❌ none | ใหม่ |
| 3.5 Multi-Model | ⚠️ partial | "AI Settings" มี; ขาด model CRUD/credential/RBAC/local-endpoint/routing |
| 3.6 Token & Credit | ❌ none | ใหม่ |
| 3.7 Agent Management | ❌ none | ใหม่ |
| 3.8 Audit Log | ⚠️ partial | "Monitoring & Logs" มี; ไม่ใช่ AI-call prompt/response audit |
| 3.9 Data Classification | ❌ none | ใหม่ (Figma มีแค่ generic permissions matrix) |

**Verdict**: Figma cover ~40% ของ TOR (เน้น 3.2). 5 โมดูล (3.1/3.4/3.6/3.7/3.9) + security depth ต้อง design+build ใหม่.
**Product layer ที่เกิน Figma+TOR ทั้งหมด**: on-prem/deploy, Routing Policy, Smart Home, Connectors/live-tap, Serve-as-MCP, Built-in Knowledge, Ecosystem — = ส่วนที่ทำให้เป็น "product" ไม่ใช่งานสั่งทำ.

---

## C. Build dependency order (P1)
1. **Infra**: on-prem package, DB schema (tenant-ready), Qdrant, Minio, auth (LDAP/AD/SSO) + RBAC ← ทุกอย่างพึ่งอันนี้
2. **Model registry + credential vault** (3.5) ← ก่อนเรียก AI ใดๆ
3. **Token/credit ledger** (3.6) ← ห่อทุก model call; ทำพร้อม #2
4. **Routing Policy + Guardrail + classification** (3.5 routing, 3.3.6, 3.9) ← gate บน call path; ทำพร้อม #2/#3
5. **File pipeline** (3.2) ingest→chunk→embed→index
6. **Search + Chat RAG** ← ใช้ #2–5
7. **MCP consume / Data Service** (3.1) ← tool layer
8. **Org Persona** (3.4) ← shape prompt ใน #6
9. **Audit log + dashboard** (3.8) ← cross-cutting, instrument ตั้งแต่ #1
10. **Smart Home + zero-config UX** ← layer บน #5–6

> **#2+#3+#4 = "governed AI call" core** — ทำเป็น middleware ก้อนเดียว. Serve-outward (Agent + MCP-server, P2) บังคับ reuse path เดียวกัน (3.7.3) → Ecosystem (P3) ต่อยอดจากตรงนี้.
