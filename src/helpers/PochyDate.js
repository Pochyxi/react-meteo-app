export const takeOnlyDate = (string) => {
  let dateOf = new Date(string);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let dateCorrect = dateOf.toLocaleDateString(undefined, options);

  let dateArr = dateCorrect.split(" ");

  let dateObj = {
    showDate: [],

    getDate: function () {
      return this.showDate.join(" ");
    },
    getHour: function () {
      let arrString = string.split(" ");
      return arrString[1];
    },
  };

  for (let i = 0; i < dateArr.length; i++) {
    if (i < 2) {
      dateObj.showDate.push(dateArr[i]);
    }
  }
  return dateObj;
};

export const mixerDays = (array) => {
  let counter = 0;

  let obj = {
    arrOfInfo: [],
    functionToGet: function (object, key) {
      return object[key];
    },
    getDay1: function () {
      return this.functionToGet(obj, this.arrOfInfo[0]);
    },
    getDay2: function () {
      return this.functionToGet(obj, this.arrOfInfo[1]);
    },
    getDay3: function () {
      return this.functionToGet(obj, this.arrOfInfo[2]);
    },
    getDay4: function () {
      return this.functionToGet(obj, this.arrOfInfo[3]);
    },
    getDay5: function () {
      return this.functionToGet(obj, this.arrOfInfo[4]);
    },
    getLastDay: function () {
      return this.functionToGet(obj, "aLast");
    },
  };

  const setObj = (value, key) => {
    obj[value] = key;
  };

  for (let i = 0; i < array.length - 1; i++) {
    if (
      takeOnlyDate(array[i].dt_txt).getDate() !==
      takeOnlyDate(array[i + 1].dt_txt).getDate()
    ) {
      obj.arrOfInfo.push("a" + i);

      for (let a = 0; a < i; a++) {
        setObj("a" + i, array.slice(counter, i + 1));
      }
      counter = i + 1;
    }
  }
  setObj("aLast", array.slice(counter, array.length));

  return obj;
};
