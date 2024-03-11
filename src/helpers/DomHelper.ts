export default class DomHelper {
  /**
   * @see https://dev.to/elsyng/react-modal-dialog-using-html-dialog-element-5afk
   *
   * @param e
   * @param element
   * @returns
   */
  public static isClickInsideRectangle = (
    e: MouseEvent,
    element: HTMLElement
  ) => {
    const r = element.getBoundingClientRect();

    return (
      e.clientX > r.left &&
      e.clientX < r.right &&
      e.clientY > r.top &&
      e.clientY < r.bottom
    );
  };

  /**
   * @see
   *
   * @param element
   * @returns
   */
  public static isRightOutsideView = (element: HTMLElement) => {
    const r = element.getBoundingClientRect();
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;

    return r.right > windowWidth;
  };
}
