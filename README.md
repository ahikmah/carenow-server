# CareNow RESTful API
![Node.js](https://img.shields.io/badge/Node.js-v22.13.0-green)
![TypeScript](https://img.shields.io/badge/TypeScript-%5E4.0-blue)
![Express](https://img.shields.io/badge/Express.js-4.x-red)
![Docker](https://img.shields.io/badge/Docker-Supported-blue)


This is the backend service for CareNow, built with **Node.js**, **Express**, and **TypeScript**. It provides RESTful APIs for managing patient data and integrates with OpenAPI for API documentation.


## Getting Started

### Prerequisites

- **Node.js**: Version `22.13.0` (specified in `.nvmrc`).
- **Docker** (optional): For containerized deployment.

> PostgreSQL isn't required to be installed locally since this project uses a hosted database service. But if you want to set up a local DB instance, feel free to use the SQL script in the docs folder.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ahikmah/carenow-server.git
   cd carenow-server
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up environment variables:
   - Copy `.env.template` to `.env`, then update the values using the details I emailed to you.

4. Start the development server:
   ```bash
   yarn dev
   ```

---


## API Documentation

The project uses **Swagger UI** for API documentation. After starting the server, you can access the documentation at:

```
http://localhost:8080/
```

The raw OpenAPI JSON specification is available at:

```
http://localhost:8080/swagger.json
```
---

## Testing

The project uses **Vitest** for unit testing and **Supertest** for API testing. To run the tests:

```bash
yarn test
```

Test files are located in the `src/**/__tests__/` directories.

---
