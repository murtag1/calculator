import CreditDetailsView from '../js/CreditDetailsView';

document.body.innerHTML = `
<table class="credit-details">
   <tbody class="credit-details__body"></tbody>
</table>`;

describe('credit calculator', () => {
   test('adds rows with credit info', () => {
      const creditDetailsView = new CreditDetailsView();
      creditDetailsView.handleChangeCreditInfo({
         paymentsDate: ['Январь, 2019', 'Февраль, 2019'],
         monthlyPayments: [1123200, 1112400],
         mainDebt: [1080000, 1080000],
         accruedInterests: [43200, 32400],
         debtBalance: [4320000, 3240000],
      });
      const tableRows = document.querySelectorAll('.credit-details tr');
      const firstRowColumns = tableRows[0].querySelectorAll('td');
      const secondRowColumns = tableRows[1].querySelectorAll('td');

      expect(firstRowColumns[0].textContent).toBe('1');
      expect(firstRowColumns[1].textContent).toBe('Январь, 2019');
      expect(firstRowColumns[2].textContent).toBe('1 123 200.00');
      expect(firstRowColumns[3].textContent).toBe('1 080 000.00');
      expect(firstRowColumns[4].textContent).toBe('43 200.00');
      expect(firstRowColumns[5].textContent).toBe('4 320 000.00');

      expect(secondRowColumns[0].textContent).toBe('2');
      expect(secondRowColumns[1].textContent).toBe('Февраль, 2019');
      expect(secondRowColumns[2].textContent).toBe('1 112 400.00');
      expect(secondRowColumns[3].textContent).toBe('1 080 000.00');
      expect(secondRowColumns[4].textContent).toBe('32 400.00');
      expect(secondRowColumns[5].textContent).toBe('3 240 000.00');
   });
});
