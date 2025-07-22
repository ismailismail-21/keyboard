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
        const languages = ['javascript', 'python', 'cpp', 'php', 'css', 'html', 'csharp', 'golang'];
        
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
        'golang': 'Go'
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
        'golang': 'fab fa-google'
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
        `function fibonacci(n) {
\tif (n <= 1) return n;
\treturn fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log('Fibonacci result:', result);`,
        `const users = [
\t{ name: 'John', age: 25, city: 'New York' },
\t{ name: 'Jane', age: 30, city: 'San Francisco' },
\t{ name: 'Bob', age: 35, city: 'Chicago' }
];

const adults = users.filter(user => user.age >= 18)
\t.map(user => ({ ...user, isAdult: true }));

console.log(adults);`,
        `class Calculator {
\tconstructor() {
\t\tthis.result = 0;
\t}
\t
\tadd(num) {
\t\tthis.result += num;
\t\treturn this;
\t}
\t
\tsubtract(num) {
\t\tthis.result -= num;
\t\treturn this;
\t}
\t
\tgetResult() {
\t\treturn this.result;
\t}
}`
    ],
    python: [
        `def quicksort(arr):
\tif len(arr) <= 1:
\t\treturn arr
\t
\tpivot = arr[len(arr) // 2]
\tleft = [x for x in arr if x < pivot]
\tmiddle = [x for x in arr if x == pivot]
\tright = [x for x in arr if x > pivot]
\t
\treturn quicksort(left) + middle + quicksort(right)

numbers = [3, 6, 8, 10, 1, 2, 1]
sorted_numbers = quicksort(numbers)
print(sorted_numbers)`,
        `import requests
from datetime import datetime

class WeatherAPI:
\tdef __init__(self, api_key):
\t\tself.api_key = api_key
\t\tself.base_url = "http://api.openweathermap.org/data/2.5"
\t
\tdef get_weather(self, city):
\t\turl = f"{self.base_url}/weather"
\t\tparams = {
\t\t\t'q': city,
\t\t\t'appid': self.api_key,
\t\t\t'units': 'metric'
\t\t}
\t\t
\t\tresponse = requests.get(url, params=params)
\t\treturn response.json()`,
        `def decorator_timer(func):
\timport time
\tdef wrapper(*args, **kwargs):
\t\tstart = time.time()
\t\tresult = func(*args, **kwargs)
\t\tend = time.time()
\t\tprint(f"{func.__name__} took {end - start:.4f} seconds")
\t\treturn result
\treturn wrapper

@decorator_timer
def fibonacci(n):
\tif n <= 1:
\t\treturn n
\treturn fibonacci(n - 1) + fibonacci(n - 2)`
    ],
    cpp: [
        `#include <iostream>
#include <vector>
#include <algorithm>

class BinarySearchTree {
private:
\tstruct Node {
\t\tint data;
\t\tNode* left;
\t\tNode* right;
\t\t
\t\tNode(int val) : data(val), left(nullptr), right(nullptr) {}
\t};
\t
\tNode* root;
\t
public:
\tBinarySearchTree() : root(nullptr) {}
\t
\tvoid insert(int val) {
\t\troot = insertHelper(root, val);
\t}
\t
private:
\tNode* insertHelper(Node* node, int val) {
\t\tif (node == nullptr) {
\t\t\treturn new Node(val);
\t\t}
\t\t
\t\tif (val < node->data) {
\t\t\tnode->left = insertHelper(node->left, val);
\t\t} else {
\t\t\tnode->right = insertHelper(node->right, val);
\t\t}
\t\t
\t\treturn node;
\t}
};`,
        `#include <iostream>
#include <vector>
#include <memory>

template<typename T>
class Vector {
private:
\tstd::unique_ptr<T[]> data;
\tsize_t size;
\tsize_t capacity;
\t
public:
\tVector() : data(nullptr), size(0), capacity(0) {}
\t
\tvoid push_back(const T& value) {
\t\tif (size >= capacity) {
\t\t\tresize();
\t\t}
\t\tdata[size++] = value;
\t}
\t
private:
\tvoid resize() {
\t\tsize_t new_capacity = capacity == 0 ? 1 : capacity * 2;
\t\tauto new_data = std::make_unique<T[]>(new_capacity);
\t\t
\t\tfor (size_t i = 0; i < size; ++i) {
\t\t\tnew_data[i] = std::move(data[i]);
\t\t}
\t\t
\t\tdata = std::move(new_data);
\t\tcapacity = new_capacity;
\t}
};`
    ],
    php: [
        `<?php
class Database {
\tprivate $connection;
\tprivate $host;
\tprivate $username;
\tprivate $password;
\tprivate $database;
\t
\tpublic function __construct($host, $username, $password, $database) {
\t\t$this->host = $host;
\t\t$this->username = $username;
\t\t$this->password = $password;
\t\t$this->database = $database;
\t\t$this->connect();
\t}
\t
\tprivate function connect() {
\t\ttry {
\t\t\t$this->connection = new PDO(
\t\t\t\t"mysql:host={$this->host};dbname={$this->database}",
\t\t\t\t$this->username,
\t\t\t\t$this->password
\t\t\t);
\t\t\t$this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
\t\t} catch (PDOException $e) {
\t\t\tthrow new Exception("Connection failed: " . $e->getMessage());
\t\t}
\t}
\t
\tpublic function query($sql, $params = []) {
\t\t$statement = $this->connection->prepare($sql);
\t\t$statement->execute($params);
\t\treturn $statement->fetchAll(PDO::FETCH_ASSOC);
\t}
}?>`,
        `<?php
namespace App\\Controllers;

use App\\Models\\User;
use App\\Services\\AuthService;

class UserController {
\tprivate $authService;
\t
\tpublic function __construct(AuthService $authService) {
\t\t$this->authService = $authService;
\t}
\t
\tpublic function register(array $data) {
\t\t$validator = $this->validateRegistration($data);
\t\t
\t\tif (!$validator['valid']) {
\t\t\treturn $this->error($validator['errors']);
\t\t}
\t\t
\t\t$hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
\t\t
\t\t$user = User::create([
\t\t\t'name' => $data['name'],
\t\t\t'email' => $data['email'],
\t\t\t'password' => $hashedPassword
\t\t]);
\t\t
\t\treturn $this->success(['user' => $user]);
\t}
\t
\tprivate function validateRegistration($data) {
\t\t$errors = [];
\t\t
\t\tif (empty($data['name'])) {
\t\t\t$errors[] = 'Name is required';
\t\t}
\t\t
\t\tif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
\t\t\t$errors[] = 'Valid email is required';
\t\t}
\t\t
\t\treturn ['valid' => empty($errors), 'errors' => $errors];
\t}
}?>`
    ],
    css: [
        `.navigation {
\tposition: fixed;
\ttop: 0;
\tleft: 0;
\twidth: 100%;
\tbackground: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
\tbox-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
\tz-index: 1000;
\ttransition: all 0.3s ease;
}

.nav-container {
\tmax-width: 1200px;
\tmargin: 0 auto;
\tdisplay: flex;
\tjustify-content: space-between;
\talign-items: center;
\tpadding: 1rem 2rem;
}

.logo {
\tfont-size: 1.5rem;
\tfont-weight: 700;
\tcolor: white;
\ttext-decoration: none;
\ttransition: transform 0.3s ease;
}

.logo:hover {
\ttransform: scale(1.05);
}

.nav-links {
\tdisplay: flex;
\tlist-style: none;
\tmargin: 0;
\tpadding: 0;
\tgap: 2rem;
}

.nav-links a {
\tcolor: white;
\ttext-decoration: none;
\tfont-weight: 500;
\tposition: relative;
\ttransition: color 0.3s ease;
}

.nav-links a::after {
\tcontent: '';
\tposition: absolute;
\tbottom: -5px;
\tleft: 0;
\twidth: 0;
\theight: 2px;
\tbackground: #f093fb;
\ttransition: width 0.3s ease;
}

.nav-links a:hover::after {
\twidth: 100%;
}`,
        `.card-container {
\tdisplay: grid;
\tgrid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
\tgap: 2rem;
\tpadding: 2rem;
\tmax-width: 1200px;
\tmargin: 0 auto;
}

.card {
\tbackground: white;
\tborder-radius: 12px;
\tbox-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
\toverflow: hidden;
\ttransition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
\tposition: relative;
}

.card::before {
\tcontent: '';
\tposition: absolute;
\ttop: 0;
\tleft: 0;
\tright: 0;
\theight: 4px;
\tbackground: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card:hover {
\ttransform: translateY(-8px);
\tbox-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.card-header {
\tpadding: 1.5rem;
\tborder-bottom: 1px solid #e2e8f0;
}

.card-title {
\tfont-size: 1.25rem;
\tfont-weight: 600;
\tcolor: #333;
\tmargin-bottom: 0.5rem;
}

.card-subtitle {
\tfont-size: 0.9rem;
\tcolor: #666;
}

.card-body {
\tpadding: 1.5rem;
}

.card-footer {
\tpadding: 1rem 1.5rem;
\tbackground: #f8fafc;
\tborder-top: 1px solid #e2e8f0;
\tdisplay: flex;
\tjustify-content: space-between;
\talign-items: center;
}`
    ],
    html: [
        `<!DOCTYPE html>
<html lang="en">
<head>
\t<meta charset="UTF-8">
\t<meta name="viewport" content="width=device-width, initial-scale=1.0">
\t<meta name="description" content="Modern web development portfolio">
\t<meta name="keywords" content="web developer, portfolio, HTML, CSS, JavaScript">
\t<title>Portfolio - Web Developer</title>
\t<link rel="stylesheet" href="styles.css">
\t<link rel="preconnect" href="https://fonts.googleapis.com">
\t<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
\t<header class="header">
\t\t<nav class="navigation">
\t\t\t<div class="nav-container">
\t\t\t\t<a href="#" class="logo">Portfolio</a>
\t\t\t\t<ul class="nav-links">
\t\t\t\t\t<li><a href="#home">Home</a></li>
\t\t\t\t\t<li><a href="#about">About</a></li>
\t\t\t\t\t<li><a href="#projects">Projects</a></li>
\t\t\t\t\t<li><a href="#contact">Contact</a></li>
\t\t\t\t</ul>
\t\t\t\t<button class="mobile-menu-btn" aria-label="Toggle menu">
\t\t\t\t\t<span></span>
\t\t\t\t\t<span></span>
\t\t\t\t\t<span></span>
\t\t\t\t</button>
\t\t\t</div>
\t\t</nav>
\t</header>

\t<main>
\t\t<section id="hero" class="hero-section">
\t\t\t<div class="hero-content">
\t\t\t\t<h1 class="hero-title">Full Stack Developer</h1>
\t\t\t\t<p class="hero-subtitle">Building modern web experiences with cutting-edge technologies</p>
\t\t\t\t<div class="hero-buttons">
\t\t\t\t\t<a href="#projects" class="btn btn-primary">View Projects</a>
\t\t\t\t\t<a href="#contact" class="btn btn-secondary">Get In Touch</a>
\t\t\t\t</div>
\t\t\t</div>
\t\t</section>
\t</main>
</body>
</html>`,
        `<form class="contact-form" id="contactForm" novalidate>
\t<div class="form-group">
\t\t<label for="name" class="form-label">Full Name</label>
\t\t<input 
\t\t\ttype="text" 
\t\t\tid="name" 
\t\t\tname="name" 
\t\t\tclass="form-input" 
\t\t\trequired 
\t\t\taria-describedby="name-error"
\t\t\tplaceholder="Enter your full name"
\t\t>
\t\t<div id="name-error" class="error-message" aria-live="polite"></div>
\t</div>

\t<div class="form-group">
\t\t<label for="email" class="form-label">Email Address</label>
\t\t<input 
\t\t\ttype="email" 
\t\t\tid="email" 
\t\t\tname="email" 
\t\t\tclass="form-input" 
\t\t\trequired 
\t\t\taria-describedby="email-error"
\t\t\tplaceholder="your.email@example.com"
\t\t>
\t\t<div id="email-error" class="error-message" aria-live="polite"></div>
\t</div>

\t<div class="form-group">
\t\t<label for="subject" class="form-label">Subject</label>
\t\t<select id="subject" name="subject" class="form-select" required>
\t\t\t<option value="">Choose a subject</option>
\t\t\t<option value="general">General Inquiry</option>
\t\t\t<option value="project">Project Discussion</option>
\t\t\t<option value="collaboration">Collaboration</option>
\t\t\t<option value="support">Support</option>
\t\t</select>
\t\t<div id="subject-error" class="error-message" aria-live="polite"></div>
\t</div>

\t<div class="form-group">
\t\t<label for="message" class="form-label">Message</label>
\t\t<textarea 
\t\t\tid="message" 
\t\t\tname="message" 
\t\t\tclass="form-textarea" 
\t\t\trequired 
\t\t\trows="5"
\t\t\taria-describedby="message-error"
\t\t\tplaceholder="Tell us about your project or inquiry..."
\t\t></textarea>
\t\t<div id="message-error" class="error-message" aria-live="polite"></div>
\t</div>

\t<div class="form-actions">
\t\t<button type="submit" class="btn btn-primary btn-full">
\t\t\t<span class="btn-text">Send Message</span>
\t\t\t<span class="btn-loader hidden">Sending...</span>
\t\t</button>
\t</div>
</form>`
    ]
};

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
    document.getElementById('startCustomText').addEventListener('click', startCustomTextPractice);
    document.getElementById('startRandomText').addEventListener('click', startRandomTextPractice);
    document.getElementById('startCode').addEventListener('click', startCodePractice);

    // New snippet buttons
    document.getElementById('newSnippet').addEventListener('click', generateNewTextSnippet);
    document.getElementById('newCodeSnippet').addEventListener('click', generateNewCodeSnippet);

    // Control buttons
    document.getElementById('resetBtn').addEventListener('click', resetPractice);
    document.getElementById('backBtn').addEventListener('click', backToSelection);

    // Result buttons
    document.getElementById('practiceAgain').addEventListener('click', practiceAgain);
    document.getElementById('backToMenu').addEventListener('click', backToSelection);

    // Text display input events
    textDisplay.addEventListener('input', handleTyping);
    textDisplay.addEventListener('keydown', handleKeyDown);
    textDisplay.addEventListener('paste', handlePaste);

    // Sound toggle
    soundToggle.addEventListener('click', toggleSound);
}

