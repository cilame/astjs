// 目前需要把下面全部的类型都过一遍，主要用于学习 AST
// 后面我可能会考虑搞代码混淆或者代码逆混肴处理
var study = {

    // 这一块是目前已经过了一遍的部分，基本上是 javascript 非常常见的部分了。
    'ArrayExpression': 'ArrayExpression',
    'BinaryExpression': 'BinaryExpression',
    'CallExpression': 'CallExpression',
    'ContinueStatement': 'ContinueStatement',
    'DebuggerStatement': 'DebuggerStatement',
    'DoWhileStatement': 'DoWhileStatement',
    'EmptyStatement': 'EmptyStatement',
    'Identifier': 'Identifier',
    'IfStatement': 'IfStatement',
    'FunctionDeclaration': 'FunctionDeclaration',
    'FunctionExpression': 'FunctionExpression',
    'Literal': 'Literal',
    'LogicalExpression': 'LogicalExpression',
    'MemberExpression': 'MemberExpression',
    'ReturnStatement': 'ReturnStatement',
    'BlockStatement': 'BlockStatement',
    'BreakStatement': 'BreakStatement',
    'SequenceExpression': 'SequenceExpression',
    'SwitchCase': 'SwitchCase',
    'SwitchStatement': 'SwitchStatement',
    'VariableDeclaration': 'VariableDeclaration',
    'VariableDeclarator': 'VariableDeclarator',
    'WhileStatement': 'WhileStatement',
    'ObjectExpression': 'ObjectExpression',
    'AssignmentExpression': 'AssignmentExpression',
    'ExpressionStatement': 'ExpressionStatement',
    'ArrayPattern': 'ArrayPattern',

    // 下面这一块是目前还没有过的部分
    'AssignmentPattern': 'AssignmentPattern',
    'ArrowFunctionExpression': 'ArrowFunctionExpression',
    'AwaitExpression': 'AwaitExpression',
    'CatchClause': 'CatchClause',
    'ClassBody': 'ClassBody',
    'ClassDeclaration': 'ClassDeclaration',
    'ClassExpression': 'ClassExpression',
    'ConditionalExpression': 'ConditionalExpression',
    'ExportAllDeclaration': 'ExportAllDeclaration',
    'ExportDefaultDeclaration': 'ExportDefaultDeclaration',
    'ExportNamedDeclaration': 'ExportNamedDeclaration',
    'ExportSpecifier': 'ExportSpecifier',
    'ForInStatement': 'ForInStatement',
    'ForOfStatement': 'ForOfStatement',
    'ForStatement': 'ForStatement',
    'ImportDeclaration': 'ImportDeclaration',
    'ImportDefaultSpecifier': 'ImportDefaultSpecifier',
    'ImportNamespaceSpecifier': 'ImportNamespaceSpecifier',
    'ImportSpecifier': 'ImportSpecifier',
    'LabeledStatement': 'LabeledStatement',
    'MetaProperty': 'MetaProperty',
    'MethodDefinition': 'MethodDefinition',
    'NewExpression': 'NewExpression',
    'ObjectPattern': 'ObjectPattern',
    'Program': 'Program',
    'Property': 'Property',
    'RestElement': 'RestElement',
    'SpreadElement': 'SpreadElement',
    'Super': 'Super',
    'TaggedTemplateExpression': 'TaggedTemplateExpression',
    'TemplateElement': 'TemplateElement',
    'TemplateLiteral': 'TemplateLiteral',
    'ThisExpression': 'ThisExpression',
    'ThrowStatement': 'ThrowStatement',
    'TryStatement': 'TryStatement',
    'UnaryExpression': 'UnaryExpression',
    'UpdateExpression': 'UpdateExpression',
    'WithStatement': 'WithStatement',
    'YieldExpression': 'YieldExpression'
}




print = console.log

var esprima = require('esprima');
var escodegen = require('escodegen')

var script = `
var a,b;
a = 1,b = 2;
`
var tree = esprima.parse(script); //JSON.stringify();


