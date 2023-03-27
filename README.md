# [adminjs-sql](https://github.com/wirekang/adminjs-sql) [![NPM version](https://img.shields.io/npm/v/adminjs-sql?style=flat-square)](https://npmjs.org/package/adminjs-sql)

This is an inofficial [AdminJS](https://github.com/SoftwareBrothers/adminjs) adapter which integrates SQL-based database into AdminJS.

Installation: `yarn add adminjs-sql`

### Checkout [official @adminjs/sql](https://github.com/SoftwareBrothers/adminjs-sql) for postgres.
This repository will be archived when they support mysql.

## Usage

The plugin can be registered using standard `AdminJS.registerAdapter` method.

```typescript
import { Adapter } from 'adminjs-sql';
import AdminJS from 'adminjs';

AdminJS.registerAdapter(Adapter);
```

After registration, you should call `Adapter.init(client, connectionOptions)` to parse table information from running database.

```typescript
// import { Adapter } from 'adminjs-sql';
// ...
const db = await Adapter.init('mysql2', {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});
```

After initialization, you can register resources. `db.tables()` to register ALL tables in database. Or you can `db.table(tableName)` to register specific table.

```typescript
const adminJs = new AdminJS({
  databases: [db],
  resources: db.tables(),
  // or
  resources: [db.table('users'), db.table('posts'), db.table('comments')],
});
```

## ManyToOne

This supports ManyToOne relationship if you define a foreign key.

## Example App

You can run [example app](https://github.com/wirekang/adminjs-sql/tree/main/example) with docker.

1. Clone this repository.

```
git clone https://github.com/wirekang/adminjs-sql
yarn install
yarn build
```

2. Setup example project.

```
cd example/
yarn install
```

3. Run mysql:latest in docker container. Checkout [docker-compose.yml](https://github.com/wirekang/adminjs-sql/blob/main/example/docker-compose.yml)

```
yarn up

```

4. Run example app.

```
yarn start


# Generating samples...
# Inserting samples...
# adminjs-sql example app is under http://localhost:33300
```

5. After enjoying the example, you can clean down MySQL server.

```
yarn down
```

## Testing

We use docker compose to run various databases for testing.

`yarn test:up # docker compose up -d`

`yarn test`

`yarn test:down # docker compose down`

## How It Works

`adminjs-sql` collects information about tables and columns from [INFORMATION_SCHEMA](https://dev.mysql.com/doc/refman/8.0/en/information-schema-introduction.html) and converts to `adminjs`. This project uses [Knex Query Builder](https://knexjs.org) to generate SQL string.

## Supported Databases

- MySQL
- MariaDB

## Todo

- [ ] Support Postgres.

- [ ] Elaborate unit testing.

- [ ] Add more complex example app.

Contributions are welcome!!
