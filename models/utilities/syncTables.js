const db = require('../db');

async function syncTables() {

    var myArgs = process.argv.slice(2);

    console.log(myArgs, ' arg')

    if (myArgs.length == 0) {
        console.error("CLI args required");
        process.exit(1);
    }

    if (myArgs[0] == "all" && myArgs.length == 1) {
        await db.sequelize.sync();
    }
    else if (myArgs[0] == "table" && myArgs.length == 2) {
        await db[`${myArgs[1]}`].sync({ force: true })
    }
    else if (myArgs[0] == "table-alter" && myArgs.length == 2) {
        await db[`${myArgs[1]}`].sync({ alter: true })
    }
    else if (myArgs[0] == "all" && myArgs[1] == "force") {
        await db.sequelize.sync({ force: true });
    }
    else if (myArgs[0] == "all" && myArgs[1] == "alter") {
        await db.sequelize.sync({ alter: true });
    }
    else if (myArgs[0] != "all") {

        for (var model in db.sequelize.models) {
            console.log(model);
        }
    }

    console.log("\nTable Sync Done.\n");
    process.exit(0);

}

if (require.main == module) {
    syncTables();
}