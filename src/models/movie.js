export default class Film {
  constructor(data) {
    this.id = data[`id`];
    this.comments = data[`comments`];
    this.poster = data[`film_info`][`poster`];
    this.ageLimit = data[`film_info`][`age_rating`];
    this.title = data[`film_info`][`title`];
    this.alternativeTitle = data[`film_info`][`alternative_title`];
    this.rating = data[`film_info`][`total_rating`];
    this.director = data[`film_info`][`director`];
    this.writers = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];
    this.releaseDate = data[`film_info`][`release`][`date`];
    this.country = data[`film_info`][`release`][`release_country`];
    this.duration = data[`film_info`][`runtime`];
    this.genres = data[`film_info`][`genre`];
    this.description = data[`film_info`][`description`];
    this.personalRating = data[`user_details`][`personal_rating`];
    this.isWatchlist = Boolean(data[`user_details`][`watchlist`]);
    this.isWatched = Boolean(data[`user_details`][`already_watched`]);
    this.watchedDate = data[`user_details`][`watching_date`];
    this.isFavorite = Boolean(data[`user_details`][`favorite`]);
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

  static parseFilm(data) {
    return new Film(data);
  }

  static parseFilms(data) {
    return data.map(Film.parseFilm);
  }

  static clone(data) {
    return new Film(data.toRAW());
  }
}
