import fetchCountries from './js/fetchCountries';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import countryCardTemplate from './templates/country-card.hbs';
import countriesListTemplate from './templates/country-list.hbs';
import {
  noticeError,
  noticeIncorrect,
  noticeProgress,
  noticeSuccess,
  setDefaultsDelay,
} from './js/notification';

const refs = {
  inputCountry: document.querySelector('#search-country'),
  countryContainer: document.querySelector('.countries'),
};

const debounce = require('lodash.debounce');

refs.inputCountry.addEventListener('input', debounce(searchCountry, 500));

function searchCountry(e) {
  refs.countryContainer.innerHTML = '';
  fetchCountries(e.target.value)
    .then(countries => {
      if (countries.status === 404) {
        noticeIncorrect();
        return;
      }
      markupCountryCard(countries);
    })
    .catch(() => {
      refs.countryContainer.innerHTML = '';
      noticeIncorrect();
    });
}
function markupCountryCard(countries) {
  if (countries.length > 10) {
    noticeError();
    return;
  }
  if (countries.length >= 2 && countries.length <= 10) {
    markupCountriesList(countries);
    noticeProgress();
    return;
  }
  renderCountryCard(countries);
  noticeSuccess();
}
function renderCountryCard(countries) {
  const countryCardMarkUp = countryCardTemplate(countries);
  refs.countryContainer.insertAdjacentHTML('beforeend', countryCardMarkUp);
}
function markupCountriesList(countries) {
  const countriesList = countriesListTemplate(countries);
  refs.countryContainer.insertAdjacentHTML('beforeend', countriesList);
}
