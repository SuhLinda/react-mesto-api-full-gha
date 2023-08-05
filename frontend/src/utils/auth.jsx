export default class Auth {
  constructor(url) {
    this._url = url;
  }

  _checkTheAnswer(response){
    if(response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка:${response.status}`);
  }

  registration(email, password) {
    const urlId = `${this._url}/signup`;

    return fetch(urlId,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password})
    })
      .then(this._checkTheAnswer);
  }

  authorization (email, password, name, about, avatar, _id) {
    const urlId = `${this._url}/signin`;

    return fetch(urlId,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
        about,
        avatar,
        _id
      }),
    })
      .then(this._checkTheAnswer);
  }

  checkToken(token) {
    const urlId = `${this._url}/users/me`;

    return fetch(urlId,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
    })
      .then(this._checkTheAnswer);
  }
}

export const auth = new Auth('http://localhost:3000');
