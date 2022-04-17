#!/usr/bin/env node
"use strict";

const asar = require("asar");
const fs = require("fs");
const util = require("util");
const exists = util.promisify(fs.exists);
const asar_path = "/Applications/RunJS.app/Contents/Resources/app.asar";
const resources_path = "/Applications/RunJS.app/Contents/Resources/";


(async () => {
  try {
    await exists(asar_path);
    asar.extractAll(asar_path, resources_path +'dist');
   const data = fs.readFileSync(resources_path + 'dist/entry-bundle.js').toString();
   const newJs = data.replace('const t=s.createVerify("SHA256")', 'return true').replace('const t=u.hostname(),r=process.platform,n=await c();', `return  (f.set(v.autocomplete, !0),
   f.set(v.diagnostics, !0),
   f.set(h.hasValidLicense, !0),
   f.set(h.licenseKey, e),
   f.set(h.newMachineId, !0),
   (A.hasValidLicense = !0),
   w.emit("reload"),
   g.VALID);`);
   fs.writeFileSync(resources_path + 'dist/entry-bundle.js', newJs);
   await asar.createPackage(resources_path +'dist', resources_path + 'app.asar');
   console.log('修改成功, 重启后随意激活');
  } catch (error) {
    console.log("未找到 RunJS.app 请安装到应用程序");
  }
})();



// const t=s.createVerify("SHA256")
// R = (e) => {
//     return true
//    };
//  n.handle(y.LICENSE_ACTION, async (e, { type: t, ...r }) => {
//    switch (t) {
//      case "VALIDATE": {
//        const { key: e } = r;
//        return R(e);
//      }
//      case "ACTIVATE": {
//        const { key: e } = r;
//        return (async ({ key: e }) => {
//          const t = u.hostname(),
//            r = process.platform,
//            n = await c();
        //    return  (f.set(v.autocomplete, !0),
        //    f.set(v.diagnostics, !0),
        //    f.set(h.hasValidLicense, !0),
        //    f.set(h.licenseKey, e),
        //    f.set(h.newMachineId, !0),
        //    (A.hasValidLicense = !0),
        //    w.emit("reload"),
        //    g.VALID);
        //  return m(`${_}/activate`, {
        //    method: "POST",