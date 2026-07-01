import { useState } from "react";
import { type User, type Config, type Tier, TIERS } from "../data/model";
import { effective, canAccess } from "../lib/access";
import { TierBadge } from "./TierBadge";

const PREVIEW: { name: string; domain: string; tier: Tier }[] = [
  { name: "นโยบายทั่วไป กปน.", domain: "ทั่วไป", tier: 0 },
  { name: "คู่มือปฏิบัติงาน HR", domain: "HR", tier: 0 },
  { name: "บัญชีเงินเดือน (HR)", domain: "HR", tier: 1 },
  { name: "ผลสอบวินัย (HR)", domain: "HR", tier: 2 },
  { name: "งบโครงการน้ำ (การเงิน)", domain: "การเงิน", tier: 1 },
  { name: "แผนความมั่นคงประปา (วิศวกรรม)", domain: "วิศวกรรม", tier: 3 },
];

export function PermissionEditor({ user, cfg, isNew, onClose, onSave }: {
  user: User; cfg: Config; isNew?: boolean; onClose: () => void; onSave: (u: User) => void;
}) {
  const [d, setD] = useState<User>(structuredClone(user));
  const set = (p: Partial<User>) => setD((x) => ({ ...x, ...p }));
  const eff = effective(d, cfg);

  const toggleGroup = (gid: string) =>
    set({ groupIds: d.groupIds.includes(gid) ? d.groupIds.filter((x) => x !== gid) : [...d.groupIds, gid] });
  const toggleTemp = () =>
    set({ temp: d.temp ? undefined : { unitId: cfg.units[0].id, roleK: 2, until: "30 ก.ย. 2569" } });

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-label="แก้ไขสิทธิ์ผู้ใช้">
        <div className="dhead">
          <h2>{isNew ? "เพิ่มผู้ใช้" : d.name}</h2>
          <button className="x" onClick={onClose} aria-label="ปิด">✕</button>
        </div>

        <div className="dbody">
          {isNew && (
            <div className="field">
              <label>ชื่อ-นามสกุล</label>
              <input type="text" value={d.name} placeholder="เช่น สมหญิง รักงาน"
                     onChange={(e) => set({ name: e.target.value })} />
            </div>
          )}

          <div className="field">
            <label>หน่วยงาน / กอง</label>
            <select value={d.unitId} onChange={(e) => set({ unitId: e.target.value })}>
              {cfg.units.map((u) => (<option key={u.id} value={u.id}>{u.name}</option>))}
            </select>
          </div>

          <div className="field">
            <label>ตำแหน่ง / บทบาท (→ clearance + feature)</label>
            <select value={d.roleK} onChange={(e) => set({ roleK: Number(e.target.value) })}>
              {cfg.roles.map((r) => (
                <option key={r.k} value={r.k}>{r.name} — {TIERS[r.clearance].name}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>กลุ่มย่อย (Groups)</label>
            <div className="checks">
              {cfg.groups.map((g) => {
                const on = d.groupIds.includes(g.id);
                return (
                  <label key={g.id} className={`check ${on ? "on" : ""}`}>
                    <input type="checkbox" checked={on} onChange={() => toggleGroup(g.id)} />
                    <span>{g.name}<br /><small className="muted">+ domain: {g.domains.join(", ")}</small></span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="field">
            <label>ตำแหน่งชั่วคราว (ช่วยราชการ)</label>
            <div className={`tempbox ${d.temp ? "on" : ""}`}>
              <label className="check" style={{ border: 0, padding: 0, background: "none" }}>
                <input type="checkbox" checked={!!d.temp} onChange={toggleTemp} />
                <span>เปิดสิทธิ์ชั่วคราว (มีวันหมดอายุ)</span>
              </label>
              {d.temp && (
                <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
                  <select value={d.temp.unitId} onChange={(e) => set({ temp: { ...d.temp!, unitId: e.target.value } })}>
                    {cfg.units.map((u) => (<option key={u.id} value={u.id}>{u.name}</option>))}
                  </select>
                  <select value={d.temp.roleK} onChange={(e) => set({ temp: { ...d.temp!, roleK: Number(e.target.value) } })}>
                    {cfg.roles.map((r) => (<option key={r.k} value={r.k}>{r.name}</option>))}
                  </select>
                  <input type="text" value={d.temp.until} onChange={(e) => set({ temp: { ...d.temp!, until: e.target.value } })} />
                </div>
              )}
            </div>
          </div>

          <label className="caps">สิทธิ์ที่มีผลจริง</label>
          <div className="eff">
            <div className="row"><span className="k">บทบาทที่ใช้</span><b>{eff.role.name}{eff.isTemp && " (ชั่วคราว)"}</b></div>
            <div className="row"><span className="k">Clearance สูงสุด</span><TierBadge tier={eff.clearance} /></div>
            <div className="row"><span className="k">เข้าถึง Domain</span>
              <span>{eff.domains.map((x) => (<span key={x} className="dom">{x}</span>))}</span></div>
            <div className="row"><span className="k">Feature</span>
              <span>{cfg.actions.map((a) => (<span key={a.id} className={`feat ${eff.features.includes(a.id) ? "has" : ""}`}>{a.label}</span>))}</span></div>
          </div>

          <div className="prev">
            <label className="caps" style={{ display: "block", margin: "16px 0 6px" }}>ทดสอบ: เห็นเอกสารไหนบ้าง</label>
            {PREVIEW.map((doc) => {
              const r = canAccess(d, doc, cfg);
              return (
                <div key={doc.name} className={`srow ${r.allow ? "" : "deny"}`}>
                  <span className="mark">{r.allow ? "✅" : "🔒"}</span>
                  <span className="nm">{doc.name}<small>{doc.domain} · {TIERS[doc.tier].name} · {r.allow ? "เห็นได้" : !r.domainOk ? "ไม่มีสิทธิ์ domain" : "clearance ไม่ถึง"}</small></span>
                </div>
              );
            })}
          </div>

          <p className="hint">💡 สิทธิ์ผูกกับ <b>ตำแหน่ง+กอง</b> ไม่ใช่ตัวบุคคล — โยกย้าย ต.ค. ปรับเอง. เอกสารที่ไม่มีสิทธิ์จะไม่โผล่ใน search/AI/citation.</p>
        </div>

        <div className="dfoot">
          <button className="btn ghost" onClick={onClose}>ยกเลิก</button>
          <button className="btn" onClick={() => onSave(d)} disabled={isNew && !d.name.trim()}>
            {isNew ? "เพิ่มผู้ใช้" : "บันทึกสิทธิ์"}
          </button>
        </div>
      </aside>
    </>
  );
}
