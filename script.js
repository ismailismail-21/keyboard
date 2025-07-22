// Dynamic samples loaded from JSON files
let availableLanguages = {};
let availableTextTypes = {};
let codeSamples = {};
let textSamples = {};

// Load available languages and text types
async function loadLanguages() {
    try {
        // Load programming languages
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
        
        // Load text types
        const textTypes = ['random', 'quotations', 'months', 'numbers', 'punctuation'];
        
        for (const textType of textTypes) {
            try {
                const response = await fetch(`text-examples/${textType}.json`);
                if (response.ok) {
                    const examples = await response.json();
                    textSamples[textType] = examples;
                    availableTextTypes[textType] = {
                        name: formatTextTypeName(textType),
                        icon: getTextTypeIcon(textType),
                        examples: examples
                    };
                }
            } catch (error) {
                console.log(`Text file ${textType}.json not found or invalid`);
            }
        }
        
        // Generate buttons dynamically
        generateLanguageButtons();
        generateTextTypeButtons();
        
    } catch (error) {
        console.error('Error loading content:', error);
        // Fallback to empty state
        codeSamples = {};
        availableLanguages = {};
        textSamples = {};
        availableTextTypes = {};
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

function formatTextTypeName(textType) {
    const nameMap = {
        'random': 'Random Text',
        'quotations': 'Famous Quotes',
        'months': 'Months & Days',
        'numbers': 'Numbers',
        'punctuation': 'Punctuation'
    };
    return nameMap[textType] || textType.charAt(0).toUpperCase() + textType.slice(1);
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

function getTextTypeIcon(textType) {
    const iconMap = {
        'random': 'fas fa-random',
        'quotations': 'fas fa-quote-right',
        'months': 'fas fa-calendar',
        'numbers': 'fas fa-calculator',
        'punctuation': 'fas fa-exclamation'
    };
    return iconMap[textType] || 'fas fa-font';
}

function generateLanguageButtons() {
    const codeOptionsContainer = document.getElementById('codeOptions');
    if (!codeOptionsContainer) return;
    
    // Find or create the language buttons container
    let languageButtonsContainer = codeOptionsContainer.querySelector('.language-buttons');
    if (!languageButtonsContainer) {
        languageButtonsContainer = document.createElement('div');
        languageButtonsContainer.className = 'language-buttons';
        languageButtonsContainer.innerHTML = '<h4>Choose Programming Language</h4>';
        
        // Insert after the existing option-buttons container
        const existingButtons = codeOptionsContainer.querySelector('.option-buttons');
        if (existingButtons) {
            existingButtons.insertAdjacentElement('afterend', languageButtonsContainer);
        } else {
            codeOptionsContainer.appendChild(languageButtonsContainer);
        }
    }
    
    // Clear existing language buttons but keep the h4
    const h4 = languageButtonsContainer.querySelector('h4');
    languageButtonsContainer.innerHTML = '';
    if (h4) {
        languageButtonsContainer.appendChild(h4);
    } else {
        languageButtonsContainer.innerHTML = '<h4>Choose Programming Language</h4>';
    }
    
    // Create buttons for each available language directly in the container
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

function generateTextTypeButtons() {
    const textOptionsContainer = document.getElementById('textOptions');
    if (!textOptionsContainer) return;
    
    // Find or create the text type buttons container
    let textTypeButtonsContainer = textOptionsContainer.querySelector('.text-type-buttons');
    if (!textTypeButtonsContainer) {
        textTypeButtonsContainer = document.createElement('div');
        textTypeButtonsContainer.className = 'text-type-buttons';
        textTypeButtonsContainer.innerHTML = '<h4>Choose Text Type</h4>';
        
        // Insert after the existing option-buttons container
        const existingButtons = textOptionsContainer.querySelector('.option-buttons');
        if (existingButtons) {
            existingButtons.insertAdjacentElement('afterend', textTypeButtonsContainer);
        } else {
            textOptionsContainer.appendChild(textTypeButtonsContainer);
        }
    }
    
    // Clear existing text type buttons but keep the h4
    const h4 = textTypeButtonsContainer.querySelector('h4');
    textTypeButtonsContainer.innerHTML = '';
    if (h4) {
        textTypeButtonsContainer.appendChild(h4);
    } else {
        textTypeButtonsContainer.innerHTML = '<h4>Choose Text Type</h4>';
    }
    
    // Create buttons for each available text type directly in the container
    Object.keys(availableTextTypes).forEach(textTypeKey => {
        const textType = availableTextTypes[textTypeKey];
        const button = document.createElement('button');
        button.className = 'option-btn text-type-btn';
        button.setAttribute('data-text-type', textTypeKey);
        button.innerHTML = `
            <i class="${textType.icon}"></i>
            ${textType.name}
        `;
        textTypeButtonsContainer.appendChild(button);
    });
    
    // Attach event listeners for text type buttons
    attachTextTypeButtonListeners();
}

function attachLanguageButtonListeners() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all language buttons
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Set current language
            currentLanguage = btn.getAttribute('data-lang');
            
            // Start practice directly when language is clicked
            startCodePractice();
        });
    });
}

