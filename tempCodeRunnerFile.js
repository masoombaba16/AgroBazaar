app.post('/change_approval_status', async (req, res) => {
    const { consumer_id, status, officerName } = req.body;
    console.log('consumer_id',consumer_id);
    try {
        const application = await Crop.findById(consumer_id);

        if (!application) {
            return res.status(404).send('Application not found');
        }

        if (status === 'approved' || status === 'rejected') {
            application.approvalStatus = status;
            application.officer = officerName; // Update officer name
            await application.save();

            res.send(`Application ${status} successfully`);
        } else {
            res.status(400).send('Invalid status. Please provide "approved" or "rejected"');
        }
    } catch (error) {
        console.error('Error changing approval status:', error);
        res.status(500).send('Internal server error');
    }
});