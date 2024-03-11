export default class ArrayHelper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static remove(array: any[], index: number) {
    const _array = [...array];
    _array.splice(index, 1);
    return _array;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static checkAnyNonNull(array: any[]) {
    const value = array.reduce((acc, curr) => acc + (curr ? 1 : 0), 0)
    console.log(value)
    return value !== 0
  }
}
