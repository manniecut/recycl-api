BEGIN;
TRUNCATE recyclables,
feedback,
pickups,
users;

RESTART IDENTITY CASCADE;

INSERT INTO users (
        username,
        pass,
        email,
        pickuplocation
    )
VALUES (
        'Mannie',
        'mannie',
        'mannie@mannie',
        '1275 Woodward Ave, Detroit, MI 48226'
    ), (
        'Angie',
        'angie',
        'angie@angie',
        '1275 Woodward Ave, Detroit, MI 48226'
    ), (
        'Zack',
        'zack',
        'zack@zack',
        '1275 Woodward Ave, Detroit, MI 48226'
    ), (
        'Steve',
        'steve',
        'steve@steve',
        '1275 Woodward Ave, Detroit, MI 48226'
    ), (
        'Marissa',
        'marissa',
        'marissa@marissa',
        '1275 Woodward Ave, Detroit, MI 48226'
    ), (
        'Guest',
        'guest',
        'guest@guest',
        '1275 Woodward Ave, Detroit, MI 48226'
    );

INSERT INTO recyclables (title)
VALUES ('Batteries'),
    ('Cosmetics'),
    ('Electronics'),
    ('Metal'),
    ('Paper'),
    ('Plastic');

INSERT INTO feedback (msg, sender)
VALUES (
    'Hey! I love your app!',
    1
);

INSERT INTO pickups (details, pickuplocation, pickupdate, client)
VALUES (
    'Batteries',
    '1275 Woodward Ave, Detroit, MI 48226',
    '2021-01-31, 17:30',

    1
);



COMMIT;