import { useState } from "react";
import {
  type Collection, type Config, type Tier, type User, type Node, type FolderNode, type CollectionAccess,
  TIERS,
} from "../data/model";
import { uid, flattenFiles, canViewFile, collectionScope, effective, hasFeature } from "../lib/access";
import { TierBadge } from "../components/TierBadge";

type Tab = "tree" | "perm" | "policy";

// ---- immutable tree helpers ----
function mapNode(node: Node, id: string, fn: (n: Node) => Node): Node {
  if (node.id === id) return fn(node);
  if (node.kind === "folder") return { ...node, children: node.children.map((c) => mapNode(c, id, fn)) };
  return node;
}
function addChild(root: FolderNode, folderId: string, child: Node): FolderNode {
  return mapNode(root, folderId, (n) =>
    n.kind === "folder" ? { ...n, children: [...n.children, child] } : n
  ) as FolderNode;
}
function listFolders(node: Node, depth = 0): { f: FolderNode; depth: number }[] {
  if (node.kind !== "folder") return [];
  return [{ f: node, depth }, ...node.children.flatMap((c) => listFolders(c, depth + 1))];
}

export function CollectionsPage({ cols, setCols, cfg, users }: {
  cols: Collection[]; setCols: (c: Collection[]) => void; cfg: Config; users: User[];
}) {
  const [actingId, setActingId] = useState<string>(users.find((u) => u.roleK === 2)?.id ?? users[0].id);
  const acting = users.find((u) => u.id === actingId)!;
  const actEff = effective(acting, cfg);
  const canManage = hasFeature(acting, "ManageCollection", cfg);
  const ceiling = actEff.clearance; // ตั้งชั้นได้ไม่เกิน clearance ตัวเอง
  const tierOpts = (current: Tier) =>
    TIERS.filter((t) => t.k <= ceiling || t.k === current); // ≤ เพดาน (+ ค่าปัจจุบันถ้าสูงกว่า)

  const [selId, setSelId] = useState<string>(cols[0]?.id ?? "");
  const [tab, setTab] = useState<Tab>("tree");
  const [exp, setExp] = useState<Set<string>>(new Set(["r-hr", "f-gen", "f-pay", "f-disc", "r-fin", "r-eng"]));
  const [permNode, setPermNode] = useState<string>("");

  const sel = cols.find((c) => c.id === selId) ?? null;
  const patch = (c: Collection) => setCols(cols.map((x) => (x.id === c.id ? c : x)));
  const setRoot = (root: FolderNode) => sel && patch({ ...sel, root });
  const toggle = (id: string) => setExp((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const fileCtx = sel ? flattenFiles(sel) : [];
  const effTierOf = (fid: string) => fileCtx.find((x) => x.file.id === fid)?.effTier ?? 0;

  // ---- tree render ----
  const renderNode = (node: Node, depth: number): React.ReactNode => {
    const pad = { paddingLeft: 8 + depth * 20 };
    if (node.kind === "file") {
      const eff = effTierOf(node.id);
      const own = node.tier;
      return (
        <div className="trow" key={node.id} style={pad}>
          <span className="tic">📄</span>
          <span className="tname">{node.name} <small className="muted">{node.type}</small></span>
          <span className="tmid">
            <select value={own} disabled={!canManage} onChange={(e) => setRoot(mapNode(sel!.root, node.id, (n) => ({ ...n, tier: Number(e.target.value) as Tier })) as FolderNode)}>
              {tierOpts(own).map((t) => (<option key={t.k} value={t.k}>{t.name}</option>))}
            </select>
          </span>
          <span className="tend">
            <TierBadge tier={eff} />
            {eff !== own && <span className="inh" title="ยกชั้นจากโฟลเดอร์แม่">↑ inherit</span>}
          </span>
        </div>
      );
    }
    const open = exp.has(node.id);
    const override = !!node.access;
    return (
      <div key={node.id}>
        <div className="trow folder" style={pad}>
          <button className="caret" onClick={() => toggle(node.id)}>{open ? "▾" : "▸"}</button>
          <span className="tic">📁</span>
          <span className="tname">{node.name}
            {node.tier ? <span className="floor">floor: {TIERS[node.tier].name}</span> : null}
            {override && <span className="ovr">{node.access!.mode === "restricted" ? "🔒 restricted" : "✚ exception"}</span>}
          </span>
          <span className="tmid">
            <button className="mini" onClick={() => { const c: Node = { id: uid("d"), kind: "file", name: "เอกสารใหม่", type: "PDF", tier: 0 }; setRoot(addChild(sel!.root, node.id, c)); setExp((s) => new Set(s).add(node.id)); }}>+ ไฟล์</button>
            <button className="mini" onClick={() => { const c: Node = { id: uid("f"), kind: "folder", name: "โฟลเดอร์ใหม่", children: [] }; setRoot(addChild(sel!.root, node.id, c)); setExp((s) => new Set(s).add(node.id)); }}>+ โฟลเดอร์</button>
          </span>
          <span className="tend" />
        </div>
        {open && node.children.map((c) => renderNode(c, depth + 1))}
      </div>
    );
  };

  // perm: selected folder
  const folders = sel ? listFolders(sel.root) : [];
  const pnode = (folders.find((x) => x.f.id === permNode)?.f) ?? sel?.root ?? null;
  const setAccess = (acc: CollectionAccess | undefined) =>
    sel && pnode && setRoot(mapNode(sel.root, pnode.id, (n) => n.kind === "folder" ? { ...n, access: acc } : n) as FolderNode);

  const [adding, setAdding] = useState(false);
  const [nName, setNName] = useState("");
  const [nDomain, setNDomain] = useState(cfg.domains[1] ?? cfg.domains[0]);
  const addCol = () => {
    if (!nName.trim() || !canManage) return;
    const domain = actEff.domains.includes(nDomain) ? nDomain : actEff.domains[0];
    const c: Collection = { id: uid("c"), name: nName.trim(), domain,
      root: { id: uid("r"), kind: "folder", name: nName.trim() + " (root)", access: { mode: "domain", allowGroupIds: [], allowUserIds: [] }, children: [] },
      policy: { chunk: "512 / 128", retention: 3650, allowInternet: false, secretLocalOnly: true } };
    setCols([...cols, c]); setSelId(c.id); setAdding(false); setNName("");
  };

  return (
    <>
      <div className="actbar">
        <span className="lbl2">ทำในนาม (จำลอง):</span>
        <select value={actingId} onChange={(e) => setActingId(e.target.value)} style={{ width: "auto" }}>
          {users.map((u) => (<option key={u.id} value={u.id}>{u.name}</option>))}
        </select>
        <span className="actinfo">
          {canManage ? <span className="okpill">✓ สร้าง/จัดการ Collection ได้</span> : <span className="nopill">✕ ไม่มีสิทธิ์จัดการ</span>}
          {" · "}ตั้งชั้นได้ถึง <b>{TIERS[ceiling].name}</b>
          {" · "}domain: {actEff.domains.map((d) => (<span key={d} className="dom">{d}</span>))}
        </span>
      </div>
      <div className="toolbar">
        <span className="muted">{cols.length} collection · tree (folder + file)</span>
        <button className="btn" onClick={() => setAdding(true)} disabled={!canManage}
                title={canManage ? "" : "ตำแหน่งนี้ไม่มีสิทธิ์จัดการ Collection"}>+ สร้าง Collection</button>
      </div>
      {adding && (
        <div className="card" style={{ marginBottom: 16, padding: 16 }}>
          <div className="addcol">
            <input type="text" placeholder="ชื่อ collection" value={nName} onChange={(e) => setNName(e.target.value)} />
            <select value={actEff.domains.includes(nDomain) ? nDomain : actEff.domains[0]} onChange={(e) => setNDomain(e.target.value)}>
              {actEff.domains.map((d) => (<option key={d} value={d}>Domain: {d}</option>))}
            </select>
            <button className="btn" onClick={addCol} disabled={!nName.trim()}>สร้าง</button>
            <button className="btn ghost" onClick={() => setAdding(false)}>ยกเลิก</button>
          </div>
        </div>
      )}

      <div className="cols-layout">
        <div className="collist">
          {cols.map((c) => (
            <button key={c.id} className={`colcard ${c.id === selId ? "on" : ""}`} onClick={() => { setSelId(c.id); setTab("tree"); setPermNode(""); }}>
              <b>{c.name}</b>
              <div><span className="dom">{c.domain}</span>
                <span className="muted" style={{ fontSize: 12 }}>{flattenFiles(c).length} ไฟล์{c.root.access!.mode === "restricted" ? " · 🔒" : ""}</span></div>
            </button>
          ))}
        </div>

        {sel && (
          <div className="card coldetail">
            <div className="coldhd">
              <h2 style={{ margin: 0, fontSize: 19 }}>{sel.name}</h2>
              <span className="dom" style={{ marginTop: 6, display: "inline-block" }}>Domain: {sel.domain}</span>
            </div>
            <div className="subtabs">
              <button className={tab === "tree" ? "on" : ""} onClick={() => setTab("tree")}>โครงสร้าง (Tree)</button>
              <button className={tab === "perm" ? "on" : ""} onClick={() => setTab("perm")}>สิทธิ์เข้าถึง</button>
              <button className={tab === "policy" ? "on" : ""} onClick={() => setTab("policy")}>Policies</button>
            </div>

            {tab === "tree" && (
              <div className="pad">
                <div className="treehd"><span>ชื่อ</span><span>ชั้นของไฟล์</span><span>ชั้นมีผลจริง</span></div>
                <div className="tree">{renderNode(sel.root, 0)}</div>
                <p className="hint">ชั้นความลับ <b>inherit ลง</b>: ไฟล์ในโฟลเดอร์ที่ตั้ง floor จะถูกยกชั้นอัตโนมัติ (↑). ตั้ง floor ที่โฟลเดอร์ในแท็บสิทธิ์.</p>
              </div>
            )}

            {tab === "perm" && (
              <div className="pad">
                <div className="cols2">
                  {/* folder picker + access editor */}
                  <div>
                    <label className="caps" style={{ display: "block", marginBottom: 6 }}>เลือกโฟลเดอร์เพื่อตั้งสิทธิ์</label>
                    <div className="checks" style={{ maxHeight: 150, overflow: "auto", marginBottom: 12 }}>
                      {folders.map(({ f, depth }) => (
                        <button key={f.id} className={`folderpick ${(pnode?.id === f.id) ? "on" : ""}`} style={{ paddingLeft: 10 + depth * 16 }} onClick={() => setPermNode(f.id)}>
                          📁 {f.name} {f.access ? <span className="ovr">{f.access.mode === "restricted" ? "🔒" : "✚"}</span> : <span className="muted" style={{ fontSize: 11 }}>(inherit)</span>}
                        </button>
                      ))}
                    </div>

                    {pnode && (
                      <>
                        <label className="caps" style={{ display: "block", marginBottom: 6 }}>ชั้นขั้นต่ำของโฟลเดอร์ (floor → inherit ลง)</label>
                        <select value={pnode.tier ?? ""} disabled={!canManage} onChange={(e) => setRoot(mapNode(sel.root, pnode.id, (n) => n.kind === "folder" ? { ...n, tier: e.target.value === "" ? undefined : Number(e.target.value) as Tier } : n) as FolderNode)} style={{ marginBottom: 12 }}>
                          <option value="">— ไม่กำหนด —</option>
                          {tierOpts((pnode.tier ?? 0) as Tier).map((t) => (<option key={t.k} value={t.k}>{t.name}</option>))}
                        </select>

                        <label className="check" style={{ marginBottom: 10 }}>
                          <input type="checkbox" checked={!!pnode.access} disabled={pnode.id === sel.root.id}
                            onChange={(e) => setAccess(e.target.checked ? { mode: "domain", allowGroupIds: [], allowUserIds: [] } : undefined)} />
                          <span>กำหนดสิทธิ์ที่นี่ (override) {pnode.id === sel.root.id && <small className="muted">— root ต้องมีเสมอ</small>}<br /><small className="muted">ไม่ติ๊ก = inherit จากแม่</small></span>
                        </label>

                        {pnode.access && (
                          <>
                            <div className="modepick" style={{ marginBottom: 10 }}>
                              {([["domain", "ตาม domain + exception"], ["restricted", "เฉพาะที่กำหนด"]] as const).map(([m, lb]) => (
                                <label key={m} className={`check ${pnode.access!.mode === m ? "on" : ""}`}>
                                  <input type="radio" checked={pnode.access!.mode === m} onChange={() => setAccess({ ...pnode.access!, mode: m })} /><span>{lb}</span>
                                </label>
                              ))}
                            </div>
                            <label className="caps" style={{ display: "block", margin: "4px 0 6px" }}>เฉพาะกลุ่ม</label>
                            <div className="chipwrap">
                              {cfg.groups.map((g) => {
                                const on = pnode.access!.allowGroupIds.includes(g.id);
                                return <span key={g.id} className={`dom pick ${on ? "on" : ""}`} onClick={() => setAccess({ ...pnode.access!, allowGroupIds: on ? pnode.access!.allowGroupIds.filter((x) => x !== g.id) : [...pnode.access!.allowGroupIds, g.id] })}>{on ? "✓ " : ""}{g.name}</span>;
                              })}
                            </div>
                            <label className="caps" style={{ display: "block", margin: "10px 0 6px" }}>เฉพาะบุคคล</label>
                            <div className="chipwrap">
                              {users.map((u) => {
                                const on = pnode.access!.allowUserIds.includes(u.id);
                                return <span key={u.id} className={`dom pick ${on ? "on" : ""}`} onClick={() => setAccess({ ...pnode.access!, allowUserIds: on ? pnode.access!.allowUserIds.filter((x) => x !== u.id) : [...pnode.access!.allowUserIds, u.id] })}>{on ? "✓ " : ""}{u.name}</span>;
                              })}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>

                  {/* per-user preview over whole tree */}
                  <div>
                    <label className="caps" style={{ display: "block", marginBottom: 6 }}>ผลจริง: ใครเห็นกี่ไฟล์ (ทั้ง collection)</label>
                    <table>
                      <thead><tr><th>ผู้ใช้</th><th>เข้า root?</th><th>เห็นไฟล์</th></tr></thead>
                      <tbody>
                        {users.map((u) => {
                          const s = collectionScope(u, sel, cfg);
                          const vis = fileCtx.filter((fx) => canViewFile(u, sel, fx, cfg).allow).length;
                          return (
                            <tr key={u.id} style={{ cursor: "default" }}>
                              <td style={{ fontWeight: 600 }}>{u.name}</td>
                              <td>{s.inScope ? <span className="okpill">✓</span> : <span className="nopill">✕</span>} <small className="muted">{s.reason}</small></td>
                              <td><b>{vis}</b> <span className="muted">/ {fileCtx.length}</span></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <p className="hint" style={{ marginTop: 12 }}>⚠️ exception แตะแค่ขอบเขต — <b>ชั้นความลับยังบังคับ</b>. โฟลเดอร์ override จะตัด/เพิ่มสิทธิ์เฉพาะ subtree นั้น.</p>
                  </div>
                </div>
              </div>
            )}

            {tab === "policy" && (
              <div className="pad pol">
                <div className="polrow"><div className="lbl"><b>กฎการแบ่ง chunk</b><small>token splitter (bge-m3)</small></div>
                  <input className="stub-input" value={sel.policy.chunk} onChange={(e) => patch({ ...sel, policy: { ...sel.policy, chunk: e.target.value } })} /></div>
                <div className="polrow"><div className="lbl"><b>Retention (วัน)</b><small>ลบอัตโนมัติเมื่อครบ</small></div>
                  <input className="stub-input" value={sel.policy.retention} onChange={(e) => patch({ ...sel, policy: { ...sel.policy, retention: Number(e.target.value) || 0 } })} /></div>
                <div className="polrow"><div className="lbl"><b>อนุญาตนำเข้าจากอินเทอร์เน็ต</b><small>รับ external source</small></div>
                  <div className={`toggle ${sel.policy.allowInternet ? "" : "off"}`} onClick={() => patch({ ...sel, policy: { ...sel.policy, allowInternet: !sel.policy.allowInternet } })} /></div>
                <div className="polrow"><div className="lbl"><b>เอกสารลับ → Local Model เท่านั้น</b><small>ห้ามออก Public model</small></div>
                  <div className={`toggle ${sel.policy.secretLocalOnly ? "" : "off"}`} onClick={() => patch({ ...sel, policy: { ...sel.policy, secretLocalOnly: !sel.policy.secretLocalOnly } })} /></div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
