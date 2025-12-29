// The Daily Unhinged - Calendar & Digest Viewer

class DigestViewer {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.availableDates = [];

        this.init();
    }

    async init() {
        await this.loadAvailableDates();
        this.renderCalendar();
        this.setupEventListeners();

        // Load today's digest or most recent
        const today = this.formatDate(new Date());
        if (this.availableDates.includes(today)) {
            this.loadDigest(today);
        } else if (this.availableDates.length > 0) {
            this.loadDigest(this.availableDates[0]);
        } else {
            this.showNoDigest();
        }
    }

    async loadAvailableDates() {
        try {
            const response = await fetch('digests/index.json');
            if (response.ok) {
                this.availableDates = await response.json();
                this.renderDateList();
            }
        } catch (error) {
            console.log('No index found, scanning for digests...');
            // Fallback: try to detect digests by checking recent dates
            await this.scanForDigests();
        }
    }

    async scanForDigests() {
        // Check last 30 days for digests
        const dates = [];
        const today = new Date();

        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = this.formatDate(date);

            try {
                const response = await fetch(`digests/${dateStr}.md`, { method: 'HEAD' });
                if (response.ok) {
                    dates.push(dateStr);
                }
            } catch (e) {
                // File doesn't exist
            }
        }

        this.availableDates = dates;
        this.renderDateList();
    }

    formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    formatDisplayDate(dateStr) {
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    renderCalendar() {
        const calendar = document.getElementById('calendar');
        const monthLabel = document.getElementById('current-month');

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        monthLabel.textContent = new Date(year, month).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });

        // Day headers
        const dayHeaders = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        let html = dayHeaders.map(d => `<div class="day-header">${d}</div>`).join('');

        // First day of month
        const firstDay = new Date(year, month, 1).getDay();

        // Days in month
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Empty cells before first day
        for (let i = 0; i < firstDay; i++) {
            html += '<div class="day empty"></div>';
        }

        // Day cells
        const today = this.formatDate(new Date());

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasDigest = this.availableDates.includes(dateStr);
            const isToday = dateStr === today;
            const isSelected = dateStr === this.selectedDate;

            let classes = 'day';
            if (hasDigest) classes += ' has-digest';
            if (isToday) classes += ' today';
            if (isSelected) classes += ' selected';

            html += `<div class="${classes}" data-date="${dateStr}">${day}</div>`;
        }

        calendar.innerHTML = html;

        // Add click handlers
        calendar.querySelectorAll('.day:not(.empty)').forEach(day => {
            day.addEventListener('click', () => {
                const dateStr = day.dataset.date;
                if (this.availableDates.includes(dateStr)) {
                    this.loadDigest(dateStr);
                }
            });
        });
    }

    renderDateList() {
        const list = document.getElementById('date-list');
        list.innerHTML = this.availableDates.slice(0, 10).map(date => `
            <li data-date="${date}" class="${date === this.selectedDate ? 'active' : ''}">
                ${this.formatDisplayDate(date)}
            </li>
        `).join('');

        list.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', () => {
                this.loadDigest(item.dataset.date);
            });
        });
    }

    async loadDigest(dateStr) {
        this.selectedDate = dateStr;
        this.showLoading();

        // Update calendar selection
        document.querySelectorAll('.calendar .day.selected').forEach(el => {
            el.classList.remove('selected');
        });
        const dayEl = document.querySelector(`.calendar .day[data-date="${dateStr}"]`);
        if (dayEl) dayEl.classList.add('selected');

        // Update date list selection
        document.querySelectorAll('#date-list li.active').forEach(el => {
            el.classList.remove('active');
        });
        const listEl = document.querySelector(`#date-list li[data-date="${dateStr}"]`);
        if (listEl) listEl.classList.add('active');

        try {
            const response = await fetch(`digests/${dateStr}.md`);
            if (!response.ok) throw new Error('Digest not found');

            let markdown = await response.text();

            // Remove YAML frontmatter if present
            if (markdown.startsWith('---')) {
                const endIndex = markdown.indexOf('---', 3);
                if (endIndex !== -1) {
                    markdown = markdown.substring(endIndex + 3).trim();
                }
            }

            this.showDigest(markdown);
        } catch (error) {
            console.error('Error loading digest:', error);
            this.showNoDigest();
        }
    }

    showLoading() {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('no-digest').style.display = 'none';
        document.getElementById('digest').style.display = 'none';
    }

    showDigest(markdown) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('no-digest').style.display = 'none';

        const digestEl = document.getElementById('digest');
        digestEl.style.display = 'block';
        digestEl.innerHTML = marked.parse(markdown);
    }

    showNoDigest() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('no-digest').style.display = 'block';
        document.getElementById('digest').style.display = 'none';
    }

    setupEventListeners() {
        document.getElementById('prev-month').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });

        document.getElementById('next-month').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new DigestViewer();
});
