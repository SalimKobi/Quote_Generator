const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//show new quote
function newQuote() {
  loading();
  //Pick a random Quote from the quote array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //Check if author field is blank and replace it with "Unknown"
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  //Check the quote length to determine the styling
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  complete();
}

//Get Quotes from API
loading();
async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //catch error here
  }
}
//Tweet Quote
function tweetQuote() {
  //   const twitterUrl = `https://facebook.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  const twitterUrl = `https://facebook.com/intent/post?text=${quoteText.textContent} - ${authorText.textContent}`;

  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On load
getQuotes();
// loading();
