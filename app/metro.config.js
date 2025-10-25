const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Monorepo 설정: 상위 디렉토리(gryffindor)를 workspace root로 지정
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

// Metro가 workspace 전체를 감시하도록 설정
config.watchFolders = [workspaceRoot];

// node_modules 해석 경로 설정
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// @bridge alias 설정 (shared/bridge 폴더 접근)
// Metro는 디렉토리를 직접 가리켜야 index.ts를 인식함
const bridgePath = path.resolve(workspaceRoot, 'shared', 'bridge');
config.resolver.extraNodeModules = {
  '@bridge': bridgePath,
};

// package.json의 browser field 해석을 활성화하여 index.ts를 인식
config.resolver.resolverMainFields = ['browser', 'main', 'module'];

module.exports = config;
