# ปราญช์ — Credit & Token Pricing Model

> 📂 [📌 **FEATURES** (ไฟล์หลัก)](FEATURES.md) · [SUMMARY](SUMMARY.md) · [VISION](VISION.md) · [ROADMAP](ROADMAP.md) — ดู §9 Routing + §11 Token & Credit

โมเดลคิดเงิน: token → credit ผ่าน **อัตราคูณต่อ model** (แยก input/output). ตอบ TOR 3.5.6 (คำนวณต้นทุนแยก in/out) + 3.6 (เครดิตกลาง ≤ 500,000 บาท/ปี).

> ราคา provider (ด้านล่าง) cached มิ.ย. 2026 — **ผันผวน, ต้อง config ได้** ไม่ hardcode. Admin อัพเดตเมื่อ provider เปลี่ยนราคา/FX.

---

## 1. ราคา provider จริง (USD ต่อ 1M tokens — input / output)

| Provider | Model | Input $/1M | Output $/1M | หมายเหตุ |
|---|---|---|---|---|
| **Anthropic** | Claude Fable 5 | 10.00 | 50.00 | top model |
| | Claude Opus 4.8 / 4.7 / 4.6 | 5.00 | 25.00 | |
| | Claude Sonnet 4.6 | 3.00 | 15.00 | |
| | Claude Haiku 4.5 | 1.00 | 5.00 | |
| **OpenAI** | GPT-5.5 | 5.00 | 30.00 | flagship |
| | GPT-5.4 | 2.50 | 15.00 | |
| | GPT-5 | 1.25 | 10.00 | |
| **Google** | Gemini 3.1 Pro (≤200K) | 2.00 | 12.00 | >200K: 4 / 18 |
| | Gemini 3 Flash | 0.50 | 3.00 | |
| | Gemini 3.1 Flash-Lite | 0.25 | 1.50 | ถูกสุด |
| **Local** | self-hosted LLM | — | — | ไม่มีต้นทุน token, admin ตั้ง nominal rate (ดู §5) |

ส่วนลดที่ทุกค่ายมี (optional รองรับทีหลัง): **Batch −50%**, **Cached input ~−90%**.

---

## 2. นิยาม Credit

> **1 credit = 1 บาท (THB).**

เหตุผล: cap ตามสัญญาเป็นบาท (500,000) → **500,000 credit/ปี** ตรงๆ, admin คิดเป็นงบได้ทันที, ไม่ต้องแปลงหัว. (ถ้าต้องการ granularity ใช้ sub-unit 0.0001 credit ภายใน, แสดงผลเป็นบาท)

---

## 3. สูตรคิด credit ต่อ request

```
credit_in  = tokens_in  / 1_000_000 × price_usd_in  × FX × markup
credit_out = tokens_out / 1_000_000 × price_usd_out × FX × markup
credit_total = credit_in + credit_out
```

**ตัวแปร config ได้ (admin):**
- `FX` = อัตราแลก USD→THB. default **33** (อัพเดตรายเดือน/ตามจริง)
- `markup` = บวกกำไร/ค่า infra. default **1.30** (30%). ตั้งต่อ edition/tenant ได้ (Gov อาจ 1.2, SME 1.5)
- `price_usd_in/out` = ราคา provider (§1), แก้ได้เมื่อ provider เปลี่ยน

> **อัตราคูณรวม** = `price_usd × FX × markup` = `price_usd × 33 × 1.3` = **price_usd × 42.9**

---

## 4. ตาราง multiplier ที่ admin ใช้ (credit ต่อ 1M tokens)

ค่า default (FX 33, markup 1.30). **= บาทต่อ 1M tokens ที่หักจาก quota.**

