export const ForDatePicker = (date: Date) => {
  // let dateProps = new Date(date);
  // return dateProps.toLocaleDateString();

  const d = new Date(date)
  let month = "" + (d.getMonth() + 1)
  let  day = "" + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const ConvertToEpoch = (date: Date) => {
  // const dateProps = new Date(date);
  // const myDate = new Date(dateProps * 1000);
  // const myEpoch = myDate.getTime() / 1000.0;
  // return myEpoch;
  const myEpoch = date.getTime();
  return myEpoch;
};

export const checkTutup = (dateSetting: Date) => {
  const closeDate = ConvertToEpoch(dateSetting);
  const now = ConvertToEpoch(new Date())

  return now >= closeDate ? true : false
};

export const ToDate = (dateProps: Date, aksi="full") => {
  const date = new Date(dateProps);
    return aksi == "full"
      ? date
          .toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })
          .toString()
      : date
          .toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
          .toString();
}
