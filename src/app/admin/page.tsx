import { prisma } from "@/lib/prisma";
import { event } from "@/lib/event";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("fr-BE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Brussels",
});

export default async function AdminPage() {
  const registrations = await prisma.registration.findMany({
    orderBy: { createdAt: "asc" },
  });

  const total = registrations.length;
  const veg = registrations.filter((r) => r.vegetarian).length;
  const nonVeg = total - veg;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-fami-forest">
            Inscriptions — {event.name}
          </h1>
          <p className="text-sm text-fami-forest/60">
            {event.dateLabel} · {event.timeLabel}
          </p>
        </div>
        <a
          href="/api/export"
          className="rounded-xl bg-fami-green px-5 py-3 font-bold text-white shadow-md transition hover:bg-fami-green-dark"
        >
          ⬇︎ Exporter pour le traiteur (Excel/CSV)
        </a>
      </div>

      {/* Compteurs */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <Stat label="Total" value={total} highlight />
        <Stat label="Végétariens" value={veg} />
        <Stat label="Non-végé" value={nonVeg} />
      </div>

      {/* Tableau */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-fami-green/20 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-fami-bg text-fami-forest">
            <tr>
              <th className="px-4 py-3 font-semibold">#</th>
              <th className="px-4 py-3 font-semibold">Prénom</th>
              <th className="px-4 py-3 font-semibold">Nom</th>
              <th className="px-4 py-3 font-semibold">E-mail</th>
              <th className="px-4 py-3 font-semibold">Végétarien</th>
              <th className="px-4 py-3 font-semibold">Inscrit le</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((r, i) => (
              <tr
                key={r.id}
                className="border-t border-fami-green/10 text-fami-forest/90"
              >
                <td className="px-4 py-3 text-fami-forest/40">{i + 1}</td>
                <td className="px-4 py-3">{r.firstName}</td>
                <td className="px-4 py-3">{r.lastName}</td>
                <td className="px-4 py-3">{r.email}</td>
                <td className="px-4 py-3">
                  {r.vegetarian ? (
                    <span className="rounded-full bg-fami-green/15 px-2 py-0.5 font-semibold text-fami-green-dark">
                      Oui
                    </span>
                  ) : (
                    <span className="text-fami-forest/40">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-fami-forest/60">
                  {dateFmt.format(r.createdAt)}
                </td>
              </tr>
            ))}
            {total === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-fami-forest/50"
                >
                  Aucune inscription pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl px-5 py-4 text-center shadow-sm ${
        highlight ? "bg-fami-green text-white" : "bg-white text-fami-forest"
      }`}
    >
      <div className="text-3xl font-extrabold">{value}</div>
      <div
        className={`text-sm font-medium ${
          highlight ? "text-white/80" : "text-fami-forest/60"
        }`}
      >
        {label}
      </div>
    </div>
  );
}
