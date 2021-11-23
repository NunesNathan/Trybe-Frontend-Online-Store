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
