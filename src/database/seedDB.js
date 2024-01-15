const db = require('./db'); 

module.exports = { createAllTables };

// Create all tables async function
async function createAllTables() {
    await createMountainTable();
    await createHikerTable();
    await createMountainHikerTable();
    await createHikeResultTable();
}



// Create Mountain if not exist
const createMountainTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS Mountain (
            Id INT AUTO_INCREMENT PRIMARY KEY,
            Name VARCHAR(255) NOT NULL,
            Height DECIMAL(10, 2),
            Country VARCHAR(255),
            Latitude FLOAT,
            Longitude FLOAT
        );
    `;
    await db.query(query);
    console.log('Mountain table created successfully');
};

// Create Hiker if not exist
const createHikerTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS Hiker (
            Id INT AUTO_INCREMENT PRIMARY KEY,
            FirstName VARCHAR(255),
            LastName VARCHAR(255),
            Age INT,
            Guide BOOLEAN
        );
    `;
    await db.query(query);
    console.log('Hiker table created successfully');
};

// Create MountainHiker if not exist
const createMountainHikerTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS MountainHiker (
            MountainId INT,
            HikerId INT,
            FOREIGN KEY (MountainId) REFERENCES Mountain(Id),
            FOREIGN KEY (HikerId) REFERENCES Hiker(Id)
        );
    `;
    await db.query(query);
    console.log('MountainHiker table created successfully');
};

// Create HikeResult if not exist
const createHikeResultTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS HikeResult (
            MountainId INT,
            HikerId INT,
            Finished BOOLEAN,
            Time TIME,
            FOREIGN KEY (MountainId) REFERENCES Mountain(Id),
            FOREIGN KEY (HikerId) REFERENCES Hiker(Id)
        );
    `;
    await db.query(query);
    console.log('HikeResult table created successfully');
};
