// routes/dashboard.js - Handle customer dashboard requests
const express = require('express');
const router = express.Router();

// GET /api/dashboard/requests - Get all support requests
router.get('/requests', (req, res) => {
  try {
    global.supportRequests = global.supportRequests || [];
    const { email, status } = req.query;

    let requests = global.supportRequests;

    // Filter by email if provided
    if (email) {
      requests = requests.filter(r => r.email === email);
    }

    // Filter by status if provided
    if (status) {
      requests = requests.filter(r => r.status === status);
    }

    // Sort by most recent first
    requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      count: requests.length,
      requests
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch requests',
      message: error.message
    });
  }
});

// GET /api/dashboard/requests/:id - Get a specific request
router.get('/requests/:id', (req, res) => {
  try {
    const { id } = req.params;
    global.supportRequests = global.supportRequests || [];
    const request = global.supportRequests.find(r => r.id === id);

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json({
      success: true,
      request
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch request',
      message: error.message
    });
  }
});

// GET /api/dashboard/stats - Get dashboard statistics
router.get('/stats', (req, res) => {
  try {
    global.supportRequests = global.supportRequests || [];
    const requests = global.supportRequests;

    const stats = {
      total: requests.length,
      pending: requests.filter(r => r.status === 'Pending').length,
      aiResponded: requests.filter(r => r.status === 'AI Responded').length,
      resolved: requests.filter(r => r.status === 'Resolved').length,
      urgent: requests.filter(r => r.urgency === 'High').length,
      averageResponseTime: calculateAverageResponseTime(requests)
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch statistics',
      message: error.message
    });
  }
});

function calculateAverageResponseTime(requests) {
  if (requests.length === 0) return 0;
  
  const times = requests.map(r => {
    const created = new Date(r.createdAt);
    const updated = new Date(r.updatedAt);
    return (updated - created) / 1000; // Convert to seconds
  });

  const average = times.reduce((a, b) => a + b, 0) / times.length;
  return Math.round(average);
}

module.exports = router;