function traverse_tree(tree){
    if(get_null_finger(tree) && tree.constructor != Array){
        print('----------------------------- split -----------------------------')
        print(typeof tree, JSON.stringify(tree))
        // print()
        // get_funcdecl_finger(tree)                // 捕捉函数定义
        // get_funcdecl_noname_finger(tree)         // 捕捉匿名函数定义
        // get_block_finger(tree)                   // 捕捉代码块，通常是函数花括号中的内容
        // get_literal_finger(tree)                 // 捕捉参数数据类型，具体用处可能不太大，节点太低了
        // get_identy_finger(tree)                  // 捕捉变量名，具体用处可能不太大，节点太低了
        // get_return_finger(tree)                  // 捕捉函数返回

        // 重点捕捉对象
        // get_sequence_finger(tree)                // 捕捉序列表达式
        // get_assign_finger(tree)                  // 捕捉赋值语句
        // get_array_pattern_finger(tree)           // 捕捉多参赋值 [a,b] = [1,2]
        // get_vardecl_finger(tree)                 // 捕捉参数组的定义，“一行”的参数定义
        // get_var_finger(tree)                     // 捕捉参数定义（包含赋值）
        // get_expression_finger(tree)              // 获取表达式，“一行”的函数执行
        // get_call_finger(tree)                    // 捕捉函数执行
        // get_logical_finger(tree)                 // 捕捉逻辑表达式
        // get_binary_finger(tree)                  // 捕捉二元运算，对于AST逆向比较有用
        // get_conditional_finger(tree)             // 捕捉三元运算
        // get_if_finger(tree)                      // 捕捉 if 语句，else的处理也包含其中，注意
        // get_for_finger(tree)                     // 捕捉 for 循环语句
        // get_while_finger(tree)                   // 捕捉 while 循环
        // get_dowhile_finger(tree)                 // 捕捉 dowhile 结构，注意 dowhile 和 while 属于两种不同的类型
        // get_continue_finger(tree)                // 捕捉 continue
        // get_switch_finger(tree)                  // 捕捉 switch 语句
        // get_switch_case_finger(tree)             // 捕捉 case
        // get_break_finger(tree)                   // 捕捉 break
        // get_array_finger(tree)                   // 捕捉列表
        // get_object_finger(tree)                  // 捕捉对象
        // get_member_finger(tree)                  // 捕捉成员变量
        // get_empty_finger(tree)                   // 捕捉空气
    }
    else{
        // 这个 else 是用于我个人开始学习 js 预防一下额外情况的发生，后期删除。
        // 这里通常为 null 或者一个列表
        if(tree != null && tree.constructor != Array){
            print(tree)
        }
    }
    if (typeof tree == 'object'){
        for(let key in tree){
            if(typeof tree[key] == 'object'){
                traverse_tree(tree[key])
            }
        }
    }
    else{
        // 这个 else 是用于我个人开始学习 js 预防一下额外情况的发生，后期删除。
        // 这里通常不会执行，如果执行则代表我漏过了一些我对js不太熟悉的奇怪特性。
        print('存在不同的属性内容', tree[key])
    }
}

traverse_tree(tree)














function get_empty_finger(node){
    if(node.type == 'EmptyStatement'){
        print(node)
    }
}

function get_empty_finger(node){
    if(node.type == 'EmptyStatement'){
        print(node)
    }
}

function get_empty_finger(node){
    if(node.type == 'EmptyStatement'){
        print(node)
    }
}






















function get_array_pattern_finger(node){
    if(node.type == 'ArrayPattern'){
        // 就是多参赋值的“多参”，注意这个参数通常只能在 AssignmentExpression 的 left 属性里面。
        // 
        // type: 'ArrayPattern',
        // elements:
        //  [ Identifier { type: 'Identifier', name: 'a' },
        //    Identifier { type: 'Identifier', name: 'b' } ] }
        print(node)
    }
}

function get_empty_finger(node){
    if(node.type == 'EmptyStatement'){
        // 就是 empty
        // 
        // { type: 'EmptyStatement' }
        print(node)
    }
}

function get_debugger_finger(node){
    if(node.type == 'DebuggerStatement'){
        // 就是 debugger
        // 
        // {"type":"DebuggerStatement"}
        print(node)
    }
}

function get_continue_finger(node){
    if(node.type == 'ContinueStatement'){
        // 就是 continue
        // 
        // { type: 'ContinueStatement', label: null }
        print(node)
    }
}

function get_break_finger(node){
    if(node.type == 'BreakStatement'){
        // 就是 break
        // 
        // { type: 'BreakStatement', label: null }
        print(node)
    }
}

function get_sequence_finger(node){
    if(node.type == 'SequenceExpression'){
        // 序列表达式，可能和参数组定义有点像，但是差距还是蛮大的
        //
        // type: 'SequenceExpression',
        // expressions:
        //  [ AssignmentExpression {
        //      type: 'AssignmentExpression',
        //      operator: '=',
        //      left: [Identifier],
        //      right: [Literal] },
        //    AssignmentExpression {
        //      type: 'AssignmentExpression',
        //      operator: '=',
        //      left: [Identifier],
        //      right: [Literal] } ] }
        print(node)
    }
}

