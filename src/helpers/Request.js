import request from 'request-promise'

class Request {
  constructor() {
    this.base_url = 'http://localhost:3001'
    this.headers = {
      "Content-Type": "multipart/form-data"
    }
  }

  doRequest(options) {
    return new Promise((resolve, reject) => {
      request(options).then((body) => {
        try {
          resolve(body)
        } catch (error) {
          console.error(error)
          reject({ code: 'ERROR', message: 'Error'})
        }
      }).catch((body) => {
        reject({ code: 'ERROR', message: 'Error'})
      })  
    })
  }

  get(url, params = null, options = {}) {
    var data = {
      method: 'GET',
      uri: this.base_url + url,
      headers: this.headers
    }
    if (params) data.qs = params
    if (options.json) data.json = true
    return this.doRequest(data)
  }

  post(url, params = null, options = {}) {
    var data = {
      method: 'POST',
      uri: this.base_url + url,
      headers: this.headers
    }
    if (options.json) {
      if (params) data.body = params
      data.json = true
      data.headers['Content-Type'] = 'application/json'
    } else {
      if (params) data.form = params
    }
    return this.doRequest(data)
  }

  delete(url, params = null, options = {}) {
    var data = {
      method: 'DELETE',
      uri: this.base_url + url,
      headers: this.headers
    }
    if (params) data.qs = params
    if (options.json) data.json = true
    return this.doRequest(data)
  }

  patch(url, params = null, options = {}) {
    console.log("params", params)
    var data = {
      method: 'PATCH',
      uri: this.base_url + url,
      headers: this.headers
    }
    if (options.json) {
      if (params) data.body = params
      data.json = true
      data.headers['Content-Type'] = 'application/json'
    } else {
      if (params) data.form = params
    }
    return this.doRequest(data)
  }
}

export default new Request()