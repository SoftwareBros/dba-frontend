
export const query = (type, body, endpoint, callback) => {
  let data = {
    method: type,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  }

  const that = this;
  fetch(`http://10.0.2.2:1408/${endpoint}`, data).then(function (response: any) {
    return response.json();
  })
    .then(function (res: any) {
      callback(res, that);
    }).catch((e) => {
      console.log(e);
    });
}