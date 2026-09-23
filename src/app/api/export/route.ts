import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("fr-BE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Brussels",
});

// Échappe une valeur pour le format CSV (délimiteur point-virgule, compatible Excel FR/BE).
function csvCell(value: string): string {
  if (/[";\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  const registrations = await prisma.registration.findMany({
    orderBy: { createdAt: "asc" },
  });

  const header = ["Prénom", "Nom", "E-mail", "Végétarien", "Inscrit le"];
  const rows = registrations.map((r) =>
    [
      r.firstName,
      r.lastName,
      r.email,
      r.vegetarian ? "Oui" : "Non",
      dateFmt.format(r.createdAt),
    ]
      .map(csvCell)
      .join(";"),
  );

  // BOM UTF-8 pour que les accents s'affichent correctement dans Excel.
  const csv = "﻿" + [header.join(";"), ...rows].join("\r\n") + "\r\n";

  const filename = `power-up-lunch-inscriptions-${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
