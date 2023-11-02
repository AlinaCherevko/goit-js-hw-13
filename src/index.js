import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './api.js';
import { refs } from './refs.js';

new SlimSelect({
  select: 'breed-select',
});

document.addEventListener('DOMContentLoaded', loadedSelectContent);
refs.selectEl.addEventListener('change', fetchPictures);

refs.loader.classList.add('hidden');
refs.errorEl.classList.add('hidden');
refs.divEl.classList.add('hidden');
refs.bodyEl.style.backgroundColor = '#786444';

async function loadedSelectContent() {
  try {
    const data = await fetchBreeds();

    const markup = data.map(
      ({ id, name }) => `<option value=${id}>${name}</option>`
    );
    refs.selectEl.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    refs.errorEl.classList.remove('hidden');
    console.log(error.message);
  }
}
async function fetchPictures(e) {
  refs.loader.classList.remove('hidden');
  refs.selectEl.classList.add('hidden');
  refs.divEl.classList.add('hidden');

  const searchId = e.currentTarget.value;
  // console.log(searchId);
  try {
    const data = await fetchCatByBreed(searchId);

    refs.divEl.innerHTML = '';
    const markupPicture = `<img src=${data[0].url}  width="300px"></img><div><h1 class="title">${data[0].breeds[0].name}</h1><p class="after-title">${data[0].breeds[0].description}</p><p class="description"><b>Temperament:</b>
    ${data[0].breeds[0].temperament}</p></div>`;

    refs.divEl.innerHTML = markupPicture;
  } catch (error) {
    console.log(error.message);
    refs.errorEl.classList.remove('hidden');
  }

  // console.log(data[0]);

  refs.divEl.style.display = 'flex';
  refs.divEl.style.gap = '10px';
  refs.divEl.style.paddingTop = '20px';
  refs.loader.classList.add('hidden');
  refs.selectEl.classList.remove('hidden');
}
