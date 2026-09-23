import { event, registrationOpen } from "@/lib/event";
import { RegistrationForm } from "./RegistrationForm";

export default function Home() {
  const open = registrationOpen();

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center px-4 py-10 sm:py-14">
      {/* En-tête / hero */}
      <header className="w-full text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-fami-green-dark">
          Invitation
        </p>
        <h1 className="mt-1 text-5xl font-extrabold leading-none text-fami-green sm:text-6xl">
          POWER
          <span className="mx-0.5 inline-block -translate-y-0.5 text-fami-forest">
            ⚡
          </span>
          UP
          <br />
          LUNCH
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg font-semibold text-fami-forest">
          {event.tagline.fr}
          <br />
          <span className="text-fami-forest/70">{event.tagline.nl}</span>
        </p>
      </header>

      {/* Bandeau date / lieu */}
      <section className="mt-6 grid w-full gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-white/70 px-5 py-4 text-center shadow-sm">
          <div className="text-3xl font-extrabold text-fami-green">
            {event.dateLabel}
          </div>
          <div className="mt-1 text-lg font-bold text-fami-forest">
            {event.timeLabel}
          </div>
        </div>
        <div className="flex flex-col justify-center rounded-2xl bg-white/70 px-5 py-4 text-center shadow-sm">
          <p className="font-semibold text-fami-forest">{event.location.fr}</p>
          <p className="text-sm text-fami-forest/70">{event.location.nl}</p>
        </div>
      </section>

      {/* Carte formulaire */}
      <section className="mt-8 w-full rounded-3xl bg-fami-bg-soft p-6 shadow-lg sm:p-8">
        <p className="mb-6 text-center text-sm leading-relaxed text-fami-forest/80">
          {event.intro.fr}
          <br />
          <span className="text-fami-forest/60">{event.intro.nl}</span>
        </p>

        {open ? (
          <RegistrationForm />
        ) : (
          <div className="rounded-xl border border-fami-green/40 bg-white px-5 py-6 text-center">
            <p className="text-lg font-bold text-fami-forest">
              Les inscriptions sont clôturées.
            </p>
            <p className="text-fami-forest/70">De inschrijvingen zijn afgesloten.</p>
          </div>
        )}
      </section>

      <footer className="mt-8 text-center text-xs text-fami-forest/50">
        Famiflora · {event.name}
      </footer>
    </main>
  );
}
