const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
const { ObjectId } = mongoose.Types;

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'secret-key',
    resave: true,
    saveUninitialized: true
}));
app.use('/DASHBOARDS', express.static(path.join(__dirname, 'public/DASHBOARDS')));

mongoose.connect('mongodb://localhost:27017/Signup_Database')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

const db = mongoose.connection;

const cropSchema = new mongoose.Schema({
    consumer_id : String,
    cropname : String,
    quantity : String,
    quality : String,
    state : String,
    district : String,
    mandal : String,
    village : String,
    description : String,
    approvalStatus : { type: String, enum: ['approved', 'rejected', 'pending'], default: 'pending' },
    tos: { type: Date, default: Date.now },
    toa: Date,
    price: Number,
    officer : String
});

//User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    mandal: { type: String, required: true },
    village: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    aadhar: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    bank_number: { type: String, required: true },
    ifsc_code: { type: String, required: true },
    address: { type: String, required: true },
    consumer_id: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mandal: { type: String, required: true },
    phone: { type: String, unique: true, required: true },
    emp_id: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});


// Create a model based on the schema
const Employee = mongoose.model('Employee', employeeSchema);

// Insert Employee Data to Database
/*const newEmployee = new Employee({
    name: 'Ramesh VRO',
    mandal: 'Adilabad Rural',
    phone: '9848185952',
    emp_id: 'E123',
    password: 'password'
});

newEmployee.save()
    .then(() => console.log('Employee saved successfully'))
    .catch(err => console.error('Error saving employee:', err));*/
User = mongoose.model('users', userSchema);

function isAuthenticated(req, res, next) {
    if (req.session.consumer_id) {
        return next();
    } else {
        return res.redirect('/');
    }
}

app.get("/sign_up", (req, res) => {
    res.sendFile(path.join(__dirname, 'fsignup.html'));
});
//SignUp
app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var state = req.body.state;
    var district = req.body.district;
    var mandal = req.body.mandal;
    var village = req.body.village;
    var gender = req.body.gender;
    var dob = req.body.dob;
    var aadhar = req.body.aadhar;
    var phone = req.body.phone;
    var bank_number = req.body.bank_number;
    var ifsc_code = req.body.ifsc_code;
    var address = req.body.address;
    var consumer_id = req.body.consumer_id;
    var password = req.body.password;
    //New User 
    var newUser = new User({
        name: name,
        state: state,
        district: district,
        mandal: mandal,
        village: village,
        gender: gender,
        dob: dob,
        aadhar: aadhar,
        phone: phone,
        bank_number: bank_number,
        ifsc_code: ifsc_code,
        address: address,
        consumer_id: consumer_id,
        password: password
    });

    newUser.save()
        .then(user => {
            console.log("User added to the database:", user);
            res.sendFile(__dirname + '/public/signup_successful.html');
        })
        .catch(error => {
            if (error.name === 'ValidationError') {
                const errors = Object.values(error.errors).map(err => err.message);
                console.error("Validation errors:", errors);
                res.status(400).send(`Validation errors: ${errors.join(', ')}`);
            } else {
                console.error("Error saving user to the database:", error);
                res.status(500).send('Error saving user to the database');
            }
        });
});
  
// Login Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'consumer_login.html'));
});

// User Login Logic
app.post("/login", (req, res) => {
    const { consumer_id, password, role } = req.body;

    User.findOne({ consumer_id: consumer_id, password: password })
        .then(user => {
            if (!user) {
                return res.status(401).send('Invalid username or password');
            }
            req.session.consumerId = consumer_id;
            if (role === 'farmer') {
                res.redirect('/DASHBOARDS/farmer_dashboard.html');
            } else if (role === 'consumer') {
                res.redirect('/DASHBOARDS/customer_dashboard.html');
            } else {
                res.status(400).send('Invalid role');
            }
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        });
});
app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error logging out');
        }
        res.redirect('/');
    });
});

