const findParentByClassName = (node, className) => {
  if (node && node.className && node.className === className) {
    return node;
  } else if (node.parentNode) {
    return findParentByClassName(node.parentNode, className);
  } else {
    return null;
  }
}

module.exports = {
  findParentByClassName,
}
