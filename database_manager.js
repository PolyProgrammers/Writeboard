class DatabaseManager {
  getAll() {
    var test = [
      {
        "value": "A"
      },
      {
        "value": "B"
      }
    ];
    return test;
  }

  update(record) {
    console.log('record updated!');
  }
}

module.exports = new DatabaseManager();