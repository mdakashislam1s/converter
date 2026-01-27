// Conversion data with formulas
const conversionData = {
    length: {
        units: [
            { name: "Meter", value: "meter", factor: 1 },
            { name: "Kilometer", value: "kilometer", factor: 1000 },
            { name: "Centimeter", value: "centimeter", factor: 0.01 },
            { name: "Millimeter", value: "millimeter", factor: 0.001 },
            { name: "Mile", value: "mile", factor: 1609.34 },
            { name: "Yard", value: "yard", factor: 0.9144 },
            { name: "Foot", value: "foot", factor: 0.3048 },
            { name: "Inch", value: "inch", factor: 0.0254 }
        ],
        formula: (fromValue, fromFactor, toFactor) => {
            return fromValue * fromFactor / toFactor;
        },
        formulaText: (fromValue, fromUnit, toUnit, result) => {
            return `${fromValue} ${fromUnit} × (${getFactor(fromUnit)} / ${getFactor(toUnit)}) = ${result} ${toUnit}`;
        }
    },
    weight: {
        units: [
            { name: "Kilogram", value: "kilogram", factor: 1 },
            { name: "Gram", value: "gram", factor: 0.001 },
            { name: "Pound", value: "pound", factor: 0.453592 },
            { name: "Ounce", value: "ounce", factor: 0.0283495 },
            { name: "Stone", value: "stone", factor: 6.35029 },
            { name: "Metric Ton", value: "ton", factor: 1000 }
        ],
        formula: (fromValue, fromFactor, toFactor) => {
            return fromValue * fromFactor / toFactor;
        },
        formulaText: (fromValue, fromUnit, toUnit, result) => {
            return `${fromValue} ${fromUnit} × (${getFactor(fromUnit)} / ${getFactor(toUnit)}) = ${result} ${toUnit}`;
        }
    },
    temperature: {
        units: [
            { name: "Celsius", value: "celsius" },
            { name: "Fahrenheit", value: "fahrenheit" },
            { name: "Kelvin", value: "kelvin" }
        ],
        formula: (fromValue, fromUnit, toUnit) => {
            // Convert to Celsius first
            let celsius;
            switch(fromUnit) {
                case 'celsius': celsius = fromValue; break;
                case 'fahrenheit': celsius = (fromValue - 32) * 5/9; break;
                case 'kelvin': celsius = fromValue - 273.15; break;
            }
            
            // Convert from Celsius to target
            switch(toUnit) {
                case 'celsius': return celsius;
                case 'fahrenheit': return (celsius * 9/5) + 32;
                case 'kelvin': return celsius + 273.15;
            }
            return 0;
        },
        formulaText: (fromValue, fromUnit, toUnit, result) => {
            if(fromUnit === 'celsius' && toUnit === 'fahrenheit') {
                return `${fromValue}°C × 9/5 + 32 = ${result}°F`;
            } else if(fromUnit === 'fahrenheit' && toUnit === 'celsius') {
                return `(${fromValue}°F - 32) × 5/9 = ${result}°C`;
            } else if(fromUnit === 'celsius' && toUnit === 'kelvin') {
                return `${fromValue}°C + 273.15 = ${result}K`;
            }
            return `${fromValue} ${fromUnit} → ${result} ${toUnit}`;
        }
    },
    currency: {
        units: [
            { name: "US Dollar", value: "usd", factor: 1 },
            { name: "Euro", value: "eur", factor: 0.92 },
            { name: "British Pound", value: "gbp", factor: 0.79 },
            { name: "Japanese Yen", value: "jpy", factor: 144.5 },
            { name: "Canadian Dollar", value: "cad", factor: 1.36 },
            { name: "Indian Rupee", value: "inr", factor: 82.9 },
            { name: "Chinese Yuan", value: "cny", factor: 7.29 }
        ],
        formula: (fromValue, fromFactor, toFactor) => {
            return fromValue * toFactor / fromFactor;
        },
        formulaText: (fromValue, fromUnit, toUnit, result) => {
            return `${fromValue} ${fromUnit} × (${getFactor(toUnit)} / ${getFactor(fromUnit)}) = ${result} ${toUnit}`;
        }
    },
    volume: {
        units: [
            { name: "Liter", value: "liter", factor: 1 },
            { name: "Milliliter", value: "ml", factor: 0.001 },
            { name: "Gallon", value: "gallon", factor: 3.78541 },
            { name: "Quart", value: "quart", factor: 0.946353 },
            { name: "Pint", value: "pint", factor: 0.473176 },
            { name: "Cup", value: "cup", factor: 0.236588 },
            { name: "Fluid Ounce", value: "floz", factor: 0.0295735 }
        ],
        formula: (fromValue, fromFactor, toFactor) => {
            return fromValue * fromFactor / toFactor;
        },
        formulaText: (fromValue, fromUnit, toUnit, result) => {
            return `${fromValue} ${fromUnit} × (${getFactor(fromUnit)} / ${getFactor(toUnit)}) = ${result} ${toUnit}`;
        }
    },
    digital: {
        units: [
            { name: "Byte", value: "byte", factor: 1 },
            { name: "Kilobyte", value: "kb", factor: 1024 },
            { name: "Megabyte", value: "mb", factor: 1048576 },
            { name: "Gigabyte", value: "gb", factor: 1073741824 },
            { name: "Terabyte", value: "tb", factor: 1099511627776 }
        ],
        formula: (fromValue, fromFactor, toFactor) => {
            return fromValue * fromFactor / toFactor;
        },
        formulaText: (fromValue, fromUnit, toUnit, result) => {
            return `${fromValue} ${fromUnit} × (${getFactor(fromUnit)} / ${getFactor(toUnit)}) = ${result} ${toUnit}`;
        }
    }
};

