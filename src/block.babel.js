import _ from 'lodash';

export default class Block {
  constructor(node) {
    this.node = node;
    this.textNode = {};
    this.contentNode = null;
    this.init();
  }

  get name() {
    return this.node.attrs['block-name'];
  }

  init() {
    if (!hasChildren(this.node)) {
      return;
    }
    loop.call(this, this.node);

    function loop(node) {
      if (!hasChildren(node)) {
        return;
      }

      const filtered = _.filter(node.content, childNode => {
        if (!childNode) {
          return false;
        } else if (typeof childNode === 'object') {
          loop.call(this, childNode);
          return true;
        } else if (typeof childNode === 'string' && !/^\s+$/.test(childNode)) {
          return true;
        }
        return false;
      });

      _.forEach(filtered, childNode => {
        if (_.has(childNode, 'attrs["block-text"]')) {
          this.textNode[childNode.attrs['block-text']] = childNode;
        }

        if (_.has(childNode, 'attrs["block-content"]')) {
          this.contentNode = childNode;
        }
      });
    }

    function hasChildren(node) {
      return node.content && node.content.length;
    }
  }

  render(opts = {}, content = []) {
    const block = _.cloneDeep(this);
    block.node.tag = _.get(block.node, 'attrs["block-tag"]', 'div');
    block.node.attrs = _.omit(block.node.attrs, [
      'block-name',
      'block-tag'
    ]);

    _.forEach(block.textNode, node => {
      const target = node.attrs['block-text'];
      node.content = [_.get(opts, target, '')];
      node.attrs = _.omit(node.attrs, 'block-text');
    });

    if (block.contentNode) {
      block.contentNode.content = content;
      block.contentNode.attrs = _.omit(block.contentNode.attrs, 'block-content');
    }
    return block;
  }
}
