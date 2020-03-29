filepath = '.'
mainfile = 'main.js'

import os
mainjs = os.path.join(filepath, mainfile)

with open(mainjs, encoding='utf-8') as f:
    jscode = f.read()


code = r'''
function s1(a,b){
    return a+b
}
function s2(a,b){
    return a*b
}
s2(s1(1,3), s1(2,4))
'''

import os
os.environ['EXECJS_RUNTIME'] = 'Node'

import execjs
if not execjs._external_runtime.node().is_available():
    # 检测node环境是否安装
    print('[ !!! ] node is not available, pls install node.')
ctx = execjs.compile(jscode, cwd=filepath)
v = ctx.call('muti_process_defusion', code) # 解混淆函数
print(v)