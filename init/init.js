const mysql = require('mysql')

let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});


conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    conn.query("CREATE DATABASE panelbaz", function (err, result) {
        if (err) throw err;
        console.log("Database created");

        let panelbaz_db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'panelbaz',
            multipleStatements: true
        })

        let adminTable = `CREATE TABLE admin (
            id int(255) NOT NULL,
            firstname varchar(255) NOT NULL,
            lastname varchar(255) NOT NULL,
            username varchar(255) NOT NULL,
            password text NOT NULL,
            email varchar(255) NOT NULL,
            phone varchar(255) NOT NULL,
            profile text NOT NULL,
            admin_token varchar(200) NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;`;

        panelbaz_db.query(adminTable, function (ATERR, ATResult) {
            if (ATERR) throw ATERR;
            panelbaz_db.query(`INSERT INTO admin (id, firstname, lastname, username, password, email, phone, profile, admin_token) VALUES
            (1, 'first', 'admin', 'admin', '$2a$10$Ota3WGbz9i.r8dTIIgjagOFSM2soKNujQZzSJ6WKBnS.tjzU1VlXm', 'ali@gmail.com', '09019999999', './content/img/admin.jpg', 'tDao4VoplsEkn34Vkmnb234fpOOFme32');
            `, function (IATERR, IATResult) {
                if (IATERR) throw IATERR;

            })

        })


        // create category table

        let catTable = `
            CREATE TABLE categories (
                id int(100) NOT NULL,
                title varchar(255) NOT NULL,
                category_name varchar(255) NOT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        `;

        panelbaz_db.query(catTable, function (CTERR, ATResult) {
            if (CTERR) throw CTERR;
        })


        // create news table

        let newsTable = `
        CREATE TABLE news (
            id int(255) NOT NULL,
            title varchar(255) NOT NULL,
            content text NOT NULL,
            date varchar(255) NOT NULL,
            showUserContent varchar(100) NOT NULL,
            action_time bigint(200) NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;
        `;

        panelbaz_db.query(newsTable, function (NTERR, ATResult) {
            if (NTERR) throw NTERR;
        })



        // create orders table

        let orderTable = `
        CREATE TABLE orders (
            id int(255) NOT NULL,
            categoryID int(255) NOT NULL,
            productsID int(255) NOT NULL,
            servicesID int(255) NOT NULL,
            userID int(255) NOT NULL,
            date varchar(200) NOT NULL,
            link text NOT NULL,
            count int(255) NOT NULL,
            price bigint(20) NOT NULL,
            action_time bigint(200) NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        `;

        panelbaz_db.query(orderTable, function (OTERR, ATResult) {
            if (OTERR) throw OTERR;
        })

        // create products table

        let productsTable = `
        
        CREATE TABLE products (
            id int(255) NOT NULL,
            title varchar(255) NOT NULL,
            model varchar(255) NOT NULL,
            categoryID int(255) NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        `;

        panelbaz_db.query(productsTable, function (PTERR, ATResult) {
            if (PTERR) throw PTERR;
        })

        // create services table 

        let servicesTable = `
        
        CREATE TABLE services (
            id int(255) NOT NULL,
            categoryID int(255) NOT NULL,
            productID int(255) NOT NULL,
            title varchar(255) NOT NULL,
            description text NOT NULL,
            price int(11) NOT NULL,
            max int(200) NOT NULL,
            min int(200) NOT NULL,
            order_complete_date varchar(255) NOT NULL,
            status int(10) NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
          
        `;

        panelbaz_db.query(servicesTable, function (STERR, STResult) {
            if (STERR) throw STERR;
        })


        // create tikets table


        let tiketsTable = `
        
        CREATE TABLE tikets (
            id int(255) NOT NULL,
            userID int(255) NOT NULL,
            title varchar(255) NOT NULL,
            order_id int(255) NOT NULL,
            description text NOT NULL,
            is_Active int(10) NOT NULL,
            date varchar(200) NOT NULL,
            answer text NOT NULL DEFAULT 'null',
            action_time bigint(200) NOT NULL,
            file_url text NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
          
        `;

        panelbaz_db.query(tiketsTable, function (TTERR, TTResult) {
            if (TTERR) throw TTERR;
        })


        // create transactions table


        let transactionsTable = `
        
        CREATE TABLE transactions (
            id int(255) NOT NULL,
            userID int(255) NOT NULL,
            date varchar(255) NOT NULL,
            status int(10) NOT NULL,
            price bigint(20) NOT NULL,
            user_info varchar(255) NOT NULL,
            description text NOT NULL,
            action_time bigint(200) NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


        `;

        panelbaz_db.query(transactionsTable, function (TTERR, TTResult) {
            if (TTERR) throw TTERR;
        })


        // create users table 

        let usersTable = `
        
        CREATE TABLE users (
            id int(255) NOT NULL,
            firstname varchar(100) NOT NULL,
            lastname varchar(100) NOT NULL,
            email varchar(100) NOT NULL,
            phone varchar(11) NOT NULL,
            username varchar(100) NOT NULL,
            password varchar(100) NOT NULL,
            inventory bigint(20) NOT NULL DEFAULT 0,
            orders_count int(200) NOT NULL DEFAULT 0,
            tikets_count int(200) NOT NULL DEFAULT 0,
            transactions_count int(255) NOT NULL DEFAULT 0,
            amount bigint(20) NOT NULL DEFAULT 0,
            status int(10) NOT NULL DEFAULT 1,
            user_token text NOT NULL,
            action_time bigint(200) NOT NULL,
            date varchar(200) NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
          
        
        `;

        panelbaz_db.query(usersTable, function (UTERR, UTResult) {
            if (UTERR) throw UTERR;

            panelbaz_db.query(`INSERT INTO users (id, firstname, lastname, email, phone, username, password, inventory, orders_count, tikets_count, transactions_count, amount, status, user_token, action_time, date) VALUES
            (1, 'kami', 'scuti', 'kami@gmail.com', '9016666666', 'kami_test', '$2a$10$80NMPpP3E2NHt7WkXl.7we8POsUieK/tg4IirIFAPBPVFHhA0pETm', 99000, 0, 9, 0, 0, 1, 'FwQ1yRnhCAXo0_aKpr2R5TsT943Ix0Vt', 1680110978, ' 14:40:53 1401 اسفند 11');
            `, function (IUTERR, UTResult) {
                if (IUTERR) throw IUTERR;

            })
        })

        // user order status table

        let userOrderStatusTable = `
        CREATE TABLE users_orders_status (
            id int(255) NOT NULL,
            userID int(255) NOT NULL,
            servicesID int(255) NOT NULL,
            completed int(10) NOT NULL,
            doing int(10) NOT NULL,
            canceled int(10) NOT NULL,
            canceling int(10) NOT NULL,
            incompleted int(10) NOT NULL,
            pending int(10) NOT NULL DEFAULT 1,
            start_count bigint(20) NOT NULL DEFAULT 0,
            left_over bigint(20) NOT NULL DEFAULT 0,
            orderID int(255) NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        `;

        panelbaz_db.query(userOrderStatusTable, function (UTERR, UTResult) {
            if (UTERR) throw UTERR;
        })

        // ---------------------

        let sqlQuery = `
        ALTER TABLE admin
        ADD PRIMARY KEY (id);

        --
        -- Indexes for table categories
        --
        ALTER TABLE categories
        ADD PRIMARY KEY (id);

        --
        -- Indexes for table news
        --
        ALTER TABLE news
        ADD PRIMARY KEY (id);

        --
        -- Indexes for table orders
        --
        ALTER TABLE orders
        ADD PRIMARY KEY (id),
        ADD KEY categoryID (categoryID),
        ADD KEY productsID (productsID),
        ADD KEY servicesID (servicesID),
        ADD KEY userID (userID);

        --
        -- Indexes for table products
        --
        ALTER TABLE products
        ADD PRIMARY KEY (id),
        ADD KEY categoryID (categoryID);

        --
        -- Indexes for table services
        --
        ALTER TABLE services
        ADD PRIMARY KEY (id),
        ADD KEY productsID (productID),
        ADD KEY categoryID (categoryID);

        --
        -- Indexes for table tikets
        --
        ALTER TABLE tikets
        ADD PRIMARY KEY (id),
        ADD KEY userID (userID);

        --
        -- Indexes for table transactions
        --
        ALTER TABLE transactions
        ADD PRIMARY KEY (id),
        ADD KEY userID (userID);

        --
        -- Indexes for table users
        --
        ALTER TABLE users
        ADD PRIMARY KEY (id);

        --
        -- Indexes for table users_orders_status
        --
        ALTER TABLE users_orders_status
        ADD PRIMARY KEY (id),
        ADD KEY userID (userID),
        ADD KEY servicesID (servicesID);

        --
        -- AUTO_INCREMENT for dumped tables
        --

        --
        -- AUTO_INCREMENT for table admin
        --
        ALTER TABLE admin
        MODIFY id int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

        --
        -- AUTO_INCREMENT for table categories
        --
        ALTER TABLE categories
        MODIFY id int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

        --
        -- AUTO_INCREMENT for table news
        --
        ALTER TABLE news
        MODIFY id int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

        --
        -- AUTO_INCREMENT for table orders
        --
        ALTER TABLE orders
        MODIFY id int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

        --
        -- AUTO_INCREMENT for table products
        --
        ALTER TABLE products
        MODIFY id int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

        --
        -- AUTO_INCREMENT for table services
        --
        ALTER TABLE services
        MODIFY id int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

        --
        -- AUTO_INCREMENT for table tikets
        --
        ALTER TABLE tikets
        MODIFY id int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

        --
        -- AUTO_INCREMENT for table transactions
        --
        ALTER TABLE transactions
        MODIFY id int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

        --
        -- AUTO_INCREMENT for table users
        --
        ALTER TABLE users
        MODIFY id int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

        --
        -- AUTO_INCREMENT for table users_orders_status
        --
        ALTER TABLE users_orders_status
        MODIFY id int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

        --
        -- Constraints for dumped tables
        --

        --
        -- Constraints for table orders
        --
        ALTER TABLE orders
        ADD CONSTRAINT orders_ibfk_1 FOREIGN KEY (categoryID) REFERENCES categories (id),
        ADD CONSTRAINT orders_ibfk_2 FOREIGN KEY (productsID) REFERENCES products (id),
        ADD CONSTRAINT orders_ibfk_3 FOREIGN KEY (servicesID) REFERENCES services (id),
        ADD CONSTRAINT orders_ibfk_4 FOREIGN KEY (userID) REFERENCES users (id);

        --
        -- Constraints for table services
        --
        ALTER TABLE services
        ADD CONSTRAINT services_ibfk_1 FOREIGN KEY (productID) REFERENCES products (id),
        ADD CONSTRAINT services_ibfk_2 FOREIGN KEY (categoryID) REFERENCES categories (id);

        --
        -- Constraints for table tikets
        --
        ALTER TABLE tikets
        ADD CONSTRAINT tikets_ibfk_1 FOREIGN KEY (userID) REFERENCES users (id);

        --
        -- Constraints for table transactions
        --
        ALTER TABLE transactions
        ADD CONSTRAINT transactions_ibfk_1 FOREIGN KEY (userID) REFERENCES users (id);

        --
        -- Constraints for table users_orders_status
        --
        ALTER TABLE users_orders_status
        ADD CONSTRAINT users_orders_status_ibfk_1 FOREIGN KEY (userID) REFERENCES users (id),
        ADD CONSTRAINT users_orders_status_ibfk_2 FOREIGN KEY (servicesID) REFERENCES services (id);
        COMMIT;


        
        `;

        panelbaz_db.query(sqlQuery, function (sqlErr, UTResult) {
            if (sqlErr) throw sqlErr;
            console.log("init db project success !");
        })
        
        console.log("admin account: \n username: admin \n password: 12345678 \n\n test user account: \n username: kami_test \n password: test1234");

    });


});



;