function selectMode(mode) {
    currentMode = mode;
    
    // Update button states
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    
    // Show appropriate options
    textOptions.classList.toggle('hidden', mode !== 'text');
    codeOptions.classList.toggle('hidden', mode !== 'code');
    
    // Reset sub-selections
    resetSubSelections();
}

function selectTextOption(option) {
    // Update button states
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-option="${option}"]`).classList.add('active');
    
    // Show appropriate inputs
    customTextInput.classList.toggle('hidden', option !== 'custom-text');
    randomTextActions.classList.toggle('hidden', option !== 'random-text');
}

function selectLanguage(lang) {
    currentLanguage = lang;
    
    // Update button states  
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    // Show code actions
    const codeActions = document.getElementById('codeActions');
    if (codeActions) {
        codeActions.classList.remove('hidden');
    }
}

function startCustomTextPractice() {
    const text = document.getElementById('customTextArea').value.trim();
    const shouldShuffle = document.getElementById('shuffleText').checked;
    
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
    
    const shouldShuffle = document.getElementById('shuffleCode').checked;
    const samples = codeSamples[currentLanguage];
    const randomIndex = Math.floor(Math.random() * samples.length);
    
    // Get the code from the JSON structure
    currentText = shouldShuffle ? shuffleText(samples[randomIndex].code) : samples[randomIndex].code;
    startPractice();
}

function generateNewTextSnippet() {
    const randomIndex = Math.floor(Math.random() * textSamples.length);
    currentText = textSamples[randomIndex];
    if (practicePanel.classList.contains('hidden')) {
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
    
    const shouldShuffle = document.getElementById('shuffleCode').checked;
    const samples = codeSamples[currentLanguage];
    const randomIndex = Math.floor(Math.random() * samples.length);
    
    // Get the code from the JSON structure
    currentText = shouldShuffle ? shuffleText(samples[randomIndex].code) : samples[randomIndex].code;
    
    if (practicePanel.classList.contains('hidden')) {
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
    selectionPanel.classList.add('hidden');
    practicePanel.classList.remove('hidden');
    resultsPanel.classList.add('hidden');
    
    resetPracticeState();
    displayText();
    textDisplay.focus();
}

function resetPractice() {
    resetPracticeState();
    displayText();
    textDisplay.focus();
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
        timerDisplay.textContent = elapsed + 's';
    }, 1000);
}

function updateStats() {
    if (startTime && totalChars > 0) {
        const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
        const wpm = Math.round((totalChars / 5) / timeElapsed) || 0;
        const accuracy = Math.round((correctChars / totalChars) * 100) || 100;
        
        wpmDisplay.textContent = wpm;
        accuracyDisplay.textContent = accuracy + '%';
    } else {
        wpmDisplay.textContent = '0';
        accuracyDisplay.textContent = '100%';
    }
}

function updateProgress() {
    const progress = currentText.length > 0 ? (currentIndex / currentText.length) * 100 : 0;
    progressFill.style.width = progress + '%';
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
    document.getElementById('finalWpm').textContent = wpm;
    document.getElementById('finalAccuracy').textContent = accuracy + '%';
    document.getElementById('finalTime').textContent = Math.round(timeElapsed) + 's';
    document.getElementById('finalChars').textContent = totalChars;
    
    practicePanel.classList.add('hidden');
    resultsPanel.classList.remove('hidden');
}

function practiceAgain() {
    resultsPanel.classList.add('hidden');
    practicePanel.classList.remove('hidden');
    resetPractice();
}

function backToSelection() {
    practicePanel.classList.add('hidden');
    resultsPanel.classList.add('hidden');
    selectionPanel.classList.remove('hidden');
    
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetSubSelections() {
    document.querySelectorAll('.option-btn, .lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    customTextInput.classList.add('hidden');
    randomTextActions.classList.add('hidden');
    codeActions.classList.add('hidden');
    
    currentLanguage = null;
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    soundToggle.innerHTML = soundEnabled 
        ? '<i class="fas fa-volume-up"></i>' 
        : '<i class="fas fa-volume-mute"></i>';
    soundToggle.classList.toggle('muted', !soundEnabled);
}
