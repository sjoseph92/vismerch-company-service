/* 
*
*   Next Authentication
*
*/
CREATE TABLE
    verification_token (
        identifier TEXT NOT NULL,
        expires TIMESTAMPTZ NOT NULL,
        token TEXT NOT NULL,
        PRIMARY KEY (identifier, token)
    );

CREATE TABLE
    accounts (
        id SERIAL,
        user_id INTEGER NOT NULL,
        type VARCHAR(255) NOT NULL,
        provider VARCHAR(255) NOT NULL,
        provider_account_id VARCHAR(255) NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at BIGINT,
        id_token TEXT,
        scope TEXT,
        session_state TEXT,
        token_type TEXT,
        PRIMARY KEY (id)
    );

CREATE TABLE
    sessions (
        id SERIAL,
        user_id INTEGER NOT NULL REFERENCES users(id),
        expires TIMESTAMPTZ NOT NULL,
        session_token VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    users (
        id SERIAL,
        name VARCHAR(255),
        email VARCHAR(255),
        email_verified TIMESTAMPTZ,
        image TEXT,
        PRIMARY KEY (id)
    );

CREATE TABLE
    profile (
        id SERIAL,
        user_id INTEGER NOT NULL REFERENCES users(id),
        name VARCHAR(255),
        email VARCHAR(255),
        email_verified TIMESTAMPTZ,
        image TEXT,
        PRIMARY KEY (id)
    );

CREATE UNIQUE INDEX compound_id ON accounts(compound_id);

CREATE INDEX provider_account_id ON accounts(provider_account_id);

CREATE INDEX provider_id ON accounts(provider_id);

CREATE INDEX user_id ON accounts(user_id);

CREATE UNIQUE INDEX session_token ON sessions(session_token);

CREATE UNIQUE INDEX access_token ON sessions(access_token);

CREATE UNIQUE INDEX email ON users(email);