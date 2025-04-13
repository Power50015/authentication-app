# Authentication App

This project is a full-stack authentication and authorization application built with Node.js, Express, Redis, PassportJS, and Docker. It includes:

- Email OTP for login and registration
- Social login using Google and Facebook
- Profile and metadata management

## Getting Started

1. Clone the repository.
2. Copy `.env.example` to `.env` and fill in your environment-specific details.
3. Run `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up`


## Folder Structure

- **src/**: Application source code.
- **tests/**: Test files.
- **seeders/**: Database seeding scripts.
- **factories/**: Data factories for tests.
- `.gitignore`: Specifies files to ignore in Git.
- `.dockerignore`: Specifies files to ignore in Docker builds.
