# CareNow RESTful API

This is the backend service for CareNow, built with **Node.js**, **Express**, and **TypeScript**. It provides RESTful APIs for managing patient data and integrates with OpenAPI for API documentation.


## Getting Started

### Prerequisites

- **Node.js**: Version `22.13.0` (specified in `.nvmrc`).
- **Docker** (optional): For containerized deployment.

> _PostgreSQL is not required to be installed locally, as this project utilizes a hosted database service._

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
   - Copy `.env.template` to `.env` and update the values as needed.

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
