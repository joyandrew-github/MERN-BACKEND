// const operation = require("./operation.js");

// const a = 5;
// const b = 3;

// console.log(`Add: ${operation.add(a, b)}`);
// console.log(`Sub: ${operation.sub(a, b)}`);
// console.log(`Mul: ${operation.mul(a, b)}`);
// console.log(`Div: ${operation.div(a, b)}`);

// console.log(" Aspiring Backend developer");

// const operation = require("./operation.js");

// const num = [1, 2, 3, 4, 5];
// console.log(operation.arr(num));
// console.log(operation.arr_filter(num));

// const http = require('http');//cors module

//  const server=http.createServer((req, res) => {

//   res.end('BackenddYehhhh');
// })

// const PORT=3000;

// server.listen(PORT,()=>{
//     console.log(`My Server Is Running at the port ${PORT} `);
// })

// const express = require("express");

// const app = express();//express instance

// app.get("/", (req, res) => {
//   const students = [
//     { id: 1, name: "Arjun" },
//     { id:2, name : "eeee"}
//   ];
//   res.json(students);
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// const express = require("express");

// const app = express();

// const students = [
//     { id: 1, name: "a" },
//     { id: 2, name: "b" }
// ];

// app.get("/", (req, res) => {
//     res.json(students);
// });

// app.get("/singleData", (req, res) => {
//     const { id } = req.query;
//     if (id) {
//         const result = students.find((item) => item.id === Number(id));
//         if (result) {
//             res.json(result);
//         }
//     } else {
//         res.json(students);
//     }
// });

// const PORT = 1000;

// app.listen(PORT, () => {
//     console.log(`My server runs on http://localhost:${PORT}`);
// });

const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
uuidv4();
const PORT = 8000;
const mongourl = "mongodb+srv://joyandrew006:andr2006@cluster0.gg3wfvu.mongodb.net/Practice";
mongoose.connect(mongourl).then(() => {
  console.log("DB Connected");
  app.listen(PORT, () => {
    console.log("My Server is running");
  });
});

const expenseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
});

const expenseModel = mongoose.model("expense-tracker", expenseSchema); //cln name,Schema name



app.post("/api/expenses",async(req,res)=>{
    const{title,amount}=req.body;
    const newExpense=new expenseModel({
        id:uuidv4(),
        title:title,
        amount:amount,

    });
    const savedExpense=await newExpense.save();
    res.status(200).json(savedExpense);
});



app.get("/api/expensesById/:id",async(req,res)=>{
    const {id}=req.params;
    const getid=await expenseModel.findOne({id});
    res.json(getid)
})


app.put("/api/expensesUpdate/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedExpense = await expenseModel.findOneAndUpdate(
    { id },
    updates,
    { new: true }
  );

  if (updatedExpense) {
      res.status(200).json(updatedExpense);
  }
});




app.delete("/api/expensesdeletebyId/:id", async (req, res) => {
  const { id } = req.params;
    const del = await expenseModel.deleteOne({ id });
      res.json(del);
    
});




app.delete("/api/expensesdeleteAll", async (req, res) => {
  const delall = await expenseModel.deleteMany({}); 
  res.json(delall);
});



