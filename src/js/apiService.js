const BASE_URL = 'https://pixabay.com/api';
const KEY = '21816580-71493a440b7096ef43b823e18';

export default class apiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchPicture() {
        const URL = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=
        ${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;
        return fetch(URL)
            .then(response => response.json())
            .then(({ hits }) => {
                this.incrementPage();
                return hits;
            })
            .catch(error => console.log('This is error:', error));
    }

    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        return (this.searchQuery = newQuery);
    }
}
