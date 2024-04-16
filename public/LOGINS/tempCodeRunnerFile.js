const predefinedOfficers = [
    { emp_id: '123', password: 'password123' ,mandal:'mandal2'},
    { emp_id: '456', password: 'password456',mandal:'mandal1' }
];

// Serve the officer login page
app.get("/officer/login", (req, res) => {
    res.sendFile(path.join(__dirname, 'officer_login.html'));
});

// Officer login route
app.post('/officer/login', (req, res) => {
    const { emp_id, password } = req.body;

    // Check if officer exists in the predefined data
    const officer = predefinedOfficers.find(o => o.emp_id === emp_id && o.password === password);

    if (officer) {
        // Set officer details in session
        req.session.officer = officer;
        res.redirect('/officer/dashboard');
    } else {
        res.status(401).send('Invalid employee ID or password');
    }
});

// Officer dashboard route
app.get('/officer/dashboard', (req, res) => {
    // Check if officer is logged in
    if (req.session.officer) {
        const officerDetails = predefinedOfficers.find(o => o.emp_id === req.session.officer.emp_id); // Find officer details

        if (officerDetails) {
            const officerMandal = officerDetails.mandal; // Get the mandal of the logged-in officer

            // Find previous submissions (approved or rejected)
            Crop.find({ approvedByOfficer: { $ne: undefined } })
                .populate('purchasedBy') // Populate the purchasedBy field to get user details
                .then(previousSubmissions => {
                    // Find new crop submissions awaiting approval (with approvedByOfficer set to undefined) and matching mandal
                    Crop.find({ approvedByOfficer: undefined, mandal: officerMandal })
                        .then(newSubmissions => {
                            res.send(`
                                <h2>Welcome Officer ${req.session.officer.emp_id}!</h2>
                                <h3>Previous Submissions</h3>
                                <ul>
                                    ${previousSubmissions.map(crop => `
                                        <li>${crop.cropType} - ${crop.quantity} - ${crop.quality} - ${crop.username} - Price: ${crop.price} - Status: ${crop.approvedByOfficer ? 'Approved' : 'Rejected'} - State: ${crop.state} - District: ${crop.district} - Mandal: ${crop.mandal} - Village: ${crop.village}-Purchased By: ${crop.purchasedBy ? crop.purchasedBy.consumer_id : 'Not purchased yet'}</li>
                                    `).join('')}
                                </ul>
                                <h3>Submissions Awaiting Approval</h3>
                                <ul>
                                    ${newSubmissions.map(crop => `
                                        <li>
                                            ${crop.cropType} - ${crop.quantity} - ${crop.quality} - ${crop.username} - Price: ${crop.price} - State: ${crop.state} - District: ${crop.district} - Mandal: ${crop.mandal} - Village: ${crop.village}
                                            <form action="/officer/approve/${crop._id}" method="POST">
                                                <button type="submit">Approve</button>
                                            </form>
                                            <form action="/officer/reject/${crop._id}" method="POST">
                                                <button type="submit">Reject</button>
                                            </form>
                                        </li>`).join('')}
                                </ul>
                                <a href="/officer/change-password">Change Password</a>
                                <form action="/officer/logout" method="POST">
                                    <button type="submit">Logout</button>
                                </form>
                            `);
                        })
                        .catch(err => {
                            console.error(err);
                            res.status(500).send('Internal Server Error');
                        });
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                });
        } else {
            res.status(500).send('Officer details not found');
        }
    } else {
        // If officer is not logged in, redirect to login page
        res.redirect('/officer/login');
    }
});




// Officer approval route - Handle crop approval
app.post("/officer/approve/:id", (req, res) => {
    const cropId = req.params.id;

    Crop.findByIdAndUpdate(cropId, { approvedByOfficer: true })
        .then(() => {
            res.redirect('/officer/dashboard');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

// Officer reject route - Handle crop rejection
app.post("/officer/reject/:id", (req, res) => {
    const cropId = req.params.id;

    Crop.findByIdAndUpdate(cropId, { approvedByOfficer: false })
        .then(() => {
            res.redirect('/officer/dashboard');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

// Officer change password route - Display change password form
app.get("/officer/change-password", (req, res) => {
    // Check if officer is logged in
    if (req.session.officer) {
        res.send(`
            <h2>Change Password</h2>
            <form action="/officer/change-password" method="POST">
                <label for="newPassword">New Password:</label>
                <input type="password" id="newPassword" name="newPassword" required>
                <button type="submit">Change Password</button>
            </form>
        `);
    } else {
        // If officer is not logged in, redirect to login page
        res.redirect('/officer/login');
    }
});

// Officer change password route - Handle password change
app.post("/officer/change-password", (req, res) => {
    // Check if officer is logged in
    if (req.session.officer) {
        const newPassword = req.body.newPassword;

        // Update the password in the predefinedOfficers array
        predefinedOfficers.forEach(officer => {
            if (officer.emp_id === req.session.officer.emp_id) {
                officer.password = newPassword;
            }
        });

        // Update the officer's session with the new password
        req.session.officer.password = newPassword;

        res.send('Password changed successfully!');
    } else {
        // If officer is not logged in, redirect to login page
        res.redirect('/officer/login');
    }
});



// Logout route
app.post("/officer/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/officer/login');
        }
    });
});

// Root route redirection to officer login page
app.get("/", (req, res) => {
    res.redirect("/officer/login");
});