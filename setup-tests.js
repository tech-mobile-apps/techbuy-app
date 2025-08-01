#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Configurando testes automatizados...');

// Verificar se o package.json existe
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json não encontrado. Execute este script na raiz do projeto.');
  process.exit(1);
}

// Dependências necessárias para testes
const testDependencies = [
  '@testing-library/react-native',
  '@testing-library/jest-native',
  'jest',
  'jest-expo',
  '@types/jest',
];

console.log('📦 Instalando dependências de teste...');

try {
  // Tentar usar yarn primeiro
  execSync(`yarn add --dev ${testDependencies.join(' ')}`, { stdio: 'inherit' });
  console.log('✅ Dependências instaladas com yarn');
} catch (error) {
  console.log('⚠️  Yarn não disponível, tentando npm...');
  try {
    execSync(`npm install --save-dev ${testDependencies.join(' ')}`, { stdio: 'inherit' });
    console.log('✅ Dependências instaladas com npm');
  } catch (npmError) {
    console.error('❌ Erro ao instalar dependências:', npmError.message);
    console.log('\n📋 Instale manualmente as seguintes dependências:');
    console.log(`yarn add --dev ${testDependencies.join(' ')}`);
    console.log('ou');
    console.log(`npm install --save-dev ${testDependencies.join(' ')}`);
    process.exit(1);
  }
}

// Verificar se os arquivos de configuração existem
const requiredFiles = ['jest.config.js', 'jest.setup.js', '__tests__/README.md'];

console.log('\n📁 Verificando arquivos de configuração...');

requiredFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} encontrado`);
  } else {
    console.log(`❌ ${file} não encontrado`);
  }
});

console.log('\n🎉 Configuração concluída!');
console.log('\n📋 Para executar os testes:');
console.log('  yarn test          # Executar todos os testes');
console.log('  yarn test:watch    # Executar em modo watch');
console.log('  yarn test:coverage # Executar com cobertura');
console.log('\n📖 Consulte __tests__/README.md para mais informações.');
