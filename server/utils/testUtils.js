const testValidation = (test) => {
    const arrKeys = ["question", "answer", "a", "b", "c", "d"];
  test.forEach((item) => {
    let isFull = true;

    Object.keys(item).forEach((e) => {
      if (!arrKeys.includes(e)) return isFull = false;
      // if (!item[e]) return isFull = false;
    })

    return isFull;
  })
}

export {testValidation};