# Enquiries spreadsheet setup

Provision the Google spreadsheet outside this repository. Create a tab named `Enquiries` and place these headers in A1:N1, in this exact order:

`enquiry ID`, `received timestamp in UTC`, `full name`, `email`, `phone`, `postcode`, `type of work`, `estimated start date`, `budget`, `preferred contact method`, `description`, `upload references`, `submission status`, `request/source metadata`.

Create a dedicated Google Cloud service account with Sheets API access, share the spreadsheet only with that account and authorized administrators, and set the four server-only variables in `.env.example` in the deployment secret store. Never expose them as `VITE_` variables or commit the spreadsheet, key JSON, or secrets.

Uploads require an access-controlled durable object-storage integration. Store only stable object IDs or protected references; never raw files, signed/public credential-bearing URLs, or secrets. Until an upload handler is configured, submissions containing files fail safely.

The browser reuses an enquiry ID when retrying. The adapter checks column A before appending and coalesces concurrent in-process attempts. A provider/read/append/upload failure returns HTTP 503 and does not confirm success; the user can safely retry with the same ID. Structured logs contain only event, request/enquiry IDs, and error category—never form values or credentials. Platforms with durable queues may replace the narrow adapter or wrap it with their approved retry queue.

## Manual staging verification

1. Confirm the tab headers and server secrets, and share the sheet with the service account.
2. Submit one valid form with a distinctive test description and no upload.
3. Confirm exactly one A:N row appears, in header order, with an ISO 8601 UTC timestamp and `received` status.
4. Replay the request with the same `X-Idempotency-Key`; confirm no second row appears.
5. Remove the test row and test account data after verification.
