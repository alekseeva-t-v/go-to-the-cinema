import { DOM } from "./modules/dom-element";

const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
const selectChairs = JSON.parse(localStorage.getItem('selectChairs'));

DOM.ticketTitle.textContent = selectedMovie.movieName;
DOM.ticketChairs.textContent = selectChairs.chairs;
DOM.ticketHall.textContent = selectedMovie.hallName.slice(4);
DOM.ticketStart.textContent = selectedMovie.seanceTime;

const stringQR = `Фильм: ${selectedMovie.movieName} Зал: ${selectedMovie.hallName} Места: ${selectChairs.chairs} Сеанс: ${selectedMovie.seanceId} Дата: ${selectedMovie.seanceDay}`;

const qrcode = QRCreator(stringQR, {
  mode: 4,
  eccl: 0,
  version: 8,
  mask: 2,
  image: 'png',
  modsize: 4,
  margin: 0,
});

const content = (qrcode) => {
  return qrcode.error
    ? `недопустимые исходные данные ${qrcode.error}`
    : qrcode.result;
};

DOM.ticketInfoQr.append(content(qrcode));