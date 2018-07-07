const URL = '/imdb?';

export const searchFilms = query => {
    return window.fetch(`${URL}query=${query}`).then(response => (response.ok ? response.json() : null));
};

export const getFilm = id => {
    return window.fetch(`${URL}id=${id}`).then(response => response.json());
};
