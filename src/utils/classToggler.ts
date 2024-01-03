export function classToggler(
  ref: React.RefObject<HTMLDivElement>,
  setClassName: string[],
  resetClassName: string[],
  phase: string,
) {
  if (phase === "set") {
    ref.current?.classList.add(...setClassName);
    ref.current?.classList.remove(...resetClassName);
  } else if (phase === "reset") {
    ref.current?.classList.remove(...setClassName);
    ref.current?.classList.add(...resetClassName);
  }
}
