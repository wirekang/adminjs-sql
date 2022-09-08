# adminjs-sql

This is an [AdminJS](https://github.com/SoftwareBrothers/adminjs) adapter which integrates Raw SQL into AdminJS.

# Installation

```
yarn add adminjs-sql

npm install adminjs-sql
```

# Usage

The plugin can be registered using standard `AdminJS.registerAdapter` method.

```typescript
import { Adapter } from 'adminjs-mysql';
import AdminJS from 'adminjs';

AdminJS.registerAdapter(Adapter);
```

# Example

You can run [example package](https://github.com/wirekang/adminjs-sql/tree/main/example) with docker.

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


	Generating samples...
    Inserting samples...
	adminjs-sql example app is under http://localhost:33300
```

5. After enjoying the example, you can clean down MySQL server.

```
yarn down
```
