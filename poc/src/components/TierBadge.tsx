import { TIERS, type Tier } from "../data/model";

export function TierBadge({ tier }: { tier: Tier }) {
  const t = TIERS[tier];
  return (
    <span
      className="badge"
      style={{ background: `${t.color}1A`, color: t.color, borderColor: `${t.color}55` }}
    >
      <span className="tdot" style={{ background: t.color }} />
      {t.name}
    </span>
  );
}