function get_binary_finger(node){
    if(node.type == 'BinaryExpression'){
        // 二元运算
        // 
        // type: 'BinaryExpression',
        // operator: '+',
        // left: Identifier { type: 'Identifier', name: 'a' },
        // right: Identifier { type: 'Identifier', name: 'b' } } }
        print(node)
    }
}

function get_logical_finger(node){
    if(node.type == 'LogicalExpression'){
        // 该类型和二元运算有点像
        // 
        // type: 'LogicalExpression',
        // operator: '||',
        // left: Literal { type: 'Literal', value: 1, raw: '1' },
        // right: Literal { type: 'Literal', value: 2, raw: '2' } }
        print(node)
    }
}

function get_member_finger(node){
    if(node.type == 'MemberExpression'){
        // 这里处理的是成员获取，被获取的对象可能是对象，可能是列表，所以需要注意
        // 
        // type: 'MemberExpression',
        // computed: true,
        // object: Identifier { type: 'Identifier', name: 's' },
        // property: Literal { type: 'Literal', value: 1, raw: '1' } }
        print(node)
    }
}

function get_object_finger(node){
    if(node.type == 'ObjectExpression'){
        // 对象类型的初始化，在清理树结构的时候很有可能会使用到内部的参数对深处的节点进行“执行”简化。
        //
        // type: 'ObjectExpression',
        // properties:
        //  [ Property {
        //      type: 'Property',
        //      key: [Literal],
        //      computed: false,
        //      value: [Literal],
        //      kind: 'init',
        //      method: false,
        //      shorthand: false },
        //    Property {
        //      type: 'Property',
        //      key: [Literal],
        //      computed: false,
        //      value: [Literal],
        //      kind: 'init',
        //      method: false,
        //      shorthand: false } ] }
        print(node)
    }
}

function get_array_finger(node){
    if(node.type == 'ArrayExpression'){
        // 列表参数相
        //
        // type: 'ArrayExpression',
        // elements:
        //  [ Literal { type: 'Literal', value: 1, raw: '1' },
        //    Literal { type: 'Literal', value: 2, raw: '2' },
        //    Literal { type: 'Literal', value: 3, raw: '3' },
        //    Literal { type: 'Literal', value: 4, raw: '4' } ] }
        print(node)
    }
}

function get_switch_finger(node){
    if(node.type == 'SwitchStatement'){
        // switch 这种类型在结构上由两种类型组成， SwitchStatement SwitchCase
        // 所以处理的时候也需要小心一点，因为 case 并非选择+退出，而是选择+继续
        // 这就是 switch 的语法执行顺序，需要注意。
        //
        // type: 'SwitchStatement',
        // discriminant:
        //  BinaryExpression {
        //    type: 'BinaryExpression',
        //    operator: '==',
        //    left: Literal { type: 'Literal', value: 1, raw: '1' },
        //    right: Literal { type: 'Literal', value: 1, raw: '1' } },
        // cases:
        //  [ SwitchCase { type: 'SwitchCase', test: [Literal], consequent: [Array] },
        //    SwitchCase { type: 'SwitchCase', test: [Literal], consequent: [Array] } ] }
        print(node)
    }
}

function get_switch_case_finger(node){
    if(node.type == 'SwitchCase'){
        // 注意这是 SwitchStatement 的附加结构，case结构不能单独存在，并且 SwitchStatement 结构里面-
        // 的 cases 属性内所有的节点均只能为 SwitchCase 类型。另外再提醒一遍，注意 switch 语法的执行顺序！！！
        // 
        // type: 'SwitchCase',
        // test: Literal { type: 'Literal', value: 2, raw: '2' },
        // consequent:
        //  [ ExpressionStatement { type: 'ExpressionStatement', expression: [CallExpression] },
        //    BreakStatement { type: 'BreakStatement', label: null } ] }
        print(node)
    }
}

function get_dowhile_finger(node){
    if(node.type == 'DoWhileStatement'){
        // 原来 DoWhile 的设计实际上和 while 是两种单独而又不同的类型，我算是见识到了。
        //
        // type: 'DoWhileStatement',
        // body:
        //  BlockStatement { type: 'BlockStatement', body: [ [ExpressionStatement] ] },
        // test: Literal { type: 'Literal', value: 1, raw: '1' } }
        print(node)
    }
}

function get_while_finger(node){
    if(node.type == 'WhileStatement'){
        // 和其他循环一样，都很重要
        //
        // type: 'WhileStatement',
        // test:
        //  BinaryExpression {
        //    type: 'BinaryExpression',
        //    operator: '==',
        //    left: Literal { type: 'Literal', value: 1, raw: '1' },
        //    right: Literal { type: 'Literal', value: 1, raw: '1' } },
        // body:
        //  BlockStatement { type: 'BlockStatement', body: [ [ExpressionStatement] ] } }
        print(node)
    }
}

