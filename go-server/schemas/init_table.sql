CREATE TABLE IF NOT EXISTS users (
    human_user varchar not null,
    create_date timestamp without time zone not null,
    password_change_date timestamp without time zone not null,
    last_login timestamp without time zone not null,
    mfa_enabled boolean not null,
    PRIMARY KEY (human_user),
    UNIQUE (human_user)
);

INSERT INTO users (human_user, create_date, password_change_date, last_login, mfa_enabled)
VALUES ('Foo Bar1', '2020-10-01 00:00:00', '2021-10-01 00:00:00', '2025-01-04 00:00:00', TRUE);

INSERT INTO users (human_user, create_date, password_change_date, last_login, mfa_enabled)
VALUES ('Foo1 Bar1', '2019-09-20 00:00:00', '2019-09-22 00:00:00', '2025-02-08 00:00:00', FALSE);

INSERT INTO users (human_user, create_date, password_change_date, last_login, mfa_enabled)
VALUES ('Foo2 Bar2', '2022-02-03 00:00:00', '2022-02-03 00:00:00', '2025-02-12 00:00:00', FALSE);

INSERT INTO users (human_user, create_date, password_change_date, last_login, mfa_enabled)
VALUES ('Foo3 Bar3', '2023-03-07 00:00:00', '2023-03-10 00:00:00', '2022-01-03 00:00:00', TRUE);

INSERT INTO users (human_user, create_date, password_change_date, last_login, mfa_enabled)
VALUES ('Foo Bar4', '2018-04-08 00:00:00', '2020-04-12 00:00:00', '2022-10-04 00:00:00', FALSE);