class LPF {
    smoothing: number;
    buffer: number[];
    bufferMaxSize: number;

    constructor(smoothing: number = 0.5, bufferMaxSize: number = 10) {
        this.smoothing = smoothing; // must be smaller than 1
        this.buffer = []; // FIFO queue
        this.bufferMaxSize = bufferMaxSize;
    }

    /**
     * Init buffer with array of values
     * 
     * @param {number[]} values
     * @returns {number[]}
     * @access public
     */
    init(values: number[]): number[] {
        for (let value of values) {
            this.#push(value);
        }
        return this.buffer;
    }

    /**
     * Add new value to buffer (FIFO queue)
     *
     * @param {number} value
     * @returns {number}
     * @access private
     */
    #push(value: number): number {
        const removed = (this.buffer.length === this.bufferMaxSize)
            ? this.buffer.shift() ?? 0
            : 0;

        this.buffer.push(value);
        return removed;
    }

    /**
     * Smooth value from stream
     *
     * @param {number} nextValue
     * @returns {number}
     * @access public
     */
    next(nextValue: number): number {
        const removed = this.#push(nextValue);
        const result = this.buffer.reduce((last, current) => {
            return this.smoothing * current + (1 - this.smoothing) * last;
        }, removed);
        this.buffer[this.buffer.length - 1] = result;
        return result;
    }

    /**
     * Smooth array of values
     *
     * @param {number[]} values
     * @returns {number[]}
     * @access public
     */
    smoothArray(values: number[]): number[] {
        let value = values[0];
        for (let i = 1; i < values.length; i++) {
            const currentValue = values[i];
            value += (currentValue - value) * this.smoothing;
            values[i] = Math.round(value);
        }
        return values;
    }
}

export default LPF;
