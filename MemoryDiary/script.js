document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const authPanel = document.getElementById('authPanel');
    const mainApp = document.getElementById('mainApp');
    const initBtn = document.getElementById('initBtn');
    const passphraseInput = document.getElementById('passphrase');
    const newEntryBtn = document.getElementById('newEntryBtn');
    const entryTitle = document.getElementById('entryTitle');
    const entryContent = document.getElementById('entryContent');
    const saveBtn = document.getElementById('saveBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const entriesContainer = document.getElementById('entriesContainer');
    const searchInput = document.getElementById('searchInput');
    const wordCount = document.getElementById('wordCount');
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    const unlockModal = document.getElementById('unlockModal');
    const unlockPassphraseInput = document.getElementById('unlockPassphrase');
    const unlockBtn = document.getElementById('unlockBtn');
    const cancelUnlockBtn = document.getElementById('cancelUnlockBtn');
    
    // App State
    let currentEntryId = null;
    let entries = [];
    let userPassphrase = '';
    let entryToUnlock = null;
    
    // Initialize the application
    function init() {
        // Check if diary is already initialized
        const isInitialized = localStorage.getItem('memoryDiary_initialized');
        if (isInitialized) {
            // Diary is already initialized, show unlock screen
            showAuthPanel();
            document.querySelector('.auth-container h2').textContent = 'Unlock Your Diary';
            document.querySelector('.input-group label').textContent = 'Enter Your Passphrase';
            document.querySelector('.input-group small').textContent = 'Enter your passphrase to unlock your diary';
            initBtn.textContent = 'Unlock Diary';
            
            // Change button event to unlock instead of initialize
            initBtn.removeEventListener('click', initializeDiary);
            initBtn.addEventListener('click', unlockDiary);
        } else {
            // Diary needs to be initialized
            showAuthPanel();
            initBtn.addEventListener('click', initializeDiary);
        }
        
        // Event listeners
        newEntryBtn.addEventListener('click', createNewEntry);
        saveBtn.addEventListener('click', saveEntry);
        deleteBtn.addEventListener('click', deleteEntry);
        searchInput.addEventListener('input', filterEntries);
        entryContent.addEventListener('input', updateWordCount);
        unlockBtn.addEventListener('click', unlockEntry);
        cancelUnlockBtn.addEventListener('click', hideUnlockModal);
    }
    
    // Show notification
    function showNotification(message, isSuccess = true) {
        notificationText.textContent = message;
        notification.classList.add('show');
        notification.style.background = isSuccess ? '#8b5a2b' : '#a67b5b';
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Show auth panel
    function showAuthPanel() {
        authPanel.classList.remove('hidden');
        mainApp.classList.add('hidden');
    }
    
    // Show main app
    function showMainApp() {
        authPanel.classList.add('hidden');
        mainApp.classList.remove('hidden');
    }
    
    // Show unlock modal
    function showUnlockModal(entry) {
        entryToUnlock = entry;
        unlockModal.classList.remove('hidden');
        unlockPassphraseInput.value = '';
        unlockPassphraseInput.focus();
    }
    
    // Hide unlock modal
    function hideUnlockModal() {
        unlockModal.classList.add('hidden');
        entryToUnlock = null;
    }
    
    // Initialize diary with passphrase
    function initializeDiary() {
        const passphraseValue = passphraseInput.value.trim();
        
        if (passphraseValue.length < 8) {
            showNotification('Passphrase must be at least 8 characters long', false);
            return;
        }
        
        // Store the initialization flag
        localStorage.setItem('memoryDiary_initialized', 'true');
        
        // Set passphrase and show main app
        userPassphrase = passphraseValue;
        showNotification('Diary initialized successfully!');
        showMainApp();
        
        // Create a first entry
        createNewEntry();
    }
    
    // Unlock diary with passphrase
    function unlockDiary() {
        const passphraseValue = passphraseInput.value.trim();
        
        if (passphraseValue.length < 8) {
            showNotification('Please enter your passphrase', false);
            return;
        }
        
        // Set passphrase and show main app
        userPassphrase = passphraseValue;
        
        // Try to load entries to verify passphrase is correct
        try {
            loadEntries();
            showNotification('Diary unlocked successfully!');
            showMainApp();
        } catch (e) {
            showNotification('Incorrect passphrase. Please try again.', false);
            userPassphrase = '';
        }
    }
    
    // Encrypt text
    function encryptText(text) {
        if (!userPassphrase) return text;
        return CryptoJS.AES.encrypt(text, userPassphrase).toString();
    }
    
    // Decrypt text
    function decryptText(ciphertext) {
        if (!userPassphrase) return ciphertext;
        try {
            const bytes = CryptoJS.AES.decrypt(ciphertext, userPassphrase);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            
            if (!decrypted) {
                throw new Error('Decryption failed');
            }
            
            return decrypted;
        } catch (e) {
            console.error('Decryption error:', e);
            throw new Error('Error decrypting content. Wrong passphrase?');
        }
    }
    
    // Create a new entry
    function createNewEntry() {
        currentEntryId = Date.now().toString();
        entryTitle.value = '';
        entryContent.value = '';
        updateWordCount();
        
        // Remove active class from all entries
        document.querySelectorAll('.entry-item').forEach(item => {
            item.classList.remove('active');
        });
    }
    
    // Save entry
    function saveEntry() {
        const title = entryTitle.value.trim();
        const content = entryContent.value.trim();
        
        if (!title || !content) {
            showNotification('Please add both title and content', false);
            return;
        }
        
        // Encrypt the content
        const encryptedContent = encryptText(content);
        const encryptedTitle = encryptText(title);
        
        // Create or update entry
        const entryIndex = entries.findIndex(entry => entry.id === currentEntryId);
        const now = new Date();
        
        if (entryIndex !== -1) {
            // Update existing entry
            entries[entryIndex] = {
                ...entries[entryIndex],
                title: encryptedTitle,
                content: encryptedContent,
                date: now.toISOString()
            };
        } else {
            // Create new entry
            entries.push({
                id: currentEntryId,
                title: encryptedTitle,
                content: encryptedContent,
                date: now.toISOString()
            });
        }
        
        // Save to localStorage
        localStorage.setItem('memoryDiary_entries', JSON.stringify(entries));
        
        // Update UI
        loadEntries();
        showNotification('Entry saved and encrypted successfully!');
    }
    
    // Delete entry
    function deleteEntry() {
        if (!currentEntryId) return;
        
        if (confirm('Are you sure you want to delete this entry?')) {
            entries = entries.filter(entry => entry.id !== currentEntryId);
            localStorage.setItem('memoryDiary_entries', JSON.stringify(entries));
            
            createNewEntry();
            loadEntries();
            showNotification('Entry deleted successfully');
        }
    }
    
    // Load entries
    function loadEntries() {
        const savedEntries = localStorage.getItem('memoryDiary_entries');
        if (savedEntries) {
            entries = JSON.parse(savedEntries);
        }
        
        // Clear entries container
        entriesContainer.innerHTML = '';
        
        // Sort entries by date (newest first)
        entries.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Add entries to the list
        entries.forEach(entry => {
            const entryDate = new Date(entry.date);
            const formattedDate = entryDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            // For security, we don't decrypt until user clicks
            const entryElement = document.createElement('div');
            entryElement.classList.add('entry-item');
            entryElement.setAttribute('data-entry-id', entry.id);
            if (entry.id === currentEntryId) {
                entryElement.classList.add('active');
            }
            
            entryElement.innerHTML = `
                <div class="entry-title">Encrypted Entry</div>
                <div class="entry-date">${formattedDate}</div>
                <div class="entry-preview">Click to unlock and view</div>
            `;
            
            entryElement.addEventListener('click', () => {
                showUnlockModal(entry);
            });
            
            entriesContainer.appendChild(entryElement);
        });
    }
    
    // Unlock entry with passphrase
    function unlockEntry() {
        const passphraseValue = unlockPassphraseInput.value.trim();
        
        if (!passphraseValue) {
            showNotification('Please enter your passphrase', false);
            return;
        }
        
        // Temporarily set the passphrase
        const tempPassphrase = userPassphrase;
        userPassphrase = passphraseValue;
        
        try {
            // Try to decrypt the entry
            const decryptedTitle = decryptText(entryToUnlock.title);
            const decryptedContent = decryptText(entryToUnlock.content);
            
            // Success - load the entry
            currentEntryId = entryToUnlock.id;
            entryTitle.value = decryptedTitle;
            entryContent.value = decryptedContent;
            updateWordCount();
            
            // Update active entry in list
            document.querySelectorAll('.entry-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Update the entry element to show the actual title
            const entryElement = document.querySelector(`.entry-item[data-entry-id="${entryToUnlock.id}"]`);
            if (entryElement) {
                entryElement.querySelector('.entry-title').textContent = decryptedTitle;
                entryElement.querySelector('.entry-preview').textContent = decryptedContent.substring(0, 50) + '...';
                entryElement.classList.add('active');
            }
            
            hideUnlockModal();
            showNotification('Entry unlocked successfully!');
        } catch (e) {
            // Failed to decrypt
            showNotification('Incorrect passphrase. Please try again.', false);
            userPassphrase = tempPassphrase; // Restore original passphrase
        }
    }
    
    // Filter entries based on search input
    function filterEntries() {
        const searchTerm = searchInput.value.toLowerCase();
        
        document.querySelectorAll('.entry-item').forEach(item => {
            const title = item.querySelector('.entry-title').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Update word count
    function updateWordCount() {
        const text = entryContent.value;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        wordCount.textContent = `${words} words`;
    }
    
    // Initialize the app
    init();
});