import Observer from './observer';

const monthsNames = {
   0: 'Январь',
   1: 'Февраль',
   2: 'Март',
   3: 'Апрель',
   4: 'Май',
   5: 'Июнь',
   6: 'Июль',
   7: 'Август',
   8: 'Сентябрь',
   9: 'Октябрь',
   10: 'Ноябрь',
   11: 'Декабрь',
};


const creditCalc = {
   subscribeToChangeCreditInfo(subscriber) {
      if (typeof subscriber !== 'function') return;
      if (!this._creditInfoObserver) this._creditInfoObserver = new Observer();
      this._creditInfoObserver.subscribe(subscriber);
   },

   calcCreditInfo(creditStartData) {
      const creditMainInfo = this._calcCreditMainInfo(creditStartData);
      const paymentsDate = this._calcPaymentsDate(
         creditStartData.firstPaymentDate,
         creditStartData.creditTerm,
      );

      const overpayment = this._calcOverpayment(creditMainInfo.accruedInterests);
      const taxDeducation = this._calcTaxDeduction(creditStartData.creditAmount);

      this._broadcastCreditInfo(Object.assign(creditMainInfo, {
         paymentsDate,
         overpayment,
         taxDeducation,
      }));
   },

   // typePayment - тип платежа по кредиту
   // creditInterestRate - процентная ставка
   // creditAmount - сумма кредита
   // creditTerm - срок кредита в месяцах
   _calcCreditMainInfo({
      typePayment,
      creditInterestRate,
      creditAmount,
      creditTerm,
   }) {
      // Процентная ставка в месяц,
      // 12 - месяцы в году, 100 - проценты
      const creditInterestRatePerMonth = creditInterestRate / 12 / 100;
      // Значения основного долга для каждого месяца,
      // основной долг за первый месяц равен сумме кредита
      const debtBalance = [creditAmount];
      // Сумма платежа для каждого месяца
      const monthlyPayments = [];
      // Начисленные проценты для каждого месяца
      const accruedInterests = [];
      // Основной долг для каждого месяца
      const mainDebt = [];

      // При аннуитетном типе платежа месячные выплаты одинаковы,
      // поэтому считаются один раз
      if (typePayment === 'аннуитетный') {
         monthlyPayments[0] = debtBalance[0] * creditInterestRatePerMonth
            / (1 - ((1 + creditInterestRatePerMonth) ** (-creditTerm)));
      }

      // Расчет платежей для каждого месяца
      for (let i = 0; i < creditTerm; i += 1) {
         // При дифференцированном типе платежа выплаты считаются для каждого месяца
         if (typePayment === 'дифференцированный') {
            monthlyPayments[i] = debtBalance[i] / (creditTerm - i)
               + debtBalance[i] * creditInterestRatePerMonth;
         }
         accruedInterests[i] = debtBalance[i] * creditInterestRatePerMonth;
         mainDebt[i] = monthlyPayments[i] - accruedInterests[i];
         if (i !== creditTerm - 1) {
            // Копирование месячных выплат для каждого месяца
            // при аннуитетном типе платежа
            if (typePayment === 'аннуитетный') monthlyPayments[i + 1] = monthlyPayments[i];
            debtBalance[i + 1] = debtBalance[i] - monthlyPayments[i] + accruedInterests[i];
         }
      }
      return {
         monthlyPayments,
         debtBalance,
         accruedInterests,
         mainDebt,
      };
   },

   // firstPaymentDate - дата первого платежа
   // creditTerm - срок кредита в месяцах
   _calcPaymentsDate(firstPaymentDate, creditTerm) {
      // Дата каждого платежа
      const paymentsDate = [];
      // Преобразование даты из формата дд.мм.гггг в формат гггг-мм-дд
      const formattedDate = firstPaymentDate.split('.').reverse().join('-');

      const paymentDate = new Date(formattedDate);
      let monthNum;
      // Расчет месяца и года для каждого платежа
      for (let i = 0; i < creditTerm; i += 1) {
         monthNum = paymentDate.getMonth();
         paymentsDate[i] = `${monthsNames[monthNum]}, ${paymentDate.getFullYear()}`;
         paymentDate.setMonth(monthNum + 1);
      }

      return paymentsDate;
   },

   // accruedInterests - начисленные проценты для каждого месяца
   _calcOverpayment(accruedInterests) {
      if (accruedInterests.length > 0) {
         // Переплата это сумма начисленных процентов для каждого месяца
         return accruedInterests.reduce((sum, current) => sum + current);
      }
      return 0;
   },

   // creditAmount - сумма кредита
   _calcTaxDeduction(creditAmount) {
      // Максимальная сумма с которой можно получить налоговый вычет
      const maxTaxDeduction = 3000000;
      // Налог 13%
      const taxKoef = 0.13;
      if (creditAmount > maxTaxDeduction) {
         return maxTaxDeduction * taxKoef;
      }
      return creditAmount * taxKoef;
   },

   _broadcastCreditInfo(creditInfo) {
      if (!this._creditInfoObserver) return;
      this._creditInfoObserver.broadcast(creditInfo);
   },

};

export default creditCalc;
