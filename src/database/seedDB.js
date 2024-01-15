const db = require('./db'); 

module.exports = { createAllTables };

// Create all tables async function
async function createAllTables() {
    await createMountainTable();
    await createHikerTable();
    await createCheckpointsTable();
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
    console.log('Mountain table created or already created');
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
    console.log('Hiker table created or already created');
};

// Create Checkpoints if not exist
const createCheckpointsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS Checkpoints (
            Id INT,
            MountainId INT,
            Name VARCHAR(255),
            Height DECIMAL,
            FOREIGN KEY (MountainId) REFERENCES Mountain(Id)
        );
    `;
    await db.query(query);
    console.log('MountainHiker table created or already created');
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
    console.log('HikeResult table created or already created');
};
