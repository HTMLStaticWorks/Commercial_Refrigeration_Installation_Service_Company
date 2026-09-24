document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.dash-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const toggleBtn = document.getElementById('sidebar-toggle');
    const pageTitle = document.getElementById('page-title');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const dashPages = document.querySelectorAll('.dash-page');

    // Page titles map
    const pageTitles = {
        'overview': 'Dashboard Overview',
        'service-requests': 'Service Requests',
        'schedule': 'Schedule Maintenance',
        'equipment': 'Equipment',
        'temperature': 'Temperature Logs',
        'warranty': 'Warranty',
        'invoices': 'Invoices',
        'notifications': 'Notifications',
        'profile': 'Profile',
        'settings': 'Settings'
    };

    // Sidebar toggle (mobile)
    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
    }
    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    }

    if (toggleBtn) toggleBtn.addEventListener('click', openSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);

    // Page switching
    function showPage(pageId) {
        dashPages.forEach(p => p.classList.remove('active'));
        sidebarLinks.forEach(l => l.classList.remove('active'));

        const targetPage = document.getElementById('page-' + pageId);
        const targetLink = document.querySelector(`[data-page="${pageId}"]`);

        if (targetPage) targetPage.classList.add('active');
        if (targetLink) targetLink.classList.add('active');
        if (pageTitle) pageTitle.textContent = pageTitles[pageId] || 'Dashboard';

        closeSidebar();
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            if (pageId) showPage(pageId);
        });
    });

    // Ticket filtering
    const ticketFilter = document.getElementById('ticket-filter');
    if (ticketFilter) {
        ticketFilter.addEventListener('change', () => {
            const val = ticketFilter.value;
            // Desktop rows
            document.querySelectorAll('#tickets-table tr').forEach(row => {
                row.style.display = (val === 'all' || row.dataset.status === val) ? '' : 'none';
            });
            // Mobile cards
            document.querySelectorAll('#tickets-mobile > div').forEach(card => {
                card.style.display = (val === 'all' || card.dataset.status === val) ? '' : 'none';
            });
        });
    }

    // Invoice filtering
    const invoiceFilter = document.getElementById('invoice-filter');
    if (invoiceFilter) {
        invoiceFilter.addEventListener('change', () => {
            const val = invoiceFilter.value;
            document.querySelectorAll('#invoices-table tr').forEach(row => {
                row.style.display = (val === 'all' || row.dataset.status === val) ? '' : 'none';
            });
        });
    }

    // Schedule form
    const scheduleForm = document.getElementById('schedule-form');
    if (scheduleForm) {
        scheduleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            document.getElementById('schedule-confirm').classList.remove('hidden');
            scheduleForm.reset();
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }
});
