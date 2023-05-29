const API_KEY =
  'live_DvnJdN84k9FRjVQJ7l8jidEauONyZVmQE2TyRcJyoewxBgH0kpbHcM0SS4QPcx5Q';

export const fetchBreeds = async () => {
  const url = 'https://api.thecatapi.com/v1/breeds';

  try {
    const response = await fetch(url, {
      headers: {
        'x-api-key': API_KEY,
      },
    });
    const data = await response.json();
    return data.map(breed => ({ id: breed.id, name: breed.name }));
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw error;
  }
};

export const fetchCatByBreed = async breedId => {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  try {
    const response = await fetch(url, {
      headers: {
        'x-api-key': API_KEY,
      },
    });
    const data = await response.json();
    const cat = data[0];
    return {
      imageUrl: cat.url,
      breedName: cat.breeds[0].name,
      description: cat.breeds[0].description,
      temperament: cat.breeds[0].temperament,
    };
  } catch (error) {
    console.error('Error fetching cat by breed:', error);
    throw error;
  }
};
