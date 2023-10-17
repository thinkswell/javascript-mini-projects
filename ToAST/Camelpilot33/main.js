/** Abstract Syntax Tree class */
class AST {
    /**
     * @param {*} tkn 
     * @param {AST} l 
     * @param {AST} r 
     */
    constructor (tkn, l = null, r = null) {
        this.tkn = tkn;
        this.l = l;
        this.r = r;
    }
    left(a) {
        this.l = a;
    }
    right(a) {
        this.r = a;
    }
    toString() {
        let a = this.tkn.type;
        if (['num', 'const', 'var'].includes(a)) return this.tkn.token;
        if (a == "func") return `${this.tkn.token}(${this.l.toString()})`;
        const b = `(${this.l.toString()}${this.tkn.token}${this.r.toString()})`;
        return b;
    }
    /**Detects if variables are in the tree */
    dep() {
        let a = this.tkn.type;
        if (['num', 'const'].includes(a)) return false;
        if (a == "func") return this.l.dep();
        if (a == "op") return this.l.dep() || this.r.dep();
        return true;
    }
    tex() {
        let a = this.tkn.type;
        let t = this.tkn.token;
        if (['num', 'const', 'var'].includes(a)) return t;
        if (a == "func") return `\\${t}(${this.l.tex()})`;
        if (t == '*') return `(${this.l.tex()}${'\\cdot'}${this.r.tex()})`;
        if (t == '/') return `\\frac{${this.l.tex()}}{${this.r.tex()}}`;
        return `({${this.l.tex()}}${t}{${this.r.tex()}})`;
    }
    /**
     * @param {String} prefix 
     * @param {Array} lr 
     * @param {Boolean} m 
     * @param {String} mode 
     * @returns {String}
     */
    print(prefix = 'V', lr = [], m = true, mode = 'v') {
        const root = this;
        if (typeof root == "number") root = new AST(new Object({ token: root }));
        let char = 0;
        if (mode == 'h') char = ['(', ')', '|', '-', 5, '┤', 'R', 'L'];
        else char = ['', '', '—', '|', 2, '', '┐', '┌'];
        const ind = lr => {
            let ch = ' ';
            let ret = ch.repeat(char[4]);
            for (i = 1; i < lr.length; i++) {
                if (lr[i] == lr[i - 1]) ret += ch.repeat(char[4]);
                else ret += char[2] + ch.repeat(char[4] - 1);
            }
            return ret;
        };

        let str = [];
        if (root.l) str.push(root.l.print(char[7], [...lr, 'l'], false, mode));
        if (mode != 'h') str.push((m ? '' : ind(lr)) + ' '.repeat(char[4]) + '(');
        str.push(`${m ? '' : ind(lr)}${prefix}${char[3] + char[0] + root.tkn.token + char[1]}${root.l || root.r ? char[5] : ''}`);
        if (mode != 'h') str.push((m ? '' : ind(lr)) + ' '.repeat(char[4]) + ')');
        if (root.r) str.push(root.r.print(char[6], [...lr, 'r'], false, mode));
        if (m) {
            let x = str.flat(Infinity).map(e => (typeof e == "string" ? e.split('') : e[0].split()));
            let max = 0;
            for (i of x) max = i.length > max ? i.length : max;
            if (mode == 'h') {
                x = x.map(e => e.concat('\n'));
                return x.map(e => e.join('')).join('');
            }
            else {
                x = x.map(e => e.concat(new Array(max - e.length).fill(' ')));
                return (x[0].map((col, i) => x.map(row => row[i]))).map(e => e.join('')).join('\n');
            }
        }
        return str;
    }
    /**
     * 
     * @param {Number} mode
     * @returns {AST}
     */
    contract(mode = 0) {
        if (this.tkn.type == 'num') return this;
        else if (['const', 'var'].includes(this.tkn.type)) {
            if (mode == 0) return this;
            switch (this.tkn.token) {
                case 'e': return Math.E;
                case 'pi': return Math.PI;
                default: return this;
            }
        }
        else if (this.tkn.type == 'func') {
            let a = this.l.contract(mode);
            if (a.tkn.type == "num") {
                if (this.tkn.token == "ln") return new AST(new Object({ token: Math.log(Number(a.tkn.token)), type: 'num' }));
                else return new AST(new Object({ token: Math[this.tkn.token](Number(a.tkn.token)), type: "num" }));
            } else {
                return new AST(new Object({ token: this.tkn.token, ...rules[0].data }), a);//`${String(tree.tkn.token)}(${a})`;
            }
        }
        else if (this.tkn.type == "op") {
            let a = this.l.contract(mode);
            let b = this.r.contract(mode);
            const apply = (op) => new AST(new Object({ token: eval(`Number(a.tkn.token)${op}Number(b.tkn.token)`) }));
            if (a.tkn.type == "num" && b.tkn.type == "num") switch (this.tkn.token) {
                case "^": return apply('**');
                default: return apply(this.tkn.token);
            } else return new AST(new Object({ token: this.tkn.token }), a, b);//`(${a}${String(tree.tkn.token)}${b})`;
        }
        else throw Error;
    }
    simplify(rt=true) {
        /* need to add a while loop
         * while (x!=x.simplify) x=x.simplify
         *  -check side effects
         */
        let a = this.tkn.type;
        let t = this.tkn.token;
        if (['num', 'const', 'var'].includes(a)) return this;
        if (a == "func") {
            switch (t) {//eventually put sin(a+b) etc.
                case "sin":
                    if (this.l.tkn.token == "asin") return this.l.l.simplify();  //sin asin
                    break;
                case "cos":
                    if (this.l.tkn.token == "acos") return this.l.l.simplify(); //cos acos
                    break;
                case "tan":
                    if (this.l.tkn.token == "atan") return this.l.l.simplify(); //tan atan
                    break;
                case "ln":
                    if (this.l.tkn.token == "^") //ln(a^b)
                        return new AST(new Object({ token: '*', type: "op" }),
                            this.l.r,
                            new AST(new Object({ token: 'ln', type: "func" }), this.l.l)
                        ).simplify();
                    if (this.l.tkn.token == "e") //ln(e) = 1
                        return new AST(new Object({ token: 1, type: "num" })).simplify();
                    break;
                case "sqrt":
                    return new AST(
                        new Object({ token: '^', type: 'op' }), this.l,
                        new AST(new Object({ token: "0.5", type: "num" }))).simplify();//^1/2
                    break;
                case "asin":
                    if (this.l.tkn.token == "sin") return this.l.l.simplify();
                    break;
                case "acos":
                    if (this.l.tkn.token == "cos") return this.l.l.simplify();
                    break;
                case "atan":
                    if (this.l.tkn.token == "tan") return this.l.l.simplify();
                    break;
            }
            this.left(this.l.simplify());
            return this;
        };//everything but op caught by here
        let e = [this.l, this.r].map(e => e.simplify());
        if (t == '+') {
            if (e[0].tkn.type == "num" && !Number(e[0].tkn.token)) return this.r.simplify();
            if (e[1].tkn.type == "num" && !Number(e[1].tkn.token)) return this.l.simplify();
            if (rt)return this.combineLikeTerms()
            //reduction rule 1
            // if (e[0].tkn.token == e[1].tkn.token && ["num", "var", "const"].includes(e[0].tkn)) return AST.op('*', AST.num(2), e[0]);
            // let sum = this.collectSum().map(e => e.factor());
            // console.log('::',...sum,'::')
        } else if (t == '*') {
            if (e[0].tkn.type == "num" && !Number(e[0].tkn.token)) return AST.num(0);
            if (e[1].tkn.type == "num" && !Number(e[1].tkn.token)) return AST.num(0);
            if (e[0].tkn.type == "num" && Number(e[0].tkn.token) == 1) return this.r.simplify();
            if (e[1].tkn.type == "num" && Number(e[1].tkn.token) == 1) return this.l.simplify();
        } else if (t == '-') {
            if (e[0].tkn.type == "num" && !Number(e[0].tkn.token)) return AST.op('*', AST.num(-1), this.r.simplify()).simplify();
            if (e[1].tkn.type == "num" && !Number(e[1].tkn.token)) return this.l.simplify();
        } else if (t == '/') {//a/x, 0/x, x/1
            if (e[0].tkn.type == "num" && !Number(e[0].tkn.token)) return AST.num(0);
            if (e[0].tkn.type == "num") return new AST(
                Object({ token: '*', type: "num" }),
                this.l.simplify(),
                new AST(new Object({ token: "^", type: "op" }), this.r.simplify(), AST.num(-1)).simplify()
            ).simplify();//a/x = a * x^-1
            if (e[1].tkn.type == "num" && Number(e[1].tkn.token) == 1) return this.l.simplify();
        } else if (t == '^') {//x^1, x^0, ^(^(x,a),)
            if (e[1].tkn.type == "num" && !Number(e[1].tkn.token)) return AST.num(1);
            if (e[1].tkn.type == "num" && Number(e[1].tkn.token) == 1) return this.l.simplify();
            if (e[0].tkn.token == "^") return AST.op('^',
                this.l.l.simplify(),
                AST.op('*', this.l.r.simplify(), this.r.simplify()).contract()
            );
        }
        this.left(e[0]);
        this.right(e[1]);
        return this;
    }
    collectSum() {//add support for minus
        if (this.tkn.token == '+') return [this.l.collectSum(), this.r.collectSum()].flat();
        if (this.tkn.token == '-') return [this.l.collectSum(), AST.op('*', AST.num(-1), this.r)].flat();
        return [this];
    }
    factor() {
        if (this.tkn.token == '*') return [this.l.factor(), this.r.factor()].flat();
        if (this.tkn.token == '/') return [this.l.factor(), AST.op('^', this.r, AST.num(-1)).contract()].flat();
        return [this];
    }
    negative() {
        if (this.tkn.type == 'num') return AST.num(-1 * Number(this.tkn.token));
        return AST.op('*', AST.num(-1), this);
    }
    combineLikeTerms() {
        let sum = this.collectSum().map(e => e.factor().map(w => w.simplify()));
        let table = {};
        let n = 0;
        for (i in sum) {
            let term = sum[i];
            if (term.length == 1 && term[0].tkn.type == "num") {
                n += Number(term[0].tkn.token);
                continue;
            }
            let numpart = term.filter(x => (x.tkn.type == "num")).map(e => Number(e.tkn.token)).concat(1).reduce((a, b) => a * b, 1);
            // console.log(numpart)
            let a = term.filter(x => (x.tkn.type != "num"));//maybe find diff classifier
            let temp = {};
            for (let i of a) temp[i] = !temp[i] ? 1 : temp[i] + 1;
            let varpart = Object.keys(temp).map(e => temp[e] == 1 ? e : AST.op('^', toast(tokenize(e)).simplify(), AST.num(temp[e])).simplify().toString()).sort().join('*');
            table[varpart] = table[varpart] == null ? numpart : table[varpart] + numpart;
        }
        table = Object.keys(table).map(e => AST.op('*', AST.num(table[e]), toast(tokenize(e)))).reduce((a, b) => AST.op('+', a, b), AST.num(n)).simplify(false);
        return table;
    }
    numDeriv(x,v='x') {
        let h=Number.EPSILON
        let a = (calc(this, 2, { [v]: x + h }) - calc(this, 2, { [v]: x }))
        let b = (calc(this, 2, { [v]: x - h }) - calc(this, 2, { [v]: x }))
        // console.log(':',a/h,-b/h)
        return Math.round((a - b) / (2 * h) * (10**10)) / 10**10
    }
    /**
     * @param {Number} n 
     * @returns {AST}
     */
    static num(n) {
        return new AST(new Object({ token: n, type: "num" }));
    }
    static var(n) {
        return new AST(new Object({ token: n, type: "var" }));
    }
    /**
     * @param {String} op 
     * @param {AST} a 
     * @param {AST} b 
     * @returns {AST}
     */
    static op(op, a, b) {
        return new AST(new Object({ token: op, type: "op" }), a, b);
    }
    get log() {
        return this.tkn.token + ((this.l != null || this.r != null) ? `(${this.l.log || ''}${this.l != null && this.r != null ? ', ' : ''}${this.r.log || ''})` : '');
    }
}
/**
 * @type {Array<{key:String,data:*}>}
 * @description Set of rules
 */
