const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const cors=require("cors");
require('dotenv').config();

main().catch(err => console.log(err));

async function main() {
  await mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Error connecting to MongoDB:", err));

}

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs");



const partnerRoutes = require("./routes/partnerRoute");
app.use("/api/partners", partnerRoutes);

const orderRoutes=require("./routes/orderRoute");
app.use("/api/orders",orderRoutes)

const assignment=require("./routes/assignmentRoute");
app.use("/api/assignments",assignment);

const assignmentMetrics=require("./routes/assignmentMetricsRoute");
app.use("/api/assignmentMetric",assignmentMetrics);

const partnerRegistrations=require("./routes/partnerRegistrationRoute");
app.use("/api/registrations",partnerRegistrations);



app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})