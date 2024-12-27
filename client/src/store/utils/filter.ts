/**
 * Returns all elements of data that are not in arr
 * @param arr the array to check against
 * @param data the array to filter
 * @returns a new array with all elements of data that are not in arr
 */
export const notInArray = (arr: any[], data: any[]) => {
  const setArr = new Set(arr.map((item) => item._id));
  return data.filter((element) => !setArr.has(element._id));
};

export const resetArray = (arr: any) => {
  return arr.filter(() => false);
};
