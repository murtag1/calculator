import creditCalc from './creditCalc';
import prettyNumber from './numbersPrettify';

class CreditDetailsView {
   constructor() {
      this.tableBodyElement = document.querySelector('.credit-details__body');
      creditCalc.subscribeToChangeCreditInfo(this.handleChangeCreditInfo.bind(this));
   }

   handleChangeCreditInfo(creditInfo) {
      let talbeBodyContent = '';
      for (let i = 0; i < creditInfo.monthlyPayments.length; i += 1) {
         talbeBodyContent += this._createRow({
            paymentNum: i + 1,
            paymentDate: creditInfo.paymentsDate[i],
            paymentAmount: creditInfo.monthlyPayments[i],
            mainDebt: creditInfo.mainDebt[i],
            accruedInterests: creditInfo.accruedInterests[i],
            debtBalance: creditInfo.debtBalance[i],
         });
      }
      this.tableBodyElement.innerHTML = talbeBodyContent;
   }

   _createRow(rowItem) {
      return `
      <tr>
         <td>${prettyNumber(rowItem.paymentNum)}</td>
         <td>${rowItem.paymentDate}</td>
         <td>${prettyNumber(rowItem.paymentAmount.toFixed(2))}</td>
         <td>${prettyNumber(rowItem.mainDebt.toFixed(2))}</td>
         <td>${prettyNumber(rowItem.accruedInterests.toFixed(2))}</td>
         <td>${prettyNumber(rowItem.debtBalance.toFixed(2))}</td>
         </tr>
      `;
   }
}

export default CreditDetailsView;
