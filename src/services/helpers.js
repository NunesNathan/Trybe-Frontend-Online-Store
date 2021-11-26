export async function submitReview(MLB, review) {
  let arr = JSON.parse(localStorage.getItem(MLB));
  if (!arr) {
    arr = [];
  }
  if (arr[0] === null) {
    arr[0] = review;
  } else {
    arr.push(review);
  }
  localStorage.setItem(MLB, JSON.stringify(arr));
}

export function getReviews(MLB) {
  return JSON.parse(localStorage.getItem(MLB));
}

// export async function addProduct(arr) {
//   const list = await JSON.parse(localStorage.getItem('product'));
//   localStorage.setItem('product', JSON.stringify([...list, arr]));
// }

export async function addProduct(resultado) {
  // console.log(target);
  // const fetchProductDetails = await fetch(`https://api.mercadolibre.com/items/${target.id}`);
  // const arr = await fetchProductDetails.json();
  const list = JSON.parse(localStorage.getItem('product'));
  // console.log(list.length);
  if (list) {
    localStorage.setItem('product', JSON.stringify([...list, resultado]));
  } else {
    localStorage.setItem('product', JSON.stringify([resultado]));
  }
}
