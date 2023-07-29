import {cloneDeep} from 'lodash';

/*
  * Returns a deep copy of an array of objects passed as a parameter.
  *
  * @param {Array<object>} inputArray - An array to copy.
  * @returns {Array<object>} A deep copy of an array.
  * @throws {Error} Will throw an error if there is an error .
  */
export function deepCopy(inputArray: Array<object>): Array<object> {
  try {
    // simple solution for not complex data, but it doesn't work with functions, symbols, values like Infinity, Nan or null, etc.
    // return JSON.parse(JSON.stringify(inputArray));
    
    // another simple solution but with similar limitations like the first one commented above 
    // return structuredClone(inputArray);
    
    // the most accurate option but based on lodash library, works well with functions, symbols, also with values like Infinity, Nan or null
    return cloneDeep(inputArray); 
  } catch (error) {
    throw new Error(`Error while copying the array:  ${error}`);
  }
}