function attachTextTypeButtonListeners() {
    document.querySelectorAll('.text-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all text type buttons
            document.querySelectorAll('.text-type-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Set current text type
            currentTextType = btn.getAttribute('data-text-type');
            
            // Start practice directly when text type is clicked
            startRandomTextPractice();
        });
    });
}

// App State
let currentMode = null;
let currentLanguage = null;
let currentTextType = null;
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
    document.getElementById('startCustomCode')?.addEventListener('click', startCustomCodePractice);
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
    // Update button states for regular option buttons (like custom-text)
    document.querySelectorAll('.option-btn:not(.text-type-btn):not(.lang-btn)').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-option="${option}"]`)?.classList.add('active');
    
    // Show appropriate inputs for text options
    customTextInput?.classList.toggle('hidden', option !== 'custom-text');
    
    // Hide random text actions when custom text is selected
    if (option === 'custom-text') {
        randomTextActions?.classList.add('hidden');
        // Also deactivate text type buttons
        document.querySelectorAll('.text-type-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        currentTextType = null;
    }
    
    // Show appropriate inputs for code options
    if (option === 'custom-code') {
        const customCodeInput = document.getElementById('customCodeInput');
        customCodeInput?.classList.remove('hidden');
        // Hide code actions and deactivate language buttons
        const codeActions = document.getElementById('codeActions');
        codeActions?.classList.add('hidden');
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        currentLanguage = null;
    } else {
        const customCodeInput = document.getElementById('customCodeInput');
        customCodeInput?.classList.add('hidden');
    }
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

function startCustomCodePractice() {
    const code = document.getElementById('customCodeArea')?.value.trim();
    const shouldShuffle = document.getElementById('shuffleCustomCode')?.checked;
    
    if (!code) {
        alert('Please enter some code to practice with.');
        return;
    }
    
    currentText = shouldShuffle ? shuffleText(code) : code;
    startPractice();
}

function startRandomTextPractice() {
    // Use the selected text type or default to first available
    let selectedTextType = currentTextType;
    if (!selectedTextType || !textSamples[selectedTextType]) {
        selectedTextType = Object.keys(availableTextTypes)[0];
    }
    
    if (!selectedTextType || !textSamples[selectedTextType]) {
        alert('No text samples available. Please check your text-examples directory.');
        return;
    }
    
    const samples = textSamples[selectedTextType];
    const randomIndex = Math.floor(Math.random() * samples.length);
    currentText = samples[randomIndex].text;
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
    // Use the selected text type or default to first available
    let selectedTextType = currentTextType;
    if (!selectedTextType || !textSamples[selectedTextType]) {
        selectedTextType = Object.keys(availableTextTypes)[0];
    }
    
    if (!selectedTextType || !textSamples[selectedTextType]) {
        alert('No text samples available. Please check your text-examples directory.');
        return;
    }
    
    const samples = textSamples[selectedTextType];
    const randomIndex = Math.floor(Math.random() * samples.length);
    currentText = samples[randomIndex].text;
    
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
    document.querySelectorAll('.option-btn, .lang-btn, .text-type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    customTextInput?.classList.add('hidden');
    const customCodeInput = document.getElementById('customCodeInput');
    customCodeInput?.classList.add('hidden');
    randomTextActions?.classList.add('hidden');
    codeActions?.classList.add('hidden');
    
    currentLanguage = null;
    currentTextType = null;
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
