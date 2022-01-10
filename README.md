# Udacity Hub

Udacity Hub is a work in progress live project that is created along with my Udacity students to apply their knowledge in Fullstack development as part of their Full Stack JavaScript Nanodegree

## Installation

Use the following command to install the dependencies.

```bash
npm install
```

## Configuration

Create a .env file and follow the ENV_EXAMPLE to set you environment variables

## Schema Migration

All schema migration files are included with the project. They can be reviewed in:
```
migrations/sqls
```
Please use:
```
npx db-migrate up
```
To set up all needed tables and their relationships

## Data Migration

A data migration file is included with the project in:
``
/data_migration/initialization.sql
``
That includes several entries that you can use to experiment with the project.
Please run the following command after running the schema migrations
```
psql -U USER -d DB -a -f  PATH
```
And replacing the following keywords:

USER with your postgreSQL user ex: postgres
DB with your database name ex: uda_hub
PATH with your data migration file path ex: C:\Udacit-Hub\data_migrations\initialization.sql
So the end result is something like this

```
psql -U postgres -d uda_hub -a -f C:\Udacit-Hub\data_migrations\initialization.sql
```

## Running the project

Simply use:
```
npm run dev
```
