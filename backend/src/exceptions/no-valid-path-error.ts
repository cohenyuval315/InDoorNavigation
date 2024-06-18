class NoValidPathError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'NoValidPathError';
    }
}

export default NoValidPathError