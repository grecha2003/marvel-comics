import { getDataApi } from '../../utils/getDataApi';
import { IMG_STANDARD_XLARGE } from '../../constants/api';
import { ROOT_MODAL } from '../../constants/root';

import Notification from '../Notification';
import './Characters.css';

class Characters {
  renderContent(data) {
    let htmlContent = ``;

    data.forEach(({ name, thumbnail: { path, extension } }) => {
      const imgSrc = path + '/' + IMG_STANDARD_XLARGE + '.' + extension;

      htmlContent += `
          <li class="characters__item">
            <img class="img-cover characters__img" src="${imgSrc}" />
            <span class="characters__name">${name}</span>
          </li>
      `;
    });

    const htmlWrapper = `
    <div class="wrapper">
        <ul class="characters__container">
            ${htmlContent}
        </ul>
        <div class="characters__close" 
                onclick="modal.innerHTML=''"></div>
    </div>
    `;

    ROOT_MODAL.innerHTML = htmlWrapper;
  }

  renderNotification() {
    console.log('Данных нет');
  }

  async render(uri) {
    const data = await getDataApi.getData(uri);

    data.length ? this.renderContent(data) : Notification.render();
  }
}

export default new Characters();
