"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { registrationOpen } from "@/lib/event";

const schema = z.object({
  firstName: z.string().trim().min(1, "Prénom requis / Voornaam vereist").max(80),
  lastName: z.string().trim().min(1, "Nom requis / Naam vereist").max(80),
  email: z.string().trim().toLowerCase().email("E-mail invalide / Ongeldige e-mail").max(160),
  vegetarian: z.enum(["oui", "non"], {
    message: "Choix requis / Keuze vereist",
  }),
});

export type RegisterState = {
  ok: boolean;
  error: string | null;
};

export async function register(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  if (!registrationOpen()) {
    return {
      ok: false,
      error: "Les inscriptions sont clôturées. / De inschrijvingen zijn afgesloten.",
    };
  }

  const parsed = schema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    vegetarian: formData.get("vegetarian"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Formulaire invalide / Ongeldig formulier",
    };
  }

  const { firstName, lastName, email, vegetarian } = parsed.data;

  await prisma.registration.create({
    data: {
      firstName,
      lastName,
      email,
      vegetarian: vegetarian === "oui",
    },
  });

  redirect("/merci");
}
