import Observer from '../js/observer';

describe('observer', () => {
   const observer = new Observer();
   let value;
   function observerSubscriber() {
      value = 5;
   }
   test('subscribe on event', () => {
      observer.subscribe(observerSubscriber);
      expect(observer.observers.length).toBe(1);
   });

   test('broadcast event', () => {
      observer.broadcast();
      expect(value).toBe(5);
   });

   test('unsubscribe', () => {
      observer.unsubscribe(observerSubscriber);
      expect(observer.observers.length).toBe(0);
   });
});
