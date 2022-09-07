# adminjs-mysql

This is an [AdminJS](https://github.com/SoftwareBrothers/adminjs) adapter which integrates Mysql/MariaDB into AdminJS.

# Installation

```
yarn add adminjs-mysql

npm install adminjs-mysql
```

# Usage

The plugin can be registered using standard `AdminJS.registerAdapter` method.

```typescript
import { Adapter } from "adminjs-mysql";
import AdminJS from "adminjs";

AdminJS.registerAdapter(Adapter);
```

# Example
