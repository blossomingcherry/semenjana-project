const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Nunito:wght@400;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --B:#1A3A8F;--B2:#2756C5;--B3:#E8EEFF;
  --R:#D01B1B;--R2:#FF3333;
  --W:#FFFFFF;--OW:#F5F7FF;
  --G:#6B7898;--BD:#D6DCF0;
  --T:#181E2E;--GO:#F5A623;--GR:#1A8F4A;
  --CHK:repeating-conic-gradient(#1A3A8F 0% 25%,#2756C5 0% 50%) 0 0/14px 14px;
}
body{background:var(--OW);font-family:'Nunito',sans-serif;color:var(--T);min-height:100vh}
.app{max-width:480px;margin:0 auto;min-height:100vh;background:var(--W);position:relative;box-shadow:0 0 40px rgba(26,58,143,.15)}
.ck{background:var(--CHK);height:12px}.ck-s{background:var(--CHK);height:8px}

/* QR LANDING */
.qr-page{min-height:100vh;background:var(--B);display:flex;flex-direction:column;align-items:center}
.qr-top{width:100%;text-align:center;padding:36px 24px 24px}
.qr-main-title{font-family:'Oswald',sans-serif;font-size:20px;font-weight:700;color:rgba(255,255,255,.6);letter-spacing:2px}
.qr-semenjana{font-family:'Oswald',sans-serif;font-size:44px;font-weight:700;color:#fff;letter-spacing:5px;margin-top:2px}
.qr-semenjana em{color:var(--R2);font-style:normal}
.qr-ig{font-size:12px;color:rgba(255,255,255,.5);margin-top:6px}
.qr-card{background:#fff;border-radius:20px;padding:24px;margin:0 20px 20px;width:calc(100% - 40px);max-width:380px}
.qr-scan-wrap{background:var(--B3);border:3px solid var(--B);border-radius:14px;padding:20px;display:flex;flex-direction:column;align-items:center;gap:8px;margin-bottom:18px;cursor:pointer;transition:.2s}
.qr-scan-wrap:hover{border-color:var(--R);transform:scale(1.01)}
.qr-scan-label{font-size:11px;color:var(--G);font-weight:700}
.divd{display:flex;align-items:center;gap:8px;margin:14px 0}
.divd-l{flex:1;height:1px;background:var(--BD)}
.divd-t{font-size:11px;color:var(--G)}
.inp{width:100%;border:2px solid var(--BD);border-radius:10px;padding:11px 14px;font-size:14px;font-family:'Nunito',sans-serif;color:var(--T);outline:none;transition:.2s;background:var(--OW);margin-bottom:8px}
.inp:focus{border-color:var(--B);background:#fff}
.btn-b{width:100%;background:var(--B);color:#fff;border:none;border-radius:10px;padding:13px;font-size:14px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:.2s;margin-top:4px}
.btn-b:hover{background:var(--B2);transform:translateY(-1px)}
.btn-b:disabled{background:var(--BD);color:var(--G);cursor:not-allowed;transform:none}
.btn-r{width:100%;background:var(--R);color:#fff;border:none;border-radius:10px;padding:13px;font-size:14px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:.2s;margin-top:8px}
.btn-r:hover{background:#b71515}
.admin-link{text-align:center;margin:10px 0 16px;font-size:11px;color:rgba(255,255,255,.45)}
.admin-link button{background:none;border:none;color:rgba(255,255,255,.65);cursor:pointer;font-size:11px;font-family:'Nunito',sans-serif;text-decoration:underline}

/* HEADER */
.hdr{background:var(--B);position:sticky;top:0;z-index:100;box-shadow:0 2px 12px rgba(26,58,143,.4)}
.hdr-in{padding:10px 16px;display:flex;align-items:center;justify-content:space-between}
.hdr-brand{font-family:'Oswald',sans-serif;font-size:18px;font-weight:700;color:#fff;letter-spacing:1px}
.hdr-brand em{color:var(--R2);font-style:normal}
.hdr-sub{font-size:10px;color:rgba(255,255,255,.5);font-weight:400}
.hdr-r{display:flex;gap:6px;align-items:center}
.hbtn{background:rgba(255,255,255,.1);border:none;color:#fff;padding:5px 10px;border-radius:8px;cursor:pointer;font-size:12px;font-family:'Nunito',sans-serif;display:flex;align-items:center;gap:4px;transition:.2s}
.hbtn:hover{background:rgba(255,255,255,.2)}
.bge{background:var(--R);color:#fff;border-radius:99px;padding:1px 6px;font-size:10px;font-weight:800}

/* MENU HERO */
.hero{background:var(--B);padding:18px 16px 14px;position:relative;overflow:hidden}
.hero::after{content:'SEMENJANA';position:absolute;right:-8px;top:50%;transform:translateY(-50%);font-family:'Oswald',sans-serif;font-size:48px;font-weight:700;color:rgba(255,255,255,.05);letter-spacing:2px;white-space:nowrap;pointer-events:none}
.hero-t{font-family:'Oswald',sans-serif;font-size:22px;font-weight:700;color:#fff;line-height:1.1}
.hero-t em{color:var(--R2);font-style:normal}
.hero-s{font-size:11px;color:rgba(255,255,255,.55);margin-top:3px}
.hero-ig{font-size:11px;color:var(--GO);margin-top:4px;font-weight:700}

/* KETAN HITAM SECTION */
.kh-sec{padding:16px 16px 8px}
.sec-hd{display:flex;align-items:center;gap:8px;margin-bottom:12px}
.sec-hd h2{font-family:'Oswald',sans-serif;font-size:19px;font-weight:700;color:var(--B);letter-spacing:.5px;white-space:nowrap}
.sec-hd-ln{flex:1;height:2px;background:var(--R)}
.sec-hd-tag{font-size:10px;color:var(--R);font-weight:800;white-space:nowrap}
.kh-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.kh-card{border-radius:14px;overflow:hidden;border:2px solid var(--BD);cursor:pointer;transition:.2s;background:var(--W)}
.kh-card:hover{border-color:var(--B);transform:translateY(-2px);box-shadow:0 6px 20px rgba(26,58,143,.15)}
.kh-img{height:96px;display:flex;align-items:center;justify-content:center;font-size:52px;position:relative;overflow:hidden}
.kh-img img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0}
.kh-img .kh-emoji{position:relative;z-index:1;font-size:52px}
.kh-badge{position:absolute;top:7px;right:7px;background:var(--R);color:#fff;border-radius:99px;padding:2px 8px;font-size:10px;font-weight:800;font-family:'Oswald',sans-serif;z-index:2}
.kh-body{padding:9px 10px 10px}
.kh-name{font-weight:800;font-size:13px;color:var(--B);font-family:'Oswald',sans-serif;margin-bottom:2px}
.kh-desc{font-size:10px;color:var(--G);line-height:1.4;margin-bottom:8px}
.kh-add{background:var(--B);color:#fff;border:none;border-radius:7px;padding:7px 0;width:100%;font-size:12px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;transition:.2s}
.kh-add:hover{background:var(--B2)}

/* CAT SCROLL */
.cat-sc{display:flex;gap:7px;padding:11px 16px;overflow-x:auto;scrollbar-width:none;border-bottom:2px solid var(--BD);background:var(--W);position:sticky;top:60px;z-index:50}
.cat-sc::-webkit-scrollbar{display:none}
.cat-btn{flex-shrink:0;background:var(--OW);border:2px solid var(--BD);border-radius:20px;padding:6px 12px;font-size:12px;cursor:pointer;font-family:'Nunito',sans-serif;color:var(--T);font-weight:700;transition:.2s;white-space:nowrap}
.cat-btn.on{background:var(--B);color:#fff;border-color:var(--B)}

/* MENU LIST */
.m-list{padding:10px 16px;display:flex;flex-direction:column;gap:9px}
.m-card{background:var(--W);border:2px solid var(--BD);border-radius:14px;padding:11px;display:flex;align-items:center;gap:11px;transition:.2s}
.m-card:hover{border-color:var(--B2);box-shadow:0 3px 14px rgba(26,58,143,.1)}
.m-img{width:58px;height:58px;background:var(--B3);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:30px;flex-shrink:0;border:2px solid var(--BD);position:relative;overflow:hidden}
.m-img img{width:100%;height:100%;object-fit:cover;border-radius:8px}
.m-fav{position:absolute;top:-4px;right:-4px;font-size:13px;z-index:1}
.m-body{flex:1;min-width:0}
.m-name{font-weight:800;font-size:13px;color:var(--B);line-height:1.2}
.m-desc{font-size:10px;color:var(--G);margin:2px 0 5px;line-height:1.3}
.m-price{font-family:'Oswald',sans-serif;font-size:15px;color:var(--R);font-weight:700}
.qc{display:flex;align-items:center;gap:5px;flex-shrink:0}
.qb{background:var(--B3);border:2px solid var(--B);border-radius:7px;width:27px;height:27px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:15px;font-weight:700;color:var(--B);transition:.2s;user-select:none}
.qb:hover{background:var(--B);color:#fff}
.qb-d{background:var(--OW);border:2px solid var(--BD);border-radius:7px;width:27px;height:27px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:15px;font-weight:700;color:var(--T);transition:.2s;user-select:none}
.qb-d:hover{background:var(--R);color:#fff;border-color:var(--R)}
.qn{font-weight:800;font-size:14px;min-width:20px;text-align:center;color:var(--B)}
.add-c{background:var(--B);border:none;color:#fff;width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;flex-shrink:0;transition:.2s}
.add-c:hover{background:var(--R)}

/* FLOAT CART */
.fcart{position:fixed;bottom:72px;left:50%;transform:translateX(-50%);background:var(--R);color:#fff;border:none;border-radius:14px;padding:13px 22px;display:flex;align-items:center;gap:11px;cursor:pointer;box-shadow:0 8px 28px rgba(208,27,27,.4);font-family:'Nunito',sans-serif;font-size:14px;font-weight:700;z-index:200;max-width:420px;width:calc(100% - 28px);transition:.2s}
.fcart:hover{transform:translateX(-50%) translateY(-2px)}
.fc-in{flex:1;text-align:left}
.fc-sub{font-size:10px;color:rgba(255,255,255,.7);font-weight:400}
.fc-pr{font-family:'Oswald',sans-serif;font-size:17px}

/* BOTTOM NAV */
.bnav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:480px;background:var(--B);display:flex;justify-content:space-around;padding:8px 0 12px;z-index:150;box-shadow:0 -4px 20px rgba(26,58,143,.35)}
.nb{background:none;border:none;color:rgba(255,255,255,.4);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:2px;padding:4px 10px;border-radius:10px;transition:.2s;font-family:'Nunito',sans-serif;position:relative}
.nb.on{color:var(--GO)}
.ni{font-size:20px}.nl{font-size:9px;font-weight:700}

/* PAGES */
.pg{padding:16px;padding-bottom:84px}
.pg-title{font-family:'Oswald',sans-serif;font-size:21px;color:var(--B);margin-bottom:12px;font-weight:700}

/* CART */
.ci{background:var(--W);border:2px solid var(--BD);border-radius:12px;padding:11px;display:flex;gap:10px;align-items:center;margin-bottom:8px}
.ci-img{font-size:26px;width:42px;height:42px;background:var(--B3);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden}
.ci-img img{width:100%;height:100%;object-fit:cover;border-radius:6px}
.ci-n{font-weight:700;font-size:13px;color:var(--B)}
.ci-p{font-size:12px;color:var(--G)}
.tot-box{background:var(--B);border-radius:14px;padding:16px;margin:14px 0;color:#fff}
.tot-r{display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;opacity:.75}
.tot-m{display:flex;justify-content:space-between;font-family:'Oswald',sans-serif;font-size:22px;margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,.2)}
.notes-i{width:100%;background:var(--OW);border:2px solid var(--BD);border-radius:10px;padding:10px 14px;font-family:'Nunito',sans-serif;font-size:13px;color:var(--T);outline:none;resize:none;height:68px;margin-bottom:12px}
.notes-i:focus{border-color:var(--B)}

/* PAYMENT */
.pm-opts{display:flex;flex-direction:column;gap:9px;margin:14px 0}
.pm-opt{border:2px solid var(--BD);border-radius:12px;padding:14px;cursor:pointer;transition:.2s;display:flex;align-items:center;gap:12px}
.pm-opt.sel{border-color:var(--B);background:var(--B3)}
.pm-ico{font-size:30px}
.pm-ttl{font-weight:800;color:var(--B);font-size:14px}
.pm-sub{font-size:11px;color:var(--G)}
.pm-ck{margin-left:auto;width:21px;height:21px;border-radius:50%;border:2px solid var(--BD);display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0}
.pm-ck.on{background:var(--B);border-color:var(--B);color:#fff}
.qr-pay{background:var(--B3);border:2px dashed var(--B);border-radius:13px;padding:20px;text-align:center;margin:10px 0}
.qr-pay-amt{font-family:'Oswald',sans-serif;font-size:26px;color:var(--R);font-weight:700;margin-top:8px}
.btn-sm-g{width:100%;background:var(--OW);color:var(--T);border:2px solid var(--BD);border-radius:10px;padding:12px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;margin-top:8px}

/* RECEIPT */
.rcpt{background:#fff;border:2px solid var(--BD);border-radius:16px;margin-bottom:14px;overflow:hidden}
.rcpt-hdr{background:var(--B);color:#fff;padding:16px 16px 14px;text-align:center}
.rcpt-brand{font-family:'Oswald',sans-serif;font-size:28px;font-weight:700;letter-spacing:2px}
.rcpt-brand em{color:var(--R2);font-style:normal}
.rcpt-body{padding:14px}
.rcpt-row{display:flex;justify-content:space-between;font-size:12px;padding:5px 0;border-bottom:1px dashed var(--BD)}
.rcpt-tot{display:flex;justify-content:space-between;font-family:'Oswald',sans-serif;font-size:20px;padding:12px 0 0;color:var(--B);font-weight:700}
.rcpt-ft{background:var(--B3);border-top:2px dashed var(--BD);padding:12px;text-align:center;font-size:11px;color:var(--B);font-weight:700}
.ok-chip{display:inline-block;background:var(--GR);color:#fff;border-radius:20px;padding:3px 14px;font-size:12px;font-weight:700;margin:6px 0}

/* ORDERS STATUS */
.os-card{background:#fff;border:2px solid var(--BD);border-radius:13px;padding:14px;margin-bottom:10px}
.os-hd{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px}
.status-pending{background:#FFF3CD;color:#856404;border-radius:20px;padding:3px 10px;font-size:11px;font-weight:700}
.status-preparing{background:#CCE5FF;color:#004085;border-radius:20px;padding:3px 10px;font-size:11px;font-weight:700}
.status-ready{background:#D4EDDA;color:#155724;border-radius:20px;padding:3px 10px;font-size:11px;font-weight:700}
.status-done{background:var(--OW);color:var(--G);border-radius:20px;padding:3px 10px;font-size:11px;font-weight:700}
.prog{height:5px;background:var(--BD);border-radius:3px;margin-top:10px;overflow:hidden}
.prog-f{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--B),var(--R2));transition:width 1s}

/* ADMIN */
.adm-hdr{background:var(--B);padding:13px 16px;display:flex;align-items:center;justify-content:space-between}
.adm-ttl{font-family:'Oswald',sans-serif;font-size:17px;font-weight:700;color:#fff;letter-spacing:1px}
.adm-sub{font-size:10px;color:rgba(255,255,255,.45)}
.adm-tabs{display:flex;background:var(--B);border-top:1px solid rgba(255,255,255,.1)}
.atab{flex:1;background:none;border:none;color:rgba(255,255,255,.4);padding:10px 4px;cursor:pointer;font-family:'Nunito',sans-serif;font-size:11px;font-weight:700;display:flex;flex-direction:column;align-items:center;gap:2px;transition:.2s;border-bottom:3px solid transparent}
.atab.on{color:var(--GO);border-bottom-color:var(--GO)}
.atab-i{font-size:17px}
.stat3{display:flex;gap:8px;margin-bottom:14px}
.scard{flex:1;background:#fff;border:2px solid var(--BD);border-radius:11px;padding:11px 8px;text-align:center}
.scard-n{font-family:'Oswald',sans-serif;font-size:22px}
.scard-l{font-size:10px;color:var(--G);font-weight:700}
.ao-card{background:#fff;border:2px solid var(--BD);border-radius:12px;padding:13px;margin-bottom:9px}
.ao-hd{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:7px}
.ao-id{font-weight:800;font-size:12px;color:var(--B)}
.ao-tm{font-size:11px;color:var(--G)}
.ao-tbl{font-size:12px;color:var(--T);margin-bottom:3px}
.ao-items{font-size:11px;color:var(--G);margin-bottom:8px;line-height:1.5}
.ao-ft{display:flex;justify-content:space-between;align-items:center}
.ao-tot{font-family:'Oswald',sans-serif;font-size:16px;color:var(--R)}
.ssel{border:2px solid var(--BD);border-radius:8px;padding:5px 9px;font-size:12px;background:var(--OW);cursor:pointer;outline:none;font-family:'Nunito',sans-serif;font-weight:700;color:var(--T)}
.am-card{background:#fff;border:2px solid var(--BD);border-radius:12px;padding:11px;margin-bottom:7px;display:flex;align-items:center;gap:11px}
.am-img{font-size:26px;width:42px;height:42px;background:var(--B3);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden}
.am-img img{width:100%;height:100%;object-fit:cover;border-radius:6px}
.am-n{font-weight:700;font-size:13px;color:var(--B)}
.am-m{font-size:10px;color:var(--G)}
.am-p{font-family:'Oswald',sans-serif;font-size:14px;color:var(--R)}
.am-acts{display:flex;gap:5px;flex-shrink:0}
.ib{background:var(--OW);border:2px solid var(--BD);border-radius:7px;width:30px;height:30px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px;transition:.2s}
.ib:hover{background:var(--B3);border-color:var(--B)}
.ib.d:hover{background:#ffe0e0;border-color:var(--R)}

/* UPLOAD FOTO */
.img-upload-box{border:2px dashed var(--BD);border-radius:10px;padding:14px;text-align:center;cursor:pointer;transition:.2s;margin-bottom:9px;background:var(--OW)}
.img-upload-box:hover{border-color:var(--B);background:var(--B3)}
.img-preview{width:100%;height:130px;object-fit:cover;border-radius:8px;margin-bottom:9px;border:2px solid var(--BD)}

/* CHART */
.chart-wrap{background:#fff;border:2px solid var(--BD);border-radius:13px;padding:14px;margin-bottom:13px;overflow-x:auto}
.chart-ttl{font-family:'Oswald',sans-serif;font-size:15px;color:var(--B);margin-bottom:12px;font-weight:700}
.bar-ch{display:flex;align-items:flex-end;gap:5px;height:110px}
.b-col{display:flex;flex-direction:column;align-items:center;gap:3px;flex:1;min-width:0}
.bar{border-radius:5px 5px 0 0;min-width:22px;width:100%;transition:.5s}
.b-lbl{font-size:9px;color:var(--G);font-weight:700}
.b-val{font-size:8px;color:var(--B);font-weight:700;white-space:nowrap}
.cstats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;margin-bottom:12px}
.cst{background:var(--B3);border:2px solid var(--BD);border-radius:10px;padding:11px 8px;text-align:center}
.cst-n{font-family:'Oswald',sans-serif;font-size:18px;color:var(--B)}
.cst-l{font-size:10px;color:var(--G);font-weight:700}

/* MODAL */
.mbg{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:500;display:flex;align-items:flex-end;justify-content:center}
.modal{background:#fff;border-radius:20px 20px 0 0;padding:22px;width:100%;max-width:480px;max-height:85vh;overflow-y:auto}
.modal h3{font-family:'Oswald',sans-serif;font-size:19px;color:var(--B);margin-bottom:14px}
.mlbl{font-size:12px;font-weight:700;color:var(--G);margin-bottom:3px;display:block}
.mi{width:100%;border:2px solid var(--BD);border-radius:8px;padding:9px 12px;font-size:13px;font-family:'Nunito',sans-serif;color:var(--T);outline:none;margin-bottom:9px;transition:.2s}
.mi:focus{border-color:var(--B)}
.msel{width:100%;border:2px solid var(--BD);border-radius:8px;padding:9px 12px;font-size:13px;font-family:'Nunito',sans-serif;background:var(--OW);outline:none;margin-bottom:9px}
.mft{display:flex;gap:8px;margin-top:4px}
.mbtn-b{flex:1;background:var(--B);color:#fff;border:none;border-radius:8px;padding:12px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif}
.mbtn-g{flex:1;background:var(--OW);color:var(--T);border:2px solid var(--BD);border-radius:8px;padding:12px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif}

/* NOTIF */
.notif{position:fixed;top:68px;left:50%;transform:translateX(-50%);background:var(--B);color:#fff;padding:9px 20px;border-radius:99px;font-size:13px;z-index:999;box-shadow:0 6px 20px rgba(26,58,143,.3);animation:nIn .3s ease;font-weight:700;border-left:4px solid var(--GO);max-width:90%;white-space:nowrap}
@keyframes nIn{from{opacity:0;transform:translateX(-50%) translateY(-14px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

.empty{text-align:center;padding:48px 16px;color:var(--G)}
.empty-e{font-size:46px;display:block;margin-bottom:10px}
.dv{height:1px;background:var(--BD);margin:10px 0}

@media(max-width:370px){.kh-grid{grid-template-columns:1fr}.qr-semenjana{font-size:36px}}
`;

export default CSS;
