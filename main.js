print = console.log

var esprima = require('esprima');
var estraverse = require('estraverse')
var escodegen = require('escodegen')

var code = `
function some(a,b){
    return a+b;
}

var q = some(123, 333);
some(123,3333);

var p = (function some(a,b) {
    return a+b
})(123, 333);

var s = q + p;
`

var code = `
var s = {
    'aaaa': '111111',
    'bbbb': '123123123',
    'cccc': function some(a,b){
        return a+b;
    }
};
s['123'] = 123;
print(s['cccc'](s['aaaa'],s['bbbb']) + s['123'])
`

var code = `
;var encode_version = 'sojson.v5', hiykl = '',  _0x323b=['wqjCsTPChD51w7I=','VikKw6DCmg==','wqoEwpzCqAXDjirDgMOe','w7LDrsKww5py','5Luz6IO95Yue6ZuGf8Kyw43DksKLWcKyEQA=','6L+e5pui5LiT5Lmk5Li557G/5YmCwqjDqOaTmOS+heOAnQ==','56ut6Za55oyS6aqi57q6wp7ig6HCnEfliZblrYfigY545ZG2w7Higa9Iw5bopLLlrrjigJLDq++8t+S/gOWOkOS+tuebhMKwwrEh44Cy','5aaF5p+l5oOM55ihwoo26YWH5bWS5aWP5Lukw7EAw63vva7CvcO4w4Lmo5TnrZ3vvpnnra7nrbXlhankupnpn7PCh8KSw6dHw7DDg3nDvTfCtOeZj+S6g+egie+9reiunuaMjeWOnuWFm+aesOWEm+WLiOWtlOOAlui+s+S5iuW3sOWHvuS7jOiDi+WIgeWuvVnCqcOl44Cdw6zDosKz56+p5qqc54mW5YW65a+E','w7HDs8KPXw==','K8OWw4nCpsOp','wp0zbMKrDsKf','QcKNwpBhdw=='];(function(_0x22d0bc,_0xc1d53e){var _0x2b009f=function(_0xa11c2c){while(--_0xa11c2c){_0x22d0bc['push'](_0x22d0bc['shift']());}};_0x2b009f(++_0xc1d53e);}(_0x323b,0xad));var _0x1691=function(_0x2ebb5f,_0x1c14f4){_0x2ebb5f=_0x2ebb5f-0x0;var _0x1245b7=_0x323b[_0x2ebb5f];if(_0x1691['initialized']===undefined){(function(){var _0x17acdf=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x52dfa6='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x17acdf['atob']||(_0x17acdf['atob']=function(_0x1c2b8d){var _0x59bbc9=String(_0x1c2b8d)['replace'](/=+$/,'');for(var _0x109150=0x0,_0x282401,_0x2cf9fe,_0x29a7a6=0x0,_0x143c34='';_0x2cf9fe=_0x59bbc9['charAt'](_0x29a7a6++);~_0x2cf9fe&&(_0x282401=_0x109150%0x4?_0x282401*0x40+_0x2cf9fe:_0x2cf9fe,_0x109150++%0x4)?_0x143c34+=String['fromCharCode'](0xff&_0x282401>>(-0x2*_0x109150&0x6)):0x0){_0x2cf9fe=_0x52dfa6['indexOf'](_0x2cf9fe);}return _0x143c34;});}());var _0x27ac57=function(_0x5d3ee8,_0x1c67bc){var _0x5d00a1=[],_0x57857c=0x0,_0x27586d,_0x5082b1='',_0x60c8f8='';_0x5d3ee8=atob(_0x5d3ee8);for(var _0x478fab=0x0,_0x2c1bee=_0x5d3ee8['length'];_0x478fab<_0x2c1bee;_0x478fab++){_0x60c8f8+='%'+('00'+_0x5d3ee8['charCodeAt'](_0x478fab)['toString'](0x10))['slice'](-0x2);}_0x5d3ee8=decodeURIComponent(_0x60c8f8);for(var _0x2a0777=0x0;_0x2a0777<0x100;_0x2a0777++){_0x5d00a1[_0x2a0777]=_0x2a0777;}for(_0x2a0777=0x0;_0x2a0777<0x100;_0x2a0777++){_0x57857c=(_0x57857c+_0x5d00a1[_0x2a0777]+_0x1c67bc['charCodeAt'](_0x2a0777%_0x1c67bc['length']))%0x100;_0x27586d=_0x5d00a1[_0x2a0777];_0x5d00a1[_0x2a0777]=_0x5d00a1[_0x57857c];_0x5d00a1[_0x57857c]=_0x27586d;}_0x2a0777=0x0;_0x57857c=0x0;for(var _0x4282d8=0x0;_0x4282d8<_0x5d3ee8['length'];_0x4282d8++){_0x2a0777=(_0x2a0777+0x1)%0x100;_0x57857c=(_0x57857c+_0x5d00a1[_0x2a0777])%0x100;_0x27586d=_0x5d00a1[_0x2a0777];_0x5d00a1[_0x2a0777]=_0x5d00a1[_0x57857c];_0x5d00a1[_0x57857c]=_0x27586d;_0x5082b1+=String['fromCharCode'](_0x5d3ee8['charCodeAt'](_0x4282d8)^_0x5d00a1[(_0x5d00a1[_0x2a0777]+_0x5d00a1[_0x57857c])%0x100]);}return _0x5082b1;};_0x1691['rc4']=_0x27ac57;_0x1691['data']={};_0x1691['initialized']=!![];}var _0x4b0681=_0x1691['data'][_0x2ebb5f];if(_0x4b0681===undefined){if(_0x1691['once']===undefined){_0x1691['once']=!![];}_0x1245b7=_0x1691['rc4'](_0x1245b7,_0x1c14f4);_0x1691['data'][_0x2ebb5f]=_0x1245b7;}else{_0x1245b7=_0x4b0681;}return _0x1245b7;};(function(_0x3b63ec,_0x3ade5f){var _0x44dc33={'TrVSx':_0x1691('0x0','xUV2'),'cgkGp':_0x1691('0x1','Saz0'),'QPnEZ':_0x1691('0x2','p1[!')};_0x3b63ec[_0x1691('0x3','@83L')]=_0x44dc33[_0x1691('0x4','OhPN')];_0x3ade5f[_0x1691('0x5','W9f@')]=_0x44dc33[_0x1691('0x6','iP1g')];_0x3ade5f[_0x1691('0x7','(fNo')]=_0x44dc33[_0x1691('0x8','p1[!')];}(window,document));;if(!(typeof encode_version!=='undefined'&&encode_version===_0x1691('0x9','zRQ)'))){window[_0x1691('0xa','#h7k')](_0x1691('0xb','$ff#'));};encode_version = 'sojson.v5';
`

