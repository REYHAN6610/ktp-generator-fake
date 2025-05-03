/*

E-KTP FAKE GENERATOR V1.0
CODE BY REYHAN6610
#stayopensource #github #nodejs #pemula

*/
const fs=require("fs"),PImage=require("pureimage"),Jimp=require("jimp"),readline=require("readline").createInterface({input:process.stdin,output:process.stdout});
function prompt(q){return new Promise(r=>readline.question(q,a=>r(a))}
const s=[25,32,16,40];
async function main(){
try{
console.log("\n=== INPUT DATA KTP ===");
const d={
provinsi:await prompt("Provinsi (contoh: DKI JAKARTA): ")||"DKI JAKARTA",
kota:await prompt("Kota/Kabupaten (contoh: JAKARTA SELATAN): ")||"JAKARTA SELATAN",
nik:await prompt("NIK (16 digit): ")||"3171030101010001",
nama:await prompt("Nama Lengkap: ")||"NAMA LENGKAP",
ttl:await prompt("Tempat/Tgl Lahir (contoh: JAKARTA, 01-01-1990): ")||"JAKARTA, 01-01-1990",
jenis_kelamin:await prompt("Jenis Kelamin (LAKI-LAKI/PEREMPUAN): ")||"LAKI-LAKI",
golongan_darah:await prompt("Gol. Darah (contoh: A): ")||"A",
alamat:await prompt("Alamat (contoh: JL. CONTOH NO. 1): ")||"JL. CONTOH NO. 1",
"rt/rw":await prompt("RT/RW (contoh: 001/002): ")||"001/002",
"kel/desa":await prompt("Kelurahan/Desa: ")||"KELURAHAN",
kecamatan:await prompt("Kecamatan: ")||"KECAMATAN",
agama:await prompt("Agama: ")||"ISLAM",
status:await prompt("Status Perkawinan: ")||"BELUM KAWIN",
pekerjaan:await prompt("Pekerjaan: ")||"KARYAWAN SWASTA",
kewarganegaraan:await prompt("Kewarganegaraan: ")||"WNI",
masa_berlaku:await prompt("Masa Berlaku: ")||"SEUMUR HIDUP",
terbuat:await prompt("Tanggal Dibuat (DD-MM-YYYY): ")||"01-01-2023",
tandatangan:await prompt("Nama untuk Tanda Tangan: ")||"NAMA"
};
console.log("\n=== FOTO KTP ===");
let p;while(1){
const c=await prompt("Pilih sumber foto:\n1. Default (./mukelu.jpg)\n2. Custom path\nPilihan (1/2): ");
if(c==="1"){p="./mukelu.jpg";break}else if(c==="2"){
p=await prompt("Masukkan path lengkap foto: ");
try{await fs.promises.access(p);break}catch{console.log("File tidak ditemukan, silakan coba lagi")}
}else console.log("Pilihan tidak valid")}
d.pas_photo=p;
console.log("\nMemproses KTP...");
await generateKTP(d);
}catch(e){console.error("Error:",e.message)}finally{readline.close()}}
async function registerFonts(){
await Promise.all([
PImage.registerFont("./Arrial.ttf","Arrial").load(),
PImage.registerFont("./tandatangan.ttf","Sign").load(),
PImage.registerFont("./styleHuruf.ttf","Ocr").load()])}
async function generateKTP(d){
await registerFonts();
const t=await Jimp.read("./Template.png"),ph=await Jimp.read(d.pas_photo);
ph.resize(120,160);
const i=PImage.make(t.bitmap.width,t.bitmap.height),c=i.getContext("2d");
const ti=await PImage.decodePNGFromStream(fs.createReadStream("./Template.png"));
c.drawImage(ti,0,0);
const tp="./temp_photo.png";
await ph.writeAsync(tp);
const pp=await PImage.decodePNGFromStream(fs.createReadStream(tp));
c.drawImage(pp,530,140);
c.fillStyle="black";
c.font=`${s[0]}pt Arrial`;
c.fillText(`PROVINSI ${d.provinsi.toUpperCase()}`,214,45);
c.fillText(`KOTA ${d.kota.toUpperCase()}`,270,70);
c.font=`${s[0]}pt Ocr`;
c.fillText(d.nik,170,123);
c.font=`${s[2]}pt Arrial`;
c.fillText(d.nama.toUpperCase(),190,158);
c.fillText(d.ttl.toUpperCase(),190,180);
c.fillText(d.jenis_kelamin.toUpperCase(),190,200);
c.fillText(d.golongan_darah.toUpperCase(),463,200);
c.fillText(d.alamat.toUpperCase(),190,224);
c.fillText(d["rt/rw"].toUpperCase(),190,245);
c.fillText(d["kel/desa"].toUpperCase(),190,267);
c.fillText(d.kecamatan.toUpperCase(),190,290);
c.fillText(d.agama.toUpperCase(),190,317);
c.fillText(d.status.toUpperCase(),190,335);
c.fillText(d.pekerjaan.toUpperCase(),190,355);
c.fillText(d.kewarganegaraan.toUpperCase(),190,378);
c.fillText(d.masa_berlaku.toUpperCase(),190,399);
c.fillText(`KOTA ${d.kota.toUpperCase()}`,553,354);
c.fillText(d.terbuat,570,372);
c.font=`${s[3]}pt Sign`;
const sg=d.tandatangan?d.tandatangan.split(" ")[0]:"TTD";
c.fillText(sg,565,415);
const o=`./storage/emulated/0/Download/KTP_${d.nama.replace(/\s+/g,'_')}.png`;
await PImage.encodePNGToStream(i,fs.createWriteStream(o));
console.log(`KTP berhasil dibuat: ${o}`)}
main();