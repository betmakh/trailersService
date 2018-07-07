const URL = '/imdb?';

export const searchFilms = query => {
    return window.fetch(`${URL}query=${query}`).then(response => response.json());
};

export const getFilm = id => {
    return window.fetch(`${URL}id=${id}`).then(response => response.json());
};