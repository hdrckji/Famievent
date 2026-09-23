# Famievent — Power-up Lunch

Site d'inscription pour le **Power-up Lunch** de Famiflora : un buffet healthy
au restaurant, le **01/10/2026 de 12:00 à 13:30**.

Le personnel s'inscrit via un formulaire bilingue (FR/NL). Une page
d'administration protégée permet de consulter la liste et de l'**exporter en
Excel/CSV** pour la transmettre au traiteur.

---

## Stack

Next.js 16 (App Router) · TypeScript · PostgreSQL · Prisma 7 · Zod 4 ·
Tailwind CSS 4 · Railway

---

## Démarrage local

```bash
npm install
cp .env.example .env        # puis compléter les valeurs
```

### Base de données locale (sans PostgreSQL installé)

Prisma peut fournir une base Postgres locale :

```bash
npx prisma dev              # affiche un DATABASE_URL à copier dans .env
```

Puis, dans un autre terminal :

```bash
npm run db:migrate          # crée les tables
npm run dev                 # http://localhost:3000
```

---

## Pages

| URL | Rôle |
| --- | --- |
| `/` | Formulaire d'inscription (public, bilingue FR/NL) |
| `/merci` | Confirmation après inscription |
| `/admin` | Liste des inscrits + compteurs (protégé) |
| `/api/export` | Téléchargement du fichier Excel/CSV (protégé) |

`/admin` et `/api/export` sont protégés par authentification HTTP Basic
(`ADMIN_USER` / `ADMIN_PASSWORD`).

---

## Variables d'environnement

| Variable | Rôle |
| --- | --- |
| `DATABASE_URL` | Connexion PostgreSQL (fournie par Railway en prod) |
| `ADMIN_USER` | Identifiant admin (défaut : `admin`) |
| `ADMIN_PASSWORD` | Mot de passe admin (**obligatoire**) |

---

## Déploiement Railway

1. Créer un projet Railway + ajouter un service **PostgreSQL**.
2. Connecter ce dépôt GitHub au service applicatif.
3. Définir les variables : `DATABASE_URL` (référence au Postgres),
   `ADMIN_USER`, `ADMIN_PASSWORD`.
4. Railway lance `npm run build` puis `npm run start`
   (`prisma migrate deploy` applique les migrations au démarrage).

---

## Réutiliser pour un autre événement

Toute la configuration de l'événement (nom, date, horaire, lieu, textes) est
centralisée dans [`src/lib/event.ts`](src/lib/event.ts). Il suffit de modifier
ce fichier.
