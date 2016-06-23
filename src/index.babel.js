import _ from 'lodash';
import Block from './block';

export default function block(tree) {
  const blocks = [];
  tree.match({tag: 'block'}, blockNode => {
    if (!_.get(blockNode, 'attrs["block-name"]', null)) {
      return;
    }
    blocks.push(new Block(blockNode));
  });

  _.forEach(blocks, block => block.init(blocks));

  _.forEach(blocks, block => {
    tree.match({tag: block.name}, node => {
      const rendered = block.render(node.attrs, node.content);
      return rendered;
    });
  });
}
