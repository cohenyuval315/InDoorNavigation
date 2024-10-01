import { OperatorFunction } from 'rxjs';
import { buffer, bufferCount, timestamp } from 'rxjs/operators';
import { map, filter } from 'rxjs/operators';



export function slidingWindow<T>(windowSize: number): OperatorFunction<T, T[]> {
  return bufferCount(windowSize, 1);
}


interface TimedValue<T> {
  value: T;
  timestamp: number;
}

export function timingSlidingWindow<T>(windowSize: number, ttl: number): OperatorFunction<T, T[]> {
    return source => source.pipe(
      timestamp(), // Attach a timestamp to each emitted value
      buffer(source.pipe(timestamp())), // Buffer based on the source with timestamp
      map(bufferedValues => {
        const now = Date.now();
        // Filter out expired values
        return bufferedValues.filter(({ timestamp }) => (now - timestamp) <= ttl)
                             .slice(-windowSize)
                             .map(({ value }) => value);
      }),
      filter(values => values.length === windowSize) // Only emit complete windows
    );
  }


