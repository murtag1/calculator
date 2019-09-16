import CreditSummaryView from '../js/CreditSummaryView';

document.body.innerHTML = `
<div class="credit-summary">
   <div class="credit-summary__item">
      <div class="credit-summary__item-title">Сумма ежемесячного платежа:</div>
      <div class="credit-summary__item-value">
         <strong class="credit-summary__monthly-payment">0 </strong> руб
      </div>
   </div>
   <div class="credit-summary__item">
      <div class="credit-summary__item-title">Переплата по процентам за кредит:</div>
      <div class="credit-summary__item-value">
         <strong class="credit-summary__overpayment">0 </strong> руб
      </div>
   </div>
   <div class="credit-summary__item">
      <div class="credit-summary__item-title">Возможный налоговый вычет:</div>
      <div class="credit-summary__item-value">
         <strong class="credit-summary__tax-deduction">0 </strong> руб
      </div>
   </div>
</div>
`;

describe('credit calculator', () => {
   test('adds rows with credit info', () => {
      const creditSummaryView = new CreditSummaryView();
      creditSummaryView.handleChangeCreditInfo({
         monthlyPayments: [1123200, 1112400, 1101600, 1090800],
         overpayment: 108000,
         taxDeducation: 390000,
      });
      const monthlyPayments = document.querySelector('.credit-summary__monthly-payment');
      const overpayment = document.querySelector('.credit-summary__overpayment');
      const taxDeducation = document.querySelector('.credit-summary__tax-deduction');

      expect(monthlyPayments.textContent).toBe('1 123 200.00... 1 090 800.00');
      expect(overpayment.textContent).toBe('108 000.00');
      expect(taxDeducation.textContent).toBe('390 000.00');
   });
});
