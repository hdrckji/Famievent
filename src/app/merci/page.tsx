import Link from "next/link";
import { event } from "@/lib/event";

export default function Merci() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-4 py-10 text-center">
      <div className="w-full rounded-3xl bg-fami-bg-soft p-8 shadow-lg sm:p-10">
        <div className="text-5xl">🎉</div>
        <h1 className="mt-4 text-3xl font-extrabold text-fami-green">
          Inscription confirmée !
        </h1>
        <p className="mt-1 text-lg font-semibold text-fami-forest/80">
          Je bent ingeschreven!
        </p>

        <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-white px-5 py-4 shadow-sm">
          <p className="text-sm uppercase tracking-widest text-fami-green-dark">
            {event.name}
          </p>
          <p className="mt-1 text-2xl font-extrabold text-fami-green">
            {event.dateLabel}
          </p>
          <p className="font-bold text-fami-forest">{event.timeLabel}</p>
          <p className="mt-1 text-sm text-fami-forest/70">{event.location.fr}</p>
        </div>

        <p className="mt-6 text-fami-forest/80">
          On se retrouve autour du buffet. À bientôt !
          <br />
          <span className="text-fami-forest/60">
            Tot binnenkort aan het buffet!
          </span>
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-xl bg-fami-green px-6 py-3 font-bold text-white shadow-md transition hover:bg-fami-green-dark"
        >
          Retour / Terug
        </Link>
      </div>
    </main>
  );
}
