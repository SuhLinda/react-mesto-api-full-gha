class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  //проверка на ошибки
  _checkTheAnswer(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка:${response.status}`);
  }

  _setHeaders() {
    const token = localStorage.getItem('token');
    return {
      ...this._headers,
      'Authorization' : `Bearer ${token}`,
    };
  }

  //запрос к серверу о данных пользователя
  getUserData() {
    const urlId = `${this._url}/users/me`;

    return fetch(urlId,{
      method: 'GET',
      headers: this._setHeaders(),
    })
      .then(this._checkTheAnswer);
  }

  //подгрузим наши данные о пользователе на сервер
  setUserData(data) {
    const urlId = `${this._url}/users/me`;

    return fetch(urlId, {
      method: 'PATCH',
      headers: this._setHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about,
        email: data.email,
        avatar: data.avatar,
        _id: data._id,
      }),
    })
      .then(this._checkTheAnswer);
  }

  //смена аватара пользователя
  setUserAvatar(avatar) {
    const urlId = `${this._url}/users/me/avatar`;

    return fetch(urlId, {
      method: 'PATCH',
      headers: this._setHeaders(),
      body: JSON.stringify(avatar),
    })
      .then(this._checkTheAnswer);
  }

  //запрос к серверу данных карточек
  getInitialCards() {
    const urlId = `${this._url}/cards`;

    return fetch(urlId, {
      method: 'GET',
      headers: this._setHeaders(),
    })
      .then(this._checkTheAnswer);
  }

  //подгрузим наши карточки на сервер
  addNewCard(data) {
    const urlId = `${this._url}/cards`;

    return fetch(urlId, {
      method: 'POST',
      headers: this._setHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link,
        _id: data._id,
        likes: data.likes,
        owner: data.owner,
      }),
    })
      .then(this._checkTheAnswer);
  }

  //удалить карточку
  deleteCard(cardId) {
    const urlId = `${this._url}/cards/${cardId}`;

    return fetch(urlId, {
      method: 'DELETE',
      headers: this._setHeaders(),
    })
      .then(this._checkTheAnswer);
  }

  //поставить лайк
  likesId(cardId) {
    const urlId = `${this._url}/cards/${cardId}/likes`;

    return fetch(urlId, {
      method: 'PUT',
      headers: this._setHeaders(),
    })
      .then(this._checkTheAnswer);
  }

  //удалить лайк
  disLikesId(cardId) {
    const urlId = `${this._url}/cards/${cardId}/likes`;

    return fetch(urlId, {
      method: 'DELETE',
      headers: this._setHeaders(),
    })
      .then(this._checkTheAnswer);
  }

  //проверим лайки
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.likesId(cardId);
    }
    return this.disLikesId(cardId);
  };
}

//API_____________________________________________________________________________
const api = new Api({
  url: 'https://api.lindasux.students.nomoreparties.co',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export { api };
