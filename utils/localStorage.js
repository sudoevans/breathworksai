/**
 * Save data to localStorage.
 *
 * @param key - The key under which the data is stored.
 * @param value - The value to be stored. Can be a string, object, or array.
 */
export const saveToLocalStorage = (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }
  
  /**
   * Retrieve data from localStorage.
   *
   * @param key - The key under which the data is stored.
   * @returns The retrieved value or null if not found.
   */
  export const loadFromLocalStorage = (key) => {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue);
    } catch (error) {
      console.error('Error loading from localStorage', error);
      return null;
    }
  }
  
  /**
   * Remove data from localStorage.
   *
   * @param key - The key under which the data is stored.
   */
  export const removeFromLocalStorage = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage', error);
    }
  }