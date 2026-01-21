const alunos = [
    { nome: 'Ana', nota: 8.5 },
    { nome: 'Bruno', nota: 5.75 },
    { nome: 'Carla', nota: 6.0 },
    { nome: 'Diego', nota: 9.25 },
    { nome: 'Erika', nota: 4.5 },
    { nome: 'Fabio', nota: 7.0 }
];

const filtrarAprovados = (lista, media = 6) => lista.filter(({ nota }) => nota >= media);

const aprovados = filtrarAprovados(alunos);

console.log(`Total de alunos: ${alunos.length}`);
console.table(alunos);
console.log('Aprovados (nota >= 6):');
console.table(aprovados);

module.exports = { alunos, filtrarAprovados };
