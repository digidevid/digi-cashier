export const toRupiah = (num) => {
  if (num) {
    return `Rp${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;
  } else if (num == 0) {
    return `Rp${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;
  }
};
