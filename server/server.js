import app from "./src/app/app.js"
import 'colors'
import 'dotenv/config'
import dbConnect from "./src/db/dbConnect.js"
const port =process.env.PORT || 5000

// mongodb connections
const dbURL = process.env.DB_URL


dbConnect(dbURL)
.then(()=>{
    console.log("db Connection Successfull".magenta)
    app.listen(port, ()=>console.log(`listening on port http://localhost:${port}`.yellow))
})
.catch(error=>console.log(error.message))