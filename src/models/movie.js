export default class Film {
  constructor(film) {
    this.id = film[`id`];
    this.comments = film[`comments`];
    this.poster = film[`film_info`][`poster`];
    this.ageLimit = film[`film_info`][`age_rating`];
    this.title = film[`film_info`][`title`];
    this.alternativeTitle = film[`film_info`][`alternative_title`];
    this.rating = film[`film_info`][`total_rating`];
    this.director = film[`film_info`][`director`];
    this.writers = film[`film_info`][`writers`];
    this.actors = film[`film_info`][`actors`];
    this.releaseDate = film[`film_info`][`release`][`date`];
    this.country = film[`film_info`][`release`][`release_country`];
    this.duration = film[`film_info`][`runtime`];
    this.genres = film[`film_info`][`genre`];
    this.description = film[`film_info`][`description`];
    this.personalRating = film[`user_details`][`personal_rating`];
    this.isWatchlist = Boolean(film[`user_details`][`watchlist`]);
    this.isWatched = Boolean(film[`user_details`][`already_watched`]);
    this.watchedDate = film[`user_details`][`watching_date`];
    this.isFavorite = Boolean(film[`user_details`][`favorite`]);
  }

  toRAW() {
    return {
      'id': this.id,
      'comments': this.comments,
      'film_info': {
        'title': this.title,
        'alternative_title': this.alternativeTitle,
        'total_rating': this.rating,
        'poster': this.poster,
        'age_rating': this.ageLimit,
        'director': this.director,
        'writers': this.writers,
        'actors': this.actors,
        'release': {
          'date': new Date(this.releaseDate).toISOString(),
          'release_country': this.country,
        },
        'runtime': this.duration,
        'genre': this.genres,
        'description': this.description,
      },
      'user_details': {
        'personal_rating': this.personalRating,
        'watchlist': this.isWatchlist,
        'already_watched': this.isWatched,
        'watching_date': new Date(this.watchedDate).toISOString(),
        'favorite': this.isFavorite,
      }
    };
  }

  static parseFilm(film) {
    return new Film(film);
  }

  static parseFilms(films) {
    return films.map(Film.parseFilm);
  }

  static clone(film) {
    return new Film(film.toRAW());
  }
}
