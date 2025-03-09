# Scrapper - South Africa's Premier Recycling Marketplace

A modern platform for buying and selling recyclable materials in South Africa.

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/scrapper.git
cd scrapper
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env.local` and fill in your environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

## Environment Variables

The following environment variables are required:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps API key for the recyclers map

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase
- Radix UI
- React Hook Form
- Zod
- Chart.js

## Deployment

This project can be deployed to Netlify. Follow these steps:

1. Push your code to GitHub
2. Log in to Netlify
3. Create a new site from Git
4. Select your repository
5. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add your environment variables in Netlify's dashboard
7. Deploy!

## License

MIT"# Scrapper" 
