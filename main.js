const allSections = document.querySelectorAll('.section');
const cardsAboutEl = document.querySelector('.cards-about');
const cardNumberEl = document.querySelectorAll('.card-number');
const about = document.querySelector('.about');
const chboxEl = document.querySelectorAll('.chbox');
const labelEl = document.querySelectorAll('.label');
const btnTransferEl = document.querySelector('.btn-transfer');
const contactsEl = document.querySelector('.newtransaction-contacts');
const headerEl = document.querySelector('.header');
const slideContainer = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnSlLeft = document.querySelector('.btn-slider__left');
const btnSlRight = document.querySelector('.btn-slider__right');

// Count animation from start to end
const animateValue = (obj, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min(
      (timestamp - startTimestamp) / (duration * 1000),
      1
    );
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};
// Revealing section by intersecting
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('hidden');
  if (entry.target.classList.contains('home')) {
    btn.classList.add('hidden');
  } else {
    btn.classList.remove('hidden');
  }
  // Reveal section ABOUT and animate count in cards
  if (entry.target.classList.contains('about')) {
    cardNumberEl.forEach((card) => {
      if (card.classList.contains('clients')) animateValue(card, 0, 50, 5);
      if (card.classList.contains('projects')) animateValue(card, 0, 140, 5);
      if (card.classList.contains('members')) animateValue(card, 0, 20, 5);
      if (card.classList.contains('awards')) animateValue(card, 0, 30, 5);
    });
  }
  console.log(entry);
  // observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.05,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('hidden');
});

const revealCheck = (el) => {
  console.log(vectorEl);
  return vectorEl.forEach((el) => el.classList.toggle('hidden'));
};

chboxEl.forEach((el) =>
  el.addEventListener('click', function (e) {
    const vectorEl = e.target
      .closest('.chbox-container')
      .querySelector('.vector-check');
    if (!vectorEl) return;
    return vectorEl.classList.toggle('hidden');
  })
);

// Choose active user
let activeUser;
contactsEl.addEventListener('click', function (e) {
  if (activeUser) activeUser.classList.remove('active');
  const el = e.target.closest('.contact-transaction');
  if (!el) return;
  activeUser = el.querySelector('.contact-transaction--name');
  console.log(el);
  activeUser.classList.toggle('active');
});

// Do transfer feature
const makeTransfer = () => {
  if (!activeUser) {
    alert('Choose account where money should be transfered');
    return;
  }
  const sum = document.querySelector('.new-transaction--sum');
  const money = (value, locale, currency) =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
  // Make transaction
  alert(
    `${money(sum.value, navigator.language, 'EUR')} was transfered to ${
      activeUser.textContent
    }`
  );
  // Clear value
  sum.value = '';
  activeUser.classList.remove('active');
  activeUser = '';
};
btnTransferEl.addEventListener('click', makeTransfer);
// Button to top
let btn = document.createElement('button');
btn.innerHTML = 'TO TOP';
document.body.appendChild(btn);
btn.classList.add('fixed', 'hidden');
btn.addEventListener('click', function () {
  headerEl.scrollIntoView({ behavior: 'smooth' });
});
// Slider
const slider = () => {
  let curSlide = 0;
  const maxSlide = slides.length;
  // Function
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  const nextSlide = () => {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
  };
  const previusSlide = () => {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };
  btnSlLeft.addEventListener('click', previusSlide);
  btnSlRight.addEventListener('click', nextSlide);
  const init = () => {
    goToSlide(0);
  };
  init();
};
slider();
// Change plans monthly/yearly
const changePlan = () => {
  const btnM = document.querySelector('.btn__monthly');
  const btnY = document.querySelector('.btn__yearly');
  const [price1, price2] = document.querySelectorAll('.pricing-price');
  const [pack1, pack2] = document.querySelectorAll('.pricing-pack');
  console.log(price1.innerHTML, pack1.innerHTML);
  // Function to toggle monthly/yearly
  const togglePlan = () => {
    if (btnM.classList.contains('disabled')) {
      price1.innerHTML = '$290';
      price2.innerHTML = '$390';
      // if ((price1.innerHTML = '$290') && (price2.innerHTML = '$390')) return;
      // price1.innerHTML = `$${parseInt(price1.innerHTML.slice(1)) * 10}`;
      // price2.innerHTML = `$${parseFloat(price2.innerHTML.slice(1) * 10)}`;
      pack1.innerHTML = 'yearly pack';
      pack2.innerHTML = 'yearly pack';
    } else {
      price1.innerHTML = '$29';
      price2.innerHTML = `$39`;
      pack1.innerHTML = 'monthly pack';
      pack2.innerHTML = 'monthly pack';
    }
  };
  const toggleMonthly = () => {
    btnM.classList.remove('disabled');
    btnY.classList.add('disabled');
    togglePlan();
  };
  const toggleYearly = () => {
    btnM.classList.add('disabled');
    btnY.classList.remove('disabled');
    togglePlan();
  };

  btnM.addEventListener('click', toggleMonthly);
  btnY.addEventListener('click', toggleYearly);
};
changePlan();
// Add subscribe function
