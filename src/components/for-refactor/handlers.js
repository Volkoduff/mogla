  var form = document.querySelector('.form-request');
  var inputName = document.querySelector('#car-name-field');
  var carYear = document.querySelector('#car-year-field');
  var carPrice = document.querySelector('#car-price-field');
  var carStatus = document.querySelector('#status');
  var carDiscription = document.querySelector('#car-discription-field');
  var radioButtons = document.querySelectorAll('.radio-wrap input');
  var buttonSpinner = document.querySelector('.spinner__button-loader');
  var sendButton = document.querySelector('.button');

  var DelayInMsec = {
    defaultState: 700,
    hideRow: 250
  };

  var Text = {
    loading: 'Загрузка',
    send: 'Отправить',
    messageText: 'Вы убрали из списка все доступные автомобили'
  };

  var addHandlerToToggleEmptyMessage = function(btn, tableBody) {
    btn.addEventListener('click', () => {
      var tableRowQuantity = tableBody.querySelectorAll('tr').length;
      if (tableRowQuantity - 1 === 0) {
        showEmptyMessageInTable(tableBody);
      }
    })
  };

  var removeEmptyMessageInTable = function() {
    var appendedRow = document.querySelector('.table-row__empty');
    if (appendedRow !== null) {
      appendedRow.remove();
    }
  };

  var showEmptyMessageInTable = function(table) {
    var messageTemplate = document.querySelector('#message');
    var message = messageTemplate.cloneNode(true)
      .content.querySelector('tr');
    var tableMessageRow = message.querySelector('.table-row__message');
    tableMessageRow.textContent = Text.messageText;
    table.childNodes[0].after(message);
  };

  var addHandlerToDeleteButton = function(button, tableRow) {
    button.addEventListener('click', () => {
      tableRow.classList.add('slide-away-left');
      setTimeout(function() {
        tableRow.remove();
      }, DelayInMsec.hideRow);
    })
  };

  var toogleEmptyMessage = function(evt, input) {
    var currentLabel = evt.currentTarget.previousElementSibling;
    currentLabel.classList.add('fade-up');
    input.addEventListener('blur', e => {
      removeInputLabel(e, input);
    });
  };

  var removeInputLabel = (event, input, btn) => {
    if (input.value === '') {
      var currentLabel = event.currentTarget.previousElementSibling;
      currentLabel.classList.remove('fade-up');
    }
  };

  window.addEventListener('orientationchange', function () {
    window.location.reload();
  });

  sendButton.addEventListener('click', function() {
    removeEmptyMessageInTable();
  })

  form.addEventListener('submit', e => {
    e.preventDefault();
    var userCarInformation = {};
    userCarInformation.title = inputName.value;
    userCarInformation.year = carYear.value;
    userCarInformation.price = carPrice.value;
    userCarInformation.description = carDiscription.value;
    radioButtons.forEach(function(radioButton) {
      if (radioButton.checked) {
        userCarInformation.color = radioButton.value;
      }
    });
    userCarInformation.status = carStatus.value;
    window.main.getFormData(userCarInformation);

    var loadingButton = new Button(DelayInMsec.defaultState, sendButton, Text.send, Text.loading);
    loadingButton.initChangingOfStates();
  });

  var Button = function(delay, btn, oldText, newText) {
    this.delay = delay;
    this.btn = btn;
    this.oldText = oldText;
    this.newText = newText;
  }

  Button.prototype = {
    setDefaultState: function() {
      this.btn.textContent = this.oldText;
      this.btn.removeAttribute('disabled', 'disabled');
      buttonSpinner.classList.add('hidden')
        // window.secondaryFunctions.clearsInputs();
    },
    setActiveState: function() {
      this.btn.setAttribute('disabled', 'disabled');
      this.btn.textContent = this.newText;
      buttonSpinner.classList.remove('hidden')
    },
    initChangingOfStates: function() {
      this.setActiveState(this.newText);
      var self = this;
      setTimeout(function() {
        self.setDefaultState(self.oldText);
      }, self.delay)
    }
  }

  window.handlers = {
    addHandlerToDeleteButton: addHandlerToDeleteButton,
    toogleEmptyMessage: toogleEmptyMessage,
    addHandlerToToggleEmptyMessage: addHandlerToToggleEmptyMessage
  };
