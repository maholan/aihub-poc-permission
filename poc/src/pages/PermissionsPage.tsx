import { useState } from "react";
import { type Config, type Tier, type Feature, TIERS } from "../data/model";
import { uid } from "../lib/access";

export function PermissionsPage({ cfg, setCfg }: { cfg: Config; setCfg: (c: Config) => void }) {
  const [newDomain, setNewDomain] = useState("");
  const [gName, setGName] = useState("");
  const [gDomains, setGDomains] = useState<string[]>([]);
  const [aLabel, setALabel] = useState("");
  const [uName, setUName] = useState("");

  const setRole = (k: number, patch: Partial<Config["roles"][number]>) =>
    setCfg({ ...cfg, roles: cfg.roles.map((r) => (r.k === k ? { ...r, ...patch } : r)) });
  const toggleRoleFeat = (k: number, f: Feature) => {
    const r = cfg.roles.find((x) => x.k === k)!;
    setRole(k, { features: r.features.includes(f) ? r.features.filter((x) => x !== f) : [...r.features, f] });
  };
  const addDomain = () => { const v = newDomain.trim(); if (v && !cfg.domains.includes(v)) setCfg({ ...cfg, domains: [...cfg.domains, v] }); setNewDomain(""); };
  const addGroup = () => { if (!gName.trim()) return; setCfg({ ...cfg, groups: [...cfg.groups, { id: uid("g"), name: gName.trim(), domains: gDomains }] }); setGName(""); setGDomains([]); };
  const addAction = () => { const v = aLabel.trim(); if (v && !cfg.actions.some((a) => a.id === v)) setCfg({ ...cfg, actions: [...cfg.actions, { id: v, label: v }] }); setALabel(""); };
  const addUnit = () => { if (!uName.trim()) return; setCfg({ ...cfg, units: [...cfg.units, { id: uid("u"), name: uName.trim(), domains: ["ทั่วไป"] }] }); setUName(""); };
  const toggleUnitDomain = (uid_: string, d: string) => {
    setCfg({ ...cfg, units: cfg.units.map((u) => u.id !== uid_ ? u : { ...u, domains: u.domains.includes(d) ? u.domains.filter((x) => x !== d) : [...u.domains, d] }) });
  };

  return (
    <>
      <div className="toolbar"><span className="muted">นิยามสิทธิ์ส่วนกลาง — ทุกอย่างที่นี่ config ได้ (มีผลทั้งระบบ)</span></div>

      {/* #4 clearance policy */}
      <div className="card" style={{ marginBottom: 16, padding: 16 }}>
        <b>นโยบาย Clearance</b> <span className="muted" style={{ fontSize: 12.5 }}>— clearance ของตำแหน่งมีผลกับ domain ไหนบ้าง</span>
        <div className="modepick" style={{ marginTop: 10 }}>
          {([["global", "ทุก domain (global)", "ระดับตำแหน่งใช้ได้ทุก domain ที่เข้าถึง"], ["unitOnly", "เฉพาะกองต้นสังกัด (per-domain)", "domain ที่ได้จากกลุ่ม เห็นได้แค่ชั้นทั่วไป"]] as const).map(([m, lb, hint]) => (
            <label key={m} className={`check ${cfg.clearanceMode === m ? "on" : ""}`}>
              <input type="radio" checked={cfg.clearanceMode === m} onChange={() => setCfg({ ...cfg, clearanceMode: m })} />
              <span>{lb}<br /><small className="muted">{hint}</small></span>
            </label>
          ))}
        </div>
      </div>

      {/* roles */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="cardhd"><b>บทบาท / ระดับตำแหน่ง</b><span className="muted">clearance + สิทธิ์ (action)</span></div>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead><tr><th>บทบาท</th><th>Clearance</th>{cfg.actions.map((a) => (<th key={a.id} style={{ textAlign: "center", fontSize: 10.5 }}>{a.label}</th>))}</tr></thead>
            <tbody>
              {cfg.roles.map((r) => (
                <tr key={r.k} style={{ cursor: "default" }}>
                  <td style={{ fontWeight: 700 }}>{r.name}</td>
                  <td><select value={r.clearance} onChange={(e) => setRole(r.k, { clearance: Number(e.target.value) as Tier })} style={{ width: 130 }}>
                    {TIERS.map((t) => (<option key={t.k} value={t.k}>{t.name}</option>))}</select></td>
                  {cfg.actions.map((a) => (
                    <td key={a.id} style={{ textAlign: "center" }}>
                      <input type="checkbox" checked={r.features.includes(a.id)} onChange={() => toggleRoleFeat(r.k, a.id)} style={{ width: 17, height: 17, accentColor: "var(--teal)" }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="addrow" style={{ padding: 16 }}>
          <input type="text" value={aLabel} placeholder="เพิ่ม action เช่น ลบเอกสาร / นำเข้า / ใช้ Model X" onChange={(e) => setALabel(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addAction()} />
          <button className="btn ghost" onClick={addAction}>+ เพิ่ม action</button>
        </div>
      </div>

      {/* units (org structure) */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="cardhd"><b>หน่วยงาน / กอง (ผังองค์กร)</b><span className="muted">กอง → เข้าถึง domain ไหน (sync HR/AD ในระบบจริง)</span></div>
        <div style={{ padding: 16 }}>
          {cfg.units.map((u) => (
            <div key={u.id} className="unitrow">
              <b>{u.name}</b>
              <div className="chipwrap">
                {cfg.domains.map((d) => {
                  const on = u.domains.includes(d);
                  return <span key={d} className={`dom pick ${on ? "on" : ""}`} onClick={() => toggleUnitDomain(u.id, d)}>{on ? "✓ " : ""}{d}</span>;
                })}
              </div>
            </div>
          ))}
          <div className="addrow" style={{ marginTop: 6 }}>
            <input type="text" value={uName} placeholder="เพิ่มกอง เช่น กองกฎหมาย" onChange={(e) => setUName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addUnit()} />
            <button className="btn ghost" onClick={addUnit}>+ เพิ่มกอง</button>
          </div>
        </div>
      </div>

      <div className="cols2">
        <div className="card">
          <div className="cardhd"><b>Domain</b></div>
          <div style={{ padding: 16 }}>
            <div className="chipwrap">{cfg.domains.map((d) => (<span key={d} className="dom">{d}</span>))}</div>
            <div className="addrow"><input type="text" value={newDomain} placeholder="เพิ่ม domain" onChange={(e) => setNewDomain(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addDomain()} /><button className="btn ghost" onClick={addDomain}>+ เพิ่ม</button></div>
          </div>
        </div>
        <div className="card">
          <div className="cardhd"><b>กลุ่มย่อย (Groups)</b><span className="muted">grant domain cross-cut</span></div>
          <div style={{ padding: 16 }}>
            {cfg.groups.map((g) => (<div key={g.id} className="grouprow"><b>{g.name}</b><span>{g.domains.map((d) => (<span key={d} className="dom">{d}</span>))}</span></div>))}
            <div className="newgroup">
              <input type="text" value={gName} placeholder="ชื่อกลุ่มใหม่" onChange={(e) => setGName(e.target.value)} />
              <div className="chipwrap" style={{ margin: "8px 0" }}>
                {cfg.domains.map((d) => { const on = gDomains.includes(d); return <span key={d} className={`dom pick ${on ? "on" : ""}`} onClick={() => setGDomains(on ? gDomains.filter((x) => x !== d) : [...gDomains, d])}>{on ? "✓ " : ""}{d}</span>; })}
              </div>
              <button className="btn ghost" onClick={addGroup} disabled={!gName.trim()}>+ เพิ่มกลุ่ม</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
