const { BadRequestError } = require("../errors");

const testUser = async (req, res, next) => {
    const testUser = req.user.testUser;
    
    if (testUser) { 
        throw new BadRequestError("Test user. Read only");
    }

    next();
};

module.exports = testUser;