class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getCard(jwt) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${jwt}`
      },
    }).then(this._checkResponse);
  }

  addNewCard = (data, jwt) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Authorization" : `Bearer ${jwt}`,
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        name: data.place,
        link: data.link,
      }),
    }).then(this._checkResponse);
  };

  deleteCardItem(id, jwt) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization" : `Bearer ${jwt}`,
        "Content-Type" : "application/json",
      },
    }).then(this._checkResponse);
  }

  getUserInfo(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${jwt}`
      },
    }).then(this._checkResponse);
  }

  getAppInfo() {
    return Promise.all([this.getCard(localStorage.jwt), this.getUserInfo(localStorage.jwt)]);
  }

  setUserInfo(data, jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Authorization" : `Bearer ${jwt}`,
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  setUserAvatar(data, jwt) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Authorization" : `Bearer ${jwt}`,
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked, jwt) {
    if (!isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: {
          "Authorization" : `Bearer ${jwt}`        },
        }).then(this._checkResponse);
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: {
          "Authorization" : `Bearer ${jwt}`
        },
        }).then(this._checkResponse);
    }
  }
}

const api = new Api({
  baseUrl: "http://api.mesto.kolotilina.nomoredomainsicu.ru",
});

export default api;
