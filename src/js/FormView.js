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
      this.errorElement.classList.remove('calculator__error_visible');

      const creditAmount = this._validateNumInput(this.creditAmountElement.value);
      const creditTerm = this._validateNumInput(this.creditTermElement.value);
      const creditInterestRate = this._validateNumInput(this.creditInterestRateElement.value);
      const firstPaymentDate = this._validateDateInput(this.firstPaymentDateElement.value);

      const typePayment = this.typePaymentElement.value;

      const isInputsValidate = !creditAmount || !creditTerm
            || !creditInterestRate || !firstPaymentDate;
      if (isInputsValidate) {
         this.errorElement.classList.add('calculator__error_visible');
         return;
      }

      creditCalc.calcCreditInfo({
         creditAmount,
         creditInterestRate,
         creditTerm,
         firstPaymentDate,
         typePayment,
      });
   }

   _validateNumInput(inputValue) {
      if (inputValue === '') return false;
      const numValue = Number(inputValue);
      const isValueInvalidate = Number.isNaN(numValue) || numValue < 0;
      if (isValueInvalidate) {
         return false;
      }
      return numValue;
   }

   _validateDateInput(inputValue) {
      if (inputValue === '') return false;
      const dateValue = inputValue.match(/[0-1][1-2]\.[0-1][1-2]\.[0-9]{4}|0[1-9]\.0[1-9]\.[0-9]{4}/ig);
      if (!dateValue) {
         return false;
      }
      return inputValue;
   }

   _addEventListeners() {
      this.mainFormElement.addEventListener('submit', this._handleSubmit.bind(this));
   }
}

export default FormView;
