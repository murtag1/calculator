import creditCalc from '../js/creditCalc';

const debtBalance = ['10000.00', 7546.39, 5062.11, 2546.78];
const accruedInterests = ['125.00', 94.33, 63.28, 31.83];
const monthlyPayments = 2578.61;
const mainDebt = [2453.61, 2484.28, 2515.33, 2546.78];
const paymentsDate = ['Январь, 2019', 'Февраль, 2019', 'Март, 2019', 'Апрель, 2019'];
const overpayment = 314.44;
const taxDeducation = '1300.00';

const monthlyPaymentsDiff = [1123200, 1112400, 1101600, 1090800];
const debtBalanceDiff = [4320000, 3240000, 2160000, 1080000];
const accruedInterestsDiff = [43200, 32400, 21600, 10800];
const mainDebtDiff = [1080000, 1080000, 1080000, 1080000];
const paymentsDateDiff = ['Январь, 2019', 'Февраль, 2019', 'Март, 2019', 'Апрель, 2019'];
const overpaymentDiff = 108000;
const taxDeducationDiff = 390000;

describe('credit calculator', () => {
   test('calculates the credit information', () => {
      let calculatedCreditInfo;
      creditCalc.subscribeToChangeCreditInfo((creditInfo) => {
         calculatedCreditInfo = creditInfo;
      });

      creditCalc.calcCreditInfo({
         creditAmount: 10000,
         creditInterestRate: 15,
         creditTerm: 4,
         firstPaymentDate: '01.01.2019',
         typePayment: 'аннуитетный',
      });

      calculatedCreditInfo.debtBalance.forEach((item, index) => {
         expect(item.toFixed(2)).toBe(String(debtBalance[index]));
      });
      calculatedCreditInfo.accruedInterests.forEach((item, index) => {
         expect(item.toFixed(2)).toBe(String(accruedInterests[index]));
      });
      calculatedCreditInfo.monthlyPayments.forEach((item) => {
         expect(item.toFixed(2)).toBe(String(monthlyPayments));
      });
      calculatedCreditInfo.mainDebt.forEach((item, index) => {
         expect(item.toFixed(2)).toBe(String(mainDebt[index]));
      });
      calculatedCreditInfo.paymentsDate.forEach((item, index) => {
         expect(item).toBe(paymentsDate[index]);
      });
      expect(calculatedCreditInfo.overpayment.toFixed(2)).toBe(String(overpayment));
      expect(calculatedCreditInfo.taxDeducation.toFixed(2)).toBe(String(taxDeducation));

      creditCalc.calcCreditInfo({
         creditAmount: 4320000,
         creditInterestRate: 12,
         creditTerm: 4,
         firstPaymentDate: '01.01.2019',
         typePayment: 'дифференцированный',
      });

      calculatedCreditInfo.debtBalance.forEach((item, index) => {
         expect(item).toBe(debtBalanceDiff[index]);
      });
      calculatedCreditInfo.accruedInterests.forEach((item, index) => {
         expect(item).toBe(accruedInterestsDiff[index]);
      });
      calculatedCreditInfo.monthlyPayments.forEach((item, index) => {
         expect(item).toBe(monthlyPaymentsDiff[index]);
      });
      calculatedCreditInfo.mainDebt.forEach((item, index) => {
         expect(item).toBe(mainDebtDiff[index]);
      });
      calculatedCreditInfo.paymentsDate.forEach((item, index) => {
         expect(item).toBe(paymentsDateDiff[index]);
      });
      expect(calculatedCreditInfo.overpayment).toBe(overpaymentDiff);
      expect(calculatedCreditInfo.taxDeducation).toBe(taxDeducationDiff);
   });
});
