# Ton of Cards — Upgraded MVP

Next.js 14 app for managing your sports card inventory with:
- Branded header + dark UI
- Image uploads via Vercel Blob
- Data stored in Vercel Postgres
- Fields for BIN and Market Value
- CSV export
- eBay helper: copy listing titles + open eBay Sell page

## Quick Deploy
1. Create a GitHub repo and push this code.
2. Import the repo in Vercel as a new Project.
3. Add Integrations: Postgres + Vercel Blob.
4. Ensure env vars: POSTGRES_URL, BLOB_READ_WRITE_TOKEN. (Optional: EBAY_APP_ID)
5. Deploy.

API routes: `/api/cards`, `/api/cards/[id]`, and upload at `/upload`.
DB initializes automatically on first run.
