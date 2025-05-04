/*

E-KTP FAKE GENERATOR V1.0
CODE BY REYHAN6610
#stayopensource #github #nodejs #pemula

*/const fs = require("fs");
const PImage = require("pureimage");
const Jimp = require("jimp");
const readline = require("readline");
const path = require("path");

const size = [25, 32, 16, 40];
console.clear();
// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function getInputData() {
  console.log(`
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣾⡿⠿⢿⣦⡀⠀⠀⠀⠀⠀⠀
                ⠀⠀⢀⣶⣿⣶⣶⣶⣦⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⠟⠁⣀⣤⡄⢹⣷⡀⠀⠀⠀⠀⠀
                ⠀⠀⢸⣿⡧⠤⠤⣌⣉⣩⣿⡿⠶⠶⠒⠛⠛⠻⠿⠶⣾⣿⣣⠔⠉⠀⠀⠙⡆⢻⣷⠀⠀⠀⠀⠀
                ⠀⠀⢸⣿⠀⠀⢠⣾⠟⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⡃⠀⠀⠀⠀⠀⢻⠘⣿⡀⠀⠀⠀⠀
                ⠀⠀⠘⣿⡀⣴⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⢶⣤⣀⠀⢘⠀⣿⡇⠀⠀⠀⠀
                ⠀⠀⠀⢿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⢿⣴⣿⠀⠀⠀⠀⠀
                ⠀⠀⠀⣸⡟⠀⠀⠀⣴⡆⠀⠀⠀⠀⠀⠀⠀⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣷⡀⠀⠀⠀⠀
                ⠀⠀⢰⣿⠁⠀⠀⣰⠿⣇⠀⠀⠀⠀⠀⠀⠀⢻⣷⡀⠀⢠⡄⠀⠀⠀⠀⠀⡀⠀⠹⣷⠀⠀⠀⠀
                ⠀⠀⣾⡏⠀⢀⣴⣿⣤⢿⡄⠀⠀⠀⠀⠀⠀⠸⣿⣷⡀⠘⣧⠀⠀⠀⠀⠀⣷⣄⠀⢻⣇⠀⠀⠀
                ⠀⠀⢻⣇⠀⢸⡇⠀⠀⠀⢻⣄⠀⠀⠀⠀⠀⣤⡯⠈⢻⣄⢻⡄⠀⠀⠀⠀⣿⡿⣷⡌⣿⡄⠀⠀
                ⠀⢀⣸⣿⠀⢸⡷⣶⣶⡄⠀⠙⠛⠛⠛⠛⠛⠃⣠⣶⣄⠙⠿⣧⠀⠀⠀⢠⣿⢹⣻⡇⠸⣿⡄⠀
                ⢰⣿⢟⣿⡴⠞⠀⠘⢿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⡇⠀⣿⡀⢀⣴⠿⣿⣦⣿⠃⠀⢹⣷⠀
                ⠀⢿⣿⠁⠀⠀⠀⠀⠀⠀⠀⢠⣀⣀⡀⠀⡀⠀⠀⠀⠀⠀⠀⣿⠛⠛⠁⠀⣿⡟⠁⠀⠀⢀⣿⠂
                ⠀⢠⣿⢷⣤⣀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠛⠉⠀⠀⠀⠀⠀⢠⡿⢰⡟⠻⠞⠛⣧⣠⣦⣀⣾⠏⠀
                ⠀⢸⣿⠀⠈⢹⡿⠛⢶⡶⢶⣤⣤⣤⣤⣤⣤⣤⣤⣶⠶⣿⠛⠷⢾⣧⣠⡿⢿⡟⠋⠛⠋⠁⠀⠀
                ⠀⣾⣧⣤⣶⣟⠁⠀⢸⣇⣸⠹⣧⣠⡾⠛⢷⣤⡾⣿⢰⡟⠀⠀⠀⣿⠋⠁⢈⣿⣄⠀⠀⠀⠀⠀
                ⠀⠀⠀⣼⡏⠻⢿⣶⣤⣿⣿⠀⠈⢉⣿⠀⢸⣏⠀⣿⠈⣷⣤⣤⣶⡿⠶⠾⠋⣉⣿⣦⣀⠀⠀⠀
                ⠀⠀⣼⡿⣇⠀⠀⠙⠻⢿⣿⠀⠀⢸⣇⠀⠀⣻⠀⣿⠀⣿⠟⠋⠁⠀⠀⢀⡾⠋⠉⠙⣿⡆⠀⠀
                ⠀⠀⢻⣧⠙⢷⣤⣦⠀⢸⣿⡄⠀⠀⠉⠳⣾⠏⠀⢹⣾⡇⠀⠀⠙⠛⠶⣾⡁⠀⠀⠀⣼⡇⠀⠀
                ⠀⠀⠀⠙⠛⠛⣻⡟⠀⣼⣿⣇⣀⣀⣀⡀⠀⠀⠀⣸⣿⣇⠀⠀⠀⠀⠀⠈⢛⣷⠶⠿⠋⠀⠀⠀
                ⠀⠀⠀⠀⠀⢠⣿⣅⣠⣿⠛⠋⠉⠉⠛⠻⠛⠛⠛⠛⠋⠻⣧⡀⣀⣠⢴⠾⠉⣿⣆⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⣼⡏⠉⣿⡟⠁⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠙⠿⣿⣌⠁⠀⠀⠈⣿⡆⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⣿⣇⣠⣿⣿⡶⠶⠶⣶⣿⣷⡶⣶⣶⣶⣶⡶⠶⠶⢿⣿⡗⣀⣤⣾⠟⠁⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠈⠙⠛⢻⣿⡇⠀⠀⣿⡟⠛⠷⠶⠾⢿⣧⠁⠀⠀⣸⡿⠿⠟⠉⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣷⣦⣤⡿⠀⠀⠀⠀⠀⠀⢿⣧⣤⣼⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

${"=".repeat(54)}\n\nPROJECT FAKE KTP BY REYHAN HINTAM!
`);
  
  const data = {
    provinsi: await askQuestion("Provinsi (contoh: jakarta selatan): ") || "jakarta selatan",
    kota: await askQuestion("Kota (contoh: jakarta): ") || "jakarta",
    nik: await askQuestion("NIK (contoh:: 129401123108365172): ") || "127xxxx",
    nama: await askQuestion("Nama (contoh: kiana dimitri): ") || "Koirul Abdiul Crt",
    ttl: await askQuestion("Tempat/Tgl Lahir (contoh: jakarta, 01-09-2000): ") || "jakarta, 01-09-2000",
    jenis_kelamin: await askQuestion("Jenis Kelamin (contoh: laki-laki): ") || "laki-laki",
    golongan_darah: await askQuestion("Golongan Darah (contoh: o): ") || "o",
    alamat: await askQuestion("Alamat (contoh: JL. xxx xxx xxx): ") || "jl xxx xxx xxx",
    "rt/rw": await askQuestion("RT/RW (contoh: 000/000): ") || "000/000",
    "kel/desa": await askQuestion("Kelurahan/Desa (contoh: xxx): ") || "xxx",
    kecamatan: await askQuestion("Kecamatan (contoh: xxx): ") || "xxx",
    agama: await askQuestion("Agama (contoh: xxx): ") || "xxx",
    status: await askQuestion("Status (contoh: belum): ") || "belum menikah",
    pekerjaan: await askQuestion("Pekerjaan (contoh: wiraswasta): ") || "wiraswasta",
    kewarganegaraan: await askQuestion("Kewarganegaraan (contoh: wni): ") || "wni",
    masa_berlaku: await askQuestion("Masa Berlaku (contoh: seumur hidup): ") || "seumur hidup",
    terbuat: await askQuestion("Dibuat Tanggal (contoh: 19-10-2027): ") || "19-10-2023",
    tandatangan: await askQuestion("Nama untuk Tanda Tangan (contoh: Free): ") || "Sepuh",
    pas_photo: await askQuestion("Path Foto (Tekan Enter/Masukan Pact): ") || "./mukelu.jpg"
  };

  rl.close();
  return data;
}

