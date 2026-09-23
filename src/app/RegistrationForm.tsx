"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { register, type RegisterState } from "./actions";

const initialState: RegisterState = { ok: false, error: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 w-full rounded-xl bg-fami-green px-6 py-4 text-lg font-bold text-white shadow-md transition hover:bg-fami-green-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Envoi… / Bezig…" : "Je m'inscris / Ik schrijf me in"}
    </button>
  );
}

export function RegistrationForm() {
  const [state, formAction] = useActionState(register, initialState);

  const labelClass = "block text-sm font-semibold text-fami-forest";
  const inputClass =
    "mt-1 w-full rounded-xl border border-fami-green/40 bg-white px-4 py-3 text-fami-forest outline-none transition focus:border-fami-green focus:ring-2 focus:ring-fami-green/30";

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <p
          role="alert"
          className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {state.error}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            Prénom / Voornaam <span className="text-fami-green">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            maxLength={80}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>
            Nom / Naam <span className="text-fami-green">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            maxLength={80}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          E-mail <span className="text-fami-green">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={160}
          className={inputClass}
        />
      </div>

      <fieldset>
        <legend className={labelClass}>
          Es-tu végétarien·ne ? / Ben je vegetarisch ?{" "}
          <span className="text-fami-green">*</span>
        </legend>
        <div className="mt-2 flex gap-3">
          <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-fami-green/40 bg-white px-4 py-3 font-medium transition has-[:checked]:border-fami-green has-[:checked]:bg-fami-green/10">
            <input
              type="radio"
              name="vegetarian"
              value="non"
              required
              className="accent-fami-green"
            />
            Non / Nee
          </label>
          <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-fami-green/40 bg-white px-4 py-3 font-medium transition has-[:checked]:border-fami-green has-[:checked]:bg-fami-green/10">
            <input
              type="radio"
              name="vegetarian"
              value="oui"
              className="accent-fami-green"
            />
            Oui / Ja
          </label>
        </div>
      </fieldset>

      <SubmitButton />

      <p className="text-center text-xs text-fami-forest/60">
        Tes données servent uniquement à organiser ce repas et à prévenir le
        traiteur. / Je gegevens dienen enkel om deze lunch te organiseren.
      </p>
    </form>
  );
}
