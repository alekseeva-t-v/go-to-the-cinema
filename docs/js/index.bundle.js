!function(){"use strict";function e(e,a,n){const t=document.createElement(e);return t.className=a,n.append(t),t}function a(e){const a=e.getDate(),n=e.toLocaleString("ru-Ru",{weekday:"short"});let t=!1;return"вс"!==n&&"сб"!==n||(t=!0),`\n    <span class="page-nav__day-week ${t?"page-nav__day_weekend":""}">${n}</span>\n    <span class="page-nav__day-number ${t?"page-nav__day_weekend":""}">${a}</span>\n  `}function n(e,a,n,t){e.dataset.year=a,e.dataset.month=n,e.dataset.day=t}const t={pageNav:document.querySelector(".page-nav"),main:document.querySelector(".main")};console.log(t.pageNav);const s=new Date,i=s.getFullYear(),o=s.getMonth(),c=s.getDate();let l=s.getFullYear(),_=s.getMonth(),d=s.getDate();const r=e("a","page-nav__day page-nav__day_today page-nav__day_chosen",t.pageNav);r.href="#",r.innerHTML=a(new Date),n(r,i,o,c);for(let s=1;s<=6;s++){const l=e("a","page-nav__day",t.pageNav);l.href="#",l.innerHTML=a(new Date(i,o,c+s)),n(l,i,o,c+s)}const m=Array.from(document.querySelectorAll(".page-nav__day"));m.forEach((e=>{e.addEventListener("click",(a=>{a.preventDefault(),m.forEach((e=>{e.classList.remove("page-nav__day_chosen")})),e.classList.add("page-nav__day_chosen"),l=e.dataset.year,_=e.dataset.month,d=e.dataset.day,document.querySelectorAll(".movie-seances__time-button").forEach((e=>{const a=e.querySelector(".movie-seances__time").textContent.split(":"),n=new Date(i,o,c,a[0],a[1]);e.disabled=s.getTime()>n.getTime()&&Number(d)===c}))}))})),async function(){const a=await fetch("https://jscp-diplom.netoserver.ru/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"event=update"}),n=await a.json(),l=n.films.result,_=n.seances.result,d=n.halls.result;l.forEach((a=>{const n=e("section","movie",t.main);n.dataset.id=a.film_id,e("div","movie__info",n).innerHTML=`\n        <div class="movie__poster">\n          <img\n            class="movie__poster-image"\n            alt="${a.film_name} постер"\n            src="${a.film_poster}"\n          />\n        </div>\n        <div class="movie__description">\n          <h2 class="movie__title">\n            ${a.film_name}\n          </h2>\n          <p class="movie__synopsis">\n            ${a.film_description}\n          </p>\n          <p class="movie__data">\n            <span class="movie__data-duration">${a.film_duration} минуты</span>\n            <span class="movie__data-origin">${a.film_origin}</span>\n          </p>\n          \n        </div>\n      `;const l=_.filter((e=>e.seance_filmid===a.film_id));d.forEach((a=>{if("1"===a.hall_open){const t=l.filter((e=>e.seance_hallid===a.hall_id));if(t.length>0){const l=e("div","movie-seances__hall",n);l.innerHTML=`<h3 class="movie-seances__hall-title" data-id=${a.hall_id}>Зал ${a.hall_name.slice(3)}</h3>`;const _=e("ul","movie-seances__list",l);t.forEach((a=>{const n=a.seance_time.split(":"),t=new Date(i,o,c,n[0],n[1]),l=e("li","movie-seances__time-block",_),d=e("button","movie-seances__time-button",l);d.disabled=s.getTime()>t.getTime(),d.innerHTML=`<a class="movie-seances__time" href="hall.html" data-seance-start=${a.seance_start} data-seance-id=${a.seance_id} disabled>${a.seance_time}</a>`}))}}}))}))}()}();