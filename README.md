# CodeMind Digital Agency

React and Vite website for CodeMind Digital Agency.

## Local development

```bash
npm install
npm run dev
```

## Contact form

The contact form posts to the Vercel serverless function at `/api/contact`. The function sends inquiries through Resend without exposing the API key in the browser.

Add these environment variables in Vercel Project Settings > Environment Variables:

```text
RESEND_API_KEY=re_your_api_key
CONTACT_EMAIL=cyuzuzocyisezeranosamuel@gmail.com
CONTACT_FROM_EMAIL=website@your-verified-domain.com
```

Verify the sender domain in Resend before using the form publicly. For local testing, run the Vercel development server so `/api/contact` is available:

```bash
npx vercel dev
```

The Vercel project should use `npm run build` as its build command and the default Vite output directory. After deployment, submit a real test inquiry and confirm both receipt and reply-to behavior.

## Checks

```bash
npm run lint
npm run build
```
