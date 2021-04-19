/**
 * Helper function to determine if `x` is a valid index. Note that
 * 0 is a valid index, but is a falsy value.
 * @param {number | undefined} index
 */
const indexDefined = (index) => index !== undefined && index !== -1;

/**
 * A recrusive version of `Array#findIndex`.
 *
 * @param {any} node An object that _may_ contain an array of `children` nodes.
 * @param {(item: any) => Boolean} equalityFunc A function to use with `findIndex`.
 * @param {number | undefined} [index]
 * @returns {number | undefined}
 */
const findDeepIndex = (node, equalityFunc, index) => {
  // if we have an index (or nothing else to look through), return what we've got
  if (indexDefined(index) || !node.children) return index;

  // find the index at this level, based on the supplied function
  const indexAtLevel = node.children.findIndex(equalityFunc);

  // if we have an index at this level, return it, otherwise keep looking
  return indexDefined(indexAtLevel)
    ? indexAtLevel
    : node.children.reduce(
        (acc, child) => findDeepIndex(child, equalityFunc, acc),
        index
      );
};

module.exports = findDeepIndex;
