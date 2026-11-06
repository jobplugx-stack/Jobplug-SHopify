# JobPlug · World of Opportunity

Native Shopify redesign. Source is at the repository root. Owner reviews and publishes manually. Current live storefront must stay unchanged until that review.

## Branches and publishing

- `main`: existing older project. Not changed by this redesign.
- `redesign-preview`: daily work. Connect ONLY to an unpublished Shopify theme.
- `release-*`: reviewed snapshots. Use a separate snapshot for the theme the owner publishes. Do not publish the daily preview theme: subsequent pushes to a published GitHub-connected branch would change the live site automatically.

Shopify synchronizes edits both ways. Pull before editing to preserve theme-editor changes. Never force-push. A passing GitHub check is evidence of source checks only, not proof of a working checkout.

## Everyday commands

From this repository folder:

```sh
git switch redesign-preview
git pull --ff-only origin redesign-preview
python3 scripts/check.py
sh scripts/update-preview.sh "Describe the change"
```

The update command checks source files, refuses the wrong branch or a stale remote, commits the theme changes and pushes only `redesign-preview`. Review the Git diff before running it. It does not invoke Shopify Publish.

To create a ZIP without pushing:

```sh
python3 scripts/package.py
```

Requires Git, Python 3 and Node.js. Sign into GitHub using your normal credential manager. Never put tokens in this repository.

## Review and release

1. Shopify → Online Store → Themes → Import → Connect from GitHub.
2. Choose this repository and `redesign-preview`. Keep the resulting theme unpublished.
3. Preview desktop, mobile, quiz, founder story, terms, native product/cart pages and booking links.
4. Once checkout and operations are verified, create a new release snapshot from the reviewed commit. Example: `git branch release-v1` then `git push origin release-v1`.
5. Connect that release branch as a separate draft theme. Review the snapshot. The OWNER clicks Publish when ready.
6. Keep daily updates on the unpublished preview branch. For subsequent public updates create another reviewed release snapshot. Publishing is not automated.

Shopify/GitHub may require owner authorization to access this repository. Local commits alone do not establish that connection.

## Current release state

Checkout defaults OFF. Split billing defaults NOT verified. Do not switch either on before the required integrations and tests pass.

- Job Search: $299.99 paid in full. Draft Shopify product handle `job-search`.
- Split option: $99.99 now + $300 on counted service Business Day 25. $399.99 total. Reminder on counted day 23. This repository does not schedule or execute charges.
- Interview Prep: $149.99. Draft product handle `interview-prep`.
- Shared Calendly event: https://calendly.com/customtechconsultants/interview-prep (45 minutes). Owner temporarily uses this for consultation and Interview Prep. Booking does not prove payment.
- Email lead step prepares a visitor-sent draft to jobplux@gmail.com. No automatic capture or confirmation delivery.
- Intake and post-purchase delivery still need verification. A historical Google Form URL exists in the previous main-branch configuration; do not assume it is the approved current intake.

Products and tax/availability settings live in Shopify, not in this repository. No customer data or card credentials belong here.

## Editing

- Visual journey and copy: `assets/app.js.liquid`.
- Appearance: `assets/styles.css.liquid` and companion CSS files.
- Theme settings: `config/settings_schema.json` and `config/settings_data.json`.
- Shopify destination wiring and image map: `snippets/jobplug-config.liquid`.
- Native product/cart/page sections: `sections/`.

`legacy/` preserves the previous project's scripts and reports for reference. Do not run its build.py against this theme. Its prices, preview screenshots and validation outputs are historical.
