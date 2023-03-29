function getDate() {
  const date = document.querySelector(".date");

  const newDate = new Date();
  const years = newDate.getFullYear();
  const months = String(newDate.getMonth()).padStart(2, "0");
  const days = String(newDate.getDate()).padStart(2, "0");
  const weeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const day = newDate.getDay();
  const today = weeks[day];

  date.innerText = `${years}.${months}.${days} ${today}`;
}
getDate();
setInterval(getDate, 1000);

function getTime() {
  const time = document.querySelector(".time");

  const newDate = new Date();
  let hours = String(newDate.getHours()).padStart(2, "0");
  const minutes = String(newDate.getMinutes()).padStart(2, "0");
  const seconds = String(newDate.getSeconds()).padStart(2, "0");

  if (Number(hours) == 0) {
    time.innerText = `12:${minutes}:${seconds} AM`;
  } else if (Number(hours) < 12) {
    time.innerText = `${hours}:${minutes}:${seconds} AM`;
  } else if (Number(hours) == 12) {
    time.innerText = `${hours}:${minutes}:${seconds} PM`;
  } else {
    hours = String(hours - 12).padStart(2, "0");
    time.innerText = `${hours}:${minutes}:${seconds} PM`;
  }
}

getTime();
setInterval(getTime, 1000);

const QUOTES = "quotes";

function getQuotes() {
  const quotesMsg = document.querySelector(".quotesMsg");
  let savedQuotes = localStorage.getItem(QUOTES);

  if (!savedQuotes) {
    localStorage.setItem(
      QUOTES,
      JSON.stringify([
        "Oasis - Stand By Me",
        "The1975 - Robbers",
        "Arctic Monkeys - 505",
        "Avicii - The Nights",
        "Sam Fender - That Sound",
        "Almost Monday - Parking Lot View",
      ])
    );
    savedQuotes = localStorage.getItem(QUOTES);
  }

  let quotesArray = JSON.parse(savedQuotes);
  quotesMsg.innerText =
    quotesArray[Math.floor(Math.random() * quotesArray.length)];
}
getQuotes();

function onClickAdd() {
  const newQuotes = document.querySelector(".newQuotes");
  const quotesMsg = document.querySelector(".quotesMsg");

  if (newQuotes.style.display == "none") {
    newQuotes.style.display = "inline-block";
    quotesMsg.style.opacity = "50%";
  } else if ((newQuotes.style.display = "inline-block")) {
    newQuotes.style.display = "none";
  }
}

function onClickRegist() {
  const newQuotesInput = document.querySelector(".newQuotesInput");
  let quotesMsg = document.querySelector(".quotesMsg");
  const newQuotes = document.querySelector(".newQuotes");

  if (!newQuotesInput.value) return;

  let savedQuotes = localStorage.getItem(QUOTES);
  let quotesArray = JSON.parse(savedQuotes);
  quotesArray.push(newQuotesInput.value);
  localStorage.setItem(QUOTES, JSON.stringify(quotesArray));

  quotesMsg.innerHTML = `<span style="color: aquamarine">${newQuotesInput.value}</span>`;

  newQuotes.style.display = "none";
  newQuotesInput.value = "";
  quotesMsg.style.opacity = "100%";
}

function enterkeyRegist() {
  if (window.event.keyCode == 13) {
    onClickRegist();
  }
}

let isLoading = false;

async function onClickSearch() {
  const searchInput = document.querySelector(".searchInput");
  const searchResult = document.querySelector(".searchResult");

  if (!searchInput.value) return;
  if (isLoading) return;

  isLoading = true;
  const question = searchInput.value;
  searchInput.value = "검색 중입니다... 잠시만 기다려주세요.";

  console.log("동작중");

  const response = await axios.post(
    "https://holy-fire-2749.fly.dev/chat",
    { question },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer BLOCKCHAINSCHOOL3",
      },
    }
  );

  if (response.status === 200) {
    searchResult.style.display = "inline-block";
    searchResult.innerText = response.data.choices[0].message.content;
  }

  searchInput.value = "";
  isLoading = false;
}

function enterkey() {
  if (window.event.keyCode == 13) {
    onClickSearch();
  }
}

function onClickResult() {
  const searchRe = document.querySelector(".searchRe");

  searchRe.style.display = "none";
}

function onClickToggle(value) {
  const nft = document.querySelector(".nft");
  const nftView = document.querySelector(".nftView");

  if (value) {
    nft.style.display = "inline-block";
    nftView.style.display = "none";
  } else {
    nft.style.display = "none";
    nftView.style.display = "inline-block";
    nftView.style.animation = "none";
  }
}
