import type { ReactNode } from "react";

export type Page = "users" | "permissions" | "collections";

const MAIN = [
  { i: "◧", label: "แดชบอร์ด" },
  { i: "▤", label: "Collections", page: "collections" as Page },
  { i: "⤓", label: "นำเข้าเอกสาร" },
  { i: "⇄", label: "Connectors" },
  { i: "◎", label: "Search & Chat" },
];
const ADMIN = [
  { i: "⚇", label: "ผู้ใช้", page: "users" as Page },
  { i: "⚿", label: "สิทธิ์ & บทบาท", page: "permissions" as Page },
  { i: "◔", label: "Monitoring" },
  { i: "⚙", label: "ตั้งค่า" },
];
const CRUMB: Record<Page, string> = {
  users: "ผู้ดูแล / ผู้ใช้",
  permissions: "ผู้ดูแล / สิทธิ์ & บทบาท",
  collections: "Collections",
};

export function Shell({ page, onNav, title, meta, actions, children }: {
  page: Page; onNav: (p: Page) => void;
  title: string; meta?: string; actions?: ReactNode; children: ReactNode;
}) {
  const item = (n: { i: string; label: string; page?: Page }) => (
    <a key={n.label}
       className={n.page === page ? "on" : ""}
       onClick={() => n.page && onNav(n.page)}
       style={{ cursor: n.page ? "pointer" : "default", opacity: n.page ? 1 : 0.55 }}>
      <span className="i">{n.i}</span> {n.label}
    </a>
  );

  return (
    <div className="app">
      <aside className="side">
        <div className="brand"><span className="logo">ป</span><div><b>ปราญช์</b><small>Maholan</small></div></div>
        <nav className="nav">
          {MAIN.map(item)}
          <div className="grp">ผู้ดูแล</div>
          {ADMIN.map(item)}
        </nav>
        <div className="me"><span className="av">AD</span><div><b>แอดมินระบบ</b><small>กปน. · Executive</small></div></div>
      </aside>

      <div className="main">
        <header className="top">
          <div className="ws"><span className="dot" /> กปน. (MWA) ▾</div>
          <div className="search">🔍 ค้นหา…</div>
          <div className="spacer" />
          <div className="uav">AD</div>
        </header>
        <div className="content">
          <div className="crumb">{CRUMB[page]}</div>
          <div className="phead"><h1>{title}</h1>{actions}</div>
          {meta && <p className="pmeta">{meta}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}
