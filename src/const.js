const prompts = [
  'List the things that make you feel powerful.',
  'What is something that made you laugh today?',
  'List the movies that you want to watch.',
  'List the things that make you feel peaceful.',
  'List your greatest comforts.',
  'What is something that brightens your day?',
  'List three things you accomplished today.',
  'What is something you look forward to every day?',
  'What is a game that you like to play?',
  'What is your Sunday ritual?',
  'List the most memorable moments of this month so far.',
  'List some things you want to do outdoors.',
  'If you could live anywhere you wanted, where would you live?',
  'List what you would spend a million dollars on, just for you.',
  'When do you feel most energized?',
  'List the things that make you feel excited.',
  'List your favorite snacks or treats.',
  'What has you busy this week?',
  'List the people you admire.',
  'List the happiest moments of your year so far.',
  'What hobby would you like to pick up?',
  'List the ways you love to have fun.',
  'Describe something you learned today',
  'List something fun you did or will do today.',
  'What is your dream job?',
  'List the things that inspire you.',
  'List something you did today that you are proud of.',
  'Find a quote that you like and write it down here.',
  'List something you should ignore.',
  'Talk about something you are excited about next month.',
  'List three traits you would like others to see in you.',
];
const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Regex: [a-zA-Z0-9]
const idLength = 30;

module.exports = {
  prompts, charset, idLength
}