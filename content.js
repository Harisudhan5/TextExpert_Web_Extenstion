// Function to show options for selected text
function showOptions(x, y, selectedText) {
    let menu = document.getElementById('text-interaction-menu');
    if (!menu) {
        menu = createMenu(selectedText);
        menu.style.position = 'fixed';
        menu.style.left = `${x}px`;
        menu.style.top = `${y}px`;
        document.body.appendChild(menu);
    }
}

// Function to create the options menu
function createMenu(selectedText) {
    const menu = document.createElement('div');
    menu.id = 'text-interaction-menu';
    menu.style.backgroundColor = 'violet'; // Changed background color to violet
    menu.style.border = '1px solid white';
    menu.style.padding = '10px';
    menu.style.boxShadow = '0 0 5px rgba(255,255,255,0.2)';
    menu.style.zIndex = '99999';
    menu.style.fontFamily = 'Arial, sans-serif';
    menu.style.fontSize = '14px';
    menu.style.color = 'white';
    menu.style.borderRadius = '5px';
    menu.style.display = 'flex';
    menu.style.flexDirection = 'column';
    menu.style.gap = '10px'; // Add some space between the buttons

    const buttonStyle = 'background-color: white; color: black; border: 1px solid white; border-radius: 5px; padding: 5px 10px;';

    const meaningButton = createButton('Meaning', async (event) => {
        event.target.textContent = 'Loading...'; // Show loading text
        event.target.disabled = true; // Disable button during loading
        try {
            const meaning = await fetchMeaning(selectedText);
            alert(`Meaning: ${meaning}`);
        } catch (error) {
            console.error('Error fetching meaning:', error);
            alert('Error fetching meaning');
        } finally {
            event.target.textContent = 'Meaning'; // Restore original text
            event.target.disabled = false; // Enable button after loading
        }
    }, buttonStyle);

    const summarizeButton = createButton('Summarize', () => {
        alert(`Summarized: ${selectedText}`);
    }, buttonStyle);

    const translateButton = createButton('Translate', () => {
        const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Chinese', 'Japanese', 'Arabic', 'Russian', 'Portuguese'];
        const selectedLanguage = prompt('Select a language:', languages.join(', '));
        if (selectedLanguage) {
            alert(`Translated to ${selectedLanguage}: ${selectedText}`);
        }
    }, buttonStyle);

    menu.appendChild(meaningButton);
    menu.appendChild(summarizeButton);
    menu.appendChild(translateButton);

    return menu;
}

// Function to create a button with given text, click handler, and style
function createButton(text, onClick, style) {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.cssText = style; // Use cssText to set multiple styles
    button.addEventListener('click', onClick);
    return button;
}

// Function to fetch the meaning of the selected text from the server
async function fetchMeaning(selectedText) {
    try {
        const response = await fetch('http://127.0.0.1:5000/meaning', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: selectedText })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch meaning');
        }

        const data = await response.json();
        return data.meaning;
    } catch (error) {
        throw new Error('Error fetching meaning');
    }
}

// Listen for mouseup event to check for selected text
document.addEventListener('mouseup', function(event) {
    const selectedText = window.getSelection().toString().trim();

    if (selectedText.length > 0) {
        showOptions(event.pageX, event.pageY, selectedText);
    } else {
        const existingMenu = document.getElementById('text-interaction-menu');
        if (existingMenu) {
            existingMenu.remove();
        }
    }
});

console.log('Content script loaded');
