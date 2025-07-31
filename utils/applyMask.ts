export const applyMask = (value: string, mask: string): string => {
  let masked = '';
  let i = 0;
  const onlyNumbers = value.replace(/\D/g, '');

  for (const m of mask) {
    if (m === '9') {
      if (onlyNumbers[i]) {
        masked += onlyNumbers[i++];
      }
    } else {
      if (onlyNumbers[i] || i < onlyNumbers.length) {
        masked += m;
      }
    }
  }

  return masked;
};
