# Google Sheets contact-lead upsert

1. Create a Google Sheet and copy its ID from the URL (the part between `/d/` and `/edit`).
2. Open **Extensions → Apps Script** from that sheet and replace the default file with [`Code.gs`](./Code.gs).
3. Set `SPREADSHEET_ID` in `Code.gs` to that Sheet ID, save, then deploy it: **Deploy → New deployment → Web app**.
4. Set **Execute as** to *Me* and **Who has access** to *Anyone*, authorize it, and copy the web-app URL ending in `/exec`.
5. Create a local `.env` file from `.env.example`, paste the URL, then rebuild/redeploy the portfolio.

The script uses the normalized email address as the unique key. A new address creates a row; a repeat address updates the name, company, message, and last-contact timestamp, while preserving the original creation time and incrementing `Submission Count`.

After editing Apps Script, create a new deployment version (or edit the existing deployment to use the latest version) before testing the form.
