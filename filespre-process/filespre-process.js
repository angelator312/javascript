const fs = require('fs/promises');
async function readdef() {
    let de = await fs.readFile('./__def.a312');
    const defl = (de.toString()).split('\n');
    let defs=[];
    for (const item of defl) {
        defs.push({ def: item[0], repl: item.substring(2) });
    }
    return defs;
}
function finddef(c, defs) {
    for (let k = 0; k < defs.length; k++) {
        if (defs[k].def == c) {
            return defs[k].repl;
        }
    }
    return c;
}
async function main() {
    const defs = await readdef();
    const argv = process.argv;
    const argc = argv.length;
    console.log(argc, argv);
    if (argc < 3) {
        console.log("Usage: " + argv[1] + " <file>\n");
        return 1;
    }
    const file = argv[2];
    const s = await fs.readFile(file);
    const ls = (s.toString()).split('\n');
    let z = [];
    let ls2 = [];
    for (let i = 0; i < ls.length; i++) {
        for (let i2 = 0; i2 < ls[i].length; i2++) {
            if (ls[i][i2] == '\\') {
                z.push(i + "." + i2 + "=" + ls[i][i2 + 1]);
            }
        }
    }
    for (let i = 0; i < z.length; i++) {
        const e = z[i];
        const it = e.indexOf("."),ir = e.indexOf("=");
        let ipr1, ipr2,d2="";
        ipr1 = parseInt(e.substring(0, it));
        ipr2 = parseInt(e.substring(it + 1, ir));
        console.log(ipr1, ipr2,d2,e,it,ir);
        d2 += ls[ipr1].substring(0, ipr2);
        console.log(ipr1, ipr2,d2,e,it,ir);
        d2 += finddef(e[e.length - 1], defs) + "  ";
        console.log(ipr1, ipr2,d2,e,it,ir);
        d2 += ls[ipr1].substring(ipr2 + 2);
        console.log(ipr1, ipr2,d2,e,it,ir);
        ls2[ipr1] = d2;
    }
    for (let i = 0; i < ls2.length; i++) {
        if (!ls2[i]) {
          ls2[i] = ls[i];
        }
      }
  
    const outf = await fs.writeFile(file + ".txt",ls2.join("\n"));
    return 0;
}
(async () => {
    await main();
})();