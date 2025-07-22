// Sample texts and code snippets
const textSamples = [
    "The quick brown fox jumps over the lazy dog. This sentence contains all the letters of the alphabet and is perfect for typing practice.",
    "In the midst of winter, I found there was, within me, an invincible summer. And that makes me happy. For it says that no matter how hard the world pushes against me, within me, there's something stronger.",
    "The greatest glory in living lies not in never falling, but in rising every time we fall. Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Life is what happens to you while you're busy making other plans. The future belongs to those who believe in the beauty of their dreams.",
    "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe. Imagination is more important than knowledge.",
    "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present. The way to get started is to quit talking and begin doing."
];

// Dynamic code samples loaded from JSON files
let availableLanguages = {};
let codeSamples = {};

// Load available languages and their examples
async function loadLanguages() {
    try {
        // Try to get list of language files dynamically
        const languages = ['javascript', 'python', 'cpp', 'php', 'css', 'html', 'csharp', 'golang', 'r'];
        
        for (const lang of languages) {
            try {
                const response = await fetch(`code-examples/${lang}.json`);
                if (response.ok) {
                    const examples = await response.json();
                    codeSamples[lang] = examples;
                    availableLanguages[lang] = {
                        name: formatLanguageName(lang),
                        icon: getLanguageIcon(lang),
                        examples: examples
                    };
                }
            } catch (error) {
                console.log(`Language file ${lang}.json not found or invalid`);
            }
        }
        
        // Generate language buttons dynamically
        generateLanguageButtons();
        
    } catch (error) {
        console.error('Error loading languages:', error);
        // Fallback to empty state
        codeSamples = {};
        availableLanguages = {};
    }
}

function formatLanguageName(lang) {
    const nameMap = {
        'javascript': 'JavaScript',
        'python': 'Python', 
        'cpp': 'C++',
        'php': 'PHP',
        'css': 'CSS',
        'html': 'HTML',
        'csharp': 'C#',
        'golang': 'Go',
        'r': 'R'
    };
    return nameMap[lang] || lang.charAt(0).toUpperCase() + lang.slice(1);
}

function getLanguageIcon(lang) {
    const iconMap = {
        'javascript': 'fab fa-js-square',
        'python': 'fab fa-python',
        'cpp': 'fas fa-code',
        'php': 'fab fa-php', 
        'css': 'fab fa-css3-alt',
        'html': 'fab fa-html5',
        'csharp': 'fas fa-hashtag',
        'golang': 'fab fa-google',
        'r': 'fas fa-chart-bar'
    };
    return iconMap[lang] || 'fas fa-code';
}

function generateLanguageButtons() {
    const languageButtonsContainer = document.querySelector('.language-buttons');
    if (!languageButtonsContainer) return;
    
    // Clear existing buttons
    languageButtonsContainer.innerHTML = '';
    
    // Create buttons for each available language
    Object.keys(availableLanguages).forEach(langKey => {
        const lang = availableLanguages[langKey];
        const button = document.createElement('button');
        button.className = 'lang-btn';
        button.setAttribute('data-lang', langKey);
        button.innerHTML = `
            <i class="${lang.icon}"></i>
            ${lang.name}
        `;
        languageButtonsContainer.appendChild(button);
    });
    
    // Re-attach event listeners for the new buttons
    attachLanguageButtonListeners();
}

function attachLanguageButtonListeners() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Set current language
            currentLanguage = btn.getAttribute('data-lang');
            
            // Show code actions
            const codeActions = document.getElementById('codeActions');
            if (codeActions) {
                codeActions.classList.remove('hidden');
            }
        });
    });
}

// App State
let currentMode = null;
let currentLanguage = null;
let currentText = '';
let currentIndex = 0;
let startTime = null;
let timerInterval = null;
let totalChars = 0;
let correctChars = 0;
let soundEnabled = true;

// Audio Context for typing sounds
let audioContext = null;
let typingSound = null;
let errorSound = null;

// DOM Elements
const selectionPanel = document.getElementById('selectionPanel');
const practicePanel = document.getElementById('practicePanel');
const resultsPanel = document.getElementById('resultsPanel');
const textOptions = document.getElementById('textOptions');
const codeOptions = document.getElementById('codeOptions');
const customTextInput = document.getElementById('customTextInput');
const randomTextActions = document.getElementById('randomTextActions');
const codeActions = document.getElementById('codeActions');
const textDisplay = document.getElementById('textDisplay');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const timerDisplay = document.getElementById('timer');
const progressFill = document.getElementById('progressFill');
const soundToggle = document.getElementById('soundToggle');

