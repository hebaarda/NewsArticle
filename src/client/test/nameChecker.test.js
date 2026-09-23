const checkUrl = require('..js/nameChecker/checkUrl'); // Adjust the path as needed

describe('checkUrl Function Tests', () => {
    test('should return true for a valid URL', () => {
        expect(checkUrl('https://www.example.com')).toBe(true);
    });

    test('should return false for an invalid URL string', () => {
        expect(checkUrl('invalid-url')).toBe(false);
    });

    test('should return false for an email address', () => {
        expect(checkUrl('mailto:test@example.com')).toBe(false);
    });

    test('should return true for an FTP URL', () => {
        expect(checkUrl('ftp://ftp.example.com')).toBe(true);
    });

    test('should return false for an empty string', () => {
        expect(checkUrl('')).toBe(false);
    });

    test('should return true for a URL with query parameters', () => {
        expect(checkUrl('https://www.example.com/search?q=test')).toBe(true);
    });
});
