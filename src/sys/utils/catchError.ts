type AsyncFunction<T> = () => Promise<T>;

const catchError = async <T>(
  asyncFunc: AsyncFunction<T>
): Promise<[Error | null, T | null]> => {
  try {
    const res = await asyncFunc();
    return [null, res];
  } catch (err) {
    return [err instanceof Error ? err : new Error(String(err)), null];
  }
};

export default catchError;
