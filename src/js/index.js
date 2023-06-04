// ADDING NECESSARY LIBRARIES
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

// ACCESSING DOM-ELEMENTS
let slimSelector;
const htmlSelector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

// -------------- AUXILIARY FUNCTIONS: ---------------------

// Loader display
const showLoader = () => {
  loader.style.display = 'block';
};

const hideLoader = () => {
  loader.style.display = 'none';
};

// Error display
const showError = () => {
 Notiflix.Report.failure(
   'Oops!',
   'Something went wrong! Please try to reload the page!',
   'Reload',
   () => {
     location.reload();
   }
 );
  clearMarkup();
};

const hideError = () => {
  error.style.display = 'none';
};

// Mark-up cleaner
const clearMarkup = () => {
  catInfo.innerHTML = '';
  slimSelector.setData([]);
};

// TO ADD CAT BREEDS TO THE SELECTOR
const loadCatBreeds = breeds => {
  const options = breeds.map(
    ({ id, name }) => `<option value="${id}">${name}</option>`
  );

  htmlSelector.insertAdjacentHTML('beforeend', options.join(''));

  // Slim Select initialization
  slimSelector = new SlimSelect({
    select: '.breed-select',
    settings: {
      placeholderText: 'Select a cat breed',
    },
  });
};

// TO SHOW SELECTED CAT PROFILE
const showCatInfo = cat => {
  const { imageUrl, breedName, description, temperament } = cat;
  const html = `
    <img src="${imageUrl}" alt="${breedName}" />
    <div class="cat-data">
      <h2>${breedName}</h2>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Temperament:</strong> ${temperament}</p>
    </div>
  `;
  catInfo.innerHTML = html;
};

// BACKEND QUERY №1. "PROVIDE CAT BREEDS"

const initializePage = async () => {
  try {
    showLoader();
    hideError();
    const breeds = await fetchBreeds();
    loadCatBreeds(breeds);
  } catch {
    showError();
  } finally {
    hideLoader();
  }
};

// BACKEND QUERY №2. "PROVIDE INFO ABOUT A CAT"

const handleBreedSelection = async () => {
  const breedId = htmlSelector.value;

  showLoader();
  hideError();

  try {
    const cat = await fetchCatByBreed(breedId);
    showCatInfo(cat);
  } catch {
    showError();
  } finally {
    hideLoader();
  }
};

htmlSelector.addEventListener('change', handleBreedSelection);

initializePage();
