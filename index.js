// Fet Quote From API
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authortext = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader")


function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (! loader.hidden) {
        quoteContainer.hidden = false
        loader.hidden = true;
    }
}

// Get the quote data from api
async function getQuote() {
    showLoadingSpinner();
    // We need to use a proxy server to make our API call in order to avoid CSOR
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // if author in unknown print Unknown
        if (data.quoteAuthor === '') {
            authortext.innertext = 'Unknown';
        } else {
            authortext.innerText = data.quoteAuthor;
        }
        // reduce the size of fonts if quote is greater than 50
        if (data.quoteText.length > 50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        } quoteText.innerText = data.quoteText;
        // stop loader and show quote if
        removeLoadingSpinner();
    } catch (error) {
        getQuote();
    }
}
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authortext.innerText;
    const twitterurl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterurl, '_blank');
}

// Event Listners

newQuoteButton.addEventListener("click", getQuote);
twitterButton.addEventListener("click", tweetQuote);
// On Load
getQuote();