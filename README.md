#### Stack used

- NodeJS and TypeScript
- GraphQL with Apollo Server and Nexus
- Prisma with MongoDB Database

## Project structure

#### Overview

```
.
├── src
│   ├── clients
│   ├── permissions
│   ├── resolvers
│   ├── utils
│   ├── constants.ts
│   ├── context.ts
│   ├── index.ts
│   ├── schema-typegen.ts
│   └── schema.ts
│
├── .env
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

## How to use

- Run `npm install`
- Run `npm generate`

#### Start the local server
- Run `npm run start`

#### Access to the GraphQL Playground 

- `http://localhost:4000/graphql`