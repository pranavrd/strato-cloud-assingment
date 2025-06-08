CREATE TABLE IF NOT EXISTS users (
    human_user varchar not null,
    create_date timestamp without time zone not null,
    password_change_date timestamp without time zone not null,
    last_login timestamp without time zone not null,
    mfa_enabled boolean not null,
    PRIMARY KEY (human_user),
    UNIQUE (human_user)
)