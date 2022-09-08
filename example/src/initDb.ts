import { faker } from '@faker-js/faker';
import mysql from 'mysql2/promise';
import { DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './consts';

/**
 * Initialize database, tables for example.
 */
export async function initDb() {
  const c = await mysql.createConnection({
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
  });

  console.log('Inserting samples...');
  const queries = initSql.split(';');
  queries.pop();
  for (let i = 0; i < queries.length; i += 1) {
    await c.query(queries[i]);
  }

  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    await c.query(`
        INSERT INTO \`users\` (\`name\`,\`age\`) VALUES(${mysql.escape(
          user.name
        )}, ${mysql.escape(user.age)})
    `);

    for (let j = 0; j < user.posts.length; j += 1) {
      const post = user.posts[j];
      await c.query(`
        INSERT INTO \`posts\` (\`author_id\`, \`title\`, \`content\`) VALUES
        (${mysql.escape(i + 1)}, ${mysql.escape(post.title)}, ${mysql.escape(
        post.content
      )})
      `);
    }
  }
}

const userCount = 13;
const maxPostCount = 30;

type User = { name: string; age: number; posts: Post[] };

type Post = {
  title: string;
  content?: string;
};

console.log('Generating samples...');
const users: User[] = [];
for (let i = 0; i < userCount; i += 1) {
  const name = faker.name.fullName();
  const age = randomInt(100);
  const posts: Post[] = [];
  const max = randomInt(maxPostCount);
  for (let j = 0; j < max; j += 1) {
    posts.push({
      title: faker.lorem.sentences(1),
      content: faker.lorem.sentences(),
    });
  }
  users.push({ name, age, posts });
}

function randomInt(max: number): number {
  return Math.round(Math.random() * max);
}

const initSql = `
  DROP DATABASE IF EXISTS \`${DB_NAME}\`;
  CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;
  USE \`${DB_NAME}\`;

  CREATE TABLE users (
    id int primary key auto_increment,
    name varchar(255) not null,
    age tinyint unsigned
  );

  CREATE TABLE posts (
    id int primary key auto_increment,
    author_id int not null,
    title varchar(200) not null,
    content text null default NULL,

    foreign key (author_id)
      references users(id) on update cascade on delete cascade
  );
`;
