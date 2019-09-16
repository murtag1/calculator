import creditCalc from './creditCalc';
import prettyNumber from './numbersPrettify';

class CreditSummaryView {
   constructor() {
      this.monthlyPaymentElement = document.querySelector('.credit-summary__monthly-payment');
      this.overpaymentElement = document.querySelector('.credit-summary__overpayment');
      this.taxDeductionElement = document.querySelector('.credit-summary__tax-deduction');

      creditCalc.subscribeToChangeCreditInfo(this.handleChangeCreditInfo.bind(this));
   }

   handleChangeCreditInfo(creditInfo) {
      const minMonthlyPayment = Math.min(...creditInfo.monthlyPayments);
      const maxMonthlyPayment = Math.max(...creditInfo.monthlyPayments);

      this.overpaymentElement.textContent = prettyNumber(creditInfo.overpayment.toFixed(2));
      this.taxDeductionElement.textContent = prettyNumber(creditInfo.taxDeducation.toFixed(2));

      if (minMonthlyPayment === maxMonthlyPayment) {
         this.monthlyPaymentElement.textContent = prettyNumber(maxMonthlyPayment.toFixed(2));
         return;
      }
      this.monthlyPaymentElement.textContent = `${prettyNumber(maxMonthlyPayment.toFixed(2))}... ${prettyNumber(minMonthlyPayment.toFixed(2))}`;
   }
}

export default CreditSummaryView;
