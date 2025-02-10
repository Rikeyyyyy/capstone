# Ticketing System

A modern ticketing system built with Next.js, Prisma, and TypeScript.

## Features

- User authentication with secure password handling
- Dark mode support
- Responsive design
- Password validation
- PostgreSQL database integration with Prisma
- Modern UI with Tailwind CSS

## Tech Stack

- Next.js 13+ with App Router
- TypeScript
- Prisma ORM
- PostgreSQL
- Tailwind CSS

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Rikeyyyyy/capstone.git
cd capstone
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create a .env file and add your database URL
DATABASE_URL="your-database-url-here"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/            # Reusable components
├── constants/            # Constants and configurations
├── lib/                  # Utility libraries
└── utils/               # Helper functions
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
