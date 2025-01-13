import { Readable, Writable, Transform } from 'node:stream';

// Classe que gera números de 1 a 100 com delay
class OneToHundredStream extends Readable {
    index = 1;

    _read() {
        const i = this.index++;  // Armazena o valor atual de index e incrementa

        setTimeout(() => {
            if (i > 100) {
                this.push(null);  // Encerra a stream após 100
            } else {
                const buf = Buffer.from(String(i));  // Converte o número em buffer
                this.push(buf);  // Empurra o número como dado para a próxima stream
            }
        }, 1000);  // Emite os dados a cada 1 segundo
    }
}

// Classe que multiplica o valor recebido por 10
class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10);  // Multiplica por 10 e imprime
        callback();  // Chama o callback para sinalizar que a escrita foi concluída
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1; // Corrigido para "transformed"
        console.log(transformed);
        callback(null, Buffer.from(String(transformed)));
    }
}


// Cria a stream OneToHundredStream e a pipeline com MultiplyByTenStream
new OneToHundredStream()
.pipe( new InverseNumberStream)
.pipe(new MultiplyByTenStream());
