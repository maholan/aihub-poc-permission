# ปราญช์ — Credit & Token Pricing Model

> 📂 [📌 **FEATURES** (ไฟล์หลัก)](FEATURES.md) · [SUMMARY](SUMMARY.md) · [VISION](VISION.md) · [ROADMAP](ROADMAP.md) — ดู §9 Routing + §11 Token & Credit

โมเดลคิดเงิน: token → credit ผ่าน **อัตราคูณต่อ model** (แยก input/output). ตอบ TOR 3.5.6 (คำนวณต้นทุนแยก in/out) + 3.6 (เครดิตกลาง ≤ 500,000 บาท/ปี).

> ราคา provider (ด้านล่าง) ดึงจากหน้า official **13 ก.ค. 2026** (Anthropic models overview / OpenAI pricing / Gemini API pricing) — **ผันผวน, ต้อง config ได้** ไม่ hardcode. Admin อัพเดตเมื่อ provider เปลี่ยนราคา/FX.

---

## 1. ราคา provider จริง (USD ต่อ 1M tokens — input / output)

| Provider | Model | Input $/1M | Output $/1M | หมายเหตุ |
|---|---|---|---|---|
| **Anthropic** | Claude Fable 5 | 10.00 | 50.00 | top model |
| | Claude Opus 4.8 (4.7/4.6 legacy ราคาเดียวกัน) | 5.00 | 25.00 | |
| | **Claude Sonnet 5** 🆕 | 3.00 | 15.00 | **intro 2.00/10.00 ถึง 31 ส.ค. 2026** |
| | Claude Sonnet 4.6 (legacy) | 3.00 | 15.00 | |
| | Claude Haiku 4.5 | 1.00 | 5.00 | |
| **OpenAI** | GPT-5.5 | 5.00 | 30.00 | flagship · cached in 0.50 |
| | GPT-5.4 | 2.50 | 15.00 | cached in 0.25 |
| | **GPT-5.4-mini** 🆕 | 0.75 | 4.50 | |
| | **GPT-5.4-nano** 🆕 | 0.20 | 1.25 | |
| **Google** | Gemini 3.1 Pro (≤200K) | 2.00 | 12.00 | >200K: 4.00 / 18.00 |
| | **Gemini 3.5 Flash** 🆕 | 1.50 | 9.00 | แทน 3 Flash (แพงขึ้น 3×) |
| | Gemini 3.1 Flash-Lite | 0.25 | 1.50 | |
| | Gemini 2.5 Flash / Flash-Lite | 0.30 / 0.10 | 2.50 / 0.40 | รุ่นเก่า ยังเปิดขาย — ถูกสุดในตลาด |
| **Local** | self-hosted LLM | — | — | **ไม่หักเครดิต — บันทึก log/รายงานเท่านั้น** (ดู §5) |

> เปลี่ยนจากรอบก่อน (มิ.ย. 2026): **GPT-5 ($1.25/$10) หลุดจากตาราง official** · **Gemini 3 Flash ($0.50/$3) หายไป** — ใครอ้างอิง 2 ตัวนี้ใน routing ต้องแก้.

ส่วนลด official: **Batch −50%** (ทุกค่าย) · **Cached input** OpenAI −90%, Gemini ~−80%(+ค่า storage), Claude cache-read ~0.1×.

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
- `FX` = อัตราแลก USD→THB. default **33.00** — *ตลาดจริง 13 ก.ค. 2026 ≈ 33.38 (BOT/xe) → ตารางในไฟล์นี้ต่ำกว่าจริง ~1.2%*. Production: ดึง FX จริง + buffer 2–3% หรือ fix รายเดือน (ใครรับ risk ค่าเงิน = ข้อเคาะ §7)
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
| Claude Sonnet 5 | 129 | 644 |
| — Sonnet 5 intro (ถึง 31 ส.ค. 69) | 86 | 429 |
| Claude Sonnet 4.6 (legacy) | 129 | 644 |
| Claude Haiku 4.5 | 43 | 215 |
| GPT-5.5 | 215 | 1,287 |
| GPT-5.4 | 107 | 644 |
| GPT-5.4-mini | 32 | 193 |
| GPT-5.4-nano | 9 | 54 |
| Gemini 3.1 Pro (≤200K) | 86 | 515 |
| Gemini 3.1 Pro (>200K) | 172 | 773 |
| Gemini 3.5 Flash | 64 | 386 |
| Gemini 3.1 Flash-Lite | 11 | 64 |
| Gemini 2.5 Flash | 13 | 107 |
| Gemini 2.5 Flash-Lite | 4 | 17 |
| Local LLM | ไม่หัก (log only) | ไม่หัก (log only) |

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

