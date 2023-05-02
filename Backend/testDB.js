const db = require("./controlers/DB");
const User = require('./Schema/userSchema');
const Local = require("./Schema/localSchema");

db.connectDB();
//DB.disconnectDB();
const local = new Local(
    {
        "email": "knowlesmccall@kongle.com",
        "isActive": true,
        "name": "AUTOMON2",
        "address": "539 Hutchinson Court, Brantleyville, South Dakota, 8262",
        "description": "dolore Lorem culpa magna excepteur eiusmod",
        "products": [
            {   
                "name" : "asd",
                "description": "ut esse eu aliquip sit deserunt",
                "category": "tempor",
                "price": 987
            }
        ]
    }
);
local.save()
    .finally(() => db.disconnectDB())

db.connectDB();
const user = new User({
    "userName": "Zalito",
    "name": "Zalo",
    "email": "nevadavid@puria.com",
    "phone": "549-8875272",
    "address": "126 Indiana Place, Tonopah, South Dakota, 5120"
})
user.save()
    .finally( () => db.disconnectDB());
console.log(user)