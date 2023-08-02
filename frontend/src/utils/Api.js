class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  //проверка на ошибки
  _checkTheAnswer(response){
    if(response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка:${response.status}`)
  }

  //запрос к серверу о данных пользователя
  getUserData() {
    const urlId = `${this._url}/users/me`;

    return fetch(urlId,{
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkTheAnswer);
  }

  //подгрузим наши данные о пользователе на сервер
  setUserData(data) {
    const urlId = `${this._url}/users/me`;

    return fetch(urlId, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._checkTheAnswer);
  }

  //смена аватара пользователя
  setUserAvatar(avatar) {
    const urlId = `${this._url}/users/me/avatar`;

    return fetch(urlId, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar)
    })
      .then(this._checkTheAnswer);
  }

  //запрос к серверу данных карточек
  getInitialCards() {
    const urlId = `${this._url}/cards`;

    return fetch(urlId, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkTheAnswer);
  }

  //подгрузим наши карточки на сервер
  addNewCard(data) {
    const urlId = `${this._url}/cards`;

    return fetch(urlId, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkTheAnswer);
  }

  //удалить карточку
  deleteCard(id) {
    const urlId = `${this._url}/cards/${id}`;

    return fetch(urlId, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkTheAnswer);
  }

  //проверим лайки
  changeLikeCardStatus(id, isLiked) {
    const urlId = `${this._url}/cards/${id}/likes`;

    return fetch(urlId, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers
    })
      .then(this._checkTheAnswer);
  }
}

//API_____________________________________________________________________________
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'ebd0e12e-e8ad-4a47-b0fc-e1d7f7ab8ba5',
    'Content-Type': 'application/json'
  }
})

export {api};