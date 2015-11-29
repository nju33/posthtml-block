# getSpace = (count) ->
#   result = ''
#   while count isnt 0
#     result += '  '
#     count--
#   result
#
# clean = (node, indentLevel = 1) ->
#   return unless node.content?
#
#   node.content = node.content.map do ->
#     found = false
#     (content, indx) ->
#       # if indx is node.content.length - 1
#       #   clean content, indentLevel
#       # else
#       #   clean content, indentLevel + 1
#
#       if /^[\n\s]*$/.test content and found
#         content = "\n"# + getSpace indentLevel
#       else if content.tag?
#         fount = true
#         content

  # console.log '%j', node
  # node

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
  # tree.match {tag: 'body'}, clean

module.exports = block
