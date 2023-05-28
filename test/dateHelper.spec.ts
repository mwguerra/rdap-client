import { expect } from 'chai';
import { DateHelper } from '../src/helpers/DateHelper';

describe('DateHelper', () => {
  let dateHelper: DateHelper;

  beforeEach(() => {
    dateHelper = new DateHelper();
  });

  describe('getDateFromString', () => {
    it('should return a valid date when date string is in DD-MM-YYYY format', () => {
      const dateStr = '27-05-2023';
      const date = dateHelper.getDateFromString(dateStr);
      expect(date).to.be.an.instanceof(Date);
      if (date) {
        expect(date.getUTCDate()).to.equal(27);
        expect(date.getUTCMonth() + 1).to.equal(5); // getUTCMonth is zero-indexed
        expect(date.getUTCFullYear()).to.equal(2023);
      }
    });

    it('should return a valid date when date string is in YYYY-MM-DD format', () => {
      const dateStr = '2023-05-27';
      const date = dateHelper.getDateFromString(dateStr);
      expect(date).to.be.an.instanceof(Date);
      if (date) {
        expect(date.getUTCDate()).to.equal(27);
        expect(date.getUTCMonth() + 1).to.equal(5); // getUTCMonth is zero-indexed
        expect(date.getUTCFullYear()).to.equal(2023);
      }
    });

    it('should return a valid date when date string is in YYYYMMDD format', () => {
      const dateStr = '20230527';
      const date = dateHelper.getDateFromString(dateStr);
      expect(date).to.be.an.instanceof(Date);
      if (date) {
        expect(date.getUTCDate()).to.equal(27);
        expect(date.getUTCMonth() + 1).to.equal(5); // getUTCMonth is zero-indexed
        expect(date.getUTCFullYear()).to.equal(2023);
      }
    });

    it('should return null when date string is in an invalid format', () => {
      const dateStr = 'invalid-date-string';
      const date = dateHelper.getDateFromString(dateStr);
      expect(date).to.equal(null);
    });
  });

  describe('isValidDate', () => {
    it('should return true when date string is valid', () => {
      const dateStr = '2023-05-27';
      const isValid = dateHelper.isValidDate(dateStr);
      expect(isValid).to.be.true;
    });

    it('should return false when date string is invalid', () => {
      const dateStr = 'invalid-date-string';
      const isValid = dateHelper.isValidDate(dateStr);
      expect(isValid).to.be.false;
    });

    it('should return false when date string is null', () => {
      const isValid = dateHelper.isValidDate(null);
      expect(isValid).to.be.false;
    });
  });
});