var tree = esprima.parseScript(code)
show(tree)
combine_static_array(tree);
combine_object_array(tree);
combine_identy_function(tree);
combine_binary_function(tree);
combine_binary(tree);
var script = escodegen.generate(tree);
print(script);

function muti_process_defusion(code){
    var tree = esprima.parseScript(code)
    combine_static_array(tree);
    combine_object_array(tree);
    combine_identy_function(tree);
    combine_binary_function(tree);
    combine_binary(tree);
    return escodegen.generate(tree);
}







// 合并对象的静态列表(这里后续需要考虑考虑重名的处理)
function combine_object_array(tree) {
    var STATIC_OBJECT = {};
    estraverse.replace(tree, {
        leave(node, parent) {
            // 初始化
            if (node.type === 'VariableDeclarator' &&
                node.init != null &&
                node.init.type === 'ObjectExpression'){
                STATIC_OBJECT[node.id.name] = {}
                for(var key in node.init.properties){
                    STATIC_OBJECT[node.id.name][node.init.properties[key].key.value] = node.init.properties[key].value
                }
            }
            // 赋值
            if (node.type === 'AssignmentExpression' &&
                node.left.type === 'MemberExpression' &&
                node.left.computed === true &&
                node.left.object.type === 'Identifier' &&
                node.left.object.name in STATIC_OBJECT &&
                node.right.type === 'Literal' &&
                typeof node.left.property.value !== 'number'){
                STATIC_OBJECT[node.left.object.name][node.left.property.value] = node.right
            }
            // 替换
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
function combine_static_array(tree) {
    var STATIC_ARRAY = {};
    estraverse.replace(tree, {
        leave(node, parent) {
            // 初始化
            if (node.type === 'VariableDeclarator' &&
                node.init != null &&
                node.init.type === 'ArrayExpression' &&
                node.id.type === 'Identifier'){
                STATIC_ARRAY[node.id.name] = node.init.elements
            }
            // 赋值
            if (node.type === 'AssignmentExpression' &&
                node.left.type === 'MemberExpression' &&
                node.left.computed === true &&
                node.left.object.type === 'Identifier' &&
                node.left.object.name in STATIC_ARRAY &&
                node.right.type === 'Literal' &&
                typeof node.left.property.value === 'number'){
                STATIC_ARRAY[node.left.object.name][node.left.property.value] = node.right
            }
            // 替换
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
function combine_identy_function(tree) {
    var cache_name;
    var cache_func;
    var CACHE_FUNCS = {};
    estraverse.replace(tree, {
        enter(node, parent){
            if (cache_name = _cache_func(node)){
                CACHE_FUNCS[cache_name[0]] = cache_name[1];
            }
            if (cache_func = _cache_func_rep(node, CACHE_FUNCS)){
                return cache_func;
            }


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
                        var _node = _catch_func_parent(parent, node.declarations[jkey].init.callee.name);
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
                node.declarations[jkey].init != null &&
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
function _cache_func(node, name) {
    if(node.type === 'VariableDeclaration'){
        for(var jkey in node.declarations){
            if (node.declarations[jkey].type === 'VariableDeclarator' && 
                node.declarations[jkey].init != null &&
                node.declarations[jkey].init.type === 'FunctionExpression' &&
                node.declarations[jkey].id.type === 'Identifier'){
                return [node.declarations[jkey].id.name, node.declarations[jkey].init]
            }
        }
    }
    if (node.type === 'FunctionDeclaration'){
        if (node.id.type === 'Identifier'){
            return [node.id.name, node]
        }
    }
}
function _cache_func_rep(node, cachefunc) {
    if (node.type === 'CallExpression' && 
        node.callee.type === 'Identifier' &&
        node.callee.name in cachefunc){
        node.callee = cachefunc[node.callee.name];
        return node;
    }
}

// 合并简单的二元运算
function combine_binary(tree) {
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
function combine_binary_function(tree) {
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
                rnode = {
                    type: 'BinaryExpression',
                    operator: node.callee.body.body[0].argument.operator,
                    left: node.arguments[0],
                    right: node.arguments[1],
                };
                if (rnode.type === 'BinaryExpression' && rnode.left.type === 'Literal' && rnode.right.type === 'Literal') {
                    return {
                        type: 'Literal',
                        value: eval(JSON.stringify(rnode.left.value) + rnode.operator + JSON.stringify(rnode.right.value))
                    };
                }else{
                    return rnode
                }
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