function get_for_finger(node){
    if(node.type == 'ForStatement'){
        // 和其他比较重要的类型一样，实际上也差不了多少
        // 
        // type: 'ForStatement',
        // init:
        //  VariableDeclaration {
        //    type: 'VariableDeclaration',
        //    declarations: [ [VariableDeclarator] ],
        //    kind: 'var' },
        // test:
        //  BinaryExpression {
        //    type: 'BinaryExpression',
        //    operator: '>=',
        //    left: Identifier { type: 'Identifier', name: 'i' },
        //    right: Literal { type: 'Literal', value: 0, raw: '0' } },
        // update:
        //  UpdateExpression {
        //    type: 'UpdateExpression',
        //    operator: '--',
        //    argument: Identifier { type: 'Identifier', name: 'i' },
        //    prefix: false },
        // body:
        //  BlockStatement { type: 'BlockStatement', body: [ [ExpressionStatement] ] } }
        print(node)
    }
}

function get_if_finger(node){
    if(node.type == 'IfStatement'){
        // if语句的捕捉，注意，javascript 是没有将 else if 作为一个分类分类出来的
        // 而实际的表象更像是 if{}else{ if... }，就是将else 后面的if语句判断直接放到树的深处进一步处理
        // 也就是说，如果 alternate 内得节点类型为 IfStatement 用于表示 else if。
        // 这样可能也许对于 js 开发会更好吧，类型减少了，不过得非常小心注意。
        // 如果属性中 alternate 没有，则代表没有 else。
        //
        // type: 'IfStatement',
        // test:
        //  BinaryExpression {
        //    type: 'BinaryExpression',
        //    operator: '==',
        //    left: Literal { type: 'Literal', value: 1, raw: '1' },
        //    right: Literal { type: 'Literal', value: 1, raw: '1' } },
        // consequent:
        //  BlockStatement { type: 'BlockStatement', body: [ [ExpressionStatement] ] },
        // alternate:
        //  IfStatement {
        //    type: 'IfStatement',
        //    test:
        //     BinaryExpression {
        //       type: 'BinaryExpression',
        //       operator: '==',
        //       left: [Literal],
        //       right: [Literal] },
        //    consequent: BlockStatement { type: 'BlockStatement', body: [Array] },
        //    alternate: BlockStatement { type: 'BlockStatement', body: [Array] } } }
        print(node)
    }
}

function get_conditional_finger(node){
    if(node.type == 'ConditionalExpression'){
        // 三元运算符
        // 
        // type: 'ConditionalExpression',
        // test:
        //  BinaryExpression {
        //    type: 'BinaryExpression',
        //    operator: '==',
        //    left: Identifier { type: 'Identifier', name: 'a' },
        //    right: Identifier { type: 'Identifier', name: 'b' } },
        // consequent: Literal { type: 'Literal', value: 1, raw: '1' },
        // alternate: Literal { type: 'Literal', value: 2, raw: '2' } }
        print(node)
    }
}

function get_identy_finger(node){
    if(node.type == 'Identifier'){
        // 最最接近数据的部分节点，通常为字符串或者数字
        // 
        // { type: 'Literal', value: 123, raw: '123' }
        print(node)
    }
}

function get_return_finger(node){
    if(node.type == 'ReturnStatement'){
        // 仅两个参数，注意使用
        // 
        // type: 'ReturnStatement',
        // argument:
        //  BinaryExpression {
        //    type: 'BinaryExpression',
        //    operator: '+',
        //    left: Identifier { type: 'Identifier', name: 'a' },
        //    right: Identifier { type: 'Identifier', name: 'b' } } }
        print(node)
    }
}

function get_assign_finger(node){
    if(node.type == 'AssignmentExpression'){
        // 赋值处理，和参数定义稍微有点微妙的相似，和二元运算形式上更像。
        // 
        // type: 'AssignmentExpression',
        // operator: '=',
        // left: Identifier { type: 'Identifier', name: 's' },
        // right:
        //  BinaryExpression {
        //    type: 'BinaryExpression',
        //    operator: '+',
        //    left: Literal { type: 'Literal', value: 123, raw: '123' },
        //    right: Literal { type: 'Literal', value: 333, raw: '333' } } }
        print(node)
    }
}

