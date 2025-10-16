export default function sortTasksByChildOrder(a, b) {
  return a.childOrder - b.childOrder;
}
