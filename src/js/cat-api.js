const API_KEY = 'live_DvnJdN84k9FRjVQJ7l8jidEauONyZVmQE2TyRcJyoewxBgH0kpbHcM0SS4QPcx5Q';

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  return fetch(url, {
    headers: {
      'x-api-key': API_KEY
    }
  })
    .then(response => response.json())
    .then(data => data.map(breed => ({ id: breed.id, name: breed.name })))
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(url, {
    headers: {
      'x-api-key': API_KEY
    }
  })
    .then(response => response.json())
    .then(data => {
      const cat = data[0];
      return {
        imageUrl: cat.url,
        breedName: cat.breeds[0].name,
        description: cat.breeds[0].description,
        temperament: cat.breeds[0].temperament
      };
    })
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
}