function get_vardecl_finger(node){
    if(node.type == 'VariableDeclaration'){
        // 参数定义，一般来说参数的定义含有属性 declarations，
        // 是一个列表，里面的每一个参数都为 VariableDeclarator 类型
        // javascript 最最常见的两个节点。 VariableDeclaration, ExpressionStatement 
        // 
        // var a, b = 1;
        // type: 'VariableDeclaration',
        // declarations:
        //  [ VariableDeclarator { type: 'VariableDeclarator', id: [Identifier], init: null },
        //    VariableDeclarator { type: 'VariableDeclarator', id: [Identifier], init: [Literal] } ],
        // kind: 'var' }
        print(node)
    }
}

function get_expression_finger(node){
    if(node.type == 'ExpressionStatement'){
        // 重点，该种类型通常会包裹函数的执行体，也算是函数块的一种包裹，
        // 比如存在那种多级的执行调用啥的，统统为一块的函数执行处理。
        // javascript 最最常见的两个节点。 VariableDeclaration, ExpressionStatement 
        //
        // type: 'ExpressionStatement',
        // expression:
        //  CallExpression {
        //    type: 'CallExpression',
        //    callee: Identifier { type: 'Identifier', name: 'print' },
        //    arguments: [ [Literal] ] } }
        print(node)
    }
}

function get_literal_finger(node){
    if(node.type == 'Literal'){
        print(node)
    }
}

function get_call_finger(node){
    if(node.type == 'CallExpression'){
        // 该处为函数执行的代码块，函数主要的参数为 callee，这里可能是
        // 
        // 一般的函数调用
        // type: 'CallExpression',
        // callee: Identifier { type: 'Identifier', name: 'func' },
        // arguments: [] }
        // 
        // 其他的别的方法的调用，下示例为成员变量 console.log 函数的调用
        // type: 'CallExpression',
        // callee:
        //  StaticMemberExpression {
        //    type: 'MemberExpression',
        //    computed: false,
        //    object: Identifier { type: 'Identifier', name: 'console' },
        //    property: Identifier { type: 'Identifier', name: 'log' } },
        // arguments: [ Literal { type: 'Literal', value: 123, raw: '123' } ] }
        //
        // 匿名函数，闭包调用
        // type: 'CallExpression',
        // callee:
        //  FunctionExpression {
        //    type: 'FunctionExpression',
        //    id: null,
        //    params: [],
        //    body: BlockStatement { type: 'BlockStatement', body: [Array] },
        //    generator: false,
        //    expression: false,
        //    async: false },
        // arguments: [] }
        print(node)
    }
}

function get_block_finger(node){
    if(node.type == 'BlockStatement'){
        // 该类型为通常为代码块，也就是非定义属性的中括号包起来的一块内容，
        // 里面的“每行”代码都将以列表的形式存在，可以是不同属性的内容
        //
        // type: 'BlockStatement',
        // body:
        //  [ ExpressionStatement { type: 'ExpressionStatement', expression: [CallExpression] },
        //    VariableDeclaration {
        //      type: 'VariableDeclaration',
        //      declarations: [Array],
        //      kind: 'var' } ] }
        print(node)
    }
}

function get_var_finger(node){
    if(node.type == 'VariableDeclarator'){
        // 参数的实际定义结构如下， init 为定义的属性，如为定义则为 null；
        // 
        // type: 'VariableDeclarator',
        // id: Identifier { type: 'Identifier', name: 'a' },
        // init: null }
        print(node)
    }
}

function get_funcdecl_finger(node){
    if(node.type == 'FunctionDeclaration'){
        // 函数定义
        // 
        // type: 'FunctionDeclaration',
        // id: Identifier { type: 'Identifier', name: 'func' },
        // params: [],
        // body:
        //  BlockStatement {
        //    type: 'BlockStatement',
        //    body:
        //     [ [VariableDeclaration],
        //       [VariableDeclaration],
        //       [ReturnStatement] ] },
        // generator: false,
        // expression: false,
        // async: false }
        print(node)
    }
}

function get_funcdecl_noname_finger(node){
    if(node.type == 'FunctionExpression'){
        // 基本上约等于匿名函数了，几乎和一般的函数定义一样，除了没有命名
        // 通常匿名函数的节点存放在 CallExpression 节点内部参数 callee 中
        //
        // type: 'FunctionExpression',
        // id: null,
        // params: [],
        // body:
        //  BlockStatement {
        //    type: 'BlockStatement',
        //    body: [ [ExpressionStatement], [VariableDeclaration] ] },
        // generator: false,
        // expression: false,
        // async: false }
        print(node)
    }
}

function get_null_finger(node){
    // 注意 undefined 的实际类型为 Identifier
    return node != null
}