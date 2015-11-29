block = (tree) ->
  memo = {}
  tree.match {tag: 'block'}, (node) ->
    if node.attrs?.name?
      memo[node.attrs.name] = node.content
    ''

  for name, contents of memo
    tree.match {tag: name}, (node) ->
      for content in contents
        if content.tag?
          node = content
          break
      node

  tree

module.exports = block
