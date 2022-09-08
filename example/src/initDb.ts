import mysql from 'mysql2/promise';
import { DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './consts';

/**
 * Initialize database, tables for example environment.
 */
export async function initDb() {
  const c = await mysql.createConnection({
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
  });

  await Promise.all(sql.split(';').map((s) => c.query(s)));
}

const sql = `
  DROP DATABASE IF EXISTS \`${DB_NAME}\`;
  CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;
  USE \`${DB_NAME}\`;

  CREATE TABLE string_table (
    col_char char(100),
    col_varchar varchar(444) not null,
    col_binary binary(200) null,
    col_varbinary varbinary(10) default '1234',
    col_tinyblob tinyblob null,
    col_tinytext tinytext not null,
    col_text text(100),
    col_mediumtext mediumtext,
    col_longtext longtext,
    col_enum enum('coffee', 'beer', 'soju', 'water', 'milk') not null default 'water',
    col_set set('coffee', 'beer', 'soju', 'water', 'milk') not null default 'water,milk'
  );

  CREATE TABLE numeric_table (
    id int primary key auto_increment,
    col_bit bit(30),
    col_tinyint tinyint,
    col_bool bool,
    col_boolean boolean,
    col_smallint smallint default 0,
    col_mediumint mediumint,
    col_int int null,
    col_integer integer not null default 123,
    col_bigint bigint,
    col_float float,
    col_double double,
    col_decimal decimal,
    col_dec dec
  );

  CREATE TABLE data_table (
    col_date date null,
    col_datetime datetime,
    col_timestamp timestamp default CURRENT_TIMESTAMP,
    col_year year default '2022'
  );

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
      references users(id) on update cascade
  )
`;
