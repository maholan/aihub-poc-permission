> ⚠️ **idea pool ดิบ (historical, 2026-06-24 ช่วงแรก)** — product ชื่อ **ปราญช์** แล้ว, ไอเดียที่คัด/ขยายแล้วอยู่ใน `VISION.md` + `FEATURES.md` (Smart Home, Routing Policy, Connectors/live-tap, Serve-as-MCP, Built-in Knowledge, Ecosystem). เก็บไฟล์นี้ไว้ดู raw ideas เฉยๆ — ใช้ VISION/FEATURES เป็นหลัก.

> 📂 [📌 **FEATURES** (ไฟล์หลัก)](FEATURES.md) · [SUMMARY](SUMMARY.md) · [VISION](VISION.md) · [ROADMAP](ROADMAP.md) · [PRICING](PRICING.md)

# AI Hub — Brainstorm (ideas, not commitments)

Divergent idea pool. Beyond TOR baseline. Pick later. Tag: 💡 idea · 🔥 high-impact · 🧪 experimental · 🏆 differentiator (เกินคู่แข่ง/เกิน TOR)

---

## 1. Ingest & organize — ลดงาน manual ให้เหลือ "ยืนยัน"
- 🔥 **Drop-and-forget ingest** — ลากไฟล์เข้า ไม่ต้องเลือกอะไร: ระบบเดา collection / tags / classification / chunk-setting → user แค่กดยืนยันหรือแก้
- 💡 **Auto-classification ชั้นความลับ** — LLM อ่านเนื้อหา → เดาระดับชั้นความลับ (ลับ/ลับมาก/ทั่วไป) + เหตุผล → admin review (ช่วยข้อ 3.9 ลดงานคน)
- 🔥 **Collection ที่ "โต" เอง** — collection มี description + ระบบ re-suggest โครงสร้างเมื่อเนื้อหาเริ่มหลากหลาย
- 💡 **"เอกสารนี้ขัดกับเอกสารเดิม"** — ตอน ingest ตรวจว่าข้อมูลใหม่ contradict ของเดิมไหม (เช่น ระเบียบเวอร์ชันใหม่ทับเก่า) → แจ้ง + เสนอ archive ตัวเก่า
- 🧪 **Versioning เอกสารอัตโนมัติ** — ไฟล์ชื่อ/เนื้อหาใกล้เดิม → ผูกเป็น version chain, chat อ้างเวอร์ชันล่าสุดเสมอ
- 💡 **Bulk drop → cluster preview** — โยน 100 ไฟล์ → ระบบจัดกลุ่มหัวข้อ + เสนอ collection ละกลุ่ม ก่อน ingest จริง

## 2. Chat / Answer — ฉลาดขึ้น เชื่อถือได้ขึ้น
- 🔥 **Grounding / confidence meter** — ทุกคำตอบบอกว่า "มั่นใจแค่ไหน" + ถ้า retrieval อ่อน เตือน "ข้อมูลไม่พอ อย่าเพิ่งเชื่อ"
- 🏆 **Answer ที่ citation คลิกได้ลึกถึง chunk** — ชี้ประโยคในเอกสารต้นทาง ไม่ใช่แค่ชื่อไฟล์
- 💡 **"ตอบจากเอกสารไหนบ้าง" panel** — โชว์ว่าใช้ doc/collection ใด, ชั้นความลับใด (โปร่งใส + ตรวจ leak ตา 3.3.6.2)
- 🔥 **Auto-scope** — user ไม่ต้องเลือก collection ระบบ route query เอง + บอกว่าค้นจากที่ไหน
- 💡 **Conflicting-source flag** — ถ้า 2 เอกสารตอบต่างกัน → โชว์ทั้งคู่ + ชี้ว่าขัดกัน ไม่ใช่มั่วรวม
- 🧪 **"ถามต่อเองได้"** — ระบบเสนอคำถามถัดไปจาก gap ในคำตอบ
- 💡 **Multi-turn memory ในห้อง** — จำ context การคุยก่อนหน้า ไม่ต้องถามซ้ำ
- 🏆 **Persona preview** — ก่อน save persona โชว์ตัวอย่างคำตอบ "ก่อน/หลัง" ใช้ persona

