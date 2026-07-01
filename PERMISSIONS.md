# ปราญช์ — Permission Model (จากที่ประชุม 2026-06-25)

> 📂 [📌 **FEATURES** (ไฟล์หลัก)](FEATURES.md) · [SUMMARY](SUMMARY.md) · [VISION](VISION.md) · [ROADMAP](ROADMAP.md) · [PRICING](PRICING.md)

โมเดลสิทธิ์ = **ABAC (attribute-based)** — สิทธิ์คำนวณจาก *attribute* ของ user (ตำแหน่ง/หน่วยงาน/กลุ่ม) × *attribute* ของเอกสาร (domain/tier) ไม่ผูกรายบุคคล → **admin จัดการง่าย, รองรับโยกย้าย ต.ค.**. ตอบ TOR 3.2.6, 3.3.4.2, 3.3.5, 3.9.

---

## 1. แกนสิทธิ์ข้อมูล — 2 แกน (ต้องครบทั้งคู่)
- **Domain** = หัวข้อ/ประเด็น/กลุ่มข้อมูล (≈ collection) — จำกัดว่าใครเข้าส่วนงานไหนได้
- **Tier (ชั้นความลับ)** = ทั่วไป(ไม่ลับ) / ลับ / ลับมาก / ลับที่สุด (3 ชั้นลับตามระเบียบฯ 2544 + ระดับทั่วไป)

**กฎตัดสิน (deny-by-default):**
```
เห็น/ใช้เอกสารได้  ⟺  user มีสิทธิ์ใน domain ของเอกสาร
                    AND  tier clearance ของ user ≥ tier ของเอกสาร
                    AND  มี feature-right ของ action นั้น (ดู §3)
```
เอกสารติดหลาย domain/tier → **most-restrictive wins**.

## 2. ผูกกับโครงสร้างองค์กร (หัวใจ)
สิทธิ์ผูกกับ **"ตำแหน่ง" + "หน่วยงาน (กอง/แผนก)"** ไม่ใช่ตัวบุคคล:
- **org chart = source of truth** (sync จากระบบ HR / AD / LDAP)
- **โยกย้าย/เลื่อนระดับ (ต.ค.)** → สิทธิ์ปรับตามตำแหน่งใหม่ **อัตโนมัติ** (admin ไม่ต้องตั้งใหม่รายคน)
- **คนใหม่สวมตำแหน่งเดิม** → ได้สิทธิ์ตามตำแหน่งทันที
- **ช่วยราชการ (ชั่วคราว)** → เปิด **"ตำแหน่งชั่วคราว" (time-boxed)** ให้สิทธิ์เท่าที่จำเป็น มีวันหมดอายุ

## 3. Feature Rights (สิทธิ์ระดับการใช้งาน — แกนแยก)
- **Action**: View · Chat (ถาม AI) · Edit/Update · Connector · **ManageCollection (สร้าง/จัดการ Collection)**
- **กลุ่มผู้ใช้ตามระดับ**: Officer (เจ้าหน้าที่) · Executive (ผู้บริหาร) — สิทธิ์ feature ต่างกัน
- **กลุ่มย่อย (Groups)**: สร้างในแผนกได้ (HR, Design) → แชร์เอกสารเฉพาะในกลุ่ม

### 3.1 การสร้าง Collection — ใครสร้างได้ + ระดับไหน
- **ใครสร้างได้** = role ที่มี feature `ManageCollection` (default: ผู้จัดการขึ้นไป / role "Knowledge Admin ประจำกอง"). เจ้าหน้าที่สร้างไม่ได้.
- **สร้างได้ระดับไหน — คุม 2 เพดานตามสิทธิ์ตัวเอง:**
  - **เพดาน domain** — สร้างได้เฉพาะ domain ที่ตัวเองเข้าถึง (ผจก.HR สร้าง domain HR ได้ / การเงินไม่ได้)
  - **เพดานชั้นความลับ** — ตั้งชั้น (folder floor / file tier) **ไม่เกิน clearance ตัวเอง** (clearance ลับ → ตั้งได้ถึงลับ, ไม่ถึงลับที่สุด)
- **ผู้สร้าง = owner** → จัดการ (เพิ่มไฟล์/โฟลเดอร์/ตั้ง exception) ใน collection นั้น
- **สร้างซ้อน (sub-folder)** — ต้องมีสิทธิ์ในตัวแม่ + ชั้นลูก ≥ floor ของแม่ (inherit)
- **ยกเว้น Super/Knowledge Admin** (ผู้บริหาร/ทีมกลาง) — สร้างข้าม domain + ทุกชั้นได้

```
สร้าง collection ได้ ⟺ มี feature ManageCollection
   AND  domain ที่จะสร้าง ∈ user.domains
   AND  ชั้นที่ตั้ง ≤ user.clearance
```
> ประเด็นเคาะ: ทุก ผจก.สร้างได้ หรือจำกัด role เฉพาะ · ต้อง approve ก่อนใช้ไหม · ใครสร้าง "ลับที่สุด" ได้ (จำกัด + break-glass)

## 4. ตัวอย่างผสม (AND logic)
เอกสารเงินเดือน: domain = **HR**, tier = **ลับ**
→ เห็นได้ต้องครบ 2: **อยู่กลุ่ม HR** AND **ตำแหน่ง ≥ Manager**
→ เจ้าหน้าที่ (Staff) ในกลุ่ม HR **ไม่เห็น** เอกสารติดแท็ก "ลับ"