async function registerFonts() {
  await Promise.all([
    PImage.registerFont("./Arrial.ttf","Arrial").load(),
    PImage.registerFont("./tandatangan.ttf","Sign").load(),
    PImage.registerFont("./styleHuruf.ttf","Ocr").load()
  ]);
}

async function generateKTP() {
  try {
    const data = await getInputData();
    await registerFonts();

    const template = await Jimp.read("./Template.png");  
    const photo = await Jimp.read(data.pas_photo);  

    if (photo.bitmap.width !== 452) {  
      photo.crop(0, 0, 434, 470);  
    }  
    photo.resize(photo.bitmap.width * 0.4, photo.bitmap.height * 0.4);  

    const img = PImage.make(template.bitmap.width, template.bitmap.height);  
    const ctx = img.getContext("2d");  

    const tempImg = await PImage.decodePNGFromStream(fs.createReadStream("./Template.png"));  
    ctx.drawImage(tempImg, 0, 0);  

    const photoPath = "./tmp_Sock.png";  
    await photo.writeAsync(photoPath);  
    const pas = await PImage.decodePNGFromStream(fs.createReadStream(photoPath));  
    ctx.drawImage(pas, 530, 140);  

    // Semua koordinat tetap sama seperti yang Anda tentukan
    ctx.fillStyle = "black";  

    ctx.font = `${size[0]}pt Arrial`;  
    ctx.fillText(`PROVINSI ${data.provinsi.toUpperCase()}`, 214, 45);  
    ctx.fillText(`KOTA ${data.kota.toUpperCase()}`, 270, 70);  

    ctx.font = `${size[0]}pt Ocr`;  
    ctx.fillText(data.nik, 170, 123);  

    ctx.font = `${size[2]}pt Arrial`;  
    ctx.fillText(data.nama.toUpperCase(), 190, 158);  
    ctx.fillText(data.ttl.toUpperCase(), 190, 180);  
    ctx.fillText(data.jenis_kelamin.toUpperCase(), 190, 200);  
    ctx.fillText(data.golongan_darah.toUpperCase(), 463, 200);  
    ctx.fillText(data.alamat.toUpperCase(), 190, 224);  
    ctx.fillText(data["rt/rw"].toUpperCase(), 190, 245);  
    ctx.fillText(data["kel/desa"].toUpperCase(), 190, 267);  
    ctx.fillText(data.kecamatan.toUpperCase(), 190, 290);  
    ctx.fillText(data.agama.toUpperCase(), 190, 317);  
    ctx.fillText(data.status.toUpperCase(), 190, 335);  
    ctx.fillText(data.pekerjaan.toUpperCase(), 190, 355);  
    ctx.fillText(data.kewarganegaraan.toUpperCase(), 190, 378);  
    ctx.fillText(data.masa_berlaku.toUpperCase(), 190, 399);  
    ctx.fillText(`KOTA ${data.kota.toUpperCase()}`, 553, 354);  
    ctx.fillText(data.terbuat, 570, 372);  

    ctx.font = `${size[3]}pt Sign`;  
    const sign = data.tandatangan || data.nama.split(" ")[0];  
    ctx.fillText(sign, 565, 415);  

    // Path penyimpanan di folder Download Android
    const outPath = "/storage/emulated/0/Download/ktp-result.jpg";
    
    try {
      await PImage.encodeJPEGToStream(img, fs.createWriteStream(outPath), 95);
      console.log(`✅ KTP berhasil disimpan di: ${outPath}`);
    } catch (saveError) {
      console.error("Gagal menyimpan di folder Download, mencoba menyimpan di lokal...");
      const localPath = "./ktp-result.jpg";
      await PImage.encodeJPEGToStream(img, fs.createWriteStream(localPath), 95);
      console.log(`✅ KTP disimpan di: ${path.resolve(localPath)}`);
    }

    // Bersihkan file temporary
    try {
      fs.unlinkSync(photoPath);
    } catch (cleanErr) {
      console.warn("Gagal menghapus file temporary:", cleanErr.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

generateKTP();
