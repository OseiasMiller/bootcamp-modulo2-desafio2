class Utils {
  lerArquivo(arquivo) {
    return JSON.parse(fs.readFileSync(arquivo));
  }
}

export default Utils;
