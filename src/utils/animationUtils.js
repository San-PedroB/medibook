export function triggerAnimation(ref, animationClass) {
  if (ref?.current && animationClass) {
    ref.current.classList.remove(animationClass);
    void ref.current.offsetWidth; // Forzar reflow
    ref.current.classList.add(animationClass);
  }
}
