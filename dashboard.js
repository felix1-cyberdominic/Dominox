// dashboard.js - Frontend for AI Support System
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Show/hide sections
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  sections.forEach(s => s.classList.remove('active'));
  navLinks.forEach(n => n.classList.remove('active'));
  
  document.getElementById(sectionId).classList.add('active');
  event.target.classList.add('active');
  
  if (sectionId === 'dashboard') {
    loadDashboard();
  }
}

// Submit support request form
document.getElementById('supportForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Clear previous errors
  clearErrors();
  
  // Validate inputs
  if (!validateForm(data)) {
    return;
  }
  
  try {
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Submitting...';
    
    const response = await fetch(`${API_BASE_URL}/support/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit request');
    }
    
    const result = await response.json();
    displayResponse(result.request);
    form.reset();
    button.disabled = false;
    button.textContent = 'Submit Request';
  } catch (error) {
    console.error('Error submitting request:', error);
    alert('Failed to submit request: ' + error.message);
  }
});

// Validate form inputs
function validateForm(data) {
  const errors = {};
  
  if (!data.name?.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!data.email?.trim() || !isValidEmail(data.email)) {
    errors.email = 'Valid email is required';
  }
  
  if (!data.subject?.trim()) {
    errors.subject = 'Subject is required';
  }
  
  if (!data.complaint?.trim()) {
    errors.complaint = 'Description is required';
  }
  
  if (Object.keys(errors).length > 0) {
    displayErrors(errors);
    return false;
  }
  
  return true;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function displayErrors(errors) {
  Object.entries(errors).forEach(([field, message]) => {
    const errorEl = document.getElementById(`${field}-error`);
    if (errorEl) {
      errorEl.textContent = message;
    }
  });
}

function clearErrors() {
  document.querySelectorAll('.error-message').forEach(el => {
    el.textContent = '';
  });
}

function displayResponse(request) {
  const container = document.getElementById('response-container');
  const responseText = document.getElementById('ai-response');
  const statusBadge = document.getElementById('response-status');
  const urgencyBadge = document.getElementById('response-urgency');
  const categorySpan = document.getElementById('response-category');
  
  responseText.textContent = request.aiResponse;
  statusBadge.textContent = request.status;
  statusBadge.className = `status-badge status-${request.status.toLowerCase().replace(' ', '-')}`;
  urgencyBadge.textContent = request.urgency;
  urgencyBadge.className = `urgency-badge urgency-${request.urgency.toLowerCase()}`;
  categorySpan.textContent = request.category;
  
  container.classList.remove('hidden');
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Load dashboard data
async function loadDashboard() {
  try {
    const email = document.getElementById('filter-email')?.value || '';
    const status = document.getElementById('filter-status')?.value || '';
    
    let url = `${API_BASE_URL}/dashboard/requests`;
    const params = new URLSearchParams();
    if (email) params.append('email', email);
    if (status) params.append('status', status);
    if (params.toString()) url += '?' + params.toString();
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to load requests');
    
    const result = await response.json();
    displayRequests(result.requests);
    loadStats();
  } catch (error) {
    console.error('Error loading dashboard:', error);
    alert('Failed to load requests: ' + error.message);
  }
}

function displayRequests(requests) {
  const list = document.getElementById('requests-list');
  const noRequests = document.getElementById('no-requests');
  
  if (requests.length === 0) {
    list.innerHTML = '';
    noRequests.classList.remove('hidden');
    return;
  }
  
  noRequests.classList.add('hidden');
  list.innerHTML = requests.map(req => `
    <div class="request-card" role="article">
      <div class="request-header">
        <h3>${escapeHtml(req.subject)}</h3>
        <span class="status-badge status-${req.status.toLowerCase().replace(' ', '-')}">${req.status}</span>
      </div>
      <div class="request-body">
        <p><strong>From:</strong> ${escapeHtml(req.name)} (${escapeHtml(req.email)})</p>
        <p><strong>Date:</strong> ${new Date(req.createdAt).toLocaleString()}</p>
        <p><strong>Urgency:</strong> <span class="urgency-badge urgency-${req.urgency.toLowerCase()}">${req.urgency}</span></p>
        <p><strong>Category:</strong> ${req.category}</p>
      </div>
      <div class="request-footer">
        <details>
          <summary>View Details</summary>
          <p><strong>Complaint:</strong></p>
          <p>${escapeHtml(req.complaint)}</p>
          <p><strong>AI Response:</strong></p>
          <p>${escapeHtml(req.aiResponse)}</p>
        </details>
        <button onclick="updateRequestStatus('${req.id}')" class="btn btn-small">Update Status</button>
      </div>
    </div>
  `).join('');
}

async function loadStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
    if (!response.ok) throw new Error('Failed to load stats');
    
    const result = await response.json();
    const statsContainer = document.getElementById('dashboard-stats');
    
    statsContainer.innerHTML = `
      <div class="stat-card">
        <h4>Total Requests</h4>
        <p class="stat-number">${result.stats.total}</p>
      </div>
      <div class="stat-card">
        <h4>Pending</h4>
        <p class="stat-number">${result.stats.pending}</p>
      </div>
      <div class="stat-card">
        <h4>AI Responded</h4>
        <p class="stat-number">${result.stats.aiResponded}</p>
      </div>
      <div class="stat-card">
        <h4>Resolved</h4>
        <p class="stat-number">${result.stats.resolved}</p>
      </div>
      <div class="stat-card">
        <h4>Urgent Issues</h4>
        <p class="stat-number">${result.stats.urgent}</p>
      </div>
    `;
  } catch (error) {
    console.error('Error loading stats:', error);
  }
}

function updateRequestStatus(requestId) {
  const newStatus = prompt('Update status to (Pending/AI Responded/Resolved):');
  if (!newStatus) return;
  
  fetch(`${API_BASE_URL}/support/${requestId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus })
  })
  .then(res => res.json())
  .then(() => {
    alert('Status updated successfully');
    loadDashboard();
  })
  .catch(err => alert('Failed to update status: ' + err.message));
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Load dashboard on page load
if (document.getElementById('dashboard').classList.contains('active')) {
  loadDashboard();
}
