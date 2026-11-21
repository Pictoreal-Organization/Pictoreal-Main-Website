# Pictoreal Main Website

Public website of Pictoreal (PICT)
The site shows the club, team, events, blogs, magazines and audio articles.

## Technology

- Next.js (App Router) and React 19
- Tailwind CSS 4
- Node.js 22.x and npm

## Commands

| Task | Command |
| --- | --- |
| Install packages | `npm install` |
| Start development server | `npm run dev` |
| Make production build | `npm run build` |
| Start production server | `npm run start` |
| Run lint | `npm run lint` |

## Environment variables

Put these variables in a `.env.local` file in the project root.

| Variable | Use |
| --- | --- |
| `NEXT_PUBLIC_AUDIO_API_URL` | Base URL of the audio back-end |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name (blog editor) |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary upload preset (blog editor) |

## Folders

- `src/app/` - pages
- `src/components/` - shared components and event data
- `public/` - images and static files

## Add content

1. Put the image in `public/`.
2. Add the entry to the data list:
   - Blog or magazine: `src/app/blogs/page.js` or `src/app/magazines/page.js`
   - Event: `src/components/events/data.js`
---

## Original Next.js notes

Thiss is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started!

First, run the development server: hi there

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


