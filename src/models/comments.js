export default class Comment {
  constructor(data) {
    this.id = data[`id`] || ``;
    this.img = data[`emotion`];
    this.commentAuthor = data[`author`] || ``;
    this.commentText = data[`comment`];
    this.commentDay = data[`date`] || null;
  }

  /* toRAW() {
      return {
        'id': this.id,
        'description': this.description,
        'due_date': this.dueDate ? this.dueDate.toISOString() : null,
        'tags': Array.from(this.tags),
        'repeating_days': this.repeatingDays,
        'color': this.color,
        'is_favorite': this.isFavorite,
        'is_archived': this.isArchive,
      };
    }*/

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }
}

