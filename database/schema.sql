-- Initialize table schemas

CREATE TABLE users  (
 id SERIAL PRIMARY KEY NOT NULL,
 first_name TEXT NOT NULL,
 last_name TEXT NOT NULL,
 email TEXT NOT NULL,
 passcode TEXT NOT NULL,
 username TEXT NOT NULL,
 UNIQUE (email, username)
);


CREATE TABLE users_stocks (
 id SERIAL PRIMARY KEY NOT NULL,
 user_id INTEGER NOT NULL,
 stock TEXT NOT NULL,
 quantity INTEGER,
);

