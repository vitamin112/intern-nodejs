/**
 * validate csv data
 *
 * @param {Array} raw
 * @return {Array} valid data
 */
export function validateCSVFile(rawData) {
  const validate = data => {
    if (
      !data.email ||
      !data.fullName ||
      data.email == '' ||
      data.fullName == '' ||
      typeof data.email !== 'string' ||
      typeof data.fullName !== 'string'
    ) {
      return false;
    }
    return true;
  };

  return rawData.filter(data => validate(data));
}
