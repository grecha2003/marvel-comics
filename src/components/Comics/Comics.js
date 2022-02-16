import {
  API_URL,
  URL_COMICS,
  IMG_STANDARD_XLARGE,
  IMG_NOT_AVAILABEL,
  URL_CHARACTERS,
} from '../../constants/api';
import { getDataApi } from '../../utils/getDataApi';
import { ROOT_INDEX } from '../../constants/root';

import Error from '../Error';

import './Comics.css';

class Comics {
  renderComics(data) {
    let htmlContent = '';

    data.forEach(({ id, title, thumbnail: { path, extension } }) => {
      if (path.lastIndexOf(IMG_NOT_AVAILABEL) === -1) {
        const uri = API_URL + URL_COMICS + '/' + id + '/' + URL_CHARACTERS;
        const imgSrc = path + '/' + IMG_STANDARD_XLARGE + '.' + extension;

        htmlContent += `
          <li class="comics__item" data-uri="${uri}">
            <span class="comics__name">${title}</span>
            <img class="comics__img" src="${imgSrc}" /> 
          </li>`;
      }
    });

    const htmlWrapper = `
      <ul class="comics__container">
          ${htmlContent}
      </ul>`;

    ROOT_INDEX.innerHTML = htmlWrapper;
  }

  async render() {
    const data = await getDataApi.getData(API_URL + URL_COMICS);

    if (data) {
      this.renderComics(data);
    } else {
      Error.render();
    }
  }

  eventListener() {
    document.querySelectorAll('.comics__item').forEach((element) => {
      const uri = element.getAttribute('data-uri');

      element.addEventListener('click', () => {
        console.log(uri);
      });
    });
  }
}

export default new Comics();
