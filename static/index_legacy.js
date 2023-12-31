// JavaScript code to save the selected options in the dropdown menus, so that they are still selected when the page is refreshed.
window.onload = function() {
    // Check if there are saved selections
    var raidType = localStorage.getItem('raidType');
    var itemType = localStorage.getItem('itemType');

    if (document.getElementById('raidType').value === 'explo') {
        document.getElementById('idSubmit').innerHTML = 'BOOM!';
    } else if (document.getElementById('raidType').value === 'eco') {
        document.getElementById('idSubmit').innerHTML = 'CHOP!';
    }

    // If there are, set the selected options
    if (raidType) {
        document.getElementById('raidType').value = raidType;
    }
    if (itemType) {
        document.getElementById('itemType').value = itemType;
    }

    // When an option is selected, save the selection
    document.getElementById('raidType').onchange = function() {
        localStorage.setItem('raidType', this.value);
    }
    document.getElementById('itemType').onchange = function() {
        localStorage.setItem('itemType', this.value);
    }

    document.getElementById('raidType').onchange = function() {
        var submitButton = document.getElementById('idSubmit');
        var submitBtn = document.querySelector('.submitBtn');
        var raidType = this.value;

        if (raidType === 'explo') {
            submitButton.innerHTML = 'BOOM!';
            changeHoverBackground('static/img/boom.png', '160%', 'darkred');
        } else if (raidType === 'eco') {
            submitButton.innerHTML = 'CHOP!';
            changeHoverBackground('static/img/Hatchet_icon.png', 'cover', 'white');
        }
    
    }
    function changeHoverBackground(imageUrl, styleSize, styleColor) {
        var style = document.createElement('style');
        style.innerHTML = `
            .submitBtn:hover {
                background-image: url('${imageUrl}');
                background-size: ${styleSize};
                color: ${styleColor};
            }
        `;
        document.head.appendChild(style);
    }
}

// JavaScript code to give auto suggest functionality to the input box, based on user input.    
function updateSuggestions() {
    var input = document.getElementById('inputbox').value;
    var datalist = document.getElementById('autoSuggest');
    datalist.innerHTML = '';

    // Gets the value of the item type dropdown menu, and sets the path to the JSON file containing the items.
    var itemType = document.getElementById('itemType').value;
    var suggestPath;
    if (itemType === 'deployable') {
        var suggestPath = deployableSuggestsUrl;
    } else if (itemType === 'vehicle') {
        var suggestPath = vehicleSuggestsUrl;
    } else if (itemType === 'building') {
        var suggestPath = buildingSuggestsUrl;
    }

    // Fetches the JSON file containing all the items, and filters the list based on user input.
    fetch(suggestPath)
        .then(response => response.json())
        .then(suggestions => {
            var filteredSuggestions = suggestions.filter(function(suggestion) {
                return suggestion.toLowerCase().includes(input.toLowerCase());
            });

            filteredSuggestions.forEach(function(suggestion) {
                var option = document.createElement('option');
                option.value = suggestion;
                datalist.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));
};
// Calls the updateSuggestions function when the user either types in the box or changes the item type.
document.getElementById('inputbox').addEventListener('keyup', updateSuggestions);
document.getElementById('itemType').addEventListener('change', updateSuggestions);