## 3. Governance / safety — เปลี่ยนภาระเป็นจุดขาย
- 🔥 **Guardrail แบบอธิบายได้** — ถ้า block คำถาม บอกเหตุผล + แนะวิธีถามใหม่ (ไม่ใช่ปฏิเสธเฉยๆ)
- 🏆 **Classification-aware routing อัตโนมัติ** — เอกสารลับ → บังคับ Local Model, โชว์ให้ user เห็นว่าทำไมใช้ model นี้ (ข้อ 3.9.2)
- 💡 **"ใครเห็นอะไรได้"** simulator — admin จำลองมุมมอง user/role → เห็นว่า search/chat คนนั้นเจออะไร (ตรวจ permission ก่อน prod)
- 💡 **Audit log แบบ replay** — เปิด log แล้วเล่นย้อน prompt+response+sources ที่ AI ใช้ตอนนั้น (สืบสวนย้อนหลังจริงตาม 3.3.3)
- 🧪 **PII auto-redact ก่อนส่ง Public Model** — เบลอเลขบัตร/ชื่อ ก่อนออกนอกองค์กร
- 💡 **Persona drift detector** — เตือนถ้า personal persona พยายามเลี่ยง org persona บ่อยๆ

## 4. Token / cost — ให้ทุกคนเห็นและคุมเองได้
- 🔥 **Cost-before-you-send** — ก่อนกดถาม โชว์ประมาณ token/บาท ที่จะใช้ (โดยเฉพาะ model แพง)
- 💡 **"คำถามนี้ใช้ model เล็กพอ"** — ระบบเสนอ downgrade model สำหรับคำถามง่าย เพื่อประหยัด quota
- 🏆 **Quota dashboard เชิงรุก** — พยากรณ์ "quota จะหมดวันที่ X ตามอัตราใช้ปัจจุบัน" ไม่ใช่แค่เตือน 80%
- 💡 **Cost leaderboard ราย dept** — โปร่งใส ใครใช้เยอะ ช่วยจัดสรรปีหน้า
- 🧪 **Cache คำตอบซ้ำ** — คำถามเหมือนเดิม + เอกสารไม่เปลี่ยน → ตอบจาก cache ไม่เผา token

## 5. Agent / MCP — ขยายพลังนอกองค์กร
- 🏆 **Agent builder แบบ no-code** — เลือก persona + data services + model + quota → ได้ API endpoint พร้อมใช้
- 💡 **Agent sandbox/test** — ทดสอบ agent ในหน้าจอก่อนเปิด external
- 💡 **Data Service marketplace ภายใน** — รายการ MCP service ที่ org อนุมัติแล้ว พร้อมคำอธิบาย/ตัวอย่าง
- 🧪 **Agent usage anomaly alert** — agent ถูกเรียกผิดปกติ (spike/นอกเวลา) → เตือน + auto-throttle

## 6. Onboarding / adoption — ให้คนใช้จริง
- 🔥 **Empty-state ที่บอก next action เสมอ** — ทุกหน้าว่างมีปุ่ม "เริ่มยังไง"
- 💡 **Guided first-run** — ตรวจว่ามี data source อะไร → จัด onboarding ให้ตรง
- 💡 **"ตัวอย่างคำถามจากเอกสารของคุณ"** — หลัง ingest เสร็จ ระบบ generate คำถามที่ถามได้ → user เห็นคุณค่าทันที
- 🧪 **In-app tips ตาม role** — admin เห็นทิปต่างจาก user ทั่วไป

## 7. Wild / 🏆 differentiators (เกิน TOR ชัดๆ)
- 🏆 **"ถามข้ามทุกแหล่ง" + auto tool-use** — คำถามเดียว ระบบเลือกเองว่าจะค้น RAG / เรียก Data Service / ค้นเว็บ
- 🏆 **Knowledge gap report** — วิเคราะห์คำถามที่ตอบไม่ได้บ่อย → "องค์กรขาดเอกสารเรื่องนี้" เสนอให้ ingest เพิ่ม
- 🏆 **Scheduled briefing** — agent สรุปเอกสาร/อัพเดตใหม่รายวัน ส่งเข้าเมล/แชท
- 🧪 **Voice / Thai TTS** — ถาม-ตอบด้วยเสียงภาษาไทย
- 🧪 **เปรียบเทียบคำตอบข้าม model** — ถามเดียว เทียบ Claude vs GPT vs Local เคียงกัน (เลือก model ที่เหมาะ)
- 🏆 **Explainable retrieval** — โชว์ว่าทำไม chunk นี้ถูกเลือก (score, keyword match, semantic)

---

## วิธีใช้ต่อ
จากนี้: ผมช่วยได้ —
- ขยายหัวข้อไหนให้ลึกขึ้น (เช่น 🔥 ตัวที่สนใจ)
- เพิ่มไอเดียในธีมที่อยากเน้น
- จัด priority/effort matrix (impact × effort) เพื่อคัดว่าทำอะไรก่อน
- เคาะว่าอันไหน "ขายลูกค้า/กปน. ได้" vs "internal nice-to-have"
