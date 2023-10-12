import { DOM } from './modules/dom-element';

document.addEventListener('DOMContentLoaded', () => {
  localStorage.removeItem('selectChairs');
});

const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
const selectChairs = { chairs: [], price: 0 };

DOM.buyingSeanceTitle.textContent = selectedMovie.movieName;
DOM.buyingSeanceStart.textContent = `Начало сеанса: ${selectedMovie.seanceTime}`;
DOM.buyingSeanceHall.textContent = selectedMovie.hallName;
DOM.priceStandart.textContent = selectedMovie.priceStandart;
DOM.priceVip.textContent = selectedMovie.priceVip;

function updateLocal() {
  localStorage.setItem('selectChairs', JSON.stringify(selectChairs));
  localStorage.setItem('selectedMovie', JSON.stringify(selectedMovie));
}

const params = `event=get_hallConfig&timestamp=${selectedMovie.seanceStart}&hallId=${selectedMovie.hallId}&seanceId=${selectedMovie.seanceId}`;

async function fetchHalls() {
  const response = await fetch('https://jscp-diplom.netoserver.ru/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  const data = await response.json();

  if (!data.result) {
    DOM.confStepWrapper.innerHTML = selectedMovie.hallConfig;
  } else {
    confStepWrapper.innerHTML = data.result;
  }

  const confStepChairList = Array.from(
    document.querySelectorAll('.conf-step__chair')
  );
  const confStepRowList = Array.from(
    document.querySelectorAll('.conf-step__row')
  );

  confStepRowList.forEach((row, index) => {
    row.dataset.number = index + 1;
    const chairsInRow = Array.from(row.querySelectorAll('.conf-step__chair'));
    chairsInRow
      .filter((chair) => {
        return !chair.classList.contains('conf-step__chair_disabled');
      })
      .forEach((chair, index) => {
        chair.dataset.number = index + 1;
      });
  });

  confStepChairList.forEach((chair) => {
    chair.addEventListener('click', () => {
      chair.classList.toggle('conf-step__chair_selected');
      const selectChair = chair.dataset.number;
      const selectRow = chair.closest('.conf-step__row').dataset.number;
      const priceSelectChair = chair.classList.contains(
        'conf-step__chair_standart'
      )
        ? Number(selectedMovie.priceStandart)
        : Number(selectedMovie.priceVip);

      if (chair.classList.contains('conf-step__chair_selected')) {
        selectChairs.price = selectChairs.price + priceSelectChair;
        selectChairs.chairs.push(`${selectRow}/${selectChair}`);
        DOM.acceptinButton.disabled = false;
        updateLocal();
      } else {
        const index = selectChairs.chairs.indexOf(
          `${selectRow}/${selectChair}`
        );
        selectChairs.chairs.splice(index, 1);
        selectChairs.price = selectChairs.price - priceSelectChair;
        if (selectChairs.chairs.length === 0) {
          DOM.acceptinButton.disabled = true;
        }
        updateLocal();
      }
    });
  });

  DOM.acceptinButton.addEventListener('click', () => {
    // const confStepChairSelectedList = document.querySelectorAll(
    //   '.conf-step__chair_selected'
    // );
    // confStepChairSelectedList.forEach((chair) => {
    //   chair.classList.remove('conf-step__chair_selected');
    //   chair.classList.add('conf-step__chair_taken');
    // });

    selectedMovie.hallConfig = DOM.confStepWrapper.innerHTML;
    updateLocal();
  });
}

fetchHalls();