//Officer Login
app.get("/officer/login", (req, res) => {
    res.sendFile(path.join(__dirname, 'officer_login.html'));
});
app.post('/officer/login', async (req, res) => {
    const { emp_id, password } = req.body;

    try {
        const officer = await Employee.findOne({ emp_id });

        if (officer && officer.password === password) {
            req.session.emp_id = emp_id; // Set emp_id in the session
            res.redirect('/DASHBOARDS/officer_dashboard.html');
        } else {
            console.log('Invalid employee ID or password:', emp_id);
            res.status(401).send('Invalid employee ID or password');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});


app.get("/forgot/password",(req,res) =>
{
    res.sendFile(path.join(__dirname,'forgot_password.html'));
});

// Route to handle forgot password form submission
app.post('/forgot/password', async (req, res) => {
    const { consumer_id, dob, aadhar } = req.body;
    try {
        const consumer = await User.findOne({ consumer_id, dob, aadhar });
        if (consumer) {
            req.session.consumerId = consumer_id; // Store consumer_id in session
            res.redirect('/change/password');
        } else {
            // Consumer not found
            res.status(404).send("Consumer not found");
        }
    } catch (error) {
        console.error(error);
        res.redirect('/notfound.html');
    }
});

// Route to serve change password form
app.get("/change/password",(req,res) =>
{
    if (!req.session.consumerId) {
        return res.status(400).send("Consumer ID not found in session");
    }
    res.sendFile(path.join(__dirname,'/public/PASSWORDS/forgot_change.html'));
});

// Route to handle change password form submission
app.post('/change/password', async (req, res) => {
    const { new_password } = req.body;
    const consumer_id = req.session.consumerId; // Retrieve consumer_id from session
    try {
        const user = await User.findOne({ consumer_id });
        if (user) {
            // Update the password in the database
            user.password = new_password;
            await user.save();
            res.redirect('/PASSWORDS/succeschange.html');
        } else {
            res.status(404).send("Consumer not found");
        }
    } catch (error) {
        console.error(error);
        res.redirect('/PASSWORDS/notfound.html');
    }
});
//Crop Submit By Farmer..
app.get("/cropsubmit",(req,res) =>
{
    if (!req.session.consumerId) {
        return res.status(400).send("Consumer ID not found in session");
    }
    res.sendFile(path.join(__dirname,'/public/DASHBOARDS/FARMER/cropsubmit.html'));
});
var Crop = mongoose.model('crops', cropSchema);
app.post("/cropsubmit", (req, res) => {
    const consumer_id = req.session.consumerId;
    const { cropname, quantity, quality, state, district, mandal, village, description, officer } = req.body;
    let price;
    if (quality > 50 && quality < 75) {
        price = quantity*500;
    } else if (quality >= 75 && quality <= 100) {
        price = quantity * 800;
    }
    else{
        price= quantiyt*350;
    }

    let selectedCropname = cropname;
    if (Array.isArray(cropname)) {
        selectedCropname = cropname[0]; // Use the first value if cropname is an array
    }
    //New User 
    var newCrop = new Crop({
        consumer_id: consumer_id,
        cropname: selectedCropname,
        quantity: quantity,
        quality: quality,
        state: state,
        district: district,
        mandal: mandal,
        village: village,
        description: description,
        approvalStatus: 'pending',
        tos: Date.now(),
        toa: null,
        price: price,
        officer: ''
    });
   

    newCrop.save()
    .then(() => {
        console.log("Crop Submitted to the database:", newCrop); // Use newCrop instead of crop
        res.sendFile(__dirname + '/public/DASHBOARDS/FARMER/cropsuccess.html');
    })
    .catch(error => {
        console.error("Error saving crop to the database:", error);
        res.status(500).send('Error saving crop to the database');
    });

});
app.get('/crops', async (req, res) => {
    try {
        const emp_id = req.session.emp_id; // Retrieve emp_id from the session
        if (!emp_id) {
            return res.status(400).send("Employee ID not found in session");
        }
        const employee = await Employee.findOne({ emp_id });
        if (!employee) {
            return res.status(400).send("Employee not found for EMP ID");
        }
        const emp_mandal = employee.mandal;
        if (!emp_mandal) {
            return res.status(400).send("Mandal not found for EMP ID");
        }
        const crops = await Crop.find({ mandal: emp_mandal });
        if (!crops || crops.length === 0) {
            console.log("No crops found for Mandal:", emp_mandal);
            return res.status(404).send("No crops found for Mandal");
        }
        res.json(crops);
    } catch (err) {
        console.error("Error fetching crops:", err);
        res.status(500).send(err.message);
    }
});
app.get('/approved/crops', async (req, res) => {
    try {
        const emp_id = req.session.emp_id; // Retrieve emp_id from the session
        if (!emp_id) {
            return res.status(400).send("Employee ID not found in session");
        }
        const employee = await Employee.findOne({ emp_id });
        if (!employee) {
            return res.status(400).send("Employee not found for EMP ID");
        }
        const emp_mandal = employee.mandal;
        if (!emp_mandal) {
            return res.status(400).send("Mandal not found for EMP ID");
        }
        const crops = await Crop.find({ 
            approvalStatus: 'approved',
            mandal: emp_mandal
        });
        if (!crops || crops.length === 0) {
            console.log("No approved crops found for Mandal:", emp_mandal);
            return res.status(404).send("No approved crops found for Mandal");
        }

        // Check if the mandal of the employee matches the mandal of the approved crops
        const mandalMatches = crops.every(crop => crop.mandal === emp_mandal);
        if (!mandalMatches) {
            console.log("Mandal of employee does not match mandal of approved crops");
            return res.status(403).send("Mandal of employee does not match mandal of approved crops");
        }

        res.json(crops);
    } catch (err) {
        console.error("Error fetching approved crops:", err);
        res.status(500).send(err.message);
    }
});
app.get('/pending/crops', async (req, res) => {
    try {
        const emp_id = req.session.emp_id; // Use "E123" directly for testing
        const employee = await Employee.findOne({ emp_id });
        if (!employee) {
            return res.status(400).send("Employee not found for EMP ID");
        }
        const emp_mandal = employee.mandal;
        if (!emp_mandal) {
            return res.status(400).send("Mandal not found for EMP ID");
        }
        const crops = await Crop.find({ 
            approvalStatus: 'pending',
            mandal: emp_mandal
        });
        if (!crops || crops.length === 0) {
            console.log("No Pending crops found for Mandal:", emp_mandal);
            return res.status(404).send("No Pending crops found for Mandal");
        }

        // Check if the mandal of the employee matches the mandal of the pending crops
        const mandalMatches = crops.every(crop => crop.mandal === emp_mandal);
        if (!mandalMatches) {
            console.log("Mandal of employee does not match mandal of Pending crops");
            return res.status(403).send("Mandal of employee does not match mandal of Pending crops");
        }

        console.log('HELLO');
        res.json(crops);

    } catch (err) {
        console.error("Error fetching Pending crops:", err);
        res.status(500).send(err.message);
    }
});
app.get('/rejected/crops', async (req, res) => {
    try {
        const emp_id = req.session.emp_id; 
        const employee = await Employee.findOne({ emp_id });
        if (!employee) {
            return res.status(400).send("Employee not found for EMP ID");
        }
        const emp_mandal = employee.mandal;
        if (!emp_mandal) {
            return res.status(400).send("Mandal not found for EMP ID");
        }
        const crops = await Crop.find({ 
            approvalStatus: 'rejected',
            mandal: emp_mandal
        });
        if (!crops || crops.length === 0) {
            console.log("No Rejected crops found for Mandal:", emp_mandal);
            return res.status(404).send("No Rejected crops found for Mandal");
        }

        // Check if the mandal of the employee matches the mandal of the pending crops
        const mandalMatches = crops.every(crop => crop.mandal === emp_mandal);
        if (!mandalMatches) {
            console.log("Mandal of employee does not match mandal of Rejected crops");
            return res.status(403).send("Mandal of employee does not match mandal of Rejected crops");
        }

        res.json(crops);

    } catch (err) {
        console.error("Error fetching Rejected crops:", err);
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.use((req, res, next) => {
    res.status(404).send('Page not found');
});