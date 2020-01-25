export default class Comment {
  constructor(comment) {
    this.id = comment[`id`] || ``;
    this.img = comment[`emotion`];
    this.commentAuthor = comment[`author`] || ``;
    this.commentText = comment[`comment`];
    this.commentDay = comment[`date`] || null;
  }

  toRAW() {
    return {
      'comment': this.commentText,
      'date': new Date(this.commentDay).toISOString(),
      'emotion': this.img
    };
  }

  static parseComment(comment) {
    return new Comment(comment);
  }

  static parseComments(comments) {
    return comments.map(Comment.parseComment);
  }

  static cloneComment(comment) {
    return new Comment(comment.toRAW());
  }
}
