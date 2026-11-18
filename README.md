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
- **Pay schedule**: weekly, every 2 weeks, twice a month (two days of the month) or monthly.
- **Debts**: card and loan balances with APR. The highest-interest card is marked as the one to
  pay extra on first, and recording a payment lowers both the account and the debt.
- **Activity**: a log of every change, and each entry can be undone.
- **Backup / restore**: copy all your data as text and paste it back later.

## Where your data is saved

- **On claude.ai** (the published artifact): data is saved to your claude.ai account, so your
  phone and computer stay in sync. Only you can see it.
- **Opened anywhere else** (from this repo, GitHub Pages or a local file): data is saved in that
  browser only, and a banner says so. Use *Paycheck → Back up / restore* to move it between
  devices.

## Run it

- **Locally:** open `index.html` in a browser.
- **GitHub Pages:** in the repo, go to *Settings → Pages*, choose *Deploy from a branch*, then
  pick `main` and the `/ (root)` folder. The site will be at
  `https://so-spoked.github.io/finance_app/`.
- **Android:** open the page in Chrome, then use the ⋮ menu → *Add to Home screen*.
