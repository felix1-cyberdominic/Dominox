// routes/support.js - Handle support request submission and AI response
const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const { validateRequest } = require('../utils/validation');
const { generateUrgency, categorizeIssue } = require('../services/aiAnalysis');

// POST /api/support/submit - Submit a new support request
router.post('/submit', async (req, res) => {
  try {
    // Validate input
    const validation = validateRequest(req.body);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.errors });
    }

    const { name, email, subject, complaint } = req.body;

    // Generate AI response
    const aiResponse = await aiService.generateResponse({
      subject,
      complaint
    });

    // Analyze urgency and category
    const urgency = await generateUrgency(complaint);
    const category = await categorizeIssue(subject, complaint);

    // Create support request object
    const request = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      complaint,
      aiResponse: aiResponse.response,
      urgency,
      category,
      status: 'AI Responded',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Store request (in-memory for now)
    global.supportRequests = global.supportRequests || [];
    global.supportRequests.push(request);

    res.status(201).json({
      success: true,
      message: 'Support request submitted successfully',
      request
    });
  } catch (error) {
    console.error('Error submitting support request:', error);
    res.status(500).json({
      error: 'Failed to process support request',
      message: error.message
    });
  }
});

// PUT /api/support/:id - Update support request status
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status, resolution } = req.body;

    global.supportRequests = global.supportRequests || [];
    const request = global.supportRequests.find(r => r.id === id);

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    request.status = status || request.status;
    request.resolution = resolution || request.resolution;
    request.updatedAt = new Date().toISOString();

    res.json({
      success: true,
      message: 'Request updated successfully',
      request
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update request',
      message: error.message
    });
  }
});

module.exports = router;