// Helper function to get factor for a unit
function getFactor(unitValue) {
    for(const category in conversionData) {
        const unit = conversionData[category].units.find(u => u.value === unitValue);
        if(unit && unit.factor) return unit.factor;
    }
    return 1;
}

// DOM elements
const fromValueInput = document.getElementById('fromValue');
const toValueInput = document.getElementById('toValue');
const fromUnitSelect = document.getElementById('fromUnit');
const toUnitSelect = document.getElementById('toUnit');
const fromCategorySpan = document.getElementById('fromCategory');
const toCategorySpan = document.getElementById('toCategory');
const resultValue = document.getElementById('resultValue');
const resultFormula = document.getElementById('resultFormula');
const resultBox = document.getElementById('resultBox');
const swapBtn = document.getElementById('swapBtn');
const categoryTabs = document.getElementById('categoryTabs');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistory');
const copyBtn = document.getElementById('copyBtn');

// Theme toggle
const themeToggle = document.getElementById('themeToggle');

// Modal elements
const connectModal = document.getElementById('connectModal');
const aboutModal = document.getElementById('aboutModal');
const connectBtn = document.getElementById('connectBtn');
const aboutBtn = document.getElementById('aboutBtn');
const homeBtn = document.getElementById('homeBtn');
const closeConnect = document.getElementById('closeConnect');
const closeAbout = document.getElementById('closeAbout');
const translateBtn = document.getElementById('translateBtn');
const bengaliContent = document.querySelector('.bengali-content');
const englishContent = document.querySelector('.english-content');

let currentCategory = 'length';
let conversionHistory = JSON.parse(localStorage.getItem('conversionHistory')) || [];
let isDarkMode = localStorage.getItem('theme') === 'dark';
let isEnglish = false;

// Initialize
function init() {
    loadCategory('length');
    updateHistoryDisplay();
    applyTheme();
    
    // Set default units
    setTimeout(() => {
        fromUnitSelect.value = 'meter';
        toUnitSelect.value = 'kilometer';
        convert();
    }, 100);
}

// Load category
function loadCategory(category) {
    currentCategory = category;
    const data = conversionData[category];
    
    // Update category display
    fromCategorySpan.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    toCategorySpan.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    
    // Clear and populate unit selects
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';
    
    data.units.forEach(unit => {
        const option1 = document.createElement('option');
        option1.value = unit.value;
        option1.textContent = unit.name;
        fromUnitSelect.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = unit.value;
        option2.textContent = unit.name;
        toUnitSelect.appendChild(option2);
    });
    
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    convert();
}

// Convert function
function convert() {
    const fromValue = parseFloat(fromValueInput.value) || 0;
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;
    
    let result;
    const category = conversionData[currentCategory];
    
    if(currentCategory === 'temperature') {
        result = category.formula(fromValue, fromUnit, toUnit);
    } else {
        const fromFactor = getFactor(fromUnit);
        const toFactor = getFactor(toUnit);
        result = category.formula(fromValue, fromFactor, toFactor);
    }
    
    // Format result
    let formattedResult;
    if(Math.abs(result) < 0.000001 && result !== 0) {
        formattedResult = result.toExponential(6);
    } else if(Math.abs(result) >= 1000000) {
        formattedResult = result.toExponential(4);
    } else {
        formattedResult = parseFloat(result.toFixed(6)).toString();
    }
    
    // Update UI
    toValueInput.value = formattedResult;
    resultValue.textContent = formattedResult;
    resultFormula.textContent = category.formulaText(fromValue, fromUnit, toUnit, formattedResult);
    
    // Add pulse animation
    resultBox.classList.add('updated');
    setTimeout(() => resultBox.classList.remove('updated'), 500);
    
    // Save to history (without date)
    if(fromValue !== 0 && fromUnit !== toUnit) {
        addToHistory(fromValue, fromUnit, toUnit, formattedResult);
    }
}

// Copy ONLY the conversion result (no date, no extra text)
function copyResultToClipboard() {
    const resultText = resultValue.textContent;
    
    // Copy ONLY the numeric result
    navigator.clipboard.writeText(resultText).then(() => {
        // Visual feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
        copyBtn.classList.add('copied');
        
        // Revert after 2 seconds
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = resultText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Still show feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('copied');
        }, 2000);
    });
}

