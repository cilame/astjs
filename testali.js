print = console.log

var esprima = require('esprima');
var estraverse = require('estraverse')
var escodegen = require('escodegen')

var code = `
5 == cn ? (g = Ye[b](G),
G = g << 28,
N |= G,
ye.push(5),
G = void 0,
g = N,
N = [],
M = g >> 24,
nn = 11908) : 5 > cn ? 2 == cn ? (Io = window,
Fo = C,
Vo = void 0,
ko = void 0,
po = 0,
nn = 16418) : 2 > cn ? 0 == cn ? ($ = de,
de = $,
$ = void 0,
L = 0,
nn = 13767) : cn > 0 && (Qe += "all",
ro = Qe,
Qe = "c",
Qe += "ons",
Qe += "ole",
Ue = Qe,
nn = po ? 11751 : 10601) : 3 == cn ? nn = Y ? 9765 : 22788 : cn > 3 && (nn = xe ? 20098 : 9288) : 8 == cn ? (I = 0,
nn = 15432) : 8 > cn ? 6 == cn ? nn = N ? 12552 : 7656 : cn > 6 && (ve = le[q],
nn = 18918) : 9 == cn ? (we = void 0,
I = 0,
nn = 7809) : cn > 9 && (V += ko,
Z = D[8],
ne = void 0,
J = 0,
nn = 6375);
`

// var code = `
// var a, b, c, d;
// a = 1,b = 2,c = 4,d = 3;
// var s = a + b + c + d;
// `

var code = `
Io = window, Fo = C, Vo = void 0, ko = void 0, po = 0, nn = 16418
`

var tree = esprima.parseScript(code)
show(tree);
// conbine_static_array(tree);
// conbine_object_array(tree);
// conbine_identy_function(tree);
// conbine_binary_function(tree);
// conbine_binary(tree);
conbine_flat_sequence(tree);
var script = escodegen.generate(tree);
print(script)













function conbine_flat_sequence(tree) {
    estraverse.replace(tree, {
        enter(node, parent){
            if (node.type === 'ExpressionStatement'){
                if (node.expression.type === 'SequenceExpression'){
                    return node
                }
            }
        }
    });
}



// 合并对象的静态列表(这里后续需要考虑考虑重名的处理)
function conbine_object_array(tree) {
    var STATIC_OBJECT = {}
    estraverse.replace(tree, {
        leave(node, parent) {
            if (node.type === 'VariableDeclarator' &&
                node.init != null &&
                node.init.type === 'ObjectExpression'){
                STATIC_OBJECT[node.id.name] = {}
                for(var key in node.init.properties){
                    STATIC_OBJECT[node.id.name][node.init.properties[key].key.value] = node.init.properties[key].value
                }
            }
            if (node.type === 'MemberExpression' &&
                node.object.type === 'Identifier' &&
                node.property.type === 'Literal' &&
                node.object.name in STATIC_OBJECT){
                return STATIC_OBJECT[node.object.name][node.property.value];
            }
        }
    });
}

// 合并参数的静态列表(这里后续需要考虑考虑重名的处理)
function conbine_static_array(tree) {
    var STATIC_ARRAY = {}
    estraverse.replace(tree, {
        leave(node, parent) {
            if (node.type === 'VariableDeclarator' &&
                node.init != null &&
                node.init.type === 'ArrayExpression' &&
                node.id.type === 'Identifier'){
                STATIC_ARRAY[node.id.name] = node.init.elements
            }
            if (node.type === 'MemberExpression' &&
                node.object.type === 'Identifier' &&
                node.property.type === 'Literal' &&
                node.object.name in STATIC_ARRAY){
                return STATIC_ARRAY[node.object.name][node.property.value];
            }
        }
    });
}

// 函数执行的寻找，从该节点的父节点中寻找函数，并修改当前函数执行的节点
function conbine_identy_function(tree) {
    estraverse.replace(tree, {
        enter(node, parent){
            if (node.type === 'ExpressionStatement' &&
                node.expression.type === 'CallExpression' && 
                node.expression.callee.type === 'Identifier' &&
                parent.body
                ) {
                for(var key in parent.body){
                    var _node;
                    if (_node = _catch_func(parent.body[key], node.expression.callee.name)){
                        node.expression.callee = _node
                        return node
                    }
                }
            }
            if (node.type === 'VariableDeclaration' && parent.body){
                for(var jkey in node.declarations){
                    if (node.declarations[jkey].type === 'VariableDeclarator' && 
                        node.declarations[jkey].init != null &&
                        node.declarations[jkey].init.type === 'CallExpression' &&
                        node.declarations[jkey].init.callee.type === 'Identifier' &&
                        parent.body){
                        var _node = _catch_func_parent(parent, node.declarations[jkey].init.callee.name)
                        if (_node){
                            node.declarations[jkey].init.callee = _node
                        }
                    }
                }
            }
        }
    });
}
function _catch_func(node, name) {
    if(node.type === 'VariableDeclaration'){
        for(var jkey in node.declarations){
            if (node.declarations[jkey].type === 'VariableDeclarator' && 
                node.declarations[jkey].init.type === 'FunctionExpression' &&
                node.declarations[jkey].id.type === 'Identifier' && 
                node.declarations[jkey].id.name === name){
                return node.declarations[jkey].init
            }
        }
    }
    if (node.type === 'FunctionDeclaration'){
        if (node.id.type === 'Identifier' &&
            node.id.name === name){
            return node
        }
    }
}
function _catch_func_parent(parent, name) {
    for(var key in parent.body){
        var _node;
        if (_node = _catch_func(parent.body[key], name)){
            return _node
        }
    }
}

// 合并简单的二元运算
function conbine_binary(tree) {
    estraverse.replace(tree, {
        enter(node, parent){
            if (node.type === 'BinaryExpression' && node.left.type === 'Literal' && node.right.type === 'Literal') {
                return {
                    type: 'Literal',
                    value: eval(JSON.stringify(node.left.value) + node.operator + JSON.stringify(node.right.value))
                };
            }
        }
    });
};

// 合并简单二元运算的函数
function conbine_binary_function(tree) {
    estraverse.replace(tree, {
        enter(node, parent){
            if (node.type === 'CallExpression' && 
                node.arguments.length === 2 && 
                (node.callee.type === 'FunctionExpression' || node.callee.type === 'FunctionDeclaration') &&
                node.callee.params.length === 2 &&
                node.callee.body.type === 'BlockStatement' && 
                node.callee.body.body.length === 1 &&
                node.callee.body.body[0].type === 'ReturnStatement' && 
                node.callee.body.body[0].argument.type === 'BinaryExpression' &&
                node.callee.params[0].type === 'Identifier' &&
                node.callee.params[1].type === 'Identifier' &&
                node.callee.body.body[0].argument.left.name  === node.callee.params[0].name &&
                node.callee.body.body[0].argument.right.name === node.callee.params[1].name) {
                return {
                    type: 'BinaryExpression',
                    operator: node.callee.body.body[0].argument.operator,
                    left: node.arguments[0],
                    right: node.arguments[1],
                };
            }
        }
    });
}

// 遍历展示
function show(tree) {
    estraverse.traverse(tree, {
        enter(node, parent) {
            print(parent)
            print('---------------')
            print(node)
            print('===============')
        }
    });
}