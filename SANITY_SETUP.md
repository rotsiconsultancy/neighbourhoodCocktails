# Sanity CMS setup

1. Create a Sanity project and a `production` dataset.
2. Copy the Sanity variables from `.env.example` into `.env`. Use a Viewer token for `SANITY_API_READ_TOKEN` and an Editor token only for the one-time `SANITY_API_WRITE_TOKEN` seed operation.
3. Add `http://localhost:3000` and the production site origin to the Sanity project's CORS origins with credentials enabled.
4. Run `pnpm sanity:seed` once to upload the current logos, page imagery, gallery, services, and cocktails.
5. Start the site and open `/studio`. Sanity account authentication protects the editor.
6. In Sanity project settings, create a webhook targeting `/api/revalidate`, select create/update/delete events, include `_type` and `"slug": slug.current` in its projection, and use the same secret as `SANITY_REVALIDATE_SECRET`.
7. Remove `SANITY_API_WRITE_TOKEN` from the deployed environment after the initial seed. Keep the read token server-only for authenticated draft previews.

Without the Sanity project variables, the public site intentionally falls back to the checked-in content. This keeps local builds and production deployments safe during setup.
