export const handleTextareaHeight = (ref) => {
  if (ref.current) {
    ref.current.style.height = 'auto';
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }
};

export const isDataTrue = (data) => {
  if (!data.length) return null;

  let isCorrect = true;
  data.forEach((item) => {
    const objKeys = Object.keys(item);
    objKeys.forEach((e) => {
      if (!item[e]) {
        isCorrect = false;
      }
    })
  })

  return isCorrect;
}

export const isTestFull = (data, index) => {
  const keys = Object.keys(data[index]);
  let isFull = true;
  keys.forEach((item) => {
    if (!data[index][item]) {
      isFull = false;
    }
  })

  return isFull;
}