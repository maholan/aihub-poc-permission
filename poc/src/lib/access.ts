import type {
  User, Feature, Tier, Config, Collection, CollectionAccess, FileNode, Node,
} from "../data/model";

export function effective(u: User, cfg: Config) {
  const unitId = u.temp?.unitId ?? u.unitId;
  const baseRole = cfg.roles.find((r) => r.k === u.roleK)!;
  const tempRole = u.temp ? cfg.roles.find((r) => r.k === u.temp!.roleK)! : null;
  const role = tempRole && tempRole.clearance > baseRole.clearance ? tempRole : baseRole;
  const unit = cfg.units.find((x) => x.id === unitId)!;
  const groupDomains = u.groupIds.flatMap((gid) => cfg.groups.find((g) => g.id === gid)?.domains ?? []);
  const domains = Array.from(new Set([...unit.domains, ...groupDomains]));
  return {
    unit, role, domains,
    clearance: role.clearance as Tier, // ระดับสูงสุด (home)
    unitDomains: unit.domains,
    features: role.features, isTemp: !!u.temp,
  };
}

// #4: clearance ที่มีผลต่อ "domain นั้น"
// global = ใช้ระดับตำแหน่งทุก domain · unitOnly = เต็มเฉพาะ domain ของกองต้นสังกัด, domain จากกลุ่ม = ทั่วไป(0)
export function clearanceForDomain(u: User, domain: string, cfg: Config): Tier {
  const e = effective(u, cfg);
  if (cfg.clearanceMode === "global") return e.clearance;
  return e.unitDomains.includes(domain) ? e.clearance : 0;
}

export function hasFeature(u: User, action: Feature, cfg: Config) {
  return effective(u, cfg).features.includes(action);
}

export function scopeFor(u: User, access: CollectionAccess, domain: string, cfg: Config) {
  const e = effective(u, cfg);
  const domainMatch = e.domains.includes(domain);
  const explicit =
    u.groupIds.some((g) => access.allowGroupIds.includes(g)) || access.allowUserIds.includes(u.id);
  const inScope = access.mode === "restricted" ? explicit : domainMatch || explicit;
  const reason =
    access.mode === "restricted"
      ? explicit ? "อยู่ใน allow-list" : "นอก allow-list (restricted)"
      : domainMatch ? "มีสิทธิ์ domain" : explicit ? "exception (เพิ่มเฉพาะ)" : "ไม่มีสิทธิ์ domain";
  return { inScope, domainMatch, explicit, reason, clearance: clearanceForDomain(u, domain, cfg) };
}

export function collectionScope(u: User, col: Collection, cfg: Config) {
  return scopeFor(u, col.root.access!, col.domain, cfg);
}

export function canAccess(u: User, doc: { domain: string; tier: Tier }, cfg: Config) {
  const e = effective(u, cfg);
  const domainOk = e.domains.includes(doc.domain);
  const tierOk = clearanceForDomain(u, doc.domain, cfg) >= doc.tier;
  return { allow: domainOk && tierOk, domainOk, tierOk };
}

// ---- tree ----
export interface FileCtx { file: FileNode; path: string[]; access: CollectionAccess; effTier: Tier }

export function flattenFiles(col: Collection): FileCtx[] {
  const out: FileCtx[] = [];
  const walk = (node: Node, path: string[], access: CollectionAccess, floor: Tier) => {
    if (node.kind === "file") {
      out.push({ file: node, path, access, effTier: Math.max(node.tier, floor) as Tier });
      return;
    }
    const acc = node.access ?? access;
    const fl = Math.max(floor, node.tier ?? 0) as Tier;
    node.children.forEach((c) => walk(c, [...path, node.name], acc, fl));
  };
  walk(col.root, [], col.root.access!, 0);
  return out;
}

export function canViewFile(u: User, col: Collection, ctx: FileCtx, cfg: Config) {
  const s = scopeFor(u, ctx.access, col.domain, cfg);
  const tierOk = s.clearance >= ctx.effTier;
  return { allow: s.inScope && tierOk, scopeOk: s.inScope, tierOk, reason: s.reason };
}

export const uid = (p: string) => p + "-" + Math.random().toString(36).slice(2, 8);
