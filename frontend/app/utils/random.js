const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function getRandomId() {
  return Array.from({ length: 20 }).reduce(
    (acc) => acc + CHARS[~~(Math.random() * CHARS.length)],
    ''
  );
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
