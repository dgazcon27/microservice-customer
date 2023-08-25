db.createUser(
    {
        user: "user_customer",
        pwd: "cs_solution",
        roles: [
            {
                role: "readWrite",
                db: "myapp"
            }
        ]
    }
);