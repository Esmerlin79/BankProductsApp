import { validateInputs } from '../validateInputs';

describe('validateInputs', () => {
  it('should return false for valid ID', () => {
    expect(validateInputs('ID', 'validId')).toBe(false);
  });

  it('should return true for invalid ID (length < 3)', () => {
    expect(validateInputs('ID', '12')).toBe(true);
  });

  it('should return true for invalid ID (length > 10)', () => {
    expect(validateInputs('ID', 'veryLongInvalidId')).toBe(true);
  });

  it('should return false for valid name', () => {
    expect(validateInputs('name', 'Valid Name')).toBe(false);
  });

  it('should return true for invalid name (length < 5)', () => {
    expect(validateInputs('name', '123')).toBe(true);
  });

  it('should return true for invalid name (length > 100)', () => {
    const longName = 'a'.repeat(101);
    expect(validateInputs('name', longName)).toBe(true);
  });

  it('should return false for valid description', () => {
    expect(validateInputs('description', 'Valid Description')).toBe(false);
  });

  it('should return true for invalid description (length < 10)', () => {
    expect(validateInputs('description', 'ShortDesc')).toBe(true);
  });

  it('should return true for invalid description (length > 200)', () => {
    const longDescription = 'a'.repeat(201);
    expect(validateInputs('description', longDescription)).toBe(true);
  });

  it('should return false for valid logo', () => {
    expect(validateInputs('logo', 'validLogo')).toBe(false);
  });

  it('should return true for invalid logo (empty)', () => {
    expect(validateInputs('logo', '')).toBe(true);
  });

  it('should return false for valid release date', () => {
    const currentDate = new Date();
    const validDate = new Date(currentDate.getTime() + 86400000); 
    expect(validateInputs('releaseDate', validDate.toISOString())).toBe(false);
  });

  it('should return true for invalid release date (in the past)', () => {
    const currentDate = new Date();
    const pastDate = new Date(currentDate.getTime() - 86400000); 
    expect(validateInputs('releaseDate', pastDate.toISOString())).toBe(true);
  });

});
