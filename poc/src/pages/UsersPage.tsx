import { useState } from "react";
import { type User, type Config } from "../data/model";
import { effective, uid } from "../lib/access";
import { TierBadge } from "../components/TierBadge";
import { PermissionEditor } from "../components/PermissionEditor";

export function UsersPage({ users, setUsers, cfg }: {
  users: User[]; setUsers: (u: User[]) => void; cfg: Config;
}) {
  const [editId, setEditId] = useState<string | null>(null);
  const [creating, setCreating] = useState<User | null>(null);

  const blank = (): User => ({ id: uid("u"), name: "", unitId: cfg.units[0].id, roleK: 1, groupIds: [], active: true });
  const editing = users.find((u) => u.id === editId) ?? null;
  const save = (u: User) => { setUsers(users.map((x) => (x.id === u.id ? u : x))); setEditId(null); };
  const add = (u: User) => { setUsers([...users, u]); setCreating(null); };

  return (
    <>
      <div className="toolbar">
        <span className="muted">{users.length} ผู้ใช้ · คลิกแถวเพื่อเซ็ตสิทธิ์</span>
        <button className="btn" onClick={() => setCreating(blank())}>+ เพิ่มผู้ใช้</button>
      </div>
      <div className="card">
        <table>
          <thead><tr>
            <th>ผู้ใช้</th><th>ตำแหน่ง / หน่วยงาน</th><th>Clearance</th><th>Domain ที่เข้าถึง</th><th>Feature</th>
          </tr></thead>
          <tbody>
            {users.map((u) => {
              const e = effective(u, cfg);
              return (
                <tr key={u.id} className={editId === u.id ? "sel" : ""} onClick={() => setEditId(u.id)}>
                  <td><div className="uname">{u.name || "—"}</div><div className="uid">{u.id}</div></td>
                  <td>
                    <div>{e.role.name}{u.temp && <span className="temp" style={{ marginLeft: 6 }}>ชั่วคราว · {u.temp.until}</span>}</div>
                    <div className="muted" style={{ fontSize: 12.5 }}>{cfg.units.find((x) => x.id === u.unitId)!.name}</div>
                  </td>
                  <td><TierBadge tier={e.clearance} /></td>
                  <td>{e.domains.map((dm) => (<span key={dm} className="dom">{dm}</span>))}</td>
                  <td>{cfg.actions.map((a) => (<span key={a.id} className={`feat ${e.features.includes(a.id) ? "has" : ""}`}>{a.label}</span>))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editing && <PermissionEditor user={editing} cfg={cfg} onClose={() => setEditId(null)} onSave={save} />}
      {creating && <PermissionEditor user={creating} cfg={cfg} isNew onClose={() => setCreating(null)} onSave={add} />}
    </>
  );
}
