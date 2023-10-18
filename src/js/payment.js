import { DOM } from './modules/dom-element';

let selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
let selectChairs = JSON.parse(localStorage.getItem('selectChairs'));

DOM.ticketTitle.textContent = selectedMovie.movieName;
DOM.ticketChairs.textContent = selectChairs.chairs;
DOM.ticketHall.textContent = selectedMovie.hallName.slice(4);
DOM.ticketStart.textContent = selectedMovie.seanceTime;
DOM.ticketCost.textContent = selectChairs.price;

DOM.acceptinButton.addEventListener('click', (event) => {
  event.preventDefault();

  const params = `event=sale_add&timestamp=${selectedMovie.seanceStart}&hallId=${selectedMovie.hallId}&seanceId=${selectedMovie.seanceId}&hallConfiguration=${selectedMovie.hallConfig}`;

  async function fetchHalls() {
    await fetch('https://jscp-diplom.netoserver.ru/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });
  }

  fetchHalls();

  location.href = 'ticket.html';
});
