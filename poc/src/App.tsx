import { useState } from "react";
import { Shell, type Page } from "./components/Shell";
import { UsersPage } from "./pages/UsersPage";
import { PermissionsPage } from "./pages/PermissionsPage";
import { CollectionsPage } from "./pages/CollectionsPage";
import {
  type User, type Config, type Collection,
  initialUsers, initialConfig, initialCollections,
} from "./data/model";
import "./styles.css";

const TITLES: Record<Page, string> = {
  users: "ผู้ใช้ & สิทธิ์การเข้าถึง",
  permissions: "สิทธิ์ & บทบาท (Permission Model)",
  collections: "Collections",
};

export default function App() {
  const [page, setPage] = useState<Page>("users");
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [cfg, setCfg] = useState<Config>(initialConfig);
  const [cols, setCols] = useState<Collection[]>(initialCollections);

  return (
    <Shell page={page} onNav={setPage} title={TITLES[page]}>
      {page === "users" && <UsersPage users={users} setUsers={setUsers} cfg={cfg} />}
      {page === "permissions" && <PermissionsPage cfg={cfg} setCfg={setCfg} />}
      {page === "collections" && <CollectionsPage cols={cols} setCols={setCols} cfg={cfg} users={users} />}
    </Shell>
  );
}
