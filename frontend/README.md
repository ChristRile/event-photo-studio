# Event Photo Studio frontend

Responsive Create React App frontend built with React, Material UI, and React Router.

## Run locally

Run the Django API from `backend/` (with the existing virtual environment):

```powershell
& .venv/Scripts/python.exe manage.py migrate
& .venv/Scripts/python.exe manage.py runserver
```

Then, from `frontend/`:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000). The development server proxies `/api` to Django at `http://localhost:8000`. On Windows PowerShell with script execution disabled, use `npm.cmd` in place of `npm`. For another same-origin API path, set `REACT_APP_API_BASE_URL` before starting or building the frontend.

To check the frontend:

```bash
npm test -- --watch=false
npm run build
```

## Preview routes

| Route | Screen |
| --- | --- |
| `/` | Landing page |
| `/inquire` | Live free session booking and availability |
| `/dashboard` | Sample client dashboard |
| `/events/golden-hour-gala` | Sample event details |
| `/e/golden-hour-gala` | Sample guest page |

`/events` and `/e` redirect to the featured sample event. Other sample event IDs live in `src/mocks/events.js`.

## Structure

`src/components/` follows Atomic Design: `atoms`, `molecules`, `organisms`, and `templates`. Route views are in `src/pages/`. The MUI theme is in `src/theme/`; sample event data is in `src/mocks/`. The booking form state and validation live in `src/hooks/`, and its Django API calls are in `src/services/`.

## Preview limitations

The booking form reads reserved and active sessions from Django and saves free reservations to Django. It does not send confirmation email. Dashboard events, event details, photo counts, and guest allowances remain sample data; newly booked sessions do not appear on those pages yet. Account creation, QR generation, camera access, photo uploads, gallery storage, compilation downloads, and retention automation are not implemented. The QR graphic and gallery tiles are labeled placeholders.