### ตัวอย่าง 4 — เอกสารลับ → Local (ไม่หักเครดิต)
query เดียวกับนาย A (in 4,700 / out 500):
```
เครดิตที่หัก = 0  — Local Model ไม่หักเครดิต
ระบบบันทึกปริมาณ (in 4,700 / out 500 tokens) ลง log + รายงาน เท่านั้น
```
ต้นทุนจริง = ค่าเครื่อง/ไฟ (sunk cost) + ข้อมูลไม่ออกนอกองค์กร. คุมการใช้ด้วย capacity ของ GPU ไม่ใช่เครดิต — ถ้าอนาคตต้องคุมโควตา ค่อยเปิด nominal rate (config) ได้.

### คำถามเดียวกัน ต่าง model = ต่างกัน ~100× (input 4,700 / output 500)
| Model | credit/query | เทียบ |
|---|--:|--:|
| Gemini 2.5 Flash-Lite | 0.03 | 1× (ถูกสุด) |
| GPT-5.4-nano | 0.07 | 2× |
| Gemini 3.1 Flash-Lite | 0.08 | 3× |
| Local | 0 (ไม่หัก — log) | — |
| GPT-5.4-mini | 0.25 | 8× |
| Claude Haiku 4.5 | 0.31 | 10× |
| Gemini 3.5 Flash | 0.50 | 17× |
| Sonnet 5 (intro ถึง ส.ค. 69) | 0.62 | 21× |
| Claude Sonnet 5 / 4.6 | 0.93 | 31× |
| Claude Opus 4.8 | 1.55 | 52× |
| GPT-5.5 | 1.65 | 55× |
| Claude Fable 5 | 3.09 | **~100×** |

→ ตอกย้ำ **Routing Policy** = ตัวคุมต้นทุน: คำถามง่ายส่ง nano/Flash-Lite/Local, ยากจริงค่อย Opus/Fable.

### งบ 500,000 credit/ปี ใช้ได้แค่ไหน
| สมมติใช้ล้วน | credit/query | query/ปี | /เดือน |
|---|--:|--:|--:|
| Sonnet | 0.93 | ~537,000 | ~44,700 |
| Opus | 1.55 | ~322,000 | ~26,900 |
| Mixed (70% Sonnet, 20% Haiku, 10% Opus) | ~0.87 | ~575,000 | ~47,900 |

**ระดับ dept** (50 คน, mix, 10 query/คน/วัน × 22 วัน = 11,000 query/เดือน):
= 11,000 × 0.87 ≈ **9,560 บาท/เดือน** (~114,700/ปี) → จัดสรร quota ต่อ dept ได้สบายภายใต้ cap.

---

## 4.6 Scenario ลูกค้า volume ใหญ่ — 4,000 MTok in + 1,000 MTok out /ปี

(≈ ~1 ล้าน query/ปี — องค์กรใหญ่ใช้จริงจัง)

**สมมติฐานที่ใช้คำนวณ (แสดงคู่ตารางเสมอเมื่อเสนอลูกค้า):**
| ตัวแปร | ค่า |
|---|---|
| ราคา official (USD/1M) | ณ 13 ก.ค. 2026 (ดู §1) |
| **อัตราแลกเปลี่ยน (FX)** | **33.00 ฿/USD** (ตลาดจริง 13 ก.ค. 2026 ≈ 33.38 — ใช้ค่า config; production บวก buffer 2–3%) |
| Markup | 30% (×1.30) |
| สูตรเรต | `฿/1M = USD/1M × 33.00 × 1.30` |
| 1 credit | 1 บาท |

### แจงรายละเอียดต่อ model — แยก Input / Output

