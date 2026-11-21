# Bills Account

A tracker for a checking account that only pays bills. Enter the balance, your paycheck deposit,
and your bills. It shows what's left before each payday and how much extra you can safely put
toward credit cards and other debt.

The whole app is one file, `index.html`: plain HTML, CSS and JavaScript with no build step and
no dependencies (fonts come from Google Fonts, with system fonts as a fallback).

## Features

- **Extra you can put toward debt**: the lowest the account will dip over the next pay periods,
  minus a cushion you choose (default $100). Sending that amount won't leave you short before a
  later bill, and the app warns you if a bill would overdraw the account.
- **Before payday**: the bills due before the next paycheck and what's left after they come out.
- **Coming up**: a check-register view of bills and paychecks, grouped by pay period, with a
  running balance. Check items off when the money actually moves. You can choose to subtract the
  amount, or note that your balance already shows it, so nothing is counted twice.
- **Bills**: weekly, every 2 weeks, monthly (by due day), every 3 months, yearly or one-time.
  Shows your monthly bill total against your monthly deposits.
- **Paychecks**: add one for each person who deposits into the account, each with its own amount and schedule: weekly, every 2 weeks, twice a month (two days of the month) or monthly.
- **Debts**: card and loan balances with APR. The highest-interest card is marked as the one to
  pay extra on first, and recording a payment lowers both the account and the debt.
- **Activity**: a log of every change, and each entry can be undone.
- **Backup / restore**: copy all your data as text and paste it back later.

## Where your data is saved

- **Installed app (GitHub Pages + Firebase):** data is stored in your own Firebase project and
  synced to every device signed in with an allowed Google account. The app works offline:
  changes are saved on the device and sync when it's back online.
- **On claude.ai** (the published artifact): data is saved to your claude.ai account. It needs
  an internet connection.
- **Anywhere else without Firebase settings** (a local file, for example): data is saved in that
  browser only. Use *Paycheck → Back up / restore* to move it.

## Set up the installed app

1. **Create a Firebase project** at https://console.firebase.google.com (Google Analytics is not
   needed). The free Spark plan is enough.
2. **Turn on Google sign-in:** *Build → Authentication → Get started → Sign-in method → Google →
   Enable → Save*. Then under *Settings → Authorized domains*, add `so-spoked.github.io`.
3. **Create the database:** *Build → Firestore Database → Create database*, pick a location near
   you, and start in **production mode**.
4. **Lock it to your household:** in *Firestore Database → Rules*, replace everything with the rules
   below, put in the Google addresses that should have access, and *Publish*.

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /households/home {
         allow read, write: if request.auth != null
           && request.auth.token.email_verified == true
           && request.auth.token.email in ['first@example.com', 'second@example.com'];
       }
     }
   }
   ```

5. **Connect the app:** *Project settings → General → Your apps → Web (`</>`)*, register an app
   (no Firebase Hosting needed), and copy the `firebaseConfig` values into `firebase-config.js`:
   `window.FIREBASE_CONFIG = { apiKey: "...", authDomain: "...", projectId: "...", ... };`
   These values identify the project and are not secret; the rules above control access.
6. **Publish with GitHub Pages:** *Settings → Pages → Deploy from a branch → `main` / root*. The app
   is then at `https://so-spoked.github.io/finance_app/`. (Free GitHub accounts need the repository
   to be public for Pages. The repository holds only code, no personal data.)
7. **Install it:** open that address in Chrome on Android, sign in, then *⋮ → Install app* (or *Add to
   Home screen*). On a computer, use the install icon in Chrome's address bar.

To move existing data in, open the old copy, go to *Paycheck → Back up / restore → Copy*, then in the
new app choose *Restore a backup* (or the same Paycheck menu), paste and restore.

## Files

- `index.html`: the app.
- `firebase-config.js`: Firebase project settings (null = no sync).
- `sw.js`, `manifest.webmanifest`, `icons/`: offline support and installation.
- `vendor/`: Firebase JavaScript SDK 10.14.1 (compat builds), bundled so the app loads offline.

## Run it

- **Locally:** open `index.html` in a browser.
