import _ from 'lodash';

export default class Block {
  constructor(node) {
    this.content = [node];
    this.textNode = {};
    this.attrNode = [];
    this.contentNode = null;
  }

  get root() {
    return this.content[0];
  }

  get name() {
    return this.root.attrs['block-name'];
  }

  init(blocks) {
    if (!hasChildren(this.root)) {
      return;
    }
    loop.call(this, this);

    function loop(node) {
      if (!hasChildren(node)) {
        return;
      }

      const filtered = _.filter(node.content, childNode => {
        if (!childNode) {
          return false;
        } else if (typeof childNode === 'object') {
          const idx = _.findIndex(blocks, {name: childNode.tag});
          if (~idx) {
            Object.assign(childNode, blocks[idx].root);
            childNode.tag = _.get(childNode, 'attrs["block-tag"]', 'div');
            childNode.attrs = _.omit(childNode.attrs, [
              'block-name',
              'block-tag'
            ]);
          }
          loop.call(this, childNode);
          return true;
        } else if (typeof childNode === 'string' && !/^\s+$/.test(childNode)) {
          return true;
        }
        return false;
      });

      _.forEach(filtered, childNode => {
        _.forEach(_.get(childNode, 'attrs', {}), (value, prop) => {
          if (prop === 'block-text') {
            this.textNode[value] = childNode;
          } else if (/block-attr-/.test(prop)) {
            this.attrNode = this.attrNode.concat([childNode]);
          } else if (prop === 'block-content') {
            this.contentNode = childNode;
          }
        });
        this.attrNode = _.uniq(this.attrNode);
      });
    }

    function hasChildren(node) {
      return Boolean(node.content && node.content.length);
    }
  }

  render(opts = {}, content = []) {
    const block = _.cloneDeep(this);
    block.root.tag = _.get(block.root, 'attrs["block-tag"]', 'div');
    block.root.attrs = _.omit(block.root.attrs, [
      'block-name',
      'block-tag'
    ]);

    _.forEach(block.textNode, node => {
      const target = node.attrs['block-text'];
      node.content = [_.get(opts, target, '')];
      node.attrs = _.omit(node.attrs, 'block-text');
    });

    _.forEach(block.attrNode, node => {
      _.forEach(node.attrs, (key, prop) => {
        const matches = prop.match(/block-attr-(.+)/);
        if (matches) {
          const target = matches[1];
          if (target === 'class' && _.has(node, `attrs.${target}`)) {
            const cs = `${node.attrs.class} ${_.get(opts, target, '')}`.trim();
            node.attrs.class = cs;
          } else {
            _.set(node, `attrs.${target}`, _.get(opts, target, ''));
          }

          node.attrs = _.omit(node.attrs, prop);
        }
      });
    });

    if (block.contentNode) {
      block.contentNode.content = content;
      block.contentNode.attrs = _.omit(block.contentNode.attrs, 'block-content');
    }

    return block.root;
  }
}
