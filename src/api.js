import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '34287533-73b6140ff373420767809a55e';

export class Api {
  constructor() {
    this._query = '';
    this.page = 1;
  }

  async fetch(page = this.page) {
    const res = await axios(
      `${BASE_URL}?q=${this.query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return res.data.hits;
  }

  get query() {
    return this._query;
  }

  set query(newQuery) {
    this._query = newQuery;
  }
}
