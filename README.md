# Portfolio

Personal portfolio website created using React, JavaScript and Motion.

visit @ [wnzel.dev](https://wnzel.dev)

## Contact form email

The `/contact` form sends messages through the Nodemailer endpoint at
`/api/contact`. To enable Gmail delivery in production:

1. Turn on 2-Step Verification for `wenzelescudero@gmail.com`.
2. Create a Google App Password for the portfolio. Do not use the account's
   regular password.
3. Add these environment variables to the Vercel project for Production and
   Preview:

   ```env
   SMTP_USER=wenzelescudero@gmail.com
   SMTP_PASS=your-16-character-google-app-password
   ```

Run `npm run test:contact` to verify form validation and email composition
without sending a real message.

The Spotify now-playing integration runs through `/api/spotify` so OAuth
credentials are never bundled into the browser. Configure `SPOTIFY_CLIENT`,
`SPOTIFY_SECRET`, and `SPOTIFY_REFRESH_TOKEN` as server-side Vercel variables.
Existing `VITE_SPOTIFY_*` project variables remain supported for migration but
should be replaced with the server-only names.
