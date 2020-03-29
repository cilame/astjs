filepath = '.'

import os
os.path.join(filepath, )
mainjs = 

with open('./test2.js', encoding='utf-8') as f:
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
import execjs
ctx = execjs.compile(jscode)
q = ctx.call('muti_process_defusion', code) # 解混淆函数
print(q)