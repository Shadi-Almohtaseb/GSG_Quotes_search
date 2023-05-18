const searchInput = document.getElementById("input_search");

searchInput.addEventListener("input", (e) => {
  displayQuotes();
});

const fetchQuotes = async () => {
  try {
    const response = await fetch("https://dummyjson.com/quotes");
    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }
    data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const displayQuotes = async () => {
  const quotes_container = document.getElementById("quotes_container");
  let query = searchInput.value;
  const payload = await fetchQuotes();
  let displayData = payload.quotes
    .filter((data) => {
      if (query === "") {
        return data;
      } else if (data.quote.toLowerCase().includes(query.toLowerCase())) {
        return data;
      }
    })
    .map((item) => {
      return `
        <div class="quote">
        <div> <span>Author: <span/> ${item.author}</div>
        <div> <span>Quote: <span/>  ${item.quote}</div>
        </div>
        `;
    })
    .join("");

  quotes_container.innerHTML = displayData;
};
displayQuotes();
