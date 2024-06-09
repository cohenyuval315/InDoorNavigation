import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
    try {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.complete();
    } catch (err) {
      subscriber.error(err); // delivers an error if it caught one
    }
    return function unsubscribe() {
        clearInterval(intervalId);
    };
  })

/**

When Pipeable Operators are called, 
they do not change the existing Observable instance. 
Instead, they return a new Observable, 
whose subscription logic is based on the first Observable. 

*/
  
// PIPE - new observable .pipe
// CREATION - create observable with predefined behavior or joining obseravles
// higher-order Observables - Observables of Observables
const observer = {
    next: x => console.log('Observer got a next value: ' + x),
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
};  

const subscription = observable.subscribe(observer);
// Later:
subscription.unsubscribe();  