// Initialize audio context
function initAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create typing sound (short beep)
        typingSound = createTone(800, 0.05, 0.1);
        
        // Create error sound (lower pitch, longer)
        errorSound = createTone(300, 0.15, 0.2);
    } catch (error) {
        console.log('Audio not supported');
        soundEnabled = false;
    }
}

function createTone(frequency, duration, volume) {
    return () => {
        if (!audioContext || !soundEnabled) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    };
}

function playTypingSound() {
    if (typingSound) typingSound();
}

function playErrorSound() {
    if (errorSound) errorSound();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', async function() {
    initAudio();
    await loadLanguages(); // Load dynamic languages first
    setupEventListeners();
});

function setupEventListeners() {
    // Mode selection
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const mode = this.dataset.mode;
            selectMode(mode);
        });
    });

    // Text options
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const option = this.dataset.option;
            selectTextOption(option);
        });
    });

    // Language selection will be handled dynamically by attachLanguageButtonListeners

    // Start buttons
    document.getElementById('startCustomText')?.addEventListener('click', startCustomTextPractice);
    document.getElementById('startRandomText')?.addEventListener('click', startRandomTextPractice);
    document.getElementById('startCode')?.addEventListener('click', startCodePractice);

    // New snippet buttons
    document.getElementById('newSnippet')?.addEventListener('click', generateNewTextSnippet);
    document.getElementById('newCodeSnippet')?.addEventListener('click', generateNewCodeSnippet);

    // Control buttons
    document.getElementById('resetBtn')?.addEventListener('click', resetPractice);
    document.getElementById('backBtn')?.addEventListener('click', backToSelection);

    // Result buttons
    document.getElementById('practiceAgain')?.addEventListener('click', practiceAgain);
    document.getElementById('backToMenu')?.addEventListener('click', backToSelection);

    // Text display input events
    textDisplay?.addEventListener('input', handleTyping);
    textDisplay?.addEventListener('keydown', handleKeyDown);
    textDisplay?.addEventListener('paste', handlePaste);

    // Sound toggle
    soundToggle?.addEventListener('click', toggleSound);
}

function selectMode(mode) {
    currentMode = mode;
    
    // Update button states
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-mode="${mode}"]`)?.classList.add('active');
    
    // Show appropriate options
    textOptions?.classList.toggle('hidden', mode !== 'text');
    codeOptions?.classList.toggle('hidden', mode !== 'code');
    
    // Reset sub-selections
    resetSubSelections();
}

function selectTextOption(option) {
    // Update button states
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-option="${option}"]`)?.classList.add('active');
    
    // Show appropriate inputs
    customTextInput?.classList.toggle('hidden', option !== 'custom-text');
    randomTextActions?.classList.toggle('hidden', option !== 'random-text');
}