| Model | เรต in ฿/1M | เรต out ฿/1M | ค่า Input (4,000M) | ค่า Output (1,000M) | **รวม ฿/ปี** | vs cap 500k |
|---|--:|--:|--:|--:|--:|:--|
| Claude Fable 5 | 429.00 | 2,145.00 | 1,716,000 | 2,145,000 | **3,861,000** | 7.7× 🔴 |
| GPT-5.5 | 214.50 | 1,287.00 | 858,000 | 1,287,000 | **2,145,000** | 4.3× 🔴 |
| Claude Opus 4.8 | 214.50 | 1,072.50 | 858,000 | 1,072,500 | **1,930,500** | 3.9× 🔴 |
| Claude Sonnet 5 / 4.6 | 128.70 | 643.50 | 514,800 | 643,500 | **1,158,300** | 2.3× 🔴 (ต้นทุนดิบไม่รวม markup ~891k — เกิน cap ตั้งแต่ทุน) |
| GPT-5.4 | 107.25 | 643.50 | 429,000 | 643,500 | **1,072,500** | 2.1× 🔴 |
| Gemini 3.1 Pro (≤200K) | 85.80 | 514.80 | 343,200 | 514,800 | **858,000** | 1.7× 🔴 |
| Sonnet 5 *intro (ถึง 31 ส.ค. 69)* | 85.80 | 429.00 | 343,200 | 429,000 | **772,200** | 1.5× 🔴 |
| Gemini 3.5 Flash | 64.35 | 386.10 | 257,400 | 386,100 | **643,500** | 1.3× 🔴 |
| Claude Haiku 4.5 | 42.90 | 214.50 | 171,600 | 214,500 | **386,100** | 77% ✅ |
| GPT-5.4-mini | 32.18 | 193.05 | 128,700 | 193,050 | **321,750** | 64% ✅ |
| Gemini 2.5 Flash | 12.87 | 107.25 | 51,480 | 107,250 | **158,730** | 32% ✅ |
| **Local (on-prem)** | ไม่หัก | ไม่หัก | 0 | 0 | **0** (log 2,400M/600M ถ้ารับ 60%) | ✅ ไม่กินเครดิต |
| Gemini 3.1 Flash-Lite | 10.73 | 64.35 | 42,900 | 64,350 | **107,250** | 21% ✅ |
| GPT-5.4-nano | 8.58 | 53.63 | 34,320 | 53,625 | **87,945** | 18% ✅ |
| Gemini 2.5 Flash-Lite | 4.29 | 17.16 | 17,160 | 17,160 | **34,320** | 7% ✅ ถูกสุด |

**สังเกต:** output แพงกว่า input 5–6× ทุก model — output เป็นแค่ 1/5 ของ volume แต่กินเงินเกินครึ่งเกือบทุกแถว → คุมความยาวคำตอบ (answer style กระชับ) = ประหยัดตรงๆ. ตารางยังไม่หัก batch −50% / cached input.

### ข้อเสนอ routing mix (แนะนำ) — แจง in/out

| ส่วน | Volume in / out | ค่า Input | ค่า Output | รวม |
|---|---|--:|--:|--:|
| **Local 60%** (งานทั่วไป/เอกสารลับ) | 2,400M / 600M | 0 (ไม่หัก) | 0 (ไม่หัก) | 0 |
| **Haiku 30%** (ถาม-ตอบมาตรฐาน) | 1,200M / 300M | 51,480 | 64,350 | 115,830 |
| **Sonnet 5 10%** (งานวิเคราะห์ยาก) | 400M / 100M | 51,480 | 64,350 | 115,830 |
| **รวม** | 4,000M / 1,000M | 102,960 | 128,700 | **231,660 ✅** (46% ของ cap) |

**บทเรียน:** volume ระดับนี้ ตัวชี้ขาดคือ **routing ไม่ใช่ราคา** (ต่าง ~100× ตาม model).

ทางออก:
1. **Routing mix** (ตารางบน) — จุดขาย on-prem: volume หนักให้ GPU องค์กรรับ
2. **Cached input −90% + Batch −50%** — RAG cache hit สูง ลด input cost แรง → ควรขยับเข้า P1/P2 ถ้ามีลูกค้า volume จริง
3. **Enterprise committed-volume tier** — เกิน scale ของ cap 500k (เลข TOR กปน.) → เหมาปี/ลด markup แลก commit. Margin อ้างอิงที่ Sonnet เต็ม volume ≈ 267k/ปี (ก่อนลด)

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
