import app from "./src/app.js";
import connect from "./src/db/db.js";
import dotenv from "dotenv";
dotenv.config();


connect()

app.listen(3000, () => {
  console.log("✅ Server is running on http://localhost:3000");
});


