import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

const loadBreedOptions = breeds => {
  const options = breeds.map(breed => {
    return { value: breed.id, label: breed.name };
  });

  const choices = new Choices(breedSelect, {
    placeholder: true,
    placeholderValue: 'Select Breed',
    choices: options,
  });
};

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

const showLoader = () => {
  loader.style.display = 'block';
};

const hideLoader = () => {
  loader.style.display = 'none';
};

const showError = () => {
  Notiflix.Report.failure(
    'Oops!',
    'Something went wrong! Try reloading the page!'
  );
};

const hideError = () => {
  error.style.display = 'none';
};

const handleBreedSelection = async () => {
  const breedId = breedSelect.value;
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

const initializePage = async () => {
  try {
    showLoader();
    hideError();
    const breeds = await fetchBreeds();
    loadBreedOptions(breeds);
  } catch {
    showError();
  } finally {
    hideLoader();
  }
};

breedSelect.addEventListener('change', handleBreedSelection);

initializePage();
