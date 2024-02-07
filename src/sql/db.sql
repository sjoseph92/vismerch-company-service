/*
 *
 *
 * Next Authentication Tables
 *
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
        user_id INTEGER NOT NULL,
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

/*
 * Companies Table
 */
CREATE TABLE
    companies (
        id SERIAL,
        name VARCHAR(255) NOT NULL UNIQUE,
        address_line_1 VARCHAR(255) NOT NULL,
        address_line_2 VARCHAR(255),
        city VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        zip_code VARCHAR(10) NOT NULL,
        coordinate GEOMETRY (POINT, 4326),
        PRIMARY KEY (id)
    );

/*
 * Company Locations Table
 */
CREATE TABLE
    company_locations (
        id SERIAL,
        company_id INTEGER NOT NULL REFERENCES companies (id),
        location_id INTEGER NOT NULL REFERENCES locations (id),
        PRIMARY KEY (id)
    );

CREATE TABLE
    locations (
        id SERIAL,
        name VARCHAR(255) NOT NULL UNIQUE,
        brand VARCHAR(50),
        address_line_1 VARCHAR(255) NOT NULL,
        address_line_2 VARCHAR(255),
        city VARCHAR(30) NOT NULL,
        state VARCHAR(2) NOT NULL,
        zip_code VARCHAR(10) NOT NULL,
        coordinate GEOMETRY (POINT, 4326),
        PRIMARY KEY (id)
    );

/*
 * Company Location Displays Table
 */
CREATE TABLE
    displays (
        id SERIAL,
        company_location_id INTEGER NOT NULL REFERENCES company_locations (id),
        type VARCHAR(30) NOT NULL,
        PRIMARY KEY (id)
    );

/*
 * Products Table
 */
CREATE TABLE
    products (
        id SERIAL,
        name VARCHAR(255) NOT NULL,
        company_id INTEGER NOT NULL REFERENCES companies (id),
        sku VARCHAR(30) NOT NULL,
        type VARCHAR(30) NOT NULL,
        perishable BOOLEAN NOT NULL DEFAULT FALSE,
        base_price NUMERIC(7, 5),
        PRIMARY KEY (id)
    );

/*
 * Display Products Table
 */
CREATE TABLE
    display_products (
        id SERIAL,
        display_id INTEGER NOT NULL REFERENCES displays (id),
        product_id INTEGER NOT NULL REFERENCES product (id),
        
        PRIMARY KEY (id)
    );
