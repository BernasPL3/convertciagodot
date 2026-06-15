const fs = require("fs");
const path = require("path");

class AdaptadorGodot3DS {
    constructor(projetoPath) {
        this.projetoPath = projetoPath;
        this.relatorio = [];
    }

    verificarProjeto() {
        const projectFile = path.join(this.projetoPath, "project.godot");

        if (!fs.existsSync(projectFile)) {
            throw new Error("project.godot não encontrado.");
        }

        this.relatorio.push("✓ Projeto Godot encontrado");
    }

    verificarAssets() {
        const arquivos = fs.readdirSync(this.projetoPath);

        let total = 0;

        arquivos.forEach(arquivo => {
            if (
                arquivo.endsWith(".png") ||
                arquivo.endsWith(".ogg") ||
                arquivo.endsWith(".wav")
            ) {
                total++;
            }
        });

        this.relatorio.push(`✓ Assets encontrados: ${total}`);
    }

    gerarConfig3DS() {
        const cfg = {
            titulo: "MeuJogo3DS",
            autor: "ConvertCIAGodot",
            largura: 400,
            altura: 240
        };

        fs.writeFileSync(
            path.join(this.projetoPath, "3ds-config.json"),
            JSON.stringify(cfg, null, 4)
        );

        this.relatorio.push("✓ Configuração 3DS criada");
    }

    executar() {
        this.verificarProjeto();
        this.verificarAssets();
        this.gerarConfig3DS();

        return this.relatorio;
    }
}

module.exports = AdaptadorGodot3DS;
