import FormView from '../js/FormView';

document.body.innerHTML = `
<form class="calculator">
   <label class="calculator__item">
      <div class="calculator__item-left">Сумма кредита:</div>
      <div class="calculator__item-right">
         <input type="text" class="calculator__credit-amount" required>
      </div>
   </label>
   <label class="calculator__item">
      <div class="calculator__item-left">Срок кредита:</div>
      <div class="calculator__item-right">
         <input type="text" value class="calculator__credit-term" required>
         <sup>месяцев</sup>
      </div>
   </label>
   <label class="calculator__item">
      <div class="calculator__item-left">Процентная ставка:</div>
      <div class="calculator__item-right">
         <input type="text" class="calculator__credit-interest-rate" required>
         <sup>% годовых</sup>
      </div>
   </label>
   <label class="calculator__item">
      <div class="calculator__item-left">Тип платежей:</div>
      <div class="calculator__item-right">
         <select class="calculator__type-payments" required>
            <option>аннуитетный</option>
            <option>дифференцированный</option>
         </select>
      </div>
   </label>
   <label class="calculator__item">
      <div class="calculator__item-left">Дата первого платежа:</div>
      <div class="calculator__item-right">
         <input type="text" class="calculator__first-payment-date" placeholder="дд.мм.гггг" required>
      </div>
   </label>
   <button class="calculator__submit-btn">Рассчитать</button>
   <div class="calculator__error">Введены некорректные данные</div>
</form>
`;

describe('credit calculator', () => {
   test('adds rows with credit info', () => {
      new FormView();
      const creditAmountElement = document.querySelector('.calculator__credit-amount');
      const creditTermElement = document.querySelector('.calculator__credit-term');
      const creditInterestRateElement = document.querySelector('.calculator__credit-interest-rate');
      const firstPaymentDateElement = document.querySelector('.calculator__first-payment-date');
      const submitBtnElement = document.querySelector('.calculator__submit-btn');
      const errorElement = document.querySelector('.calculator__error');

      creditAmountElement.value = '10000';
      creditTermElement.value = '12';
      creditInterestRateElement.value = '15';
      firstPaymentDateElement.value = '01.12.2019';

      submitBtnElement.click();
      expect(errorElement.classList.contains('calculator__error_visible')).toBeFalsy();

      firstPaymentDateElement.value = '01.12.201';
      submitBtnElement.click();
      expect(errorElement.classList.contains('calculator__error_visible')).toBeTruthy();

      firstPaymentDateElement.value = '01.12.2019';
      creditInterestRateElement.value = '-15';
      submitBtnElement.click();
      expect(errorElement.classList.contains('calculator__error_visible')).toBeTruthy();

      creditInterestRateElement.value = '15';
      creditTermElement.value = 'haha';
      submitBtnElement.click();
      expect(errorElement.classList.contains('calculator__error_visible')).toBeTruthy();

      creditTermElement.value = '12';
      creditAmountElement.value = '40000руб';
      submitBtnElement.click();
      expect(errorElement.classList.contains('calculator__error_visible')).toBeTruthy();
   });
});
