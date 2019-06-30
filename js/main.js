'use strict';

(function() {

  var SCREEN_WIDTH_MOBILE = 650;
  var URL = 'https://rawgit.com/Varinetz/e6cbadec972e76a340c41a65fcc2a6b3/raw/90191826a3bac2ff0761040ed1d95c59f14eaf26/frontend_test_table.json';
  var loader = document.querySelector('.loader');
  var similarList = document.querySelector('.table tbody');
  var tableBody = document.querySelector('.table tbody');

  var statusToRusStatus = {
    pednding: 'Ожидается',
    pending: 'Ожидается',
    out_of_stock: 'Нет в наличии',
    in_stock: 'В наличии'
  };

  function hide(element) {
    element.classList.add('hidden');
  }

  var promise = axios.get(URL);
  promise
    .then(response => {
      appendTemplates(response.data);
      if (response.status === 200) {
        loader.style.opacity = 0;
        setTimeout(function() {
          loader.classList.add('d-none');
        }, 500);
      }
    })
    //     .catch(argument => {
    //       throw Error(
    //         `Произошла ошибка соединенения.
    // Обратитесь в тех.поддержку`)
    //     });

  var appendTemplates = function(carsData) {
    var retinaListElementTemplate = document.querySelector('#template-list-retina')
      .content.querySelector('.table-row');
    var mobileListElementTemplate = document.querySelector('#template-list-mobile')
      .content.querySelector('.table-row-mobile');
    var fragment = document.createDocumentFragment();
    var mobileMarker;
    for (var i = 0; i < carsData.length; i++) {
      if (document.body.clientWidth > SCREEN_WIDTH_MOBILE) {
        fragment.appendChild(applyDataToTable(carsData[i], retinaListElementTemplate));
        mobileMarker = 'retina';
      } else {
        fragment.appendChild(applyDataToTable(carsData[i], mobileListElementTemplate));
        mobileMarker = 'mobile';
      }
    }
    appendFragmentAccordingScreenWidth(mobileMarker, fragment);

  };

  var appendFragmentAccordingScreenWidth = function(screen, fragment) {
    if (screen === 'retina') {
      similarList.appendChild(fragment);
    } else if (screen === 'mobile') {
      similarList = document.querySelector('.car-list .container');
      similarList.appendChild(fragment);
    }
  };

  var getFormData = function(formData) {
    var formValuesArray = [];
    formValuesArray.push(formData);
    appendTemplates(formValuesArray);
  };

  var applyDataToTable = function(car, fragmentMode) {
    var oneCarData = fragmentMode.cloneNode(true);
    var deleteButton = oneCarData.querySelector('.table-row__button');
    var carTitle = oneCarData.querySelector('.table-row-title');
    var carTitleAdditional = oneCarData.querySelector('.table-row-title__additional-option');
    var carYear = oneCarData.querySelector('.table-row__year');
    var carColor = oneCarData.querySelector('.table-row__color-sircle');
    var carStatus = oneCarData.querySelector('.table-row__status');
    var carPrice = oneCarData.querySelector('.table-row__price');
    carTitle.textContent = window.secondaryFunctions.getCorrectString(car.title);
    carTitle.dataset.id = window.secondaryFunctions.getUniqueId();
    carTitleAdditional.textContent = car.description;
    carYear.textContent = car.year;
    carColor.style.backgroundColor = car.color;
    carStatus.textContent = statusToRusStatus[car.status];
    carPrice.textContent = `${window.secondaryFunctions.insertSpacesToPrice(car.price)} руб.`;


    window.handlers.addHandlerToDeleteButton(deleteButton, oneCarData);
    var tableBody = document.querySelector('.table tbody');

    window.handlers.addHandlerToToggleEmptyMessage(deleteButton, tableBody);
    return oneCarData;
  };

  window.main = {
    applyDataToTable: applyDataToTable,
    getFormData: getFormData
  };

})();