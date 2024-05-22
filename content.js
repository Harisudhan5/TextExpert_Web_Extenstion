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
    menu.style.backgroundColor = 'white';
    menu.style.border = '1px solid #ccc';
    menu.style.padding = '10px';
    menu.style.boxShadow = '0 0 5px rgba(0,0,0,0.2)';
    menu.style.zIndex = '99999'; // Ensure the menu appears above other elements
    menu.style.fontFamily = 'Arial, sans-serif';
    menu.style.fontSize = '14px';
    menu.style.color = 'rgb(255, 255, 255)'; // White text color

    const buttonStyle = 'background-color: #007bff; color: white;'; // Blue button with white text color

    const meaningButton = createButton('Meaning', () => {
        alert(`Meaning: ${selectedText}`);
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
    button.style = style;
    button.style.marginRight = '5px';
    button.addEventListener('click', onClick);
    return button;
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
