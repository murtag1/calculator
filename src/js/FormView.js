import creditCalc from './creditCalc';

class FormView {
   constructor() {
      this.creditAmountElement = document.querySelector('.calculator__credit-amount');
      this.creditTermElement = document.querySelector('.calculator__credit-term');
      this.creditInterestRateElement = document.querySelector('.calculator__credit-interest-rate');
      this.typePaymentElement = document.querySelector('.calculator__type-payments');
      this.firstPaymentDateElement = document.querySelector('.calculator__first-payment-date');

      this.mainFormElement = document.querySelector('.calculator');
      this.errorElement = document.querySelector('.calculator__error');
      this._addEventListeners();
   }

   _handleSubmit(event) {
      event.preventDefault();

      this._removeErrorElement();

      const creditAmount = this._validateNumInput(this.creditAmountElement);
      const creditTerm = this._validateNumInput(this.creditTermElement);
      const creditInterestRate = this._validateNumInput(this.creditInterestRateElement);
      const firstPaymentDate = this._validateDateInput(this.firstPaymentDateElement);

      const typePayment = this.typePaymentElement.value;

      const isInputsValidate = !creditAmount || !creditTerm
            || !creditInterestRate || !firstPaymentDate;

      if (isInputsValidate) return;

      creditCalc.calcCreditInfo({
         creditAmount,
         creditInterestRate,
         creditTerm,
         firstPaymentDate,
         typePayment,
      });
   }

   _validateNumInput(inputElement) {
      const inputValue = inputElement.value;
      if (inputValue === '') {
         this._showError(inputElement, 'Введите число');
         return false;
      }

      const numValue = Number(inputValue);
      const isValueInvalidate = Number.isNaN(numValue) || numValue < 0;
      if (isValueInvalidate) {
         this._showError(inputElement, 'Введите число');
         return false;
      }
      return numValue;
   }

   _validateDateInput(inputElement) {
      let inputValue = inputElement.value;
      inputValue = inputValue.replace(/\s/g, '');

      const dateValue = inputValue.match(/^(1[0-2]|0[1-9])\.(1[0-2]|0[1-9])\.[0-9]{4}$/ig);

      if (!dateValue) {
         this._showError(inputElement, 'Введите дату в формате "дд.мм.гггг"');
         return false;
      }
      return inputValue;
   }

   _showError(inputElement, message) {
      if (this.errorElement) return;
      const inputWrapper = inputElement.parentNode;

      this.inputWithError = inputElement;
      this.errorElement = document.createElement('div');
      this.errorElement.className = 'calculator__error';
      this.errorElement.textContent = message;

      inputWrapper.appendChild(this.errorElement);
      inputElement.focus();

      this.removeErrorTimer = setTimeout(() => {
         this._removeErrorElement();
      }, 2000);

      // eslint-disable-next-line no-param-reassign
      inputElement.onblur = () => {
         this._removeErrorElement();
      };
   }

   _removeErrorElement() {
      if (this.errorElement) {
         this.errorElement.remove();
         this.errorElement = null;
         this.inputWithError.onblur = null;
         clearTimeout(this.removeErrorTimer);
      }
   }

   _addEventListeners() {
      this.mainFormElement.addEventListener('submit', this._handleSubmit.bind(this));
   }
}

export default FormView;
