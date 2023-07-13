import axios from 'axios';

const Axios = axios.create({
  baseURL: process.env.REACT_APP_BFF_URL,
  timeout: 2000000,
  headers: {
    'X-Custom-Header': 'foobar',
    Authorization: localStorage.getItem('token' || '')
  },
});

const send = (type: any, url: any, data: any) => {
  Axios.defaults.headers.Authorization = localStorage.getItem('token');

  return new Promise(function (resolve, reject) {
    if (type === "POST") {
      Axios.post(url, data)
        .then((response) => {
          if (response)
            resolve(response.data);
          else
            resolve({ error: true, errorMessages: [{ message: "Ocorreu um erro inesperado. Contate o administrador." }] });
        })
        .catch(error => {
          resolve({ error: true, errorMessages: [{ message: "Ocorreu um erro inesperado. Contate o administrador." }] });
        })
    }

    if (type === "GET") {
      Axios.get(url, data)
        .then((response) => {
          if (response)
            resolve(response.data);
          else
            resolve({ error: true, errorMessages: [{ message: "Ocorreu um erro inesperado. Contate o administrador." }] });
        })
        .catch(error => {
          resolve({ error: true, errorMessages: [{ message: "Ocorreu um erro inesperado. Contate o administrador." }] })
        })
    }

    if (type === "PATCH") {
      Axios.patch(url, data)
        .then((response) => {
          if (response)
            resolve(response.data);
          else
            resolve({ error: true, errorMessages: [{ message: "Ocorreu um erro inesperado. Contate o administrador." }] });
        })
        .catch(error => {
          resolve({ error: true, errorMessages: [{ message: "Ocorreu um erro inesperado. Contate o administrador." }] });
        })
    }

    if (type === "PUT") {
      Axios.put(url, data)
        .then((response) => {
          if (response)
            resolve(response.data);
          else
            resolve({ error: true, errorMessages: [{ message: "Ocorreu um erro inesperado. Contate o administrador." }] });
        })
        .catch(error => {
          resolve({ error: true, errorMessages: [{ message: "Ocorreu um erro inesperado. Contate o administrador." }] });
        })
    }

    if (type === "DELETE") {
      Axios.delete(url, data)
        .then((response) => {
          if (response)
            resolve(response.data);
          else
            resolve({ error: true, errorMessages: [{ message: "Ocorreu um erro inesperado. Contate o administrador." }] });
        })
        .catch(error => {
          resolve({ error: true, errorMessages: [{ message: "Ocorreu um erro inesperado. Contate o administrador." }] });
        })
    }
  });
}

export { Axios, send };