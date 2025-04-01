# Academic Network Platform

학술 네트워크 플랫폼은 연구자들이 서로 연결되고 협업할 수 있는 웹 애플리케이션입니다.

## 주요 기능

- **관심사 관리**: 연구 분야와 관심사를 설정하고 관리
- **전문가 추천**: 관심사 기반의 전문가 추천 시스템
- **네트워크 구축**: 다른 연구자들과 연결하고 연락처 관리
- **그룹 관리**: 연구 그룹 생성 및 관리
- **기사 추천**: 관심사 기반의 관련 기사/논문 추천

## 기술 스택

- React
- TypeScript
- Firebase (Authentication, Firestore)
- CSS3

## 시작하기

### 사전 요구사항

- Node.js (v14 이상)
- npm 또는 yarn
- Firebase 프로젝트 설정

### 설치 방법

1. 저장소 클론
```bash
git clone [your-repository-url]
```

2. 의존성 설치
```bash
npm install
# or
yarn install
```

3. Firebase 설정
- Firebase 프로젝트 생성
- `src/firebase.ts` 파일에 Firebase 설정 정보 추가

4. 개발 서버 실행
```bash
npm start
# or
yarn start
```

## 환경 설정

1. Firebase 프로젝트 생성
2. Authentication 활성화 (이메일/비밀번호)
3. Firestore 데이터베이스 생성
4. Firebase 설정 정보를 `src/firebase.ts`에 추가

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
