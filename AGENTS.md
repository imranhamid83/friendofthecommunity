# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single **Next.js 15 (App Router, JavaScript)** community website for "Muslims in Amersham & Chalfont". Package manager is **npm** (`package-lock.json`); CI uses Node 20.x, and Node 22 also works. There is a single runnable service (the Next.js app). All backing data comes from external cloud services (Azure Cosmos DB, AWS DynamoDB, Azure Communication Services, Google reCAPTCHA, London Prayer Times) — there is no local DB/docker setup.

Standard commands live in `package.json`: `npm run dev` (port 3000), `npm run build`, `npm run start`, `npm run lint`. There is **no test framework/`test` script** (CI runs `npm run test --if-present`, a no-op).

### Required local env file (`.env.local`) — important gotcha
`src/lib/cosmos.js` constructs the Cosmos client **at module import time** and `throw`s if `NEXT_PUBLIC_COSMOS_DB_CONNECTION_STRING` is missing. The `events` pages import this module, so without the env var **`npm run build` fails and the events routes crash at import**. A `.env.local` with a valid-**format** placeholder connection string is required for building/running cleanly. It is gitignored, so recreate it if it is not present:

```
NEXT_PUBLIC_COSMOS_DB_CONNECTION_STRING=AccountEndpoint=https://localhost:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==;
NEXT_PUBLIC_COSMOS_DB_DATABASE=community
NEXT_PUBLIC_COSMOS_DB_EVENTS_CONTAINER=events
NEXT_PUBLIC_COSMOS_DB_SPEAKERS_CONTAINER=speakers
NEXT_PUBLIC_AWS_REGION=eu-west-2
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=placeholder
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=placeholder
```

The placeholder only needs to be well-formed enough for `new CosmosClient(...)` not to throw; queries against it fail gracefully.

### Graceful degradation without real credentials
With placeholder/missing secrets the app still boots and all pages render 200:
- `/events` shows "No events found." (Cosmos query fails, caught in a try/catch).
- `/api/blogs*` returns a `500` JSON error (no real AWS creds); the `/blogs` page renders its shell.
- Contact form (`/ContactUs`) shows "Captcha site key missing..." because `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is unset; the form's client-side validation still works. Real email sending needs `NEXT_PUBLIC_AZURE_COMMUNICATION_CONNECTION_STRING`.
- The daily prayer-times widget hides itself if `NEXT_PUBLIC_PRAYER_KEY` is unset.

To exercise real Cosmos/DynamoDB/email/reCAPTCHA/prayer-times features, add the corresponding real values (all `NEXT_PUBLIC_*`) to `.env.local`.
