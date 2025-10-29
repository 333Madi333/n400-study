/**
 * N-400 Study Sentences Application
 * Simplified learning with complete sentence format
 */

// Configuration
const CONFIG = {
    SENTENCES_PER_PAGE: 10,
    STORAGE_KEY: 'n400-sentences-marked'
};

// Calculate total pages
const TOTAL_PAGES = Math.ceil(sentences.length / CONFIG.SENTENCES_PER_PAGE);

// Application State
const state = {
    currentPage: 1,
    viewedSentences: new Set(),
    markedSentences: new Set(JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || '[]')),
    showAllSentencesMode: false,
    currentFilter: 'all', // 'all' or 'marked'
    isShuffled: false,
    shuffledIndices: []
};

/**
 * Bookmark Management
 */
function toggleBookmark(index) {
    if (state.markedSentences.has(index)) {
        state.markedSentences.delete(index);
    } else {
        state.markedSentences.add(index);
    }

    // Persist to localStorage
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify([...state.markedSentences]));

    // Update UI
    const bookmarkBtn = document.getElementById(`bookmark-${index}`);
    if (bookmarkBtn) {
        bookmarkBtn.textContent = state.markedSentences.has(index) ? '★' : '☆';
        bookmarkBtn.classList.toggle('marked', state.markedSentences.has(index));
    }

    updateStats();
}

/**
 * Shuffle Management
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function toggleShuffle() {
    state.isShuffled = !state.isShuffled;

    if (state.isShuffled) {
        // Create shuffled indices array
        state.shuffledIndices = shuffleArray([...Array(sentences.length).keys()]);
        document.getElementById('shuffleBtn').textContent = 'Show Original Order';
    } else {
        state.shuffledIndices = [];
        document.getElementById('shuffleBtn').textContent = 'Shuffle Sentences';
    }

    // Reset to first page and refresh display
    state.currentPage = 1;
    if (state.showAllSentencesMode) {
        displayAllSentences();
    } else {
        displayPage(1);
    }
}

/**
 * Filter Management
 */
function setFilter(filterType) {
    state.currentFilter = filterType;

    // Update filter button states
    document.getElementById('filterAll').classList.toggle('active', filterType === 'all');
    document.getElementById('filterMarked').classList.toggle('active', filterType === 'marked');

    // Refresh display
    if (state.showAllSentencesMode) {
        displayAllSentences();
    } else {
        state.currentPage = 1;
        displayPage(1);
    }
}

/**
 * Get filtered sentences based on current filter and shuffle state
 */
function getFilteredSentences() {
    let sentencesArray;

    // Apply shuffle if enabled
    if (state.isShuffled) {
        sentencesArray = state.shuffledIndices.map(i => ({ text: sentences[i], originalIndex: i }));
    } else {
        sentencesArray = sentences.map((s, i) => ({ text: s, originalIndex: i }));
    }

    // Apply filter
    if (state.currentFilter === 'marked') {
        return sentencesArray.filter(s => state.markedSentences.has(s.originalIndex));
    }

    return sentencesArray;
}

/**
 * View Mode Management
 */
function toggleViewMode() {
    state.showAllSentencesMode = !state.showAllSentencesMode;

    if (state.showAllSentencesMode) {
        displayAllSentences();
        document.getElementById('viewToggleBtn').textContent = 'Show Pages (10 per page)';
    } else {
        displayPage(state.currentPage);
        document.getElementById('viewToggleBtn').textContent = 'Show All 100 Sentences';
    }
}

/**
 * Display all sentences in a single view
 */
function displayAllSentences() {
    const filteredSentences = getFilteredSentences();

    // Hide pagination and update page info
    document.getElementById('pagination').style.display = 'none';
    const totalText = state.currentFilter === 'marked'
        ? `${filteredSentences.length} Marked Sentences`
        : 'All 100 Sentences';
    document.getElementById('pageInfo').textContent = totalText;
    document.getElementById('currentPage').textContent = '-';

    const container = document.getElementById('sentencesContainer');
    container.innerHTML = '';

    // Handle empty state
    if (filteredSentences.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">No marked sentences yet. Click the ★ to mark sentences for review.</div>';
        updateStats();
        return;
    }

    // Render all filtered sentences
    filteredSentences.forEach((s) => {
        const sentenceElement = createSentenceElement(s.originalIndex, s.text);
        container.appendChild(sentenceElement);
        state.viewedSentences.add(s.originalIndex);
    });

    updateStats();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Display a specific page of sentences
 */
function displayPage(pageNumber) {
    const filteredSentences = getFilteredSentences();
    const totalPages = Math.ceil(filteredSentences.length / CONFIG.SENTENCES_PER_PAGE);

    state.currentPage = Math.min(pageNumber, Math.max(1, totalPages));
    const startIdx = (state.currentPage - 1) * CONFIG.SENTENCES_PER_PAGE;
    const endIdx = Math.min(startIdx + CONFIG.SENTENCES_PER_PAGE, filteredSentences.length);

    // Show pagination
    document.getElementById('pagination').style.display = 'flex';

    // Handle empty state
    if (filteredSentences.length === 0) {
        document.getElementById('pageInfo').textContent = 'No marked sentences';
        document.getElementById('currentPage').textContent = '0';
        document.getElementById('sentencesContainer').innerHTML =
            '<div style="text-align: center; padding: 40px; color: #666;">No marked sentences yet. Click the ★ to mark sentences for review.</div>';
        document.getElementById('pagination').style.display = 'none';
        updateStats();
        return;
    }

    // Update page info
    const firstS = filteredSentences[startIdx].originalIndex + 1;
    const lastS = filteredSentences[endIdx - 1].originalIndex + 1;
    document.getElementById('pageInfo').textContent =
        `Page ${state.currentPage} of ${totalPages} (Sentences ${firstS}-${lastS})`;
    document.getElementById('currentPage').textContent = state.currentPage;

    // Render sentences for this page
    const container = document.getElementById('sentencesContainer');
    container.innerHTML = '';

    for (let idx = startIdx; idx < endIdx; idx++) {
        const s = filteredSentences[idx];
        const sentenceElement = createSentenceElement(s.originalIndex, s.text);
        container.appendChild(sentenceElement);
        state.viewedSentences.add(s.originalIndex);
    }

    updateStats();
    renderPagination(totalPages);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Create a sentence DOM element
 */
function createSentenceElement(index, sentenceText) {
    const isMarked = state.markedSentences.has(index);
    const sentenceDiv = document.createElement('div');
    sentenceDiv.className = 'sentence-item';
    sentenceDiv.innerHTML = `
        <div class="sentence-number">${index + 1}.</div>
        <div class="sentence-content">
            <div class="sentence-text">${sentenceText}</div>
        </div>
        <div class="sentence-controls">
            <button class="bookmark-btn-sentence ${isMarked ? 'marked' : ''}"
                    onclick="toggleBookmark(${index})"
                    id="bookmark-${index}"
                    title="Mark for review">
                ${isMarked ? '★' : '☆'}
            </button>
        </div>
    `;
    return sentenceDiv;
}

/**
 * Render pagination controls
 */
function renderPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn nav-btn';
    prevBtn.textContent = '←';
    prevBtn.onclick = () => {
        if (state.currentPage > 1) displayPage(state.currentPage - 1);
    };
    prevBtn.disabled = state.currentPage === 1;
    if (state.currentPage === 1) prevBtn.style.opacity = '0.3';
    pagination.appendChild(prevBtn);

    // Page number buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'page-btn' + (i === state.currentPage ? ' active' : '');
        pageBtn.textContent = i;
        pageBtn.onclick = () => displayPage(i);
        pagination.appendChild(pageBtn);
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn nav-btn';
    nextBtn.textContent = '→';
    nextBtn.onclick = () => {
        if (state.currentPage < totalPages) displayPage(state.currentPage + 1);
    };
    nextBtn.disabled = state.currentPage === totalPages;
    if (state.currentPage === totalPages) nextBtn.style.opacity = '0.3';
    pagination.appendChild(nextBtn);
}

/**
 * Update statistics display
 */
function updateStats() {
    document.getElementById('viewedS').textContent = state.viewedSentences.size;
    document.getElementById('markedS').textContent = state.markedSentences.size;

    const progress = Math.round((state.viewedSentences.size / sentences.length) * 100);
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressBar').textContent = `${state.viewedSentences.size}/100`;
}

/**
 * Initialize the application
 */
function initializeApp() {
    updateStats();
    displayPage(1);
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