## 5. ผูกกับ AI (สำคัญ — ตอบ TOR 3.2.6 / 3.9.3)
- **Retrieval-time enforcement**: เอกสารที่ user ไม่มีสิทธิ์ **ไม่โผล่ใน search, ไม่ถูก AI ดึงมา, ไม่ถูกอ้างใน citation**
- **Routing**: tier ผูกกับ model routing (§9) — ลับ → Local เท่านั้น, ห้ามออก Public
- **Personal Memory / Artifacts / Skills** เคารพกฎเดียวกัน — ไม่ bypass

---

## เป้าหมาย
> **admin จัดการง่าย + รองรับการโยกย้ายบุคลากรราชการ** โดยไม่ต้องตั้งค่าใหม่ทุกครั้ง.

---

## ⚙️ Config surface — ช่องที่ต้องเป็น Dynamic (ตั้งค่าได้ ไม่ hardcode)

| # | ช่อง | ควรตั้งได้ | สถานะ PoC |
|---|---|---|---|
| 1 | **หน่วยงาน/กอง + ผูก domain** | เพิ่ม/แก้กอง, map domain (= ผังองค์กร, sync HR/AD) | ✅ ทำแล้ว (หน้า สิทธิ์&บทบาท) |
| 2 | **ชุด Action/Feature** | เพิ่ม action (Export/Download/Delete/Ingest/Share/ใช้ Model X) | ✅ ทำแล้ว (เพิ่ม action ได้) |
| 3 | **บทบาท (Role) → clearance + actions** | แก้/เพิ่มบทบาท | ✅ (แก้ clearance/action) |
| 4 | **Clearance = global หรือ per-domain** | toggle นโยบาย | ✅ ทำแล้ว (global/unitOnly) |
| 5 | **Domain / Group** | เพิ่ม/แก้ | ✅ |
| 6 | **Collection access / exception / folder floor** | ต่อ node | ✅ |
| 7 | **Tier → Model routing** (ลับ→Local) | map ต่อชั้น (ผูก §9 routing) | ⬜ ยัง (นัยยะใน policy toggle) |
| 8 | **Retention ต่อชั้นความลับ** | default วันเก็บต่อ tier | ⬜ (ตอนนี้ต่อ collection) |
| 9 | **Approval workflow** | เปิด-ปิด "ต้องอนุมัติก่อน publish / สร้างลับที่สุด" | ⬜ |
| 10 | **ชั้นความลับ scheme** | label/จำนวนชั้น (เผื่อ "ภายใน/ใช้เฉพาะกลุ่ม") | ⬜ |
| + | **Break-glass / รักษาการ (delegation)** | policy (ใคร/ล็อก/หมดอายุ) | ⬜ (มี "ตำแหน่งชั่วคราว" แล้ว) |
| + | **ค่า default ตอนสร้าง collection** | tier/access mode เริ่มต้น | ⬜ |

> หลักคิด: **ทุกอย่างที่ต่างกันตามองค์กร/หน่วยงาน = ต้อง config ได้** ไม่ฝังใน code — ให้แอดมินตั้งเองผ่านหน้าจอ.

---

## ⚠️ จุดที่ต้องเคาะต่อ (senior flag)
1. **Tier clearance มาจากไหน** — ผูกกับ "ระดับตำแหน่ง" (global: ระดับ ≥ X เห็น tier Y) หรือ **per-domain** (เป็น Manager กอง HR ไม่ได้แปลว่าเห็นลับของกองการเงิน)? → แนะ **per-domain clearance** (ปลอดภัยกว่า, ตรงหลัก least-privilege 3.3.4.2)
2. **รักษาการ/มอบหมายงาน (acting)** — ต่างจากช่วยราชการไหม? ต้องมี delegation แบบ time-boxed + audit
3. **Break-glass** — เข้าถึง "ลับที่สุด" ฉุกเฉิน → log พิเศษ + แจ้งเตือน เจ้าของ
4. **Edit ≠ View** — แก้ได้ต้องเห็นก่อน? Edit clearance สัมพันธ์กับ tier ยังไง
5. **เอกสาร cross-domain** — ติดหลายกอง → ใครเห็น (union/intersection)? ยืนยัน most-restrictive
6. **Owner/ผู้สร้าง** — สร้างเอกสารแล้วตั้ง tier เกินสิทธิ์ตัวเองได้ไหม
7. **Sync org chart** — real-time จาก HR/AD หรือ batch (ต.ค.)? ช่วงเปลี่ยนผ่านจัดการยังไง
8. **Group กับ Domain ทับกันไหม** — HR group = HR domain หรือคนละชั้น? ต้องนิยามให้ชัด

---

## Map TOR
- 3.2.6 per-file RBAC ตาม user/role/dept + เอกสารลับไม่โผล่ search/AI → §1+§5
- 3.3.4.2 RBAC least-privilege หลายระดับ → §2 (position-based)
- 3.3.5 คุมทุก resource (file/model/Data Service/screen) → §1+§3
- 3.9.1 data classification + 3.9.2 routing ตาม tier → §1 tier + §5 routing
