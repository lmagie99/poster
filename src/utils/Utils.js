export const randomDate = (date1, date2) => {
  function randomValueBetween(min, max) {
    return Math.random() * (max - min) + min;
  }
  var date1 = date1 || "01-01-1970";
  var date2 = date2 || new Date().toLocaleDateString();
  date1 = new Date(date1).getTime();
  date2 = new Date(date2).getTime();
  if (date1 > date2) {
    return new Date(randomValueBetween(date2, date1)).toLocaleDateString();
  } else {
    return new Date(randomValueBetween(date1, date2)).toLocaleDateString();
  }
};

export const rndString = (x) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

  const lenString = x;
  let randomstring = "";

  //loop to select a new character in each iteration
  for (let i = 0; i < lenString; i++) {
    const rnum = Math.floor(Math.random() * characters.length);
    randomstring += characters.substring(rnum, rnum + 1);
  }

  return randomstring;
};

export const rndNumber = (x) => {
  const characters = "0123456789";

  const lenString = x;
  let randomnumberstring = "";

  //loop to select a new character in each iteration
  for (let i = 0; i < lenString; i++) {
    const rnum = Math.floor(Math.random() * characters.length);
    randomnumberstring += characters.substring(rnum, rnum + 1);
  }

  return randomnumberstring;
};
