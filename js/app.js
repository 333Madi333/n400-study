/**
 * N-400 Interview Preparation App
 * Main Application Logic
 */

// Configuration
const CONFIG = {
    QUESTIONS_PER_PAGE: 10,
    STORAGE_KEY: 'n400-marked'
};

// Calculate total pages
const TOTAL_PAGES = Math.ceil(questions.length / CONFIG.QUESTIONS_PER_PAGE);

// Application State
const state = {
    currentPage: 1,
    viewedQuestions: new Set(),
    markedQuestions: new Set(JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || '[]')),
    allAnswersVisible: false,
    showAllQuestionsMode: false,
    currentFilter: 'all', // 'all' or 'marked'
    isShuffled: false,
    shuffledIndices: []
};

/**
 * Bookmark Management
 */
function toggleBookmark(index) {
    if (state.markedQuestions.has(index)) {
        state.markedQuestions.delete(index);
    } else {
        state.markedQuestions.add(index);
    }

    // Persist to localStorage
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify([...state.markedQuestions]));

    // Update UI
    const bookmarkBtn = document.getElementById(`bookmark-${index}`);
    if (bookmarkBtn) {
        bookmarkBtn.textContent = state.markedQuestions.has(index) ? '★' : '☆';
        bookmarkBtn.classList.toggle('marked', state.markedQuestions.has(index));
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
        state.shuffledIndices = shuffleArray([...Array(questions.length).keys()]);
        document.getElementById('shuffleBtn').textContent = 'Show Original Order';
    } else {
        state.shuffledIndices = [];
        document.getElementById('shuffleBtn').textContent = 'Shuffle Questions';
    }

    // Reset to first page and refresh display
    state.currentPage = 1;
    if (state.showAllQuestionsMode) {
        displayAllQuestions();
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
    if (state.showAllQuestionsMode) {
        displayAllQuestions();
    } else {
        state.currentPage = 1;
        displayPage(1);
    }
}

/**
 * Get filtered questions based on current filter and shuffle state
 */
function getFilteredQuestions() {
    let questionsArray;

    // Apply shuffle if enabled
    if (state.isShuffled) {
        questionsArray = state.shuffledIndices.map(i => ({ ...questions[i], originalIndex: i }));
    } else {
        questionsArray = questions.map((q, i) => ({ ...q, originalIndex: i }));
    }

    // Apply filter
    if (state.currentFilter === 'marked') {
        return questionsArray.filter(q => state.markedQuestions.has(q.originalIndex));
    }

    return questionsArray;
}

/**
 * View Mode Management
 */
function toggleViewMode() {
    state.showAllQuestionsMode = !state.showAllQuestionsMode;

    if (state.showAllQuestionsMode) {
        displayAllQuestions();
        document.getElementById('viewToggleBtn').textContent = 'Show Pages (10 per page)';
    } else {
        displayPage(state.currentPage);
        document.getElementById('viewToggleBtn').textContent = 'Show All 100 Questions';
    }
}

/**
 * Display all questions in a single view
 */
function displayAllQuestions() {
    const filteredQuestions = getFilteredQuestions();

    // Hide pagination and update page info
    document.getElementById('pagination').style.display = 'none';
    const totalText = state.currentFilter === 'marked'
        ? `${filteredQuestions.length} Marked Questions`
        : 'All 100 Questions';
    document.getElementById('pageInfo').textContent = totalText;
    document.getElementById('currentPage').textContent = '-';

    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';

    // Handle empty state
    if (filteredQuestions.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">No marked questions yet. Click the ★ to mark questions for review.</div>';
        updateStats();
        return;
    }

    // Render all filtered questions
    filteredQuestions.forEach((q) => {
        const questionElement = createQuestionElement(q.originalIndex, q);
        container.appendChild(questionElement);
        state.viewedQuestions.add(q.originalIndex);
    });

    updateStats();
    state.allAnswersVisible = false;
    document.getElementById('showAllBtn').textContent = 'Show All Answers';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Display a specific page of questions
 */
function displayPage(pageNumber) {
    const filteredQuestions = getFilteredQuestions();
    const totalPages = Math.ceil(filteredQuestions.length / CONFIG.QUESTIONS_PER_PAGE);

    state.currentPage = Math.min(pageNumber, Math.max(1, totalPages));
    const startIdx = (state.currentPage - 1) * CONFIG.QUESTIONS_PER_PAGE;
    const endIdx = Math.min(startIdx + CONFIG.QUESTIONS_PER_PAGE, filteredQuestions.length);

    // Show pagination
    document.getElementById('pagination').style.display = 'flex';

    // Handle empty state
    if (filteredQuestions.length === 0) {
        document.getElementById('pageInfo').textContent = 'No marked questions';
        document.getElementById('currentPage').textContent = '0';
        document.getElementById('questionsContainer').innerHTML =
            '<div style="text-align: center; padding: 40px; color: #666;">No marked questions yet. Click the ★ to mark questions for review.</div>';
        document.getElementById('pagination').style.display = 'none';
        updateStats();
        return;
    }

    // Update page info
    const firstQ = filteredQuestions[startIdx].originalIndex + 1;
    const lastQ = filteredQuestions[endIdx - 1].originalIndex + 1;
    document.getElementById('pageInfo').textContent =
        `Page ${state.currentPage} of ${totalPages} (Questions ${firstQ}-${lastQ})`;
    document.getElementById('currentPage').textContent = state.currentPage;

    // Render questions for this page
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';

    for (let idx = startIdx; idx < endIdx; idx++) {
        const q = filteredQuestions[idx];
        const questionElement = createQuestionElement(q.originalIndex, q);
        container.appendChild(questionElement);
        state.viewedQuestions.add(q.originalIndex);
    }

    updateStats();
    renderPagination(totalPages);
    state.allAnswersVisible = false;
    document.getElementById('showAllBtn').textContent = 'Show All Answers';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Create a question DOM element
 */
function createQuestionElement(index, questionData) {
    const isMarked = state.markedQuestions.has(index);
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-item';
    questionDiv.innerHTML = `
        <div class="question-header">
            <div class="question-content" onclick="toggleAnswer(${index})">
                <div class="question-number">Question ${index + 1}</div>
                <div class="question-text">${questionData.q}</div>
            </div>
            <div class="question-controls">
                <button class="bookmark-btn ${isMarked ? 'marked' : ''}"
                        onclick="toggleBookmark(${index})"
                        id="bookmark-${index}"
                        title="Mark for review">
                    ${isMarked ? '★' : '☆'}
                </button>
                <button class="toggle-btn" onclick="toggleAnswer(${index})" id="btn-${index}">
                    Show
                </button>
            </div>
        </div>
        <div class="answer-text" id="answer-${index}">${questionData.a}</div>
    `;
    return questionDiv;
}

/**
 * Toggle visibility of an answer
 */
function toggleAnswer(index) {
    const answerEl = document.getElementById(`answer-${index}`);
    const btnEl = document.getElementById(`btn-${index}`);

    if (!answerEl || !btnEl) return;

    if (answerEl.classList.contains('show')) {
        answerEl.classList.remove('show');
        btnEl.textContent = 'Show';
    } else {
        answerEl.classList.add('show');
        btnEl.textContent = 'Hide';
    }
}

/**
 * Toggle all answers on current view
 */
function toggleAllAnswers() {
    state.allAnswersVisible = !state.allAnswersVisible;

    let startIdx, endIdx;
    if (state.showAllQuestionsMode) {
        // Toggle all questions
        startIdx = 0;
        endIdx = questions.length;
    } else {
        // Toggle current page only
        startIdx = (state.currentPage - 1) * CONFIG.QUESTIONS_PER_PAGE;
        endIdx = Math.min(startIdx + CONFIG.QUESTIONS_PER_PAGE, questions.length);
    }

    for (let i = startIdx; i < endIdx; i++) {
        const answerEl = document.getElementById(`answer-${i}`);
        const btnEl = document.getElementById(`btn-${i}`);

        if (answerEl && btnEl) {
            if (state.allAnswersVisible) {
                answerEl.classList.add('show');
                btnEl.textContent = 'Hide';
            } else {
                answerEl.classList.remove('show');
                btnEl.textContent = 'Show';
            }
        }
    }

    document.getElementById('showAllBtn').textContent =
        state.allAnswersVisible ? 'Hide All Answers' : 'Show All Answers';
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
    document.getElementById('viewedQ').textContent = state.viewedQuestions.size;
    document.getElementById('markedQ').textContent = state.markedQuestions.size;

    const progress = Math.round((state.viewedQuestions.size / questions.length) * 100);
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressBar').textContent = `${state.viewedQuestions.size}/100`;
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