| Model | Credit/1M in | Credit/1M out |
|---|--:|--:|
| Claude Fable 5 | 429 | 2,145 |
| Claude Opus 4.8 | 215 | 1,073 |
| Claude Sonnet 4.6 | 129 | 644 |
| Claude Haiku 4.5 | 43 | 215 |
| GPT-5.5 | 215 | 1,287 |
| GPT-5.4 | 107 | 644 |
| GPT-5 | 54 | 429 |
| Gemini 3.1 Pro (≤200K) | 86 | 515 |
| Gemini 3.1 Pro (>200K) | 172 | 773 |
| Gemini 3 Flash | 21 | 129 |
| Gemini 3.1 Flash-Lite | 11 | 64 |
| Local LLM | *admin-set* | *admin-set* |

**ตัวอย่าง:** ถาม Opus, 2,000 tokens in + 800 out
= (2000/1M × 215) + (800/1M × 1073) = 0.43 + 0.86 = **~1.29 credit (1.29 บาท)**

**Relative cost** (เทียบ Haiku-in = 1×): output แพงกว่า input 5×; Opus-out ≈ 25× Haiku-in; Fable-out = แพงสุด ~50×. → ผูกกับ **Routing Policy §9**: งานง่าย/ปริมาณเยอะ route ไป Flash-Lite/Haiku ประหยัด 10–40×.

---

## 4.5 ตัวอย่างการใช้งาน & การคำนวณ

> สูตร: `credit = (tok_in/1M × rate_in) + (tok_out/1M × rate_out)`. RAG: input = system+persona + chunks ที่ดึงมา + history + คำถาม (มักใหญ่กว่า output มาก).

### ตัวอย่าง 1 — นาย A (knowledge worker, ถาม-ตอบ RAG, ใช้ Sonnet 4.6)
1 query: input 4,700 tok (persona 800 + 5 chunks ~2,500 + history 1,200 + คำถาม 200), output 500 tok
```
in  = 4,700/1M × 129 = 0.606 credit
out =   500/1M × 644 = 0.322 credit
รวม = 0.93 credit ≈ 0.93 บาท / query
```
ใช้ 30 query/วัน × 22 วัน = **~612 บาท/เดือน** (~7,300/ปี)

### ตัวอย่าง 2 — นาย B (coding/วิเคราะห์หนัก, context ใหญ่, ใช้ Opus 4.8)
1 query: input 12,000 tok, output 1,500 tok
```
in  = 12,000/1M × 215 = 2.58 credit
out =  1,500/1M × 1,073 = 1.61 credit
รวม = 4.19 credit ≈ 4.19 บาท / query
```
20 query/วัน × 22 = **~1,844 บาท/เดือน**

### ตัวอย่าง 3 — นาง C (จัดหมวดเอกสารจำนวนมาก, ใช้ Gemini Flash-Lite)
ต่อ doc: input 1,500 tok, output 50 tok (label)
```
in  = 1,500/1M × 11 = 0.0165
out =    50/1M × 64 = 0.0032
รวม = 0.020 credit / doc
```
1,000 docs = **~20 บาท**. งานปริมาณมากถูกมากเพราะ route ไป model ถูก.

### ตัวอย่าง 4 — เอกสารลับ → Local (nominal 13/64)
query เดียวกับนาย A (in 4,700 / out 500):
```
in  = 4,700/1M × 13 = 0.061
out =   500/1M × 64 = 0.032
รวม = 0.09 credit ≈ 0.09 บาท / query
```
ถูกกว่า Sonnet ~10× (ใช้ GPU องค์กรเอง) + ข้อมูลไม่ออกนอก.

### คำถามเดียวกัน ต่าง model = ต่างกัน ~38× (input 4,700 / output 500)
| Model | credit/query | เทียบ |
|---|--:|--:|
| Gemini Flash-Lite | 0.08 | 1× (ถูกสุด) |
| Gemini 3 Flash | 0.16 | 2× |
| Local (nominal) | 0.09 | ~1× |
| Claude Haiku 4.5 | 0.31 | 4× |
| Claude Sonnet 4.6 | 0.93 | 12× |
| Claude Opus 4.8 | 1.55 | 19× |
| GPT-5.5 | 1.65 | 21× |
| Claude Fable 5 | 3.09 | **38×** |

