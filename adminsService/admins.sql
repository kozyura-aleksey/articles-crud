CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL
  );

INSERT INTO admins (email, password, role)
  VALUES ("admin", "$2a$05$iww7QUq1HOunrQcZTxQh5ew7O.SQEXKeEZ3UAV2./J.da/1RBuEVS", "admin")