function selectLanguage(lang) {
    currentLanguage = lang;
    
    // Update button states  
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`)?.classList.add('active');
    
    // Show code actions
    const codeActions = document.getElementById('codeActions');
    if (codeActions) {
        codeActions.classList.remove('hidden');
    }
}

function startCustomTextPractice() {
    const text = document.getElementById('customTextArea')?.value.trim();
    const shouldShuffle = document.getElementById('shuffleText')?.checked;
    
    if (!text) {
        alert('Please enter some text to practice with.');
        return;
    }
    
    currentText = shouldShuffle ? shuffleText(text) : text;
    startPractice();
}

function startRandomTextPractice() {
    const randomIndex = Math.floor(Math.random() * textSamples.length);
    currentText = textSamples[randomIndex];
    startPractice();
}

function startCodePractice() {
    if (!currentLanguage || !codeSamples[currentLanguage]) {
        alert('Please select a programming language first.');
        return;
    }
    
    const shouldShuffle = document.getElementById('shuffleCode')?.checked;
    const samples = codeSamples[currentLanguage];
    const randomIndex = Math.floor(Math.random() * samples.length);
    
    // Get the code from the JSON structure
    currentText = shouldShuffle ? shuffleText(samples[randomIndex].code) : samples[randomIndex].code;
    startPractice();
}

function generateNewTextSnippet() {
    const randomIndex = Math.floor(Math.random() * textSamples.length);
    currentText = textSamples[randomIndex];
    if (practicePanel?.classList.contains('hidden')) {
        startPractice();
    } else {
        resetPractice();
        displayText();
    }
}

function generateNewCodeSnippet() {
    if (!currentLanguage || !codeSamples[currentLanguage]) {
        alert('Please select a programming language first.');
        return;
    }
    
    const shouldShuffle = document.getElementById('shuffleCode')?.checked;
    const samples = codeSamples[currentLanguage];
    const randomIndex = Math.floor(Math.random() * samples.length);
    
    // Get the code from the JSON structure
    currentText = shouldShuffle ? shuffleText(samples[randomIndex].code) : samples[randomIndex].code;
    
    if (practicePanel?.classList.contains('hidden')) {
        startPractice();
    } else {
        resetPractice();
        displayText();
    }
}

function shuffleText(text) {
    // Split text into words and shuffle them
    const words = text.split(/\s+/);
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }
    return words.join(' ');
}

function startPractice() {
    selectionPanel?.classList.add('hidden');
    practicePanel?.classList.remove('hidden');
    resultsPanel?.classList.add('hidden');
    
    resetPracticeState();
    displayText();
    textDisplay?.focus();
}

function resetPractice() {
    resetPracticeState();
    displayText();
    textDisplay?.focus();
}

function resetPracticeState() {
    currentIndex = 0;
    startTime = null;
    totalChars = 0;
    correctChars = 0;
    
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    updateStats();
    updateProgress();
}

function displayText() {
    if (!textDisplay) return;
    textDisplay.innerHTML = '';
    
    for (let i = 0; i < currentText.length; i++) {
        const span = document.createElement('span');
        span.className = 'char';
        
        const char = currentText[i];
        
        // Handle special characters
        if (char === '\t') {
            span.textContent = '\t'; // Tab character
            span.classList.add('tab');
        } else if (char === '\n') {
            span.innerHTML = '<br>'; // Use br for line breaks in contenteditable
        } else {
            span.textContent = char;
        }
        
        if (i === 0) {
            span.classList.add('current');
        }
        
        textDisplay.appendChild(span);
    }
    
    // Scroll to top when new text is loaded
    textDisplay.scrollTop = 0;
    
    // Clear contenteditable content and set cursor to beginning
    const selection = window.getSelection();
    const range = document.createRange();
    if (textDisplay.firstChild) {
        range.setStart(textDisplay, 0);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function handleTyping(event) {
    // Prevent default contenteditable behavior
    event.preventDefault();
    
    if (!startTime) {
        startTime = Date.now();
        startTimer();
    }
    
    // Don't allow typing beyond the expected text
    if (currentIndex >= currentText.length) {
        return;
    }
    
    updateDisplay();
}

function handleKeyDown(event) {
    // Handle special keys
    if (event.key === 'Backspace') {
        event.preventDefault();
        handleBackspace();
        return;
    }
    
    // Don't allow typing beyond expected text
    if (currentIndex >= currentText.length) {
        event.preventDefault();
        return;
    }
    
    const expectedChar = currentText[currentIndex];
    
    // Handle Tab key
    if (event.key === 'Tab') {
        event.preventDefault();
        if (expectedChar === '\t') {
            handleCorrectChar('\t');
        } else {
            handleIncorrectChar(event.key);
        }
        return;
    }
    
    // Handle Enter key
    if (event.key === 'Enter') {
        event.preventDefault();
        if (expectedChar === '\n') {
            handleCorrectChar('\n');
        } else {
            handleIncorrectChar(event.key);
        }
        return;
    }
    
    // Handle regular characters
    if (event.key.length === 1) {
        event.preventDefault();
        if (event.key === expectedChar) {
            handleCorrectChar(event.key);
        } else {
            handleIncorrectChar(event.key);
        }
    }
}

function handlePaste(event) {
    // Prevent pasting to maintain typing practice integrity
    event.preventDefault();
}

function handleBackspace() {
    if (currentIndex > 0) {
        currentIndex--;
        const chars = textDisplay.querySelectorAll('.char');
        const currentChar = chars[currentIndex];
        
        // Reset the character state
        currentChar.classList.remove('correct', 'incorrect', 'typed');
        currentChar.classList.add('current');
        
        // Remove current class from next character if exists
        if (chars[currentIndex + 1]) {
            chars[currentIndex + 1].classList.remove('current');
        }
        
        // Update stats
        totalChars = Math.max(0, totalChars - 1);
        correctChars = 0;
        
        // Recalculate correct chars
        for (let i = 0; i < currentIndex; i++) {
            if (chars[i].classList.contains('correct')) {
                correctChars++;
            }
        }
        
        updateStats();
        updateProgress();
        
        // Scroll to current position
        scrollToCurrentChar();
    }
}

function handleCorrectChar(char) {
    const chars = textDisplay.querySelectorAll('.char');
    const currentChar = chars[currentIndex];
    
    // Mark as correct and typed
    currentChar.classList.remove('current', 'incorrect');
    currentChar.classList.add('correct', 'typed');
    
    currentIndex++;
    totalChars = Math.max(totalChars, currentIndex);
    correctChars++;
    
    // Set next character as current
    if (currentIndex < chars.length) {
        chars[currentIndex].classList.add('current');
    }
    
    playTypingSound();
    updateStats();
    updateProgress();
    scrollToCurrentChar();
    
    // Check if practice is complete
    if (currentIndex >= currentText.length) {
        completePractice();
    }
}

function handleIncorrectChar(char) {
    const chars = textDisplay.querySelectorAll('.char');
    const currentChar = chars[currentIndex];
    
    // Mark as incorrect
    currentChar.classList.remove('current', 'correct');
    currentChar.classList.add('incorrect');
    
    currentIndex++;
    totalChars = Math.max(totalChars, currentIndex);
    
    // Set next character as current
    if (currentIndex < chars.length) {
        chars[currentIndex].classList.add('current');
    }
    
    playErrorSound();
    updateStats();
    updateProgress();
    scrollToCurrentChar();
    
    // Check if practice is complete
    if (currentIndex >= currentText.length) {
        completePractice();
    }
}

function updateDisplay() {
    const chars = textDisplay.querySelectorAll('.char');
    
    // Clear all states first
    chars.forEach(char => {
        char.classList.remove('current', 'correct', 'incorrect', 'typed');
    });
    
    // Set current character
    if (currentIndex < chars.length) {
        chars[currentIndex].classList.add('current');
    }
    
    // Mark typed characters
    for (let i = 0; i < currentIndex; i++) {
        chars[i].classList.add('typed');
    }
}

function scrollToCurrentChar() {
    const chars = textDisplay.querySelectorAll('.char');
    if (currentIndex < chars.length) {
        const currentChar = chars[currentIndex];
        const textDisplayRect = textDisplay.getBoundingClientRect();
        const currentCharRect = currentChar.getBoundingClientRect();
        
        // Check if current character is outside visible area
        if (currentCharRect.top < textDisplayRect.top || currentCharRect.bottom > textDisplayRect.bottom) {
            currentChar.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        if (timerDisplay) timerDisplay.textContent = elapsed + 's';
    }, 1000);
}

function updateStats() {
    if (startTime && totalChars > 0) {
        const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
        const wpm = Math.round((totalChars / 5) / timeElapsed) || 0;
        const accuracy = Math.round((correctChars / totalChars) * 100) || 100;
        
        if (wpmDisplay) wpmDisplay.textContent = wpm;
        if (accuracyDisplay) accuracyDisplay.textContent = accuracy + '%';
    } else {
        if (wpmDisplay) wpmDisplay.textContent = '0';
        if (accuracyDisplay) accuracyDisplay.textContent = '100%';
    }
}

function updateProgress() {
    const progress = currentText.length > 0 ? (currentIndex / currentText.length) * 100 : 0;
    if (progressFill) progressFill.style.width = progress + '%';
}

function completePractice() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    const timeElapsed = (Date.now() - startTime) / 1000;
    const wpm = Math.round((totalChars / 5) / (timeElapsed / 60)) || 0;
    const accuracy = Math.round((correctChars / totalChars) * 100) || 100;
    
    // Show results
    const finalWpm = document.getElementById('finalWpm');
    const finalAccuracy = document.getElementById('finalAccuracy');
    const finalTime = document.getElementById('finalTime');
    const finalChars = document.getElementById('finalChars');
    
    if (finalWpm) finalWpm.textContent = wpm;
    if (finalAccuracy) finalAccuracy.textContent = accuracy + '%';
    if (finalTime) finalTime.textContent = Math.round(timeElapsed) + 's';
    if (finalChars) finalChars.textContent = totalChars;
    
    practicePanel?.classList.add('hidden');
    resultsPanel?.classList.remove('hidden');
}

function practiceAgain() {
    resultsPanel?.classList.add('hidden');
    practicePanel?.classList.remove('hidden');
    resetPractice();
}

function backToSelection() {
    practicePanel?.classList.add('hidden');
    resultsPanel?.classList.add('hidden');
    selectionPanel?.classList.remove('hidden');
    
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetSubSelections() {
    document.querySelectorAll('.option-btn, .lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    customTextInput?.classList.add('hidden');
    randomTextActions?.classList.add('hidden');
    codeActions?.classList.add('hidden');
    
    currentLanguage = null;
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    if (soundToggle) {
        soundToggle.innerHTML = soundEnabled 
            ? '<i class="fas fa-volume-up"></i>' 
            : '<i class="fas fa-volume-mute"></i>';
        soundToggle.classList.toggle('muted', !soundEnabled);
    }
}
