export default class Comment {
  constructor(data) {
    this.id = data[`id`] || ``;
    this.img = data[`emotion`];
    this.commentAuthor = data[`author`] || ``;
    this.commentText = data[`comment`];
    this.commentDay = data[`date`] || null;
  }

  toRAW() {
    return {
      'comment': this.commentText,
      'date': new Date(this.commentDay).toISOString(),
      'emotion': this.img
    };
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }

  static cloneComment(data) {
    return new Comment(data.toRAW());
  }
}