// Add to history (without date)
function addToHistory(fromValue, fromUnit, toUnit, result) {
    const historyItem = {
        fromValue: fromValue,
        fromUnit: fromUnit,
        toUnit: toUnit,
        result: result,
        category: currentCategory
    };
    
    // Add to beginning of array
    conversionHistory.unshift(historyItem);
    
    // Keep only last 10 items
    if(conversionHistory.length > 10) {
        conversionHistory = conversionHistory.slice(0, 10);
    }
    
    // Save to localStorage
    localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
    
    // Update display
    updateHistoryDisplay();
}

// Update history display (without date)
function updateHistoryDisplay() {
    historyList.innerHTML = '';
    
    if(conversionHistory.length === 0) {
        historyList.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--gray);">No conversion history yet</div>';
        return;
    }
    
    conversionHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const fromUnitName = conversionData[item.category]?.units.find(u => u.value === item.fromUnit)?.name || item.fromUnit;
        const toUnitName = conversionData[item.category]?.units.find(u => u.value === item.toUnit)?.name || item.toUnit;
        
        historyItem.innerHTML = `
            <div class="history-conversion">${item.fromValue} ${fromUnitName} → ${item.result} ${toUnitName}</div>
        `;
        
        historyList.appendChild(historyItem);
    });
}

// Theme functions
function toggleTheme() {
    isDarkMode = !isDarkMode;
    applyTheme();
}

function applyTheme() {
    if(isDarkMode) {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon dark-icon"></i><span>Dark</span>';
    } else {
        document.body.classList.remove('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun light-icon"></i><span>Light</span>';
    }
    
    // Save to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Modal functions
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function toggleTranslation() {
    isEnglish = !isEnglish;
    if(isEnglish) {
        bengaliContent.style.display = 'none';
        englishContent.style.display = 'block';
        translateBtn.innerHTML = '<i class="fas fa-language"></i><span>বাংলা দেখুন</span>';
    } else {
        bengaliContent.style.display = 'block';
        englishContent.style.display = 'none';
        translateBtn.innerHTML = '<i class="fas fa-language"></i><span>See translation</span>';
    }
}

// Swap units
function swapUnits() {
    const tempUnit = fromUnitSelect.value;
    fromUnitSelect.value = toUnitSelect.value;
    toUnitSelect.value = tempUnit;
    
    // Also swap values if toValue is not empty
    if(toValueInput.value && toValueInput.value !== '0') {
        fromValueInput.value = toValueInput.value;
    }
    
    convert();
}

// Event Listeners
fromValueInput.addEventListener('input', convert);
fromUnitSelect.addEventListener('change', convert);
toUnitSelect.addEventListener('change', convert);
swapBtn.addEventListener('click', swapUnits);
clearHistoryBtn.addEventListener('click', () => {
    conversionHistory = [];
    localStorage.removeItem('conversionHistory');
    updateHistoryDisplay();
});
copyBtn.addEventListener('click', copyResultToClipboard);

// Theme toggle listener
themeToggle.addEventListener('click', toggleTheme);

// Modal listeners
connectBtn.addEventListener('click', () => openModal(connectModal));
aboutBtn.addEventListener('click', () => openModal(aboutModal));
homeBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Close modal buttons
closeConnect.addEventListener('click', () => closeModal(connectModal));
closeAbout.addEventListener('click', () => closeModal(aboutModal));

// Close modal when clicking outside
connectModal.addEventListener('click', (e) => {
    if(e.target === connectModal) closeModal(connectModal);
});
aboutModal.addEventListener('click', (e) => {
    if(e.target === aboutModal) closeModal(aboutModal);
});

// Translation toggle
translateBtn.addEventListener('click', toggleTranslation);

// Category tab clicks
categoryTabs.addEventListener('click', (e) => {
    const tabBtn = e.target.closest('.tab-btn');
    if(tabBtn) {
        loadCategory(tabBtn.dataset.category);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S to swap
    if((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        swapUnits();
    }
    // Ctrl/Cmd + H to clear history
    if((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        clearHistoryBtn.click();
    }
    // Ctrl/Cmd + C to copy result
    if((e.ctrlKey || e.metaKey) && e.key === 'c' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        copyResultToClipboard();
    }
    // Escape to close modals
    if(e.key === 'Escape') {
        closeModal(connectModal);
        closeModal(aboutModal);
    }
    // T for theme toggle
    if(e.key === 't' && e.altKey) {
        e.preventDefault();
        toggleTheme();
    }
});

// Focus input on page load
fromValueInput.focus();

// Initialize the converter
init();

// Real-time currency rates (mock - in a real app, you'd use an API)
async function updateCurrencyRates() {
    if(currentCategory === 'currency') {
        console.log('Updating currency rates...');
    }
}

// Update rates every 5 minutes
setInterval(updateCurrencyRates, 300000);