→ ตอกย้ำ **Routing Policy** = ตัวคุมต้นทุน: คำถามง่ายส่ง Flash-Lite, ยากจริงค่อย Opus/Fable.

### งบ 500,000 credit/ปี ใช้ได้แค่ไหน
| สมมติใช้ล้วน | credit/query | query/ปี | /เดือน |
|---|--:|--:|--:|
| Sonnet | 0.93 | ~537,000 | ~44,700 |
| Opus | 1.55 | ~322,000 | ~26,900 |
| Mixed (70% Sonnet, 20% Haiku, 10% Opus) | ~0.87 | ~575,000 | ~47,900 |

**ระดับ dept** (50 คน, mix, 10 query/คน/วัน × 22 วัน = 11,000 query/เดือน):
= 11,000 × 0.87 ≈ **9,560 บาท/เดือน** (~114,700/ปี) → จัดสรร quota ต่อ dept ได้สบายภายใต้ cap.

---

## 5. Local model (on-prem)

ไม่มีต้นทุน token จริง (hardware = sunk cost) แต่ต้อง **ตั้ง nominal rate** เพื่อ:
- คุม capacity (กัน GPU ตัน)
- ให้ quota มีความหมายข้าม model
- เทียบต้นทุนกับ public ได้

แนวทาง: amortize ค่า GPU/ไฟ/คน ต่อปี ÷ token ที่ทำได้ → ได้บาท/1M. หรือตั้ง **flat ต่ำๆ** (เช่น 5 / 15 credit/1M) เป็นสัญลักษณ์. default แนะ: **Local = ~10% ของ Sonnet** (13 / 64) — ถูกพอให้ route งานลับมาลงโดยไม่เผา quota.

> Routing: เอกสารลับ → Local (ถูก + ปลอดภัย); เงิน/quota public หมด → fallback Local. ดู `FEATURES.md` §9.

---

## 6. การจัดสรร & คุม (TOR 3.6)

- **Pool รายปี** ระดับองค์กร: ≤ 500,000 credit (= 500k บาท) — hard cap
- **จัดสรรหลายระดับ**: องค์กร → หน่วยงาน → ผู้ใช้ (รายเดือน, ผลรวม ≤ ระดับบน)
- **แจ้งเตือน 80%** (user + admin) + **quota foresight** (พยากรณ์วันหมด — differentiator)
- **Top-up + approval workflow** (เติม/ขอเพิ่มกลางรอบ)
- **Billing cycle** (เดือน/ไตรมาส) + สรุปสิ้นรอบ
- **รายงานการใช้**: session / user / dept × model, แยก in/out token + credit
- **หักต่อ Agent** แยก (TOR 3.7.7)
- **Cost-before-send** (โชว์ credit โดยประมาณก่อนยิง — differentiator)
- **Cache คำตอบซ้ำ** ไม่เผา credit (optional)

---

## 7. ค่าที่ต้องเคาะในประชุม

1. **markup เท่าไร** — default 1.30; Gov edition ลด? (ราชการอาจคิดต้นทุนล้วน + ค่าดูแล)
2. **FX policy** — fix รายเดือน หรือ live? ใครรับ risk ค่าเงินผันผวน
3. **Local rate** — sunk cost (≈0) หรือ amortize จริง? กระทบ routing เยอะ
4. **1 credit = 1 บาท** โอเค? หรืออยาก decouple (1 credit = ค่าคงที่ ไม่ผูกเงิน เพื่อโชว์ราคาลูกค้าได้อิสระ)
5. **Batch / cached-input discount** ทำ P1 หรือ P2 (ลดต้นทุนจริง 50% / 90%)
6. **>200K context premium** ของ Gemini Pro — คิดแยก tier ไหม

---

## Sources
- [Anthropic — cached pricing (claude-api skill, 2026-06-04)]
- [OpenAI API Pricing](https://openai.com/api/pricing/) · [Morph 2026 breakdown](https://www.morphllm.com/openai-api-pricing)
- [Gemini API Pricing](https://ai.google.dev/gemini-api/docs/pricing)
