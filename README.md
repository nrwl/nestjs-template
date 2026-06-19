# Nx NestJS API Template

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

A production-ready NestJS REST API starter powered by Nx - built for teams who want a solid monorepo foundation with shared types, module boundaries, and Docker support from day one.

The API builds with the oxc toolchain (tsdown, powered by rolldown + the oxc transformer), orchestrated by Nx. tsdown reads `apps/api/tsconfig.app.json`, so `experimentalDecorators` and `emitDecoratorMetadata` are honored - NestJS dependency injection and route reflection keep working with `reflect-metadata`.
<!-- BEGIN: nx-cloud -->
🚀 If you haven't connected to Nx Cloud yet, [complete your setup here](https://cloud.nx.app/get-started). Get faster builds with remote caching, distributed task execution, and self-healing CI. [See how your workspace can benefit](#nx-cloud).
<!-- END: nx-cloud -->

## Quick Start

Clone this template into a new workspace:

```sh
npx create-nx-workspace@latest my-workspace --template nrwl/nestjs-template
cd my-workspace
```

### Dev server (hot reload)

```sh
npx nx run api:serve
```

The API starts at `http://localhost:3000/api`.

Endpoints available out of the box:

- `GET /api` - hello message
- `GET /api/health` - health check with uptime + timestamp
- `GET /api/todos` - list todos
- `POST /api/todos` - create a todo `{ "title": "..." }`
- `GET /api/todos/:id` - get one todo
- `PATCH /api/todos/:id` - update a todo
- `DELETE /api/todos/:id` - delete a todo

### Build for production

```sh
npx nx run api:build
```

This runs tsdown (the oxc toolchain) via Nx and emits `dist/apps/api/main.cjs`. Run it directly with `node dist/apps/api/main.cjs`.

### Run all builds

```sh
npx nx run-many -t build
```

### Run tests

```sh
npx nx run-many -t test
```

### Lint

```sh
npx nx run-many -t lint
```

### Visualize the project graph

```sh
npx nx graph
```

---

## What's Inside

```
nestjs-template/
|- apps/
|  |- api/                 # NestJS application (oxc/tsdown build orchestrated by Nx)
|     |- tsdown.config.mts # oxc toolchain build config (decorators + metadata)
|     |- src/app/
|        |- app.module.ts  # Root module wiring controllers + providers
|        |- health.controller.ts  # GET /api/health
|        |- todos.controller.ts   # CRUD /api/todos
|        |- todos.service.ts      # In-memory todos store (replace with DB)
|     |- Dockerfile         # Multi-stage Docker build
|- packages/
   |- types/               # Shared DTOs and interfaces (scope:shared tag)
      |- src/lib/types.ts  # HealthResponse, Todo, CreateTodoDto, UpdateTodoDto
```

### Module Boundary Tags

| Project | Tags                   | May depend on |
| ------- | ---------------------- | ------------- |
| api     | scope:api, type:app    | scope:shared  |
| types   | scope:shared, type:lib | scope:shared  |

`@nx/enforce-module-boundaries` is configured in `eslint.config.mjs` so violations are caught at lint time, not at runtime.

---

## Featured Nx Capabilities

### Smart Computation Caching

Every build, test, and lint result is cached locally (and remotely via Nx Cloud). Re-running unchanged tasks is instant.

```sh
npx nx run api:build   # second run: < 100 ms from cache
```

### Affected Commands

Only run what actually changed since your last commit or PR base:

```sh
npx nx affected -t build,test,lint
```

### Code Generation

Scaffold new resources without boilerplate:

```sh
# New NestJS app
npx nx g @nx/nest:app my-service

# New shared library
npx nx g @nx/js:lib packages/my-lib --bundler=tsc

# NestJS resource (CRUD module, controller, service, DTOs)
npx nx g @nx/nest:resource --project=api --name=users
```

### Module Boundaries

Enforce architectural rules at lint time. A `scope:api` library can never accidentally import from another app - only from `scope:shared` libs. Configure the rules in `eslint.config.mjs`.

### Docker

The `apps/api/Dockerfile` uses a multi-stage build:

1. **builder** - installs all deps, builds with `nx run api:prune` (the oxc/tsdown build plus a pruned lockfile and workspace modules)
2. **runner** - minimal Node 22 Alpine image with only production deps

```sh
docker build -f apps/api/Dockerfile -t nestjs-api .
docker run -p 3000:3000 nestjs-api
```

---

## Nx Cloud

[Nx Cloud](https://nx.dev/nx-cloud) makes distributed CI simple:

- **Remote cache** - Shares the computation cache across all machines - one build warms the cache for everyone else.
- **Distributed task execution (DTE)** - Splits tasks across N CI agents automatically - no manual job matrix required.
- **Flaky task detection** - Tracks pass/fail history per task, reruns flaky tasks so one bad agent doesn't fail the PR.
- **PR insights** - Shows exactly which tasks ran, which were cache hits, and what slowed down your pipeline.

Docs -> https://nx.dev/nx-cloud

---

## Replacing the In-Memory Store

`TodosService` uses a plain array. Drop in any persistence layer:

- **TypeORM** - `npx nx add @nx/typeorm` (or install manually + `TypeOrmModule.forRoot(...)`)
- **Prisma** - add `prisma` + `@prisma/client`, generate, inject `PrismaService`
- **MikroORM**, **Mongoose**, **Drizzle** - follow the same pattern

---

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/docs/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## 🔗 Learn More

- [Nx Documentation](https://nx.dev/docs)
- [Crafting Your Workspace Tutorial](https://nx.dev/docs/getting-started/tutorials/crafting-your-workspace)
- [Module Boundaries](https://nx.dev/docs/features/enforce-module-boundaries)
- [NestJS Documentation](https://docs.nestjs.com)
- [Docker Integration](https://nx.dev/docs/guides/nx-release/release-docker-images)
- [Nx Cloud](https://nx.dev/nx-cloud)

## 💬 Community

Join the Nx community:

- [Discord](https://go.nx.dev/community)
- [X (Twitter)](https://twitter.com/nxdevtools)
- [LinkedIn](https://www.linkedin.com/company/nrwl)
- [YouTube](https://www.youtube.com/@nxdevtools)
- [Blog](https://nx.dev/blog)
