const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Department = require('./models/department');
const userModel =require('./models/users')
const userModelDH =require('./models/depHead')
const Doctor = require('./models/doctors')
const path = require('path');
const app = express();
const port = 4001;
const cors = require('cors');
const bcrypt =require("bcrypt");
const cookieParser =require('cookie-parser');
const jwt =require('jsonwebtoken');
const fs = require('fs');
const logiinModel =require("./models/login");
const loginModel = require('./models/login');

mongoose.connect('mongodb://127.0.0.1/hospital')
// mongoose.connect('mongodb+srv://akshaymr83:saYb3czgI8uHbc5e@cluster0.sobagcm.mongodb.net/Hospital')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use(cookieParser());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});




// Create a department with image upload
app.post('/departments', upload.single('image'), async (req, res) => {
  try {
    const { department, year, description } = req.body;
    const imagePath = req.file.path;
    const newDepartment = await Department.create({
      department,
      year,
      image: `/images/${path.basename(imagePath)}`, // Save the image path relative to the public/images directory
      description
    });

    res.status(201).json({ department: newDepartment });
    console.log(newDepartment);

  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
});

// Get all departments
app.get('/getDepartments', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json({ departments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/deleteDepartment/:id", (req, res) => {
  const { id } = req.params;
  Department.findByIdAndDelete({ _id: id })
    .then((de) => {
      console.log(de);
      res.json(de)
    })
    .catch((err) => {
      console.log(err);
    })
})


app.put("/updateDepartment/:id", upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { department, year, description } = req.body;
  let image = req.file ? `/images/${req.file.filename}` : null; // Update the image path if a new image is uploaded
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(id, { department, year, image, description }, { new: true });
    res.json(updatedDepartment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.get("/getUserDepartment/:id", async (req, res) => {
  const { id } = req.params;
  await Department.findById(id) // Assuming Department is your Mongoose model
    .then((department) => {
      res.json(department);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});
//////////////////////////////////////////////////////////Department Name getting///////////////////////////////////////////
// app.get("/deptName", async (req, res) => {
//   try {
//     const departments = await Department.find();
//     res.json(departments);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
app.get('/deptName', async (req, res) => {
  try {
    const departments = await Department.find({}, 'department'); // Retrieve only the department field
    res.json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/deptHeadName', async (req, res) => {
  try {
    const departmentHead = await userModelDH.find({}, 'name'); // Retrieve only the departmenthead field
    res.json(departmentHead);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

////////////////////////////////////////////Employee/////////////////////////
// POST route for employee creation with image upload
app.post('/employee', upload.single('image'), async (req, res) => {
  try {
    const { name, age, email, description, department,report } = req.body;
    const imagePath = req.file ? `images/${path.basename(req.file.path)}` : null; // Check if image was uploaded
    const newEmployee = await userModel.create({
      name,
      age,
      email,
      image: imagePath,
      description,
      department,
      report
    });
    res.status(201).json({ employee: newEmployee });
    console.log('Employee added successfully:', newEmployee);
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(400).json({ error: error.message }); // Return specific error message
  }
});


app.get('/getEmployee',async(req,res)=>{
  try{
    const employee =await userModel.find();
    res.json({employee})
    
  }
  catch (err){
    res.status(500).json({err:err.message});
  }
});

app.delete('/deleteEmployee/:id',(req,res)=>{
  const {id} = req.params;
  userModel.findByIdAndDelete({_id:id})
  .then((de)=>{
    console.log(de);
    res.json(de)
  })
  .catch((err)=>{
    console.log(err);
  })
})



app.get("/getUserEmployee/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await userModel.findById(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update employee by ID
app.put("/updateEmployee/:id", upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, age, email, department, description,report} = req.body;
  let image = req.file ? `/images/${req.file.filename}` : null;
  try {
    const updatedEmployee = await userModel.findByIdAndUpdate(
      id,
      { name, age, email, department, description, image ,report},
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(updatedEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});app.get("/getDeptHeadByName/:name", (req, res) => {
  const { name } = req.params;
userModelDH
    .findOne() // Query by department name
    .then((department) => {
      if (!department) {
        return res.status(404).json({ error: "Department not found" });
      }
      res.json(department);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});
/////////////////////////////////////////////////Dept HEad//////////////////
app.post('/depHead', upload.single('image'), async (req, res) => {
  try {
    const { name, age, email, description, department } = req.body;
    const imagePath = req.file ? `images/${path.basename(req.file.path)}` : null; // Check if image was uploaded
    const newEmployee = await userModelDH.create({
      name,
      age,
      email,
      image: imagePath,
      description,
      department
    });
    res.status(201).json({ employee: newEmployee });
    console.log('Employee added successfully:', newEmployee);
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(400).json({ error: error.message }); // Return specific error message
  }
});

app.get('/getUserDepHead/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await userModelDH.findById(id);
    res.json({ employee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.put("/updateDepHead/:id", upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, age, email, department, description } = req.body;
  let image = req.file ? `/images/${req.file.filename}` : null;
  try {
    const updatedEmployee = await userModelDH.findByIdAndUpdate(
      id,
      { name, age, email, department, description, image },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(updatedEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/getDepHead',async(req,res)=>{
  try{
    const employee =await userModelDH.find();
    res.json({employee})
    
  }
  catch (err){
    res.status(500).json({err:err.message});
  }
});
///////////////////////////////depHeAD by id////////////////////




// Assuming you're using Express.js
app.get("/getHeadByName/:name", (req, res) => {
  const { name } = req.params;
  userModelDH.findOne({ name: name })
    .then((head) => {
      if (!head) {
        return res.status(404).json({ error: "Department head not found" });
      }
      res.json(head);
    })
    .catch((err) => {
      console.error("Error fetching department head:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});






////////////////////////////////////////////////////DEPARTMENT BY NAME


// app.get("/getDEPByName/:department", (req, res) => {
//   const { department } = req.params;
//   Department.findOne({ department: department })
//     .then((dep) => {
//       if (!dep) {
//         return res.status(404).json({ error: "Departmentnot found" });
//       }
//       res.json(dep);
//     })
//     .catch((err) => {
//       console.error("Error fetching department :", err);
//       res.status(500).json({ error: "Internal server error" });
//     });
// });

app.get("/getDEPByName/:department", async (req, res) => {
  const { department } = req.params;
  try {
    const dep = await Department.findOne({ department: department });
    if (!dep) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.json(dep);
  } catch (err) {
    console.error("Error fetching department:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});





//////////////////////////////////////////////////
app.delete('/deleteDepHead/:id',(req,res)=>{
  const {id} = req.params;
  userModelDH.findByIdAndDelete({_id:id})
  .then((de)=>{
    console.log(de);
    res.json(de)
  })
  .catch((err)=>{
    console.log(err);
  })
})

/////////////////////////////////LOGIN////////////////////////////

//authentication, autherization
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("Token is missing");
  } else {
    jwt.verify(token, "key", (err, decoded) => {
      if (err) {
        return res.json("Error with token");
      } else {
        if (decoded.role === "admin") {
          next();
        } else {
          return res.json("Not admin");
        }
      }
    });
  }
};
app.get("/home", verifyUser, (req, res) => {
  res.json("Success");
});

// app.post("/signup", (req, res) => {
//   const { name, email, password } = req.body;
//   bcrypt
//     .hash(password, 7)
//     .then((hash) => {
//       loginModel
//         .create({ name, email, password: hash })
//         .then((user) => res.json("Success"))
//         .catch((err) => res.json(err));
//     })
//     .catch((err) => res.json(err));
// });
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 7)
    .then((hash) => {
      loginModel
        .create({ name, email, password: hash })
        .then((user) => res.json("Success"))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});



app.post("/login", (req, res) => {
  const { email, password } = req.body;
  loginModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        if (response) {
          const token = jwt.sign(
            { email: user.email, role: user.role },
            "key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json({ Status: "Success", role: user.role });
        } else {
          return res.json("Password is incorrect");
        }
      });
    } else {
      return res.json("No record");
    }
  }).catch((err) => {
    console.error("Error finding user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  });
});
///////////////////////////////DOCTORS////////////////////////////

// app.get('/getDoctor/:id', async (req, res) => {
//   try {
//     const doctor = await Doctor.findById(req.params.id);
//     if (!doctor) {
//       return res.status(404).json({ error: 'Doctor not found' });
//     }
//     res.json(doctor);
//   } catch (error) {
//     console.error('Error fetching doctor:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });






app.listen(port, () => {
  console.log('Server is running on port', port);
});
