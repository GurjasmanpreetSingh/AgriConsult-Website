// ---------- MOBILE MENU ----------
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navbar = document.querySelector('.navbar');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('show'));
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('show');
      }
    });
  }

  // Navbar shadow on scroll
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // ---------- FAQ ----------
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-question');
    if (q) q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ---------- SCROLL TOP ----------
  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-top';
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(scrollBtn);
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => scrollBtn.classList.toggle('show', window.scrollY > 400));

  // ---------- TOAST ----------
  window.showToast = function(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  };

  // ---------- CONTACT FORM ----------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Sent successfully!';
        showToast('Thank you! Our consultant will contact you within 24 hours.');
        contactForm.reset();
        setTimeout(() => { btn.innerHTML = original; btn.disabled = false; }, 2500);
      }, 1200);
    });
  }

  // ---------- NEWSLETTER ----------
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Subscribed! Weekly farming tips are on the way.');
      form.reset();
    });
  });

  // ---------- CHART.JS DASHBOARD ----------
  initDashboardCharts();
});

// ---------- DASHBOARD CHARTS ----------
function initDashboardCharts() {
  if (typeof Chart === 'undefined') return;

  Chart.defaults.font.family = 'Inter, system-ui, sans-serif';
  Chart.defaults.color = '#5a6b5a';

  // Yield Trend Line Chart
  const yieldCtx = document.getElementById('yieldChart');
  if (yieldCtx) {
    new Chart(yieldCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [{
          label: 'Yield (tons)',
          data: [42, 48, 55, 62, 71, 78, 85, 92, 98],
          borderColor: '#388e3c',
          backgroundColor: 'rgba(56, 142, 60, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: '#1b5e20',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1b5e20', padding: 12, cornerRadius: 8, titleFont: { weight: 'bold' } } },
        scales: {
          y: { beginAtZero: true, grid: { color: '#eef4ee' }, ticks: { callback: v => v + 't' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // Soil Nutrients Doughnut
  const nutrientsCtx = document.getElementById('nutrientsChart');
  if (nutrientsCtx) {
    new Chart(nutrientsCtx, {
      type: 'doughnut',
      data: {
        labels: ['Nitrogen', 'Phosphorus', 'Potassium', 'Organic Matter'],
        datasets: [{
          data: [35, 22, 28, 15],
          backgroundColor: ['#1b5e20', '#66bb6a', '#ffb300', '#8d6e63'],
          borderWidth: 0,
          hoverOffset: 12
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: { position: 'bottom', labels: { padding: 14, boxWidth: 12, boxHeight: 12, usePointStyle: true, pointStyle: 'circle', font: { size: 11 } } },
          tooltip: { backgroundColor: '#1b5e20', padding: 12, cornerRadius: 8, callbacks: { label: ctx => ctx.label + ': ' + ctx.parsed + '%' } }
        }
      }
    });
  }

  // Water Usage Bar Chart
  const waterCtx = document.getElementById('waterChart');
  if (waterCtx) {
    new Chart(waterCtx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Water (L)',
          data: [420, 380, 450, 390, 410, 340, 300],
          backgroundColor: ['#388e3c', '#388e3c', '#ffb300', '#388e3c', '#388e3c', '#66bb6a', '#66bb6a'],
          borderRadius: 8,
          barThickness: 36
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1b5e20', padding: 12, cornerRadius: 8 } },
        scales: {
          y: { beginAtZero: true, grid: { color: '#eef4ee' }, ticks: { callback: v => v + 'L' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // Crop Health Radar
  const healthCtx = document.getElementById('healthChart');
  if (healthCtx) {
    new Chart(healthCtx, {
      type: 'radar',
      data: {
        labels: ['Soil', 'Water', 'Pest Control', 'Nutrients', 'Weather', 'Yield'],
        datasets: [
          { label: 'Current', data: [85, 78, 90, 82, 75, 88], borderColor: '#1b5e20', backgroundColor: 'rgba(27, 94, 32, 0.2)', borderWidth: 3, pointBackgroundColor: '#1b5e20', pointRadius: 5 },
          { label: 'Target', data: [95, 90, 95, 92, 88, 95], borderColor: '#ffb300', backgroundColor: 'rgba(255, 179, 0, 0.15)', borderWidth: 2, borderDash: [5, 5], pointBackgroundColor: '#ffb300', pointRadius: 4 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { padding: 15, usePointStyle: true, pointStyle: 'circle' } } },
        scales: {
          r: {
            beginAtZero: true, max: 100,
            grid: { color: '#e0ebe0' },
            angleLines: { color: '#e0ebe0' },
            pointLabels: { font: { size: 11, weight: '600' }, color: '#1a2e1a' },
            ticks: { display: false, stepSize: 25 }
          }
        }
      }
    });
  }
}

// ---------- MOCK ACTIONS FOR BUTTONS ----------
window.downloadReport = function() {
  showToast('Generating PDF report...');
  setTimeout(() => showToast('Report downloaded successfully!'), 1500);
};

window.viewField = function(name) {
  showToast('Opening field details: ' + name);
};

window.applyTip = function(tip) {
  showToast('Tip added to your farm plan: ' + tip);
};

window.shareSite = function() {
  if (navigator.share) {
    navigator.share({ title: 'AgriConsult', text: 'Check out AgriConsult for expert farming solutions!', url: window.location.href });
  } else {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link copied to clipboard!');
  }
};


// ============================================================
// APPOINTMENTS SYSTEM
// ============================================================
(function initAppointments() {
  const form = document.getElementById('appointmentForm');
  const list = document.getElementById('appointmentsList');
  const emptyState = document.getElementById('emptyState');
  const filterSelect = document.getElementById('filterStatus');

  // Only run on the appointments page
  if (!form || !list) return;

  // ---------- LOAD FROM LOCALSTORAGE ----------
  let appointments = JSON.parse(localStorage.getItem('agriAppointments') || '[]');

  // Seed demo data on first visit
  if (appointments.length === 0 && !localStorage.getItem('agriSeeded')) {
    const today = new Date();
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
    const nextWeek = new Date(today); nextWeek.setDate(today.getDate() + 7);
    const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
    const lastWeek = new Date(today); lastWeek.setDate(today.getDate() - 7);

    appointments = [
      {
        id: Date.now() - 100000,
        name: 'Ramesh Kumar',
        phone: '+91 98765 43210',
        date: tomorrow.toISOString().split('T')[0],
        time: '10:00',
        service: 'Soil Health Consultation',
        mode: 'On-site Visit',
        notes: 'Wheat field showing yellowing patches in the north section.',
        status: 'upcoming',
        createdAt: Date.now() - 100000
      },
      {
        id: Date.now() - 50000,
        name: 'Ramesh Kumar',
        phone: '+91 98765 43210',
        date: nextWeek.toISOString().split('T')[0],
        time: '14:30',
        service: 'Pest & Disease Inspection',
        mode: 'Video Call',
        notes: 'Suspected aphid infestation on tomato plants.',
        status: 'upcoming',
        createdAt: Date.now() - 50000
      },
      {
        id: Date.now() - 900000,
        name: 'Ramesh Kumar',
        phone: '+91 98765 43210',
        date: lastWeek.toISOString().split('T')[0],
        time: '11:00',
        service: 'Irrigation System Design',
        mode: 'On-site Visit',
        notes: 'Drip irrigation setup for 3-acre vegetable plot.',
        status: 'completed',
        createdAt: Date.now() - 900000
      }
    ];
    localStorage.setItem('agriAppointments', JSON.stringify(appointments));
    localStorage.setItem('agriSeeded', '1');
  }

  // ---------- SAVE ----------
  function save() {
    localStorage.setItem('agriAppointments', JSON.stringify(appointments));
  }

  // ---------- FORMAT DATE ----------
  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', weekday: 'short' });
  }

  function formatTime(timeStr) {
    const [h, m] = timeStr.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h12 = hour % 12 || 12;
    return `${h12}:${m} ${ampm}`;
  }

  // ---------- CHECK IF APPOINTMENT IS PAST ----------
  function isPast(appt) {
    const dt = new Date(appt.date + 'T' + appt.time);
    return dt < new Date();
  }

  // ---------- RENDER STATS ----------
  function renderStats() {
    const total = appointments.length;
    const upcoming = appointments.filter(a => a.status === 'upcoming' && !isPast(a)).length;
    const completed = appointments.filter(a => a.status === 'completed' || (a.status === 'upcoming' && isPast(a))).length;
    const cancelled = appointments.filter(a => a.status === 'cancelled').length;

    document.getElementById('statTotal').textContent = total;
    document.getElementById('statUpcoming').textContent = upcoming;
    document.getElementById('statCompleted').textContent = completed;
    document.getElementById('statCancelled').textContent = cancelled;
  }

  // ---------- RENDER LIST ----------
  function renderList() {
    const filter = filterSelect.value;
    let filtered = appointments.slice().sort((a, b) => new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time));

    // Auto-mark past upcoming as completed
    let changed = false;
    appointments.forEach(a => {
      if (a.status === 'upcoming' && isPast(a)) {
        a.status = 'completed';
        changed = true;
      }
    });
    if (changed) save();

    if (filter !== 'all') {
      filtered = filtered.filter(a => a.status === filter);
    }

    list.innerHTML = '';

    if (filtered.length === 0) {
      emptyState.style.display = 'block';
      emptyState.querySelector('h3').textContent =
        filter === 'all' ? 'No appointments yet' :
        `No ${filter} appointments`;
      return;
    }
    emptyState.style.display = 'none';

    filtered.forEach(appt => {
      const card = document.createElement('div');
      card.className = `appt-card status-${appt.status}`;

      const badgeLabel = appt.status.charAt(0).toUpperCase() + appt.status.slice(1);
      const badgeIcon = appt.status === 'upcoming' ? 'fa-clock' :
                        appt.status === 'completed' ? 'fa-check-circle' : 'fa-times-circle';

      card.innerHTML = `
        <div class="appt-header">
          <div>
            <div class="appt-title">${escapeHtml(appt.service)}</div>
            <div style="color: var(--text-light); font-size: 0.85rem;">Booking ID: #${String(appt.id).slice(-6)}</div>
          </div>
          <span class="appt-badge ${appt.status}">
            <i class="fas ${badgeIcon}"></i> ${badgeLabel}
          </span>
        </div>

        <div class="appt-meta">
          <div class="appt-meta-item"><i class="fas fa-calendar"></i> <strong>${formatDate(appt.date)}</strong></div>
          <div class="appt-meta-item"><i class="fas fa-clock"></i> <strong>${formatTime(appt.time)}</strong></div>
          <div class="appt-meta-item"><i class="fas fa-${appt.mode === 'Video Call' ? 'video' : appt.mode === 'Phone Call' ? 'phone' : appt.mode === 'Office Meeting' ? 'building' : 'map-marker-alt'}"></i> ${appt.mode}</div>
          <div class="appt-meta-item"><i class="fas fa-user"></i> ${escapeHtml(appt.name)}</div>
          <div class="appt-meta-item"><i class="fas fa-phone"></i> ${escapeHtml(appt.phone)}</div>
        </div>

        ${appt.notes ? `<div class="appt-notes">"${escapeHtml(appt.notes)}"</div>` : ''}

        <div class="appt-actions">
          ${appt.status === 'upcoming' ? `
            <button class="btn-reschedule" onclick="rescheduleAppt(${appt.id})">
              <i class="fas fa-edit"></i> Reschedule
            </button>
            <button class="btn-cancel" onclick="cancelAppt(${appt.id})">
              <i class="fas fa-times"></i> Cancel Appointment
            </button>
          ` : `
            <button class="btn-reschedule" onclick="deleteAppt(${appt.id})">
              <i class="fas fa-trash"></i> Remove from History
            </button>
          `}
        </div>
      `;
      list.appendChild(card);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  // ---------- GLOBAL ACTIONS ----------
  window.cancelAppt = function(id) {
    const appt = appointments.find(a => a.id === id);
    if (!appt) return;
    if (!confirm(`Cancel the appointment for "${appt.service}" on ${formatDate(appt.date)}?`)) return;
    appt.status = 'cancelled';
    save();
    renderAll();
    showToast('Appointment cancelled successfully');
  };

  window.rescheduleAppt = function(id) {
    const appt = appointments.find(a => a.id === id);
    if (!appt) return;
    const newDate = prompt('Enter new date (YYYY-MM-DD):', appt.date);
    if (!newDate) return;
    const newTime = prompt('Enter new time (HH:MM, 24-hour):', appt.time);
    if (!newTime) return;
    appt.date = newDate;
    appt.time = newTime;
    save();
    renderAll();
    showToast('Appointment rescheduled');
  };

  window.deleteAppt = function(id) {
    if (!confirm('Remove this appointment from your history permanently?')) return;
    appointments = appointments.filter(a => a.id !== id);
    save();
    renderAll();
    showToast('Appointment removed');
  };

  // ---------- FORM SUBMIT ----------
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newAppt = {
      id: Date.now(),
      name: document.getElementById('apptName').value.trim(),
      phone: document.getElementById('apptPhone').value.trim(),
      date: document.getElementById('apptDate').value,
      time: document.getElementById('apptTime').value,
      service: document.getElementById('apptService').value,
      mode: document.getElementById('apptMode').value,
      notes: document.getElementById('apptNotes').value.trim(),
      status: 'upcoming',
      createdAt: Date.now()
    };

    // Validate date is not in the past
    if (new Date(newAppt.date + 'T' + newAppt.time) < new Date()) {
      showToast('⚠️ Please select a future date and time');
      return;
    }

    appointments.push(newAppt);
    save();
    renderAll();
    form.reset();
    showToast('✅ Appointment booked successfully!');

    // Scroll to list
    document.getElementById('appointmentsList').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // ---------- FILTER ----------
  filterSelect.addEventListener('change', renderList);

  // ---------- SET MIN DATE TO TODAY ----------
  const dateInput = document.getElementById('apptDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // ---------- RENDER ALL ----------
  function renderAll() {
    renderStats();
    renderList();
  }

  renderAll();
})();