const URL = '/imdb?';

export const searchFilms = (query, page) => {
    return window.fetch(`${URL}query=${query}&page=${page}`).then(response => (response.ok ? response.json() : null));
};

export const getFilm = id => {
    return window.fetch(`${URL}id=${id}`).then(response => response.json());
};
