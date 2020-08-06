console.log('sdd')

function oneTapLogin(response) {
  console.log(response);
  // fetch("/api/one-tap-authentication", {
  //   method: "POST",
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(response)
  // })
  // .then(response => response.json())
  // .then((data) => {
  //   console.log(data);
  // })
  fetch("http://localhost:8000/one-tap-login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(response)
  })
  .then(response => response.json())
  .then((data) => {
    console.log(data);
  })
}