const rules = [
    {
        key: "_?(?:sin|cos|tan|ln|sqrt|asin|acos|atan)",
        data: {
            type: "func",
            args: 1,
            precedence: 4
        }
    },
    {
        key: "e|i|pi",
        data: {
            type: "const"
        }
    },
    {
        key: "[\\^]",
        data: {
            type: "op",
            args: 2,
            precedence: 3
        }
    },
    {
        key: "[\\*\\/]",
        data: {
            type: "op",
            args: 2,
            precedence: 2
        }
    },
    {
        key: "[\\+\\-]",
        data: {
            type: "op",
            args: 2,
            precedence: 1
        }
    },
    { key: "[(\\[]", data: { type: "left" } },
    { key: "[)\\]]", data: { type: "right" } },
    { key: "[0-9.,_]+", data: { type: "num" } },
    { key: "[a-zA-Z]", data: { type: "var" } }
];
/**
 * @description Converts expression into tokens
 * @param {String} expression 
 * @returns {Array<{token:String,type:String}>} tokens
 */
function tokenize(expression) {
    let exprs = [expression.replace(/ /g, '')];
    let [opens, closes] = [(exprs[0].match(/\(/g) || []).length, (exprs[0].match(/\)/g) || []).length];
    exprs[0] += ")".repeat(opens - closes);
    let p = [...exprs[0].matchAll(/\d[a-zA-Z(]/g)].map(e => e.index);
    for (let i = 0; i < p.length; i++) {
        exprs[0] = exprs[0].slice(0, p[i] + 1 + i) + '*' + exprs[0].slice(p[i] + 1 + i);
    }
    p = [...exprs[0].matchAll(/(\(-|[+\-*/^]-)/g)].map(e => e.index);
    if (exprs[0][0] == '-') exprs[0] = '_' + exprs[0].slice(1);
    for (let i = 0; i < p.length; i++) {
        exprs[0] = exprs[0].slice(0, p[i] + 1) + '_' + exprs[0].slice(p[i] + 2);
    }

    let output = exprs;
    for (r in rules) {
        // console.log("===", rules[r].data.type,"===\t",rules[r].key)
        output = output.map(a => {
            // console.log(a)
            if (typeof a == "object") return a;
            let key = new RegExp(rules[r].key, 'g');
            const split = a.split(key);
            let match = (a.match(key) || []).map(e => new Object({ token: e, ...rules[r].data }));
            let combine = [split[0]];
            // console.log(split,match)
            for (i = 0; i < match.length; i++) {
                combine.push(match[i], split[i + 1]);
            }
            return combine;
        }).flat();
    }
    output = output.filter(x => typeof x != "string");

    let l = output[0].type;
    for (let i = 1; i < output.length; i++) {
        let a = output[i].type;
        if (['var', 'const', 'num'].includes(a) && ['var', 'const', 'num'].includes(l)) {
            output.splice(i, 0, new Object({ token: '*', ...rules[3].data }));
            i++;
        }
        l = a;
    }
    return output;
}
/**
 * @description Converts to AST
 * @param {Array<{token:String,type:String}>} tokens 
 * @returns {AST}
 */
function toast(tokens) {
    let ops = [];
    let nodes = [];
    for (let token of tokens) {
        if (token.type == 'num') token.token = token.token.replace('_', '-');
        if (['num', 'var', 'const'].includes(token.type)) nodes.push(new AST(token));
        if (token.type == "left") ops.push(token);
        if (token.type == "right") {
            while (ops.length > 0 && !(ops[ops.length - 1].type == 'left')) {
                let tk = ops.pop();
                let add = new AST(tk);
                if (tk.args > 1) add.right(nodes.pop());
                add.left(nodes.pop());
                nodes.push(add);
            }
            ops.pop();
        }
        if (['op', 'func'].includes(token.type)) {
            while (ops.length > 0 && ops[ops.length - 1].precedence >= token.precedence && (token.type != "left")) {
                let tk = ops.pop();
                let add = new AST(tk);
                if (tk.args > 1) add.right(nodes.pop());
                add.left(nodes.pop());
                nodes.push(add);
            }
            ops.push(token);
        }
        // console.log(ops,nodes)
    }
    // console.log('\n\n',ops,'\n',nodes,'\n\n')
    while (ops.length > 0) {
        let tk = ops.pop();
        let add = new AST(tk);
        if (tk.args > 1) add.right(nodes.pop());
        add.left(nodes.pop());
        nodes.push(add);
    }
    const fixnegfunc = tree => {
        if (!tree) return null;
        let t = tree.tkn;
        if (t.token[0] == '_') {
            t.token = t.token.slice(1);
            return new AST({ token: '*', type: 'op', args: 2, precedence: 2 },
                new AST({ token: '-1', type: 'num' }),
                fixnegfunc(tree));
        }
        tree.left(fixnegfunc(tree.l));
        tree.right(fixnegfunc(tree.r));
        return tree;
    };
    // console.log(nodes)
    return fixnegfunc(nodes.pop());
}
/**
 * @param {AST} tree
 * @returns {AST} 
 */
function calc(tree, mode = 0, params={}) {
    // console.log(tree)
    if (tree.tkn.type == 'num') return Number(tree.tkn.token);
    if (mode == 2 && ['var', 'const'].includes(tree.tkn.type)) {
        if (tree.tkn.token == 'e') return Math.E;
        if (tree.tkn.token == 'pi') return Math.PI;
        if (Object.keys(params).includes(tree.tkn.token)) return params[tree.tkn.token]
    }
    if (['const', 'var'].includes(tree.tkn.type)) {
        if (mode == 0) return tree;
        switch (tree.tkn.token) {
            case 'e': return Math.E;
            case 'pi': return Math.PI;
            default: return tree;
        }
    }
    else if (tree.tkn.type == 'func') {
        let a = calc(tree.l, mode,params);
        if (typeof a == "number") {
            if (tree.tkn.token == "ln") return Math.log(a);
            else return Math[tree.tkn.token](a);
        } else {
            return new AST(new Object({ token: tree.tkn.token, ...rules[0].data }), a); //`${String(tree.tkn.token)}(${a})`;
        }
    }
    else if (tree.tkn.type == "op") {
        let a = calc(tree.l, mode,params);
        let b = calc(tree.r, mode,params);
        if (typeof a == "number" && typeof b == "number") switch (tree.tkn.token) {
            case "^": return a ** b;
            case "*": return a * b;
            case "/": return a / b;
            case "+": return a + b;
            case "-": return a - b;
        } else return new AST(new Object({ token: tree.tkn.token }), a, b); //`(${a}${String(tree.tkn.token)}${b})`;
    }
    else throw Error;
}
function equivalent(a, b) {
    a = a.simplify();
    b = b.simplify();
    if (a.tkn.token != b.tkn.token) return false;
    if (["const", 'var', "num"].includes(a.tkn.type)) return true;
    if (a.tkn.type == "func") return equivalent(a.l, b.l);
    // if (t == '+') return (equivalent(a.l, b.l) && equivalent(a.r, b.r)) || (equivalent(a.r, b.l) && equivalent(a.l, b.r));
}
const tree = toast(tokenize("3/2x"));
// console.log(...toast(tokenize("2/x")).factor())
console.log(tree.print())
// console.log(tree.numDeriv(0,'x'))

/*SAFE AT
 * 692fd78b5cb2e296810b18746e0a4063ecf6691e
 */
/***TODO
 *  - add args to calc()
 *  - add trig identities, sin(a+b), tan^-1(cos), etc. to AST.simplify()
 * Format
 * 
 * Expr -> Formatted tree
 * 
 *                                        0:simp,1:eval
 *     String       {token:.}[]    AST        AST          String
 *     <Input>  --> Tokenize --> toAst --> simplify ----> printAST --> <Output>
 *                                 \                     ^
 *                                  \ ___(No 2+1=3)____ |
 * 
 * Eq -> solved lvl1: 1 variable   2x+3y=z => x= (z-3y)/2
 * 
 *     String            | <IN>     
 *   <input>  --> solve -| AST       -token+toast
 *                       | SimplAST    -simplify
 *                       | [L:simplAST, R:simplAST]
 *                       | [L:'x' R:simplAST]
 *                       | <OUT>
 */
