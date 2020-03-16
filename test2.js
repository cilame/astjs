print = console.log

var esprima = require('esprima');
var estraverse = require('estraverse')
var escodegen = require('escodegen')

var code = `
var s = 123;
`

var tree = esprima.parseScript(code)

// 遍历处理
estraverse.traverse(tree, {
    enter(node, parent) {
        print(parent)
        print('---------------')
        print(node)
        print('===============')
    }
});

// 替换处理
estraverse.replace(tree, {
    leave(node, parent) {
        if(parent.type == 'VariableDeclarator' && node.type == 'Literal'){
            return {'type': 'Literal','value': 121113, 'raw':'123'};
        }
    }
});

var script = escodegen.generate(tree);
print(script)