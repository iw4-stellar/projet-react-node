class Chat {
  constructor(io) {
    this.io = io;
    this.id = null;
    this.participants = [];
    this.messages = [];
  }
}
