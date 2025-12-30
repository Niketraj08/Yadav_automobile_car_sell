const SellRequest = require('../models/SellRequest');

// @desc    Create a new sell request
// @route   POST /api/sell-requests
// @access  Private
const createSellRequest = async (req, res) => {
    try {
        const { carDetails } = req.body; // Expecting nested object or flat? Let's assume flat and we structure it, or client sends structure.
        // Client should send: { name, brand, price... } inside carDetails or we map it.
        // Let's assume matches schema structure: { carDetails: { ... } }

        const sellRequest = new SellRequest({
            user: req.user._id,
            carDetails: carDetails,
        });

        const createdRequest = await sellRequest.save();
        res.status(201).json(createdRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all sell requests (Admin)
// @route   GET /api/sell-requests
// @access  Private/Admin
const getSellRequests = async (req, res) => {
    try {
        const requests = await SellRequest.find({}).populate('user', 'id name email');
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update sell request status
// @route   PUT /api/sell-requests/:id
// @access  Private/Admin
const updateSellRequestStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const request = await SellRequest.findById(req.params.id);

        if (request) {
            request.status = status;
            const updatedRequest = await request.save();
            res.json(updatedRequest);
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createSellRequest,
    getSellRequests,
    updateSellRequestStatus